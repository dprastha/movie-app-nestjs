import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/tags')
@UseGuards(AuthGuard())
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagsService.remove(+id);
  }
}
