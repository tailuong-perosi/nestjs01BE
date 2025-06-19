import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { Users, UserSchema } from './schemas/user.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CreateUserService } from './services/create.service';
import { ListUserService } from './services/list.service';
import { UpdateUserService } from './services/update.service';
import { DeleteUserService } from './services/delete.service';
import { DetailUserService } from './services/detail.service';
import { SendMail } from 'src/helpers/sendMail';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]), CloudinaryModule
  ],
  controllers: [UsersController],
  providers: [CreateUserService, ListUserService, UpdateUserService, DeleteUserService, DetailUserService, SendMail],
  exports: [DetailUserService, CreateUserService,UpdateUserService], // Nếu cần dùng ở module khác
})
export class UsersModule {}
