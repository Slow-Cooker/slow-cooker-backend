import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SelectionsService } from './selections.service';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateRecipeDto } from '../recipe/dto/update-recipe.dto';

@Controller('selection')
export class CommentController {
  constructor(private readonly selectionsService: SelectionsService) {}

  @Post()
  create(@Body() createSelectionDto: CreateSelectionDto) {
    return this.selectionsService.create(createSelectionDto);
  }

  @Get()
  findAll() {
    return this.selectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.selectionsService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selectionsService.remove(id);
  }
}
