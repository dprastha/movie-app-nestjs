import { Module } from '@nestjs/common';
import { MovieTagsService } from './movie_tags.service';
import { MovieTagsController } from './movie_tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieTagsRepository } from './movie_tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieTagsRepository])],
  controllers: [MovieTagsController],
  providers: [MovieTagsService],
})
export class MovieTagsModule {}
