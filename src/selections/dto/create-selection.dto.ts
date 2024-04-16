import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSelectionDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  recipeIds: string[];

  @IsNotEmpty()
  @IsString()
  name: string;
}
