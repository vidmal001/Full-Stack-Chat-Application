import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  // above is basically the same thing as useState we have state and setter function

  messages: [],
  setMessages: (messages) => set({ messages }), // set the state with the new messages

}));

export default useConversation;
