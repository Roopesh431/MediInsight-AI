import type { ChatMessage } from "../../types/chat";

interface ChatBubbleProps {

    message: ChatMessage;

}

function ChatBubble({
    message,
}: ChatBubbleProps) {

    const isUser = message.role === "user";

    return (

        <div
            className={`flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-black"
                }`}
            >

                {message.content}

            </div>

        </div>

    );

}

export default ChatBubble;