import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "../schemas/user.schema";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { MailService } from "src/common/mail/mail.service";

@Injectable()
export class BaseUserService {
  constructor(
    @InjectModel(Users.name)
    protected readonly userModel: Model<Users>,
    protected readonly cloudinaryService: CloudinaryService,
    protected readonly mailService: MailService
  ) {}

}