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
import authRouter from './routes/user/auth_route';
// import router from './routes/userDetailRoute.js'; // Original code, JS file import commented out
import userRouter from './routes/user/user_route';
import purchaseRoutes from './routes/purchase/purchase_router';
import lineItemRoutes from './routes/purchase/line_items_router';
//import { handleFileUpload } from "./utils/upload_handler";
import { getPresignedUrlForUpload } from './controllers/purchase_controller';

const app: Application = express();

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

// Authentication route
//app.use("/authentication", authRouter);

// Middleware for authenticating subsequent routes
//app.use(authenticate); // Applies to all subsequent routes

// Registered user related actions
app.use('/user', userRouter);

// File upload route
//app.post('/upload', upload.single('file'), handleFileUpload); // Ensure multer processes the file upload
app.get('/upload-file', getPresignedUrlForUpload);
// Purchase related actions
app.use('/purchase', purchaseRoutes);

// Line item related actions
app.use('/item', lineItemRoutes);

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
