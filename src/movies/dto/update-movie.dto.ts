import { Expose } from 'class-transformer';
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
  @Expose({ name: 'play_until' })
  playUntil: Date;
}
