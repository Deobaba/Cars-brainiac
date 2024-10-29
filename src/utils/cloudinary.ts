import { ENVIRONMENT } from "../config/env";
import { v2 as cloudinary } from 'cloudinary';
import ErrorResponse from "../utils/errorResponse";
import sharp from "sharp"

cloudinary.config({
  cloud_name: ENVIRONMENT.CLOUDINARY.CLOUD_NAME,
  api_key: ENVIRONMENT.CLOUDINARY.API_KEY,
  api_secret: ENVIRONMENT.CLOUDINARY.API_SECRET
});

export interface CustomFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  size: number;
  buffer: Buffer;
  mimetype: string;
}
export function validateImage(file: Express.Multer.File) {
  const allowedImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
  if (!allowedImageMimeTypes.includes(file.mimetype)) {
    throw new ErrorResponse('Invalid Image type', 400);
  }
}
export function removeUrlUnfriendlyCharacters(str: string): string {
  const unfriendlyCharacters = /[^a-zA-Z0-9-_.]/g;
  return str.replace(unfriendlyCharacters, '');
}

export function uploadSingleFileToCloudinary(file: Express.Multer.File, area: string, imageName: string): Promise<any> {
  const sanitizedImageName = removeUrlUnfriendlyCharacters(imageName);
  const newFilename = `carbrainiac_${removeUrlUnfriendlyCharacters(imageName)}_${area}_${Date.now()}`;
  
  return new Promise((resolve, reject) => {
    validateImage(file);

    // Use sharp to process the image
    sharp(file.buffer)
      .rotate() // Automatically rotates the image based on its EXIF orientation data
      .resize(800, null, {
        fit: 'inside', // Maintain aspect ratio, fit within the 800px width
        withoutEnlargement: true // Prevent image from being enlarged if it's smaller than 800px
      }) // Resize the image to 800px width
      .jpeg({ quality: 85 })
      .toBuffer()
      .then((compressedBuffer) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: newFilename,
            resource_type: 'image',
            folder: `${area}/${sanitizedImageName}`,
          },
          (error, result) => {
            if (error) {
              console.log('Cloudinary Error:', error);
              reject(new ErrorResponse('Failed to upload image', 500));
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.on('error', (err) => {
          console.log('Stream Error:', err);
          reject(new ErrorResponse('Upload stream error', 500));
        });

        uploadStream.end(compressedBuffer);
      })
      .catch((error) => {
        console.log('Sharp Error:', error);
        reject(new ErrorResponse('Error in processing image', 500));
      });
  });
}

export async function uploadFiles(area: string, files: Express.Multer.File[], imageName: string = '') {
  try {
    const promises = files.map((file) => uploadSingleFileToCloudinary(file, area, imageName));

    return await Promise.all(promises);
  } catch (error) {
    throw new ErrorResponse('Error in uploading files', 500);
  }
}