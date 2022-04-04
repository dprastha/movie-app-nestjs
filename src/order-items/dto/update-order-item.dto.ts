import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { MovieSchedule } from 'src/movie-schedules/entities/movie-schedule.entity';
import { Order } from 'src/orders/entities/order.entity';

export class UpdateOrderItemDto {
  @IsOptional()
  @IsNumber()
  order: Order;

  @IsOptional()
  @IsNumber()
  movieSchedule: MovieSchedule;

  @IsOptional()
  @IsNumber()
  qty: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'sub_total_price' })
  subTotalPrice: number;

  @IsOptional()
  @Expose({ name: 'snap_shot' })
  snapShot: JSON;
}
