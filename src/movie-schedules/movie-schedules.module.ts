import { Module } from '@nestjs/common';
import { MovieSchedulesService } from './movie-schedules.service';
import { MovieSchedulesController } from './movie-schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieSchedulesRepository } from './movie-schedules.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieSchedulesRepository]), AuthModule],
  controllers: [MovieSchedulesController],
  providers: [MovieSchedulesService],
})
export class MovieSchedulesModule {}
