import {
    useState,
    useEffect,
    useRef,
} from "react";

import {
    useParams,
} from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import ChatBubble from "../../components/chat/ChatBubble";
import SuggestedQuestions from "../../components/chat/SuggestedQuestions";

import type {
    ChatMessage,
} from "../../types/chat";

import {
    chatWithDocument,
} from "../../services/documentService";

import toast from "react-hot-toast";

function ChatPage() {

    const { documentId } = useParams();

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState<ChatMessage[]>([]);

    const [loading, setLoading] =
        useState(false);

    const bottomRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages, loading]);

    async function sendQuestion(customQuestion?: string) {

        const currentQuestion =
            customQuestion ?? question;

        if (!currentQuestion.trim()) return;

        const userMessage: ChatMessage = {

            role: "user",

            content: currentQuestion,

        };

        setMessages(prev => [

            ...prev,

            userMessage,

        ]);

        setLoading(true);

        try {

            const response =
                await chatWithDocument(
                    documentId!,
                    currentQuestion,
                );

            const aiMessage: ChatMessage = {

                role: "assistant",

                content: response.answer,

            };

            setMessages(prev => [

                ...prev,

                aiMessage,

            ]);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to contact AI.",
            );

            setMessages(prev => [

                ...prev,

                {

                    role: "assistant",

                    content:
                        "Sorry, something went wrong while processing your request.",

                },

            ]);

        }

        finally {

            setLoading(false);

            setQuestion("");

        }

    }

    return (

        <PageContainer
            title="💬 AI Assistant"
            subtitle="Ask questions about this medical document."
        >

            <div className="flex flex-col h-[75vh]">

                <div className="mb-5">

                    <SuggestedQuestions
                        questions={[

                            "What is my remaining balance?",

                            "Summarize this report",

                            "Explain the medical terms",

                            "List all procedures",

                        ]}
                        onSelect={(q) => {

                            setQuestion(q);

                            sendQuestion(q);

                        }}
                    />

                </div>

                <div className="flex-1 overflow-y-auto rounded-xl border bg-white p-6 shadow-sm space-y-4">

                    {messages.length === 0 && (

                        <div className="text-center text-gray-500 mt-20">

                            <div className="text-6xl mb-4">

                                🤖

                            </div>

                            <h2 className="text-xl font-semibold">

                                MediInsight AI

                            </h2>

                            <p className="mt-2">

                                Ask anything about your uploaded document.

                            </p>

                        </div>

                    )}

                    {messages.map((message, index) => (

                        <ChatBubble

                            key={index}

                            message={message}

                        />

                    ))}

                    {loading && (

                        <div className="rounded-xl bg-gray-100 p-4 w-fit">

                            🤖 Thinking...

                        </div>

                    )}

                    <div ref={bottomRef} />

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

                        placeholder="Ask anything about this document..."

                        className="flex-1 rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />

                    <button

                        onClick={() => sendQuestion()}

                        disabled={loading}

                        className="rounded-xl bg-blue-600 px-8 text-white hover:bg-blue-700 disabled:bg-gray-400"

                    >

                        Send

                    </button>

                </div>

            </div>

        </PageContainer>

    );

}

export default ChatPage;