import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { SelectionsService } from './selections.service';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { RecipeService } from '../recipe/recipe.service';
@Controller('selection')
export class SelectionsController {
  constructor(
    private readonly selectionsService: SelectionsService,
    private readonly recipeService: RecipeService,
  ) {}

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
  update(
    @Param('id') id: string,
    @Body() updateSelectionDto: UpdateSelectionDto,
  ) {
    return this.selectionsService.update(id, updateSelectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selectionsService.remove(id);
  }

  @Get('/recipe/:id_selection')
  async findAllRecipeInSelection(@Param('id_selection') id_selection: string) {
    const selection = await this.selectionsService.findOne(id_selection);
    const recipeInSelection = selection.recipes;
    return recipeInSelection;
  }
  @Post(':id_selection/:id_recipe')
  async postRecipeInSelection(
    @Param('id_recipe') id_recipe: string,
    @Param('id_selection') id_selection: string,
  ) {
    const recipe = await this.recipeService.findOne(id_recipe);
    if (!recipe) {
      throw new NotFoundException("This recipe doesn't exist");
    }
    const newSelection = await this.selectionsService.updateRecipe(
      id_selection,
      recipe,
      false,
    );
    return newSelection;
  }
  @Delete(':id_selection/:id_recipe')
  async removeRecipe(
    @Param('id_recipe') id_recipe: string,
    @Param('id_selection') id_selection: string,
  ) {
    const recipe = await this.recipeService.findOne(id_recipe);
    if (!recipe) {
      throw new NotFoundException("This recipe doesn't exist");
    }
    const newSelection = await this.selectionsService.updateRecipe(
      id_selection,
      recipe,
      true,
    );
    return newSelection;
  }
}
