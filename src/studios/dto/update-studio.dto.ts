import { IsNumber, IsOptional } from 'class-validator';

export class UpdateStudioDto {
  @IsOptional()
  @IsNumber()
  studio_number: number;

  @IsOptional()
  @IsNumber()
  seat_capacity: number;
}
