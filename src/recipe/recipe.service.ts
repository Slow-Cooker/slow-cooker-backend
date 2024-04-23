import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const newRecipe = this.recipeRepository.create(createRecipeDto);
    const saveRecipe = await this.recipeRepository.save(newRecipe);
    return saveRecipe;
  }

  async findOneRecipeByOwnerId(owner: User): Promise<Recipe[]> {
    const recipes = await this.recipeRepository.findBy({ owner });
    if (!recipes) {
      throw new NotFoundException("This recipe doesn't exist");
    }
    return recipes;
  }

  async findAll() {
    const allRecipe = await this.recipeRepository.find();
    console.log(allRecipe)
    return allRecipe;
  }

  async findOne(id: string) {
    const recipe = await this.recipeRepository.findOne({
      where: {
        id_recipe: id,
      },
    });
    if (!recipe) {
      throw new NotFoundException("This recipe doesn't exist");
    }
    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findOneBy({ id_recipe: id });
    if (!recipe) {
      throw new NotFoundException("This recipe doesn't exist");
    }
    const updatedRecipe = this.recipeRepository.merge(recipe, updateRecipeDto);
    const recipeSave = await this.recipeRepository.save(updatedRecipe);
    return recipeSave;
  }

  async remove(id: string) {
    const recipe = await this.recipeRepository.findOneBy({ id_recipe: id });
    if (!recipe) {
      throw new NotFoundException("This recipe doesn't exist");
    }
    this.recipeRepository.delete(recipe.id_recipe);
    return `This action removes a #${id} recipe`;
  }
}
