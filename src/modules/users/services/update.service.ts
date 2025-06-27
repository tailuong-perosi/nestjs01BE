
import { UpdateUserDto } from '../dto/update-user.dto';
import { ICreateUserResponse } from '../interfaces/user.interface';
import { BaseUserService } from './base.service';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
export class UpdateUserService extends BaseUserService {
  async update(id: string, data: UpdateUserDto): Promise<ICreateUserResponse> {
    await this.userModel.updateOne({ _id: id }, { ...data });
    return {
      message: 'Cập nhật User thành công ',
      id: id,
    };
  }

  async updateCodeIDReSend(email: string): Promise<ICreateUserResponse> {
    const codeID = uuidv4();
    const expired = dayjs().add(5, 'minutes');
    await this.userModel.updateOne(
      { email: email },
      { codeID: codeID, codeExpired: expired },
    );
    this.sendMail.testSendMail(email, email, codeID);
    return {
      message: `Đã gửi mã xác nhận đến ${email}`,
      id: '123',
    };
  }
}
