
import express from "express"
import {Response,Request} from "express"
import { useCors } from "./middlewares/cors";
import { limiter } from "./middlewares/rateLimiter";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import errorHandler from "./middlewares/errorHandler";
import lusca from "lusca";
import { ENVIRONMENT } from "./config/env";




const app = express();

// Security and compression middlewares
app.set('port', ENVIRONMENT.APP.PORT || 3001);
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lusca for enhanced security
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));



// Custom middleware for CORS and IP whitelisting
app.use(limiter);
app.use(useCors);


// API Routes

app.get('/', (req: Request, res: Response) => {
  res.send('Server is healthy and running');
});

// Global error handling middleware
app.use(errorHandler);

export default app;
