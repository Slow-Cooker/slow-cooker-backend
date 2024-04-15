import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id_ingredient: string;

  @Column({ unique: true })
  name_ingredient: string;

  @Column()
  image_ingredient: string;
}
