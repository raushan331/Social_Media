import express from "express";
import { upload } from "../configs/multer.js";
import { protect } from "../middleware/auth.js";
import {
  getChatMessages,
  sendMessage,
  sseController,
  getUserRecentMessages,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/recent", protect, getUserRecentMessages);
messageRouter.post("/send", protect, upload.single("image"), sendMessage);
messageRouter.post("/get", protect, getChatMessages);
messageRouter.get("/:userId", sseController); // SSE, protect nahi (EventSource headers nahi bhej sakta)

export default messageRouter;
