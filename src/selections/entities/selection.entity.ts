import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity()
export class Selection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Recipe)
  recipes: Recipe[];

  @ManyToOne(() => User)
  id_user: User;

  @Column()
  name: string;
}
