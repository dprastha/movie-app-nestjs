import { Expose } from 'class-transformer';
import { MovieSchedule } from 'src/movie-schedules/entities/movie-schedule.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Studio {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Expose({ name: 'studio_number' })
  @Column()
  studioNumber: number;

  @Expose({ name: 'seat_capacity' })
  @Column()
  seatCapacity: number;

  @OneToMany(() => MovieSchedule, (movieSchedule) => movieSchedule.studio, {
    onDelete: 'CASCADE',
  })
  @Expose({ name: 'movie_schedules' })
  movieSchedules: MovieSchedule[];

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
