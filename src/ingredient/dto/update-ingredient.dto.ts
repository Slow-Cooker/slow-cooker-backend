import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from './create-ingredient.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
    @IsOptional()
    @IsString()
    name_ingredient?: string;

    @IsOptional()
    image_ingredient?: string;
}
