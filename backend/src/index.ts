import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

//to test which of the .env we are using
// mongoose
//   .connect(process.env.MONGODB_CONNECTION_STRING as string)
//   .then(() =>
//     console.log("Connected to database!", process.env.MONGODB_CONNECTION_STRING)
//   );

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("Server running on port: 7000");
});
