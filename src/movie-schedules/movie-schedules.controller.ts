import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { MovieSchedulesService } from './movie-schedules.service';
import { CreateMovieScheduleDto } from './dto/create-movie-schedule.dto';
import { UpdateMovieScheduleDto } from './dto/update-movie-schedule.dto';

@Controller('v1/movie-schedules')
export class MovieSchedulesController {
  constructor(private readonly movieSchedulesService: MovieSchedulesService) {}

  @Get()
  findAll() {
    return this.movieSchedulesService.findAll();
  }

  @Post()
  create(@Body() createMovieScheduleDto: CreateMovieScheduleDto) {
    return this.movieSchedulesService.create(createMovieScheduleDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieSchedulesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieScheduleDto: UpdateMovieScheduleDto,
  ) {
    return this.movieSchedulesService.update(id, updateMovieScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieSchedulesService.remove(id);
  }
}
