import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Difficulty {
    Weak = 'Weak',
    Intermediary = 'Intermediary',
    Difficult = 'Difficult',
  }

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn("uuid")
    id_recipe: string;

    @Column()
    name_recipe: string;

    @Column()
    role: Difficulty
}
