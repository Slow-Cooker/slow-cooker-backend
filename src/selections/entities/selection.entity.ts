import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity()
export class Selection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Recipe, (recipe) => recipe.selections, { cascade: true })
  @JoinTable()
  recipes: Recipe[];

  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;
}
