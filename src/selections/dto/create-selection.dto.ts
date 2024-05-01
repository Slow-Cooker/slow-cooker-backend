import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSelectionDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @IsOptional()
  @IsUUID(4, { each: true })
  recipeIds?: string[];

  @IsNotEmpty()
  @IsString()
  name: string;
}
