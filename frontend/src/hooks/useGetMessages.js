import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  // we use useEffect because this should immediately run when the component loads
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // question mark is used because selectedConversation can be undefined
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  // whenever selectedConversation._id changes we run the getMessages function

  return { loading, messages };
};

export default useGetMessages;
