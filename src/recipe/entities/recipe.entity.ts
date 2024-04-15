import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm";

export enum Difficulty {
    Weak = 'Weak',
    Intermediary = 'Intermediary',
    Difficult = 'Difficult',
  }

export enum Category {
    Entree = 'Entree',
    Dish = 'Dish',
    Dessert = 'Dessert',
    Drink = 'Drink',
    Aperitifs = 'Aperitifs'
  }

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn("uuid")
    id_recipe: string;

    @Column()
    name_recipe: string;

    @Column()
    difficulty: Difficulty

    @Column()
    category: Category

    @ManyToOne(() => User)
    owner: User;
    
    @Column()
    duration: string;

    @Column()
    validate: boolean;
}
