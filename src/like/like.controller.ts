import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller(':recipeId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(
    @Param('recipeId') recipeId: string,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likeService.create(recipeId, createLikeDto);
  }

  @Get()
  findAll(@Param('recipeId') recipeId: string) {
    return this.likeService.findAll(recipeId);
  }

  @Delete(':likeId')
  remove(@Param('recipeId') recipeId: string, @Param('likeId') likeId: string) {
    return this.likeService.remove(recipeId, likeId);
  }
}
