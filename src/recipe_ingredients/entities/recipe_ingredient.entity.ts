import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ingredient)
  ingredient: Ingredient;

  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @Column()
  quantity: number;

  @Column()
  unit: string;
}
