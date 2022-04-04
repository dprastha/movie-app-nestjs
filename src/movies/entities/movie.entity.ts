import { Expose } from 'class-transformer';
import { MovieTag } from 'src/movie_tags/entities/movie_tag.entity';
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
export class Movie {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  overview: string;

  @Column()
  poster: string;

  @Column({
    type: 'date',
  })
  @Expose({ name: 'play_until' })
  playUntil: Date;

  @OneToMany(() => MovieTag, (movieTag) => movieTag.movie, {
    onDelete: 'CASCADE',
  })
  @Expose({ name: 'movie_tags' })
  movieTags: MovieTag[];

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
