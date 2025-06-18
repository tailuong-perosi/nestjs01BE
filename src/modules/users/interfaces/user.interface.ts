import { Type } from '@nestjs/common';
import { UrlItem } from '../schemas/user.schema';

export interface ICreateUserResponse {
  message: string;
  id: string;
}

export interface IUserResponse {
  id?: string;
  username: string;
  phone: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  urls: UrlItem[];
}

export interface IListUserResponse{
    list: IUserResponse[];
    total: number;
    page: number;
    totalPage: number;
    limit: number
}
