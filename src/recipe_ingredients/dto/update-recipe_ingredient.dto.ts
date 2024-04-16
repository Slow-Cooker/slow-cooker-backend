import { PartialType } from '@nestjs/swagger';
import { CreateRecipeIngredientDto } from './create-recipe_ingredient.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';

export class UpdateRecipeIngredientDto extends PartialType(
  CreateRecipeIngredientDto,
) {
  @IsOptional()
  @IsEnum(Ingredient)
  ingredient?: Ingredient;

  @IsOptional()
  @IsEnum(Recipe)
  recipe?: Recipe;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;
}
