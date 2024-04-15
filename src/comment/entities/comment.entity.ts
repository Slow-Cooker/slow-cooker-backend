import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id_comment: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @Column()
  comment: string;
}
