import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  recipe: Recipe;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
