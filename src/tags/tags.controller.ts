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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'common/enums/role.enum';

@Controller('v1/tags')
@UseGuards(AuthGuard(), RolesGuard)
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  @Roles(RoleEnum.Admin)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(+id);
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: number) {
    return this.tagsService.remove(+id);
  }
}
