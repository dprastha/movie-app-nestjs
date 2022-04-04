import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieScheduleDto } from './dto/create-movie-schedule.dto';
import { MovieSchedule } from './entities/movie-schedule.entity';

@EntityRepository(MovieSchedule)
export class MovieSchedulesRepository extends Repository<MovieSchedule> {
  async getMovieSchedules(): Promise<MovieSchedule[]> {
    // const query = this.createQueryBuilder('movie').leftJoinAndSelect(
    //   'movie.movie',
    //   'movie',
    // );

    // const movies = await query.getMany();
    // return movies;

    return this.find();
  }

  async createMovieSchedules(
    createMovieSchedulesDto: CreateMovieScheduleDto,
  ): Promise<MovieSchedule> {
    const { startTime, endTime, date, price } = createMovieSchedulesDto;
    const movieSchedule = this.create({
      startTime,
      endTime,
      date,
      price,
    });

    await this.save(movieSchedule);
    return movieSchedule;
  }
}
