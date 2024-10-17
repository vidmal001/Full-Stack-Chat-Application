import Message from "./Message";

const Messages = () => {
	return (
		// if messages overflow it will be scrollable that's why we use overflow-auto
		<div className='px-4 flex-1 overflow-auto'>
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
		</div>
	);
};
export default Messages;