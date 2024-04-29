import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';

@Injectable()
export class RecipeIngredientsService {
  constructor(
    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientsRepository: Repository<RecipeIngredient>,
  ) {}

  async create(createRecipeIngredientDto: CreateRecipeIngredientDto) {
    const existingRecipeIngredient = await this.recipeIngredientsRepository.findOne({
      where: {
        recipe: {
          id_recipe: createRecipeIngredientDto.recipe.id_recipe
        },
        ingredient:{
          id_ingredient: createRecipeIngredientDto.ingredient.id_ingredient
        },
      },
    });
    if (existingRecipeIngredient) {
      throw new ConflictException('This recipe ingredient already exist');
    }
    const newRecipeIngredient = this.recipeIngredientsRepository.create(
      createRecipeIngredientDto,
    );
    const saveRecipeIngredient =
      await this.recipeIngredientsRepository.save(newRecipeIngredient);
    return saveRecipeIngredient;
  }

  async findAll() {
    const allRecipeIngredient = await this.recipeIngredientsRepository.find();
    return allRecipeIngredient;
  }

  async findOne(id: string) {
    const recipeIngredient = await this.recipeIngredientsRepository.findOne({
      where: {
        id: id,
      },
    });
    return recipeIngredient;
  }

  async remove(id: string) {
    const recipeIngredient = await this.recipeIngredientsRepository.findOneBy({
      id: id,
    });
    if (!recipeIngredient) {
      throw new NotFoundException("This RecipeIngredient doesn't exist");
    }
    this.recipeIngredientsRepository.delete(recipeIngredient.id);
    return `This action removes a #${id} RecipeIngredient`;
  }

  async update(id: string, updateRecipeIngredientDto: UpdateRecipeIngredientDto){
    const recipeIngredient = await this.recipeIngredientsRepository.findOneBy({ id });
    if (!recipeIngredient) {
      throw new NotFoundException("This recipeIngredient does not exist");
    }

    // Check what properties in DTO are defined and should be updated
    const updateData = {};
    if (updateRecipeIngredientDto.quantity !== undefined) {
      updateData['quantity'] = updateRecipeIngredientDto.quantity;
    }
    if (updateRecipeIngredientDto.unit !== undefined) {
      updateData['unit'] = updateRecipeIngredientDto.unit;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid update parameters were provided");
    }

    // Perform the update
    return this.recipeIngredientsRepository.update(id, updateData);
  }
}
