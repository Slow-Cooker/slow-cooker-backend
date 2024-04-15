import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ){}

  async create(recipeId: string, createLikeDto: CreateLikeDto) {
    const existingLike = await this.likeRepository.findOne({
      where: {
        recipe: {
          id_recipe: recipeId,
        },
        owner: {
          id: createLikeDto.owner.id
        },
      }
    })
    if(existingLike){
      throw new ConflictException("This recipe is already liked")
    }
    const newLike = this.likeRepository.create(createLikeDto);
    const saveLike = this.likeRepository.save(newLike);
    return saveLike;
  }

  async findAll(recipeId: string) {
    const allLike = await this.likeRepository.count({where: {recipe: {id_recipe: recipeId}}});
    return allLike;
  }

  async remove(recipeId: string, id: string) {
    const like = await this.likeRepository.findOneBy({ id });
    if(!like){
      throw new NotFoundException("This like dosen\'t exist")
    }
    this.likeRepository.delete(like.id)
    return `This action removes a #${id} like`;
  }
}
