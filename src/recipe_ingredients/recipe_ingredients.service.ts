import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(
    id: string,
    updateRecipeIngredientDto: UpdateRecipeIngredientDto,
  ) {
    const recipeIngredient = await this.recipeIngredientsRepository.findOneBy({
      id: id,
    });
    if (!recipeIngredient) {
      throw new NotFoundException("This recipeIngredient dosen't exist");
    }
    const updatedRecipeIngredient = this.recipeIngredientsRepository.merge(
      recipeIngredient,
      updateRecipeIngredientDto,
    );
    const saveRecipeIngredient = await this.recipeIngredientsRepository.save(
      updatedRecipeIngredient,
    );
    return saveRecipeIngredient;
  }
}
