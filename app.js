import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
import usersRouter from './routes/api/auth.js'

dotenv.config();


const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;