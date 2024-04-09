//login-user.dto.ts
import { IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
