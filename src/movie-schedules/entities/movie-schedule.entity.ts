import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieSchedule {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

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
