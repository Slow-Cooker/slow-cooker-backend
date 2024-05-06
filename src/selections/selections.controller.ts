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
import { User } from 'src/users/entities/user.entity';
@Controller('selections')
export class SelectionsController {
  constructor(
    private readonly selectionsService: SelectionsService,
    private readonly recipeService: RecipeService,
  ) {}

  @Post()
  create(@Body() createSelectionDto: CreateSelectionDto) {
    console.log(createSelectionDto)
    return this.selectionsService.create(createSelectionDto);
  }

  @Get("user/:id")
  findAll(@Param('id') id: string) {
    console.log(id)
    return this.selectionsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id)
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
    const newSelection = await this.selectionsService.updateRecipes(
      id_selection,
      [recipe.id_recipe], // Assuming recipe.id is the ID of the recipe
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
    const newSelection = await this.selectionsService.updateRecipes(
      id_selection,
      [recipe.id_recipe], // Passing only the ID
      true,
    );
    return newSelection;
  }
}
