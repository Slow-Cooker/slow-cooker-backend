import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipeIngredientsService } from './recipe_ingredients.service';
import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';

@Controller('recipe-ingredients')
export class RecipeIngredientsController {
  constructor(
    private readonly recipeIngredientsService: RecipeIngredientsService,
  ) {}

  @Post()
  create(@Body() createRecipeIngredientDto: CreateRecipeIngredientDto) {
    return this.recipeIngredientsService.create(createRecipeIngredientDto);
  }

  @Get()
  findAll() {
    return this.recipeIngredientsService.findAll();
  }

  @Get('allIngredients/:recipeId')
  findAllinRecipe(@Param('recipeId') recipeId: string) {
    return this.recipeIngredientsService.findAllinRecipe(recipeId);
  }

  @Post('ingredients')
  findRecipeWithIngredient(@Body() ingredients: Ingredient[]) {
    console.log(ingredients)
    return this.recipeIngredientsService.findRecipeWithIngredient(ingredients);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeIngredientsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeIngredientDto: UpdateRecipeIngredientDto,
  ) {
    return this.recipeIngredientsService.update(id, updateRecipeIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeIngredientsService.remove(id);
  }
}
