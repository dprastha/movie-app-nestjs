import { Expose } from 'class-transformer';
import { MovieSchedule } from 'src/movie-schedules/entities/movie-schedule.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => MovieSchedule, (MovieSchedule) => MovieSchedule.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_schedule_id' })
  movieSchedule: MovieSchedule;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  @Expose({ name: 'sub_total_price' })
  subTotalPrice: number;

  @Column({ type: 'json' })
  @Expose({ name: 'snap_shot' })
  snapShot: JSON;

  @Expose({ name: 'created_at' })
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Expose({ name: 'deleted_at' })
  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  onDelete: Date;
}
