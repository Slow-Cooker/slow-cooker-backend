import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller()
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':recipeId/likes')
  create(
    @Param('recipeId') recipeId: string,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likeService.create(recipeId, createLikeDto);
  }

  @Get(':recipeId/likes')
  findAll(@Param('recipeId') recipeId: string) {
    return this.likeService.findAll(recipeId);
  }

  @Get('likes')
  getFamousRecipes() {
    return this.likeService.findFamousRecipe();
  }

  @Get(':recipeId/likes/likeduser')
  findAlluserlike(@Param('recipeId') recipeId: string) {
    return this.likeService.findAlluserlike(recipeId);
  }

  @Delete(':recipeId/likes/:likeId')
  remove(@Param('recipeId') recipeId: string, @Param('likeId') likeId: string) {
    return this.likeService.remove(recipeId, likeId);
  }
}
