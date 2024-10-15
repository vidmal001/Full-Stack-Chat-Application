import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    // each field will be type of ObjectId from User model
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // each field will be type of ObjectId from Message model
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
