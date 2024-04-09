import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Reflector } from '@nestjs/core';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { AuthService } from './auth.service';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly auth: AuthService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.auth.authFromToken(token)

    if (!user) throw new UnauthorizedException();

    request['user'] = user;

    return true
  }
}

function extractTokenFromHeader(request: ExpressRequest): string | null {
  const authHeader = request.headers.authorization;

  if (authHeader && typeof authHeader === 'string') {
    const [type, token] = authHeader.split(' ');

    if (type === 'Bearer' && token) {
      return token;
    }
  }

  return null;
}
