import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'di8datu3y',
      api_key: '697815246317884',
      api_secret: 'A3X2sGTBQuMvMKywSUgZ6z1fIAA',
    }); 
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'uploads/images',
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload image failed'));
        resolve(result);
      },
    );
    Readable.from(file.buffer).pipe(stream);
  });
}

async uploadVideo(file: Express.Multer.File): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'uploads/videos',
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload video failed'));
        resolve(result);
      },
    );
    Readable.from(file.buffer).pipe(stream);
  });
}
}

