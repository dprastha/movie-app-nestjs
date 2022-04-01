import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateStudioDto {
  @Expose({ name: 'studio_number' })
  @IsOptional()
  @IsNumber()
  studioNumber: number;

  @Expose({ name: 'seat_capacity' })
  @IsOptional()
  @IsNumber()
  seatCapacity: number;
}
