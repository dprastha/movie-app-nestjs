import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  overview: string;

  @IsNotEmpty()
  @IsString()
  poster: string;

  @Expose({ name: 'play_until' })
  @IsNotEmpty()
  @IsDateString()
  playUntil: Date;
}
