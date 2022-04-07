import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { ApiResponse, IApiResponse } from 'src/common/response/api-response';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RoleEnum.Admin)
  async findAll(): Promise<IApiResponse<User[]>> {
    const users = await this.usersService.findAll();

    return await ApiResponse.success(users, 'Success get all users');
  }

  @Post()
  @Roles(RoleEnum.Admin)
  @UseInterceptors(FileInterceptor('avatar', { dest: './uploads/avatars' }))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IApiResponse<User>> {
    const createdUser = await this.usersService.create(createUserDto);

    return await ApiResponse.success(createdUser, 'Success create user');
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<User>> {
    const user = await this.usersService.findOne(id);

    return await ApiResponse.success(user, 'Success get user');
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  @UseInterceptors(FileInterceptor('avatar', { dest: './uploads/avatars' }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IApiResponse<User>> {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    return await ApiResponse.success(updatedUser, 'Success update user');
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<null>> {
    await this.usersService.remove(id);

    return await ApiResponse.success(null, 'Success remove user');
  }
}
