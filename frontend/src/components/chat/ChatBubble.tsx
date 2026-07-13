import ReactMarkdown from "react-markdown";

import type {
    ChatMessage,
} from "../../types/chat";

interface Props {

    message: ChatMessage;

}

function ChatBubble({

    message,

}: Props) {

    const isUser =

        message.role === "user";

    return (

        <div
            className={`flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 shadow ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "border bg-white"
                }`}
            >

                <div className="mb-3 text-xs font-semibold">

                    {isUser
                        ? "👤 You"
                        : "🤖 MediInsight AI"}

                </div>

                {isUser ? (

                    <p className="whitespace-pre-wrap">

                        {message.content}

                    </p>

                ) : (

                    <div className="prose prose-sm max-w-none">

                        <ReactMarkdown>

                            {message.content}

                        </ReactMarkdown>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ChatBubble;