import express from "express";
import { sendMessage,getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// get messages between the current user and the user id pass in the param
router.get("/:id", protectRoute, getMessages);
// takes the user id and the sends the message
router.post("/send/:id", protectRoute, sendMessage);
// before we run the sendMessage function we need to protect the route means user must be logged in -  authorization

export default router;
