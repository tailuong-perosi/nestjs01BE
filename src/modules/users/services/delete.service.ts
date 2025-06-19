import { ICreateUserResponse } from '../interfaces/user.interface';
import { BaseUserService } from './base.service';

export class DeleteUserService extends BaseUserService {
  async remove(id: string): Promise<ICreateUserResponse> {
    await this.userModel.deleteOne({ _id: id });

    return {
      message: 'Xóa User thành công',
      id: id,
    };
  }
}
