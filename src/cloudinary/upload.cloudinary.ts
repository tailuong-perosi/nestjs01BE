import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";


@Injectable()
export class UploadFiles {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
    ){}

  async upload(files) {
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        if (file.mimetype.startsWith('image/')) {
          const result = await this.cloudinaryService.uploadImage(file);
          return { url: result.secure_url, type: 1 };
        } else if (file.mimetype.startsWith('video/')) {
          const result = await this.cloudinaryService.uploadVideo(file);
          return { url: result.secure_url, type: 2 };
        } else {
          throw new Error('Unsupported file type');
        }
      }),
    );


    return uploadResults;
  }
}
