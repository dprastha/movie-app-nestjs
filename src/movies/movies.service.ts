import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MoviesService {
  private logger = new Logger('MoviesService', { timestamp: true });

  constructor(
    @InjectRepository(MoviesRepository)
    private readonly moviesRepository: MoviesRepository,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.getMovies();
  }

  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesRepository.createMovie(createMovieDto);
  }

  async findOne(id: number): Promise<Movie> {
    const found = await this.moviesRepository.findOne(id, {
      relations: ['movieTags', 'movieSchedules'],
    });

    if (!found) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const { title, overview, poster, playUntil } = updateMovieDto;
    const movie = await this.findOne(id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    movie.title = title;
    movie.overview = overview;
    movie.poster = poster;
    movie.playUntil = playUntil;

    await this.moviesRepository.save(movie);
    return movie;
  }

  async remove(id: number): Promise<void> {
    const result = await this.moviesRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  @Cron('0 0 * * *', {
    timeZone: 'Asia/Bangkok',
  })
  showingMovies(): Promise<Movie[]> {
    this.logger.verbose('Cron job for showing movies is running');
    return this.moviesRepository.getShowingMovies();
  }
}
