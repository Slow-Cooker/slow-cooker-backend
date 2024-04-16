import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Selection } from './entities/selection.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SelectionsService {
  constructor(
    @InjectRepository(Selection)
    private readonly selectionRepository: Repository<Selection>,
  ) {}
  async create(createSelection: CreateSelectionDto) {
    const newSelection = this.selectionRepository.create(createSelection);
    const selection = await this.selectionRepository.save(newSelection);
    return selection;
  }

  async findAll() {
    const selections = await this.selectionRepository.find();
    return selections;
  }

  async findOne(id: string) {
    const selection = await this.selectionRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!selection) {
      throw new NotFoundException("This selection doesn't exist");
    }
    return selection;
  }

  async update(id: string, updateSelectionDto: UpdateSelectionDto) {
    const selection = await this.selectionRepository.findOneBy({ id: id });
    if (!selection) {
      throw new NotFoundException("This selection doesn't exist");
    }
    const updatedSelection = this.selectionRepository.merge(
      selection,
      updateSelectionDto,
    );
    const selection1 = await this.selectionRepository.save(updatedSelection);
    return selection1;
  }
  async updateRecipe(
    id_selection: string,
    recipe: Recipe,
    deleteRecipe: boolean,
  ) {
    const selection = await this.selectionRepository.findOne({
      where: { id: id_selection },
    });

    if (!selection) {
      throw new NotFoundException("This selection doesn't exist");
    }

    let updatedRecipes: Recipe[] = selection.recipes || [];
    if (deleteRecipe) {
      // Filter out the recipe to be deleted from updatedRecipes
      updatedRecipes = updatedRecipes.filter(
        (r) => r.id_recipe !== recipe.id_recipe,
      );
    } else {
      // Check if the recipe already exists, and if not, add it
      const existingRecipeIndex = updatedRecipes.findIndex(
        (r) => r.id_recipe === recipe.id_recipe,
      );
      if (existingRecipeIndex === -1) {
        updatedRecipes.push(recipe);
      } else {
        updatedRecipes[existingRecipeIndex] = recipe; // Update existing recipe
      }
    }
    console.log('Before merge:', selection);
    const updatedSelection = this.selectionRepository.merge(selection, {
      id: selection.id,
      recipes: updatedRecipes,
      id_user: selection.id_user,
      name: selection.name,
    });
    console.log('After merge:', updatedSelection);
    if (!updatedSelection) {
      throw new NotFoundException(
        'Failed to insert/delete the recipe in the selection',
      );
    }
    console.log(updatedSelection.recipes);
    return updatedSelection;
  }

  async remove(id: string) {
    const selection = await this.selectionRepository.findOneBy({ id: id });
    if (!selection) {
      throw new NotFoundException("This selection doesn't exist");
    }
    this.selectionRepository.delete(selection.id);
    return `This action removes a #${id} selection`;
  }

  async findOneSelectionByUserId(user: User) {
    const selection = await this.selectionRepository.find({
      relations: {
        id_user: true,
      },
      where: {
        id_user: user,
      },
    });
    if (!selection) {
      throw new NotFoundException("This selection doesn't exist");
    }
    return selection;
  }
}
