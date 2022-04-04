import { Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';
import { Studio } from 'src/studios/entities/studio.entity';

export class UpdateMovieScheduleDto {
  @IsOptional()
  @IsNumber()
  @Expose({ name: 'movie_id' })
  movie: Movie;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'studio_id' })
  studio: Studio;

  @IsOptional()
  @IsString()
  @Expose({ name: 'start_time' })
  startTime: string;

  @IsOptional()
  @IsString()
  @Expose({ name: 'end_time' })
  endTime: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsDateString()
  date: Date;
}
