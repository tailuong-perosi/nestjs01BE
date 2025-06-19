import { UpdateUserDto } from "../dto/update-user.dto";
import { ICreateUserResponse } from "../interfaces/user.interface";
import { BaseUserService } from "./base.service";


export class UpdateUserService extends BaseUserService{
    
    async update(id: string, data: UpdateUserDto):Promise<ICreateUserResponse>{
        await this.userModel.updateOne({_id: id}, {...data})
        return {
            message: "Cập nhật User thành công ",
            id: id,
        }
    }
}