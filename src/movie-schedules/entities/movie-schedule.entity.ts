import { Expose } from 'class-transformer';
import { Movie } from 'src/movies/entities/movie.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Studio } from 'src/studios/entities/studio.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieSchedule {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.movieSchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Studio, (studio) => studio.movieSchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studio_id' })
  studio: Studio;

  @Column()
  @Expose({ name: 'start_time' })
  startTime: string;

  @Column()
  @Expose({ name: 'end_time' })
  endTime: string;

  @Column()
  price: number;

  @Column({ type: 'date' })
  date: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.movieSchedule, {
    onDelete: 'CASCADE',
  })
  orderItems: OrderItem[];

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
