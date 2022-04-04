import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { MovieSchedule } from 'src/movie-schedules/entities/movie-schedule.entity';
import { Order } from 'src/orders/entities/order.entity';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'order_id' })
  order: Order;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'movie_schedule_id' })
  movieSchedule: MovieSchedule;

  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'sub_total_price' })
  subTotalPrice: number;

  @IsNotEmpty()
  @Expose({ name: 'snap_shot' })
  snapShot: JSON;
}
