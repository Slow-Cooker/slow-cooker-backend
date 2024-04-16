import { Module } from '@nestjs/common';
import { SelectionsService } from './selections.service';
import { SelectionsController } from './selections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Selection } from './entities/selection.entity';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Selection]), RecipeModule],
  controllers: [SelectionsController],
  providers: [SelectionsService],
})
export class SelectionsModule {}
