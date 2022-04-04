import { Expose } from 'class-transformer';
import { Movie } from 'src/movies/entities/movie.entity';
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
export class MovieTag {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  //   @ManyToOne(() => Movie, (movie) => movie.movies, {
  //     onDelete: 'CASCADE',
  //   })
  //   movie: Movie;

  //   @OneToMany(() => Movie, (movie) => movie.movieTag, {
  //     onDelete: 'CASCADE',
  //   })
  //   @JoinColumn({ referencedColumnName: 'movie_id' })
  //   movies: Movie[];

  @Column()
  tag: string;

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
