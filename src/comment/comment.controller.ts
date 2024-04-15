import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller(':recipeId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Param('recipeId') recipeId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(recipeId, createCommentDto);
  }

  @Get()
  findAll(@Param('recipeId') recipeId: string) {
    return this.commentService.findAll(recipeId);
  }

  @Get(':id')
  findOne(@Param('recipeId') recipeId: string, @Param('id') id: string) {
    return this.commentService.findOne(recipeId, id);
  }

  @Delete(':id')
  remove(@Param('recipeId') recipeId: string, @Param('id') id: string) {
    return this.commentService.remove(recipeId, id);
  }
}
