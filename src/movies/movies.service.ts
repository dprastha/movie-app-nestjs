import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
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
    const found = await this.moviesRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const { title, overview, poster, play_until } = updateMovieDto;
    const movie = await this.findOne(id);

    movie.title = title;
    movie.overview = overview;
    movie.poster = poster;
    movie.play_until = play_until;

    await this.moviesRepository.save(movie);
    return movie;
  }

  async remove(id: number): Promise<void> {
    const result = await this.moviesRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
