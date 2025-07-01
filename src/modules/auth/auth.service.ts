import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DetailUserService } from '../users/services/detail.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/helpers/ultil';
import { UpdateUserService } from '../users/services/update.service';
import { RegisterDto } from './dto/register.dto';
import { CreateUserService } from '../users/services/create.service';
import * as dayjs from 'dayjs';
import { MailService } from 'src/common/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly detailUserService: DetailUserService,
    private readonly jwtService: JwtService,
    private readonly updateUserService: UpdateUserService,
    private readonly createUserService: CreateUserService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.detailUserService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }
    const isPasswordValid = await comparePasswords(pass, user.password); // 🔑 kiểm tra password

    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }
    const paramsToken = {
      userId: user.id,
      userName: user.username,
      role: user.role,
      phone: user.phone,
      email: user.email,
      isActive: user.isActive,
    };
    const payload = {
      ...paramsToken,
      permission: {},
      username: user.username,
      email: user.email,
    };
    return {
      user: paramsToken,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  register = async (data: RegisterDto) => {
    return await this.createUserService.handleRegister(data);
  };
  // Dùng passport để đăng nhập
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.detailUserService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }
    const isPasswordValid = await comparePasswords(pass, user.password);
    if (!user || !isPasswordValid) {
      return null;
    }
    return user;
  }
  // trả access token sau khi đăng nhập với passport
  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user: {
        email: user.email,
        id: user._id,
        username: user.username,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  //resend email
  async reSendEmail(body: any) {
    const { email } = body;
    const user = await this.detailUserService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }
    return await this.updateUserService.updateCodeIDReSend(email);
  }

    // xác thực code
  async verifyEmail(body: any) {
    const { email, code } = body;
    const user = await this.detailUserService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Email không tồn tại');
    }
    if (user.codeID !== code) {
      throw new BadRequestException('Code không hợp lệ!');
    }
    if (dayjs().isAfter(user.codeExpired)) {
      throw new BadRequestException('Code đã hết hiệu lực!');
    }
    const data = {
      isVerified: true,
      codeID: '',
    };
    await this.updateUserService.update(user.id, data);
    return { message: 'Xác nhận email thành công!' };
  }
}
