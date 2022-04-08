import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up-dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto): Promise<User> {
    const { name, email, password, avatar, role } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      name,
      email,
      password: hashedPassword,
      avatar,
      role,
    });

    try {
      await this.save(user);
      return user;
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
