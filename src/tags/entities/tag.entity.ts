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
export class Tag {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MovieTag, (movieTag) => movieTag.tag, {
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
