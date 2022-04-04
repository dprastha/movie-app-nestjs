import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { MovieTagsService } from './movie_tags.service';
import { CreateMovieTagDto } from './dto/create-movie_tag.dto';
import { UpdateMovieTagDto } from './dto/update-movie_tag.dto';

@Controller('v1/movie-tags')
export class MovieTagsController {
  constructor(private readonly movieTagsService: MovieTagsService) {}

  @Get()
  findAll() {
    return this.movieTagsService.findAll();
  }

  @Post()
  create(@Body() createMovieTagDto: CreateMovieTagDto) {
    return this.movieTagsService.create(createMovieTagDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieTagsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieTagDto: UpdateMovieTagDto,
  ) {
    return this.movieTagsService.update(id, updateMovieTagDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieTagsService.remove(id);
  }
}
