import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity()
export class Selection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Recipe)
  recipes: Recipe[];

  @ManyToOne(() => User)
  id_user: User;

  @Column()
  name: string;
}
