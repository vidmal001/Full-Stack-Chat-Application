import Conversation from "./../models/conversation.model.js";
import Message from "./../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    // sender is us
    const senderId = req.user._id; // we need to set this in middleware

    let conversation = await Conversation.findOne(
      { participants: { $all: [senderId, receiverId] } } // gives the conversation between sender and receiver
    );

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        // in default messages will be empty array
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Socket.io functionality

    // this will run in sequence first save the conversation and then save the new message
    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // this is the id of the user that we want to chat with
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    // we knew only the message ids in the conversation but using 'populate' we can get the message content...so instead of returning us the ids of messages array it will return us array of objects containing the message content

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
