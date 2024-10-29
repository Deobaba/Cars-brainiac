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
      ALLOWED_ORIGINS:  any;
      JWT_SECRET:string;
      TOKEN_EXPIRES:string;
      SWAGGERLINK:string
}


interface RangeFilter {
  min?: number;
  max?: number;
}

//  CarFilter interface
export interface CarFilter {
  make?: string;
  carModel?: string;
  year?: RangeFilter;        // Allows filtering by range
  mileage?: RangeFilter;     // Allows filtering by range
  price?: RangeFilter;       // Allows filtering by range
  availability?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'price' | 'mileage' | 'year';  
  order?: 'asc' | 'desc';      
}