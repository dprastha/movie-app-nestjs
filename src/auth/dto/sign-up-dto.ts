import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { RoleEnum } from 'common/enums/role.enum';
import { IsUserAlreadyExist } from '../decorators/IsUserAlreadyExist';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUserAlreadyExist({ message: 'User with this email already exist' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
