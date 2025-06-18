import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

export class UrlItem {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  type: number;
}

@Schema({ timestamps: true, versionKey: false })
export class Users {
  @Prop({type: String, required: true})
  username: string;

  @Prop({type: String})
  password: string;

  @Prop({type: String})
  phone: string;

  @Prop({type: String})
  email: string;

  @Prop({type: String, default: 'user'})
  role: string;

  @Prop({type: Boolean, default: false})
  isActive: boolean;

  createdAt?: Date;   // tự động có
  updatedAt?: Date;
  
  @Prop({ type: [UrlItem], default: [] })
  urls: UrlItem[];

}
export const UserSchema = SchemaFactory.createForClass(Users);
