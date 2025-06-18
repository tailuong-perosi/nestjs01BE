// upload.controller.ts hoặc routes
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET',
});

export const uploadToCloudinary = async (filePath: string) => {
  return cloudinary.uploader.upload(filePath, {
    folder: 'test upload', // optional
  });
};
