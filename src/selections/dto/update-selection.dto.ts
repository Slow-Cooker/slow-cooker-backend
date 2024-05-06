import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class UpdateSelectionDto {
  @IsNotEmpty()
  user: User;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  recipesIds?: string[];
}
