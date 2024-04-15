//users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, RecipeModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
