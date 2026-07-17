import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

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

    async function copyMessage() {

        try {

            await navigator.clipboard.writeText(

                message.content,

            );

            toast.success(

                "Copied to clipboard!",

            );

        }

        catch {

            toast.error(

                "Unable to copy.",

            );

        }

    }

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

                <div className="mb-3 flex items-center justify-between">

                    <span className="text-xs font-semibold">

                        {isUser
                            ? "👤 You"
                            : "🤖 MediInsight AI"}

                    </span>

                    {!isUser && (

                        <button

                            onClick={copyMessage}

                            className="rounded-md border px-2 py-1 text-xs hover:bg-gray-100 transition"

                            title="Copy response"

                        >

                            📋

                        </button>

                    )}

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