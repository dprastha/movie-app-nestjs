import { Module } from '@nestjs/common';
import { MovieTagsService } from './movie_tags.service';
import { MovieTagsController } from './movie_tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieTagsRepository } from './movie_tags.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieTagsRepository]), AuthModule],
  controllers: [MovieTagsController],
  providers: [MovieTagsService],
})
export class MovieTagsModule {}
