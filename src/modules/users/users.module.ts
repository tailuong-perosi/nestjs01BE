import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { Users, UserSchema } from './schemas/user.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CreateUserService } from './services/create.service';
import { ListUserService } from './services/list.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]), CloudinaryModule
  ],
  controllers: [UsersController],
  providers: [CreateUserService, ListUserService],
  exports: [], // Nếu cần dùng ở module khác
})
export class UsersModule {}
