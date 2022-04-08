import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, IApiResponse } from 'src/common/response/api-response';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-dto';
import { SignUpDto } from './dto/sign-up-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<IApiResponse<null>> {
    await this.authService.signUp(signUpDto);

    return await ApiResponse.success(null, 'User created successfully');
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
