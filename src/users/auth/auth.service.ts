import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import * as Argon2 from 'argon2';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async signIn(dto: LoginUserDto) {
    // Find user by email
    const user = await this.users.findByEmail(dto.email);

    // Check if user exists and verify password
    if (!user || !(await Argon2.verify(user.password, dto.password))) {
      throw new UnauthorizedException(); // Throw an unauthorized exception if credentials are invalid
    }

    // Generate JWT token
    const token = await this.jwt.signAsync({ sub: user.id });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword }; // Return token and user data without the password
  }

  async authFromToken(token: string) {
    const payload = await this.jwt.verifyAsync(token);

    if (payload && payload.sub) {
      const user = (await this.users.findById(payload.sub)) as User;
      if (user) return user;
    }

    return null;
  }
}
