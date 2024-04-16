import { Module } from '@nestjs/common';
import { RecipeIngredientsService } from './recipe_ingredients.service';
import { RecipeIngredientsController } from './recipe_ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeIngredient])],
  controllers: [RecipeIngredientsController],
  providers: [RecipeIngredientsService],
})
export class RecipeIngredientsModule {}
