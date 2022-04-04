import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieTagDto } from './dto/create-movie_tag.dto';
import { MovieTag } from './entities/movie_tag.entity';

@EntityRepository(MovieTag)
export class MovieTagsRepository extends Repository<MovieTag> {
  async getMovieTags(): Promise<MovieTag[]> {
    const query = this.createQueryBuilder('movie_tag')
      .leftJoinAndSelect('movie_tag.movie', 'movie')
      .leftJoinAndSelect('movie_tag.tag', 'tag');

    const movieTags = await query.getMany();
    return movieTags;
  }

  async createMovieTag(
    createMovieTagDto: CreateMovieTagDto,
  ): Promise<MovieTag> {
    const { movie, tag } = createMovieTagDto;

    const movieTag = this.create({
      movie,
      tag,
    });

    await this.save(movieTag);
    return movieTag;
  }
}
