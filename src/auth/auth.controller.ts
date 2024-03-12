import { Controller, Post, Get, Body, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    // private usersService: UsersService,
  ) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Successful login',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // @Post('signup')
  // @HttpCode(200)
  // signup(@Body() signupDto: SignupDto) {
  //   return this.usersService.create(signupDto);
  // }

  @Get('login')
  @Auth()
  protected() {
    return 'ok';
  }
}
