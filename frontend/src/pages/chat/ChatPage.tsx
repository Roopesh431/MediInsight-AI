import { useState } from "react";
import { useParams } from "react-router-dom";

import ChatBubble from "../../components/chat/ChatBubble";
import PageContainer from "../../components/layout/PageContainer";

import type { ChatMessage } from "../../types/chat";

import {
    chatWithDocument,
} from "../../services/documentService";

function ChatPage() {

    const { documentId } = useParams();

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState<ChatMessage[]>([]);

    const [loading, setLoading] =
        useState(false);

    async function sendQuestion() {

        if (!question.trim()) return;

        const userMessage: ChatMessage = {

            role: "user",

            content: question,

        };

        setMessages((prev) => [

            ...prev,

            userMessage,

        ]);

        setLoading(true);

        try {

            const response =
                await chatWithDocument(
                    documentId!,
                    question,
                );

            const aiMessage: ChatMessage = {

                role: "assistant",

                content: response.answer,

            };

            setMessages((prev) => [

                ...prev,

                aiMessage,

            ]);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

            setQuestion("");

        }

    }

    return (

        <PageContainer
            title="💬 AI Assistant"
            subtitle="Ask questions about this document."
        >

            <div className="flex flex-col h-[75vh]">

                <div className="flex-1 bg-white rounded-xl border p-6 overflow-y-auto space-y-4">

                    {messages.map((message, index) => (

                        <ChatBubble
                            key={index}
                            message={message}
                        />

                    ))}

                    {loading && (

                        <p className="text-gray-500">

                            Thinking...

                        </p>

                    )}

                </div>

                <div className="mt-5 flex gap-4">

                    <input

                        value={question}

                        onChange={(e) =>
                            setQuestion(
                                e.target.value,
                            )
                        }

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                sendQuestion();

                            }

                        }}

                        className="flex-1 rounded-lg border p-3"

                        placeholder="Ask anything about this document..."

                    />

                    <button

                        onClick={sendQuestion}

                        className="rounded-lg bg-blue-600 px-6 text-white"

                    >

                        Send

                    </button>

                </div>

            </div>

        </PageContainer>

    );

}

export default ChatPage;