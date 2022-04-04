import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';
import { Studio } from 'src/studios/entities/studio.entity';

export class CreateMovieScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'movie_id' })
  movie: Movie;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'studio_id' })
  studio: Studio;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'start_time' })
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'end_time' })
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
