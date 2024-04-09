import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateIngredientDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name_ingredient: string;

    @IsNotEmpty()
    @IsString()
    image_ingredient: string;
}
