import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Category, Difficulty } from '../entities/recipe.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateRecipeDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  name_recipe: string;

  @IsNotEmpty()
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsNotEmpty()
  owner: User;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsBoolean()
  validate: boolean;
}
