import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './passports/local-auth.guard';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  @Public()
  signUP(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Get('verify-email')
  async verifyEmail(@Query('code') code: string) {
    return this.authService.verifyEmail(code);
  }

  // Dùng passport để đăng nhập thư viện xử lý logic
  @Post('login-handle')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("handle login") // transform response
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  // lấy profile bằng thư viện guard
  //  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
