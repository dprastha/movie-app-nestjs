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

  @IsNotEmpty()
  @IsDateString()
  play_until: Date;
}
