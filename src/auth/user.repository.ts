import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { name, email, password, avatar, role } = authCredentialsDto;

    const user = this.create({
      name,
      email,
      password,
      avatar,
      role,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        // Duplicate Email
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
