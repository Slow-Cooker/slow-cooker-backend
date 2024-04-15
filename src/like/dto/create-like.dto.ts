import { IsNotEmpty } from "class-validator";
import { Recipe } from "src/recipe/entities/recipe.entity";
import { User } from "src/users/entities/user.entity";

export class CreateLikeDto {
    @IsNotEmpty()
    recipe: Recipe;

    @IsNotEmpty()
    owner: User;
}
