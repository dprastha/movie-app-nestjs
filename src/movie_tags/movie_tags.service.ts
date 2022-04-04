import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieTagDto } from './dto/create-movie_tag.dto';
import { UpdateMovieTagDto } from './dto/update-movie_tag.dto';
import { MovieTag } from './entities/movie_tag.entity';
import { MovieTagsRepository } from './movie_tags.repository';

@Injectable()
export class MovieTagsService {
  constructor(
    @InjectRepository(MovieTagsRepository)
    private movieTagsRepository: MovieTagsRepository,
  ) {}

  findAll(): Promise<MovieTag[]> {
    return this.movieTagsRepository.getMovieTags();
  }

  create(createMovieTagDto: CreateMovieTagDto) {
    return this.movieTagsRepository.createMovieTag(createMovieTagDto);
  }

  async findOne(id: number): Promise<MovieTag> {
    const found = this.movieTagsRepository.findOne(id, {
      relations: ['movie', 'tag'],
    });

    if (!found) {
      throw new NotFoundException(`MovieTag with ID "${id}" not found`);
    }

    return found;
  }

  async update(
    id: number,
    updateMovieTagDto: UpdateMovieTagDto,
  ): Promise<MovieTag> {
    const { tag } = updateMovieTagDto;
    const movieTag = await this.findOne(id);

    if (!movieTag) {
      throw new NotFoundException(`MovieTag with ID "${id}" not found`);
    }

    movieTag.tag = tag;

    await this.movieTagsRepository.save(movieTag);
    return movieTag;
  }

  async remove(id: number): Promise<void> {
    const result = await this.movieTagsRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`MovieTag with ID "${id}" not found`);
    }
  }
}
