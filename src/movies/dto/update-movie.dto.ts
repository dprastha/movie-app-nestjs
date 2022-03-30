import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  overview: string;

  @IsOptional()
  @IsString()
  poster: string;

  @IsOptional()
  @IsDateString()
  play_until: Date;
}
