import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
  Request,
  Put,
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
  @ResponseMessage('handle register') // transform response
  signUP(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Put('verify-email')
  @Public()
  async verifyEmail(@Body() body: any) {
    return this.authService.verifyEmail(body);
  }

  // Dùng passport để đăng nhập thư viện xử lý logic
  @Post('login-handle')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('handle login') // transform response
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  // lấy profile bằng thư viện guard
  //  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  //re send email
  @Put('send-mail')
  @Public()
  async reSendMail(@Body() body: any) {
    return this.authService.reSendEmail(body);
  }
}
