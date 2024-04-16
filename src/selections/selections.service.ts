import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Selection } from './entities/selection.entity';
import { Recipe } from '../recipe/entities/recipe.entity';

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
  async updateRecipe(id_selection: string, recipe?: Recipe) {
    const selection = await this.selectionRepository.findOneBy({
      id: id_selection,
    });
    if (!selection) {
      throw new NotFoundException("This selection doesn't exist");
    }
    let updatedRecipes: Recipe[] = [];
    if (selection.recipes) updatedRecipes = selection.recipes;
    // Verify if we need to delete or add a recipe
    if (recipe) {
      updatedRecipes.push(recipe);
    } else {
      updatedRecipes.pop();
    }
    console.log('updatedRecipes', updatedRecipes);
    // Update the selection entity with the new recipes array
    const updatedSelection = await this.selectionRepository.update(
      { id: id_selection },
      { recipes: updatedRecipes },
    );
    console.log('coucou');
    if (!updatedSelection) {
      throw new NotFoundException(
        'Failed to insert/delete the recipe in the selection',
      );
    }
    // Fetch the updated selection after the update
    const finalSelection = await this.selectionRepository.findOneBy({
      id: id_selection,
    });

    return finalSelection;
  }

  async remove(id: string) {
    const selection = await this.selectionRepository.findOneBy({ id: id });
    if (!selection) {
      throw new NotFoundException("This selection doesn't exist");
    }
    this.selectionRepository.delete(selection.id);
    return `This action removes a #${id} selection`;
  }
}
