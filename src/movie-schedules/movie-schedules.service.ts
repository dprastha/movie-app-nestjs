import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateMovieScheduleDto } from './dto/create-movie-schedule.dto';
import { UpdateMovieScheduleDto } from './dto/update-movie-schedule.dto';
import { MovieSchedule } from './entities/movie-schedule.entity';
import { MovieSchedulesRepository } from './movie-schedules.repository';

@Injectable()
export class MovieSchedulesService {
  constructor(
    @InjectRepository(MovieSchedulesRepository)
    private movieSchedulesRepository: MovieSchedulesRepository,
  ) {}

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<MovieSchedule>> {
    const movieSchedules =
      await this.movieSchedulesRepository.getMovieSchedules();

    return paginate<MovieSchedule>(movieSchedules, options);
  }

  create(
    createMovieScheduleDto: CreateMovieScheduleDto,
  ): Promise<MovieSchedule> {
    return this.movieSchedulesRepository.createMovieSchedules(
      createMovieScheduleDto,
    );
  }

  async findOne(id: number): Promise<MovieSchedule> {
    const found = await this.movieSchedulesRepository.findOne(id, {
      relations: ['movie', 'studio', 'orderItems'],
    });

    if (!found) {
      throw new NotFoundException(`MovieSchedule with ID "${id}" not found`);
    }

    return found;
  }

  async update(
    id: number,
    updateMovieScheduleDto: UpdateMovieScheduleDto,
  ): Promise<MovieSchedule> {
    const { startTime, endTime, date, price } = updateMovieScheduleDto;
    const movieSchedule = await this.findOne(id);

    movieSchedule.startTime = startTime;
    movieSchedule.endTime = endTime;
    movieSchedule.date = date;
    movieSchedule.price = price;

    return movieSchedule;
  }

  async remove(id: number): Promise<void> {
    const result = await this.movieSchedulesRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
