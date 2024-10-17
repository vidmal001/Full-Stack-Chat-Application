import { BsSend, BsEmojiSmile } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        {/* Emoji Icon inside the input box on the left */}
        <button
          type="button"
          className="absolute inset-y-0 start-0 flex items-center ps-3 text-lg"
        >
          <BsEmojiSmile />
        </button>

        {/* Input Field */}
        <input
          type="text"
          className="border text-sm rounded-lg block w-full pl-10 pr-10 p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />

        {/* Send Button inside the input box on the right */}
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-lg"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
