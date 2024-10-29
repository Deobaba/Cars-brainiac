import * as dotenv from 'dotenv';
import { IEnvironment } from '../interface';
dotenv.config();


export const ENVIRONMENT:IEnvironment = {


    APP: {
        NAME: process.env.APP_NAME!,
        PORT: parseInt(process.env.PORT || '3000'),
        ENV: process.env.APP_ENV!
      },
      DB: {
          URL: process.env.APP_ENV === 'production'? process.env.MONGO_URL_PROD!: process.env.MONGO_URL_DEV!,
      },
      CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
        API_KEY: process.env.CLOUDINARY_CLOUD_API_KEY!,
        API_SECRET: process.env.CLOUDINARY_CLOUD_API_SECRET!
      },
      ALLOWED_ORIGINS:process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [],
      JWT_SECRET:process.env.JWT_SECRET!,
      TOKEN_EXPIRES:process.env.TOKEN_EXPIRES!,
      SWAGGERLINK: process.env.APP_ENV === 'production'? process.env.SWAGGERPROD! : process.env.SWAGGERDEV!
}