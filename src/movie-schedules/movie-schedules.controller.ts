import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { MovieSchedulesService } from './movie-schedules.service';
import { CreateMovieScheduleDto } from './dto/create-movie-schedule.dto';
import { UpdateMovieScheduleDto } from './dto/update-movie-schedule.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { ApiResponse, IApiResponse } from 'src/common/response/api-response';
import { MovieSchedule } from './entities/movie-schedule.entity';
import { CustomPaginationMeta } from 'src/common/response/custom-pagination-meta';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

@Controller('movie-schedules')
@UseGuards(AuthGuard(), RolesGuard)
export class MovieSchedulesController {
  constructor(private readonly movieSchedulesService: MovieSchedulesService) {}

  @Get()
  @Roles(RoleEnum.Admin)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<IApiResponse<MovieSchedule>> {
    const movieSchedules = await this.movieSchedulesService.findAll({
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
      movieSchedules,
      'Success get all movieSchedules',
    );
  }

  @Post()
  @Roles(RoleEnum.Admin)
  async create(
    @Body() createMovieScheduleDto: CreateMovieScheduleDto,
  ): Promise<IApiResponse<MovieSchedule>> {
    const createdMovieSchedule = await this.movieSchedulesService.create(
      createMovieScheduleDto,
    );

    return await ApiResponse.success(
      createdMovieSchedule,
      'Success create movieSchedule',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<MovieSchedule>> {
    const movieSchedule = await this.movieSchedulesService.findOne(id);

    return await ApiResponse.success(
      movieSchedule,
      'Success get movieSchedule',
    );
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieScheduleDto: UpdateMovieScheduleDto,
  ): Promise<IApiResponse<MovieSchedule>> {
    const updatedMovieSchedule = await this.movieSchedulesService.update(
      id,
      updateMovieScheduleDto,
    );

    return await ApiResponse.success(
      updatedMovieSchedule,
      'Success update movieSchedule',
    );
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<null>> {
    await this.movieSchedulesService.remove(id);

    return await ApiResponse.success(null, 'Success remove movieSchedule');
  }
}
