//user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
export enum UserRole {
  User = 'User',
  Admin = 'Admin',
}
@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ default: UserRole.User })
  role: UserRole;

  @Column()
  profilepicture: string;
}
