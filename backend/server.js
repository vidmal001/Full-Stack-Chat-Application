// Packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Database file
import connectToMongoDB from "./db/connectToMongoDB.js";
// Routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // allow you to extract fields from the request body
app.use(cookieParser()); // to parse the incoming cookies from req.cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users",userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
