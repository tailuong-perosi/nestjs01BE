import { Types } from 'mongoose';
import { IUserResponse } from '../interfaces/user.interface';
import { BaseUserService } from './base.service';
import { BadGatewayException } from '@nestjs/common';

export class DetailUserService extends BaseUserService {
  async findByID(id: string): Promise<IUserResponse> {
    const result = await this.userModel.findOne({ _id: id });
    if (result) {
      return {
        username: result?.username,
        phone: result?.phone,
        email: result?.email,
        role: result?.role,
        isActive: result?.isActive,
        createdAt: result?.createdAt,
        updatedAt: result?.updatedAt,
        urls: result?.urls,
      };
    }else{
        throw new BadGatewayException(`Không tìm thấy User ${id}`)
    }
  }

  async findOne(email: string) {
    const result = await this.userModel.findOne({ email: email});
    return result
  } 

  async findByCode(code: string) {
    const result = await this.userModel.findOne({ codeID: code});
    return result
  } 
}
