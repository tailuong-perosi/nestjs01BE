import { HashPassWord } from 'src/helpers/ultil';
import { CreateUserDto } from '../dto/create-user.dto';
import { ICreateUserResponse } from '../interfaces/user.interface';
import { BaseUserService } from './base.service';
import { BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
export class CreateUserService extends BaseUserService {
  isEmailExist = async (email: string) => {
    const emailExist = await this.userModel.exists({ email });
    if (emailExist) return true;
    return false;
  };
  async create(
    data: CreateUserDto,
    files: Express.Multer.File[],
  ): Promise<ICreateUserResponse> {
    const { username, email, phone, password } = data;

    // check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email: ${email} đã tồn rại`);
    }
    const hashPassword = await HashPassWord(password);
    const result = await this.userModel.create({
      ...data,
      password: hashPassword,
      urls: files,
      isVerified: true,
    });
    return {
      message: 'Đăng ký User thành công ',
      id: result.id,
    };
  }

  async handleRegister(data: RegisterDto) {
    const { username, email, phone, password } = data;

    // check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email: ${email} đã tồn rại`);
    }
    const hashPassword = await HashPassWord(password);
    const codeID = uuidv4();
    const expired = dayjs().add(5, 'minutes');
    const result = await this.userModel.create({
      ...data,
      password: hashPassword,
      codeID: codeID,
      codeExpired: expired,
    });

    // send mail 
    this.sendMail.testSendMail(
      email,
      username ?? email,
      codeID,
    );
    return {
      message: 'Đăng ký User thành công',
      id: result.id,
    };
  }
}
