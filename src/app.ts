import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
  NextFunction,
} from 'express';
import mongoose from 'mongoose';
//import multer from 'multer';
import cors from 'cors';
import config from './config/config';
import { authenticateUser } from './middlewares/user_auth_middleware';
import userAuthRouter from './routes/platform/authentication/user_auth_route';
// import router from './routes/userDetailRoute.js'; // Original code, JS file import commented out
import userRouter from './routes/user_app/user_route';

//import { handleFileUpload } from "./utils/upload_handler";
import { getPresignedUrlForUpload } from './controllers/purchase_controller';
import { handleUploadConfirmation } from './utils/upload_handler';
import platformRouter from './routes/platform/platform_route';
import { getClient } from './integrations/temporal_client';

const app: Application = express();

getClient()
  .then(() => {
    console.log('temporal connected successfully');
  })
  .catch((err: unknown) => {
    console.log(err);
  });
// Connect to MongoDB
mongoose
  .connect(config.mongodb.dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Error connecting to MongoDB:', err));

// Enable CORS for all routes
app.use(cors());

// Parsing JSON and URL-encoded data in the request body
app.use(json({ limit: '5mb' }));
app.use(urlencoded({ limit: '5mb', extended: true }));

// Open Routes
app.get('/health-check', (req: Request, res: Response) => {
  res.json({ message: 'Hello world' }); // Changed to send JSON object for consistency
});

// Contains Authentication route
app.use('/platform', platformRouter);

// Registered user related actions
app.use('/user_app', userRouter);

// Error handling middleware, placed after all routes
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err); // Added to log the error details
  res.status(500).send({ error: 'Internal Server Error' }); // Send JSON response
});

// Starting the server
const port = config.serverConfig.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Template literal for dynamic port
});
