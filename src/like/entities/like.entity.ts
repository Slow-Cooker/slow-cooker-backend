import { Recipe } from 'src/recipe/entities/recipe.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @ManyToOne(() => User)
  owner: User;
}
