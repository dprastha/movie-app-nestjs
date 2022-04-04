import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieTagDto } from './dto/create-movie_tag.dto';
import { MovieTag } from './entities/movie_tag.entity';

@EntityRepository(MovieTag)
export class MovieTagsRepository extends Repository<MovieTag> {
  async getMovieTags(): Promise<MovieTag[]> {
    return await this.find();
  }

  async createMovieTag(
    createMovieTagDto: CreateMovieTagDto,
  ): Promise<MovieTag> {
    const { tag } = createMovieTagDto;

    const movieTag = this.create({
      tag,
    });

    await this.save(movieTag);
    return movieTag;
  }
}
