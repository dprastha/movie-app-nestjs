import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MoviesRepository]), AuthModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
