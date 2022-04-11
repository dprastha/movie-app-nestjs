import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly userRepository: UsersRepository,
  ) {}

  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    const users = await this.userRepository.getusers();

    return paginate<User>(users, options);
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  async findOne(id: number): Promise<User> {
    const found = this.userRepository.findOne(id, {
      relations: ['orders'],
    });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email, password, avatar, role } = updateUserDto;
    const user = await this.findOne(id);

    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;
    user.role = role;

    return user;
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
