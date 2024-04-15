import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const existingIngredient = await this.ingredientRepository.findOne({
      where: {
        name_ingredient: createIngredientDto.name_ingredient,
      },
    });
    if (existingIngredient) {
      throw new ConflictException('This ingredient already exist');
    }
    const newIngredient = this.ingredientRepository.create(createIngredientDto);
    const saveIngredient = await this.ingredientRepository.save(newIngredient);
    return saveIngredient;
  }

  async findOne(id: string) {
    const ingredient = await this.ingredientRepository.findOne({
      where: {
        id_ingredient: id,
      },
    });
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.ingredientRepository.findOneBy({
      id_ingredient: id,
    });
    if (!ingredient) {
      throw new NotFoundException("This ingredient dosen't exist");
    }
    const updatedIngredient = this.ingredientRepository.merge(
      ingredient,
      updateIngredientDto,
    );
    const saveIngredient =
      await this.ingredientRepository.save(updatedIngredient);
    return saveIngredient;
  }

  async remove(id: string) {
    const ingredient = await this.ingredientRepository.findOneBy({
      id_ingredient: id,
    });
    if (!ingredient) {
      throw new NotFoundException("This ingredient dosen't exist");
    }
    this.ingredientRepository.delete(ingredient.id_ingredient);
    return `This action removes a #${id} ingredient`;
  }
}
