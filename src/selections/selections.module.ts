import { Module } from '@nestjs/common';
import { SelectionsService } from './selections.service';
import { SelectionsController } from './selections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Selection } from './entities/selection.entity';
import { User } from 'src/users/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { RecipeService } from 'src/recipe/recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Selection, Recipe, User])],
  controllers: [SelectionsController],
  providers: [SelectionsService, RecipeService],
  exports: [SelectionsService, RecipeService],
})
export class SelectionsModule {}
