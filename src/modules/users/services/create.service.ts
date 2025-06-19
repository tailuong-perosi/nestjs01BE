import { HashPassWord } from 'src/helpers/ultil';
import { CreateUserDto } from '../dto/create-user.dto';
import { ICreateUserResponse, IUserResponse } from '../interfaces/user.interface';
import { BaseUserService } from './base.service';
import { BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';

export class CreateUserService extends BaseUserService {
  isEmailExist = async(email: string)=>{
    const emailExist = await this.userModel.exists({email})
    if(emailExist) return true;
    return false;
  }
  async create(
    data: CreateUserDto,
    files: Express.Multer.File[],
  ): Promise<ICreateUserResponse> {
    const {username, email, phone, password} = data;

    // check email
    const isExist = await this.isEmailExist(email)
    if(isExist) {
      throw new BadRequestException(`Email: ${email} đã tồn rại`);
    }
    const hashPassword = await HashPassWord(password)
    const verificationToken = randomBytes(32).toString('hex');
    const result = await this.userModel.create({...data, password: hashPassword, urls: files, verificationToken: verificationToken});
    await this.sendMail.sendVerificationEmail('luong.duc.tai1999@gmail.com', verificationToken);
    return {
      message: "Đăng ký User thành công ",
      id: result.id,
    };
  }
}
