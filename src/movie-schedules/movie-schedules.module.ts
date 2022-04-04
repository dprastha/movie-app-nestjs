import { Module } from '@nestjs/common';
import { MovieSchedulesService } from './movie-schedules.service';
import { MovieSchedulesController } from './movie-schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieSchedulesRepository } from './movie-schedules.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieSchedulesRepository])],
  controllers: [MovieSchedulesController],
  providers: [MovieSchedulesService],
})
export class MovieSchedulesModule {}
