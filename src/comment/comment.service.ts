import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(recipeId: string, createCommentDto: CreateCommentDto) {
    const newComment = this.commentRepository.create(createCommentDto);
    const saveComment = await this.commentRepository.save(newComment);
    return saveComment;
  }

  async findAll(recipeId: string) {
    const allComment = await this.commentRepository.find({
      where: { recipe: { id_recipe: recipeId } },
      relations: ['user'],
    });
    return allComment;
  }

  async findOne(recipeId: string, id: string) {
    const comment = await this.commentRepository.findOne({
      where: {
        id_comment: id,
      },
    });
    return comment;
  }

  async remove(recipeId: string, id: string) {
    const comment = await this.commentRepository.findOneBy({ id_comment: id });
    if (!comment) {
      throw new NotFoundException("This comment doesn't exist");
    }
    this.commentRepository.delete(comment.id_comment);
    return `This action removes a #${id} comment`;
  }
}
