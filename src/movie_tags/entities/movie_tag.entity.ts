import { Expose } from 'class-transformer';
import { Movie } from 'src/movies/entities/movie.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieTag {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.movieTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Tag, (tag) => tag.movieTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

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
