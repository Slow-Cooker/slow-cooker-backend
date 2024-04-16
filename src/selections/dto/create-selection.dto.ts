import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export class CreateSelectionDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  recipes: Recipe[];

  @IsNotEmpty()
  @IsString()
  name: string;
}
