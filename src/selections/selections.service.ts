import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { Selection } from './entities/selection.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SelectionsService {
  constructor(
    @InjectRepository(Selection)
    private readonly selectionRepository: Repository<Selection>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(createSelectionDto: CreateSelectionDto): Promise<Selection> {
    const user = await this.userRepository.findOneBy({
      id: createSelectionDto.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const recipes = await this.recipeRepository.findByIds(
      createSelectionDto.recipeIds,
    );
    if (recipes.length !== createSelectionDto.recipeIds.length) {
      throw new NotFoundException('One or more recipes could not be found');
    }

    const newSelection = this.selectionRepository.create({
      name: createSelectionDto.name,
      user: user,
      recipes: recipes,
    });

    return this.selectionRepository.save(newSelection);
  }

  async findAll(): Promise<Selection[]> {
    return this.selectionRepository.find({ relations: ['recipes', 'user'] });
  }

  async findOne(id: string): Promise<Selection> {
    const selection = await this.selectionRepository.findOne({
      where: { id },
      relations: ['recipes', 'user'],
    });
    if (!selection) {
      throw new NotFoundException("This selection doesn't exist");
    }
    return selection;
  }

  async update(
    id: string,
    updateSelectionDto: UpdateSelectionDto,
  ): Promise<Selection> {
    const selection = await this.findOne(id);
    this.selectionRepository.merge(selection, updateSelectionDto);
    return this.selectionRepository.save(selection);
  }

  async updateRecipes(
    id: string,
    recipeIds: string[],
    deleteRecipe: boolean,
  ): Promise<Selection> {
    const selection = await this.findOne(id);

    if (!selection) {
      throw new NotFoundException('Selection not found');
    }
    if (deleteRecipe) {
      selection.recipes = selection.recipes.filter(
        (recipe) => !recipeIds.includes(recipe.id_recipe),
      );
    } else {
      const newRecipes = await this.recipeRepository.findByIds(recipeIds);
      const filteredNewRecipes = newRecipes.filter(
        (newRecipe) =>
          !selection.recipes.some(
            (existingRecipe) =>
              existingRecipe.id_recipe === newRecipe.id_recipe,
          ),
      );
      selection.recipes = [...selection.recipes, ...filteredNewRecipes];
    }

    return this.selectionRepository.save(selection);
  }

  async remove(id: string): Promise<string> {
    const selection = await this.findOne(id);
    await this.selectionRepository.delete(id);
    return `Selection ${id} has been removed`;
  }

  async findSelectionsByUserId(userId: string): Promise<Selection[]> {
    const selections = await this.selectionRepository.find({
      where: { user: { id: userId } },
      relations: ['recipes', 'user'],
    });
    if (!selections) {
      throw new NotFoundException('This user has no selections');
    }
    return selections;
  }
}
