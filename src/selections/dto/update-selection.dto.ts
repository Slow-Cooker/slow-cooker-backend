import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class UpdateSelectionDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @IsString()
  name: string;
}
