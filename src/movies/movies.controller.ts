import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { IApiResponse, ApiResponse } from 'src/common/response/api-response';
import { Movie } from './entities/movie.entity';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { CustomPaginationMeta } from 'src/common/response/custom-pagination-meta';

@Controller('movies')
@UseGuards(AuthGuard(), RolesGuard)
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('showing-movie')
  async findShowingMovie(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<IApiResponse<Movie>> {
    const showingMovies = await this.moviesService.showingMovies({
      page,
      limit,
      metaTransformer: (meta: IPaginationMeta): CustomPaginationMeta =>
        new CustomPaginationMeta(
          meta.itemCount,
          meta.totalItems,
          meta.itemsPerPage,
          meta.totalPages,
          meta.currentPage,
        ),
    });

    return await ApiResponse.success(
      showingMovies,
      'Success get showing movies',
    );
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<IApiResponse<Movie>> {
    const movies = await this.moviesService.findAll({
      page,
      limit,
      metaTransformer: (meta: IPaginationMeta): CustomPaginationMeta =>
        new CustomPaginationMeta(
          meta.itemCount,
          meta.totalItems,
          meta.itemsPerPage,
          meta.totalPages,
          meta.currentPage,
        ),
    });

    return await ApiResponse.success(movies, 'Success get all movies');
  }

  @Post()
  @UseInterceptors(FileInterceptor('poster', { dest: './uploads/posters' }))
  @Roles(RoleEnum.Admin)
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IApiResponse<Movie>> {
    const createdMovie = await this.moviesService.create(createMovieDto);

    return await ApiResponse.success(createdMovie, 'Success create movie');
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<Movie>> {
    const movie = await this.moviesService.findOne(id);

    return await ApiResponse.success(movie, 'Success get movie');
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('poster', { dest: './uploads/posters' }))
  @Roles(RoleEnum.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IApiResponse<Movie>> {
    const updatedMovie = await this.moviesService.update(id, updateMovieDto);

    return await ApiResponse.success(updatedMovie, 'Success update movie');
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<null>> {
    await this.moviesService.remove(id);

    return await ApiResponse.success(null, 'Success remove movie');
  }
}
