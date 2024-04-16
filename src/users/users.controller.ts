//users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import { RecipeService } from '../recipe/recipe.service';
import { SelectionsService } from '../selections/selections.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly recipeService: RecipeService,
    private readonly selectionService: SelectionsService,
  ) {}

  // Route de connexion des utilisateurs (sign-up)
  @Public()
  @Post('auth/sign-up')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  //Route de login
  @Public()
  @Post('auth/login')
  async login(@Body() dto: LoginUserDto): Promise<{ access_token: string }> {
    const access_token = await this.authService.signIn(dto);
    return { access_token };
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/me')
  async getMyUserInfo(@Request() request: ExpressRequest) {
    const user = request['user'] as User;
    const recipe = await this.recipeService.findOneRecipeByOwnerId(user);
    const selection =
      await this.selectionService.findSelectionsByUserId(user.id);
    console.log(selection);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      recipe: recipe,
      selection: selection,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.usersService.getUserInfo(id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
