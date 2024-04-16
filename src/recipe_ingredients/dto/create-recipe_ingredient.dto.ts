import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Recipe } from '../../recipe/entities/recipe.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

export class CreateRecipeIngredientDto {
  @IsNotEmpty()
  ingredient: Ingredient;

  @IsNotEmpty()
  recipe: Recipe;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;
}
