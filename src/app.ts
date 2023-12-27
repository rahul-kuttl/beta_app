import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import mongoose from "mongoose";
import config from "./config/config";
import { authenticate } from "./middlewares/auth_middleware";
import authRouter from "./routes/user/auth_route";
// import router from './routes/userDetailRoute.js';
import userRouter from "./routes/user/user_route";

const app: Application = express();

// Connect to MongoDB
mongoose.connect(config.mongodb.dbURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// parsing JSON in the request body
app.use(json({ limit: "5mb" }));
app.use(urlencoded({ limit: "5mb", extended: true }));

// <-------------------------- Open Routes ------------------->

app.get("/health-check", (req: Request, res: Response) => {
  res.json("Hello world");
});

// for authentication purpose only
app.use("/authentication", authRouter);

// <-------------------------- Only for Authenticated Users ------------------->

app.use("/", authenticate);

// for handling registered user related actions
app.use("/user", userRouter);

// Error handling middleware, Keep routes above this
app.use((err: unknown, req: Request, res: Response, next: unknown) => {
  res.status(500).send("Internal Server Error");
});

// Starting the server
app.listen(config.serverConfig.port || 3000, () => {
  console.log("Server is running on port 3000");
});
