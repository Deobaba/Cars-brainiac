import cors from 'cors';
import {ENVIRONMENT} from '../config/env';


const allowedOrigins = ENVIRONMENT.ALLOWED_ORIGINS;

console.log(ENVIRONMENT)

if (!allowedOrigins || !Array.isArray(allowedOrigins) || allowedOrigins.length === 0) {
  throw new Error('Invalid CORS configuration: ALLOWED_ORIGINS must be a non-empty array.');
}

// Use CORS middleware with dynamic origin handling and detailed logging
export const useCors = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      // Origin is in the allowed list
      return callback(null, true);
    } else {
      // Origin is not allowed
      return callback(
        new Error(`CORS policy does not allow access from the origin: ${origin}`),
        false,
      );
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204,
});
