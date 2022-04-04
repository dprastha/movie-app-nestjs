import { IsNumber, IsOptional } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export class CreateMovieTagDto {
  @IsOptional()
  @IsNumber()
  movie: Movie;

  @IsOptional()
  @IsNumber()
  tag: Tag;
}
