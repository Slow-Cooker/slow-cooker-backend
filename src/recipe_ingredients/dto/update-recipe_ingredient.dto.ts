import { PartialType } from '@nestjs/swagger';
import { CreateRecipeIngredientDto } from './create-recipe_ingredient.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRecipeIngredientDto extends PartialType(
  CreateRecipeIngredientDto,
) {
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;
}
