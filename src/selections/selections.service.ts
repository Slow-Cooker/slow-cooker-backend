import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Selection } from './entities/selection.entity';

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
      throw new NotFoundException("This recipe doesn't exist");
    }
    return selection;
  }

  async update(id: string, updateSelectionDto: UpdateSelectionDto) {
    const selection = await this.selectionRepository.findOneBy({ id: id });
    if (!selection) {
      throw new NotFoundException("This recipe doesn't exist");
    }
    const updatedRecipe = this.selectionRepository.merge(
      selection,
      updateSelectionDto,
    );
    const selection1 = await this.selectionRepository.save(updatedRecipe);
    return selection1;
  }

  async remove(id: string) {
    const selection = await this.selectionRepository.findOneBy({ id: id });
    if (!selection) {
      throw new NotFoundException("This recipe doesn't exist");
    }
    this.selectionRepository.delete(selection.id);
    return `This action removes a #${id} recipe`;
  }
}
