import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import mongoose from "mongoose";
import config from "./config/config";
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

app.get("/health-check", (req: Request, res: Response) => {
  res.json("Hello world");
});

// Routes
app.use("/user", userRouter);

// Error handling middleware, Keep routes above this
app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});
// userRouter for handling user-related routes
// app.use('/api', router);
// Starting the server
/*`${config.serverConfig.port}`*/
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
