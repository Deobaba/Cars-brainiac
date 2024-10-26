export interface ExtendedError extends Error {
    statusCode?: number;
    errors?: any;
}


export interface IEnvironment {
    APP: {
        NAME: string;
        PORT: number;
        ENV: string;
        CLIENT?: string;
      };
      DB: {
        URL: string;
      };
      CLOUDINARY: {
        CLOUD_NAME: string;
        API_KEY: string;
        API_SECRET: string;
      }
      ALLOWED_ORIGINS:  any
}