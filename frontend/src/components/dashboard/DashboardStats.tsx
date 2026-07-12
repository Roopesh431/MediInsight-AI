import type { Document } from "../../types/document";

interface DashboardStatsProps {

    documents: Document[];

}

function DashboardStats({
    documents,
}: DashboardStatsProps) {

    const totalDocuments =
        documents.length;

    const ocrCompleted =
        documents.filter(
            (doc) =>
                doc.status === "ocr_completed" ||
                doc.status === "ai_completed",
        ).length;

    const aiCompleted =
        documents.filter(
            (doc) =>
                doc.status === "ai_completed",
        ).length;

    const cards = [

        {
            title: "Documents",
            value: totalDocuments,
            color: "bg-blue-100 text-blue-700",
            icon: "📄",
        },

        {
            title: "OCR Complete",
            value: ocrCompleted,
            color: "bg-yellow-100 text-yellow-700",
            icon: "📝",
        },

        {
            title: "AI Complete",
            value: aiCompleted,
            color: "bg-green-100 text-green-700",
            icon: "🤖",
        },

        {
            title: "Chats",
            value: "Soon",
            color: "bg-purple-100 text-purple-700",
            icon: "💬",
        },

    ];

    return (

        <div className="grid grid-cols-4 gap-6 mb-8">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className={`rounded-xl p-6 shadow ${card.color}`}
                >

                    <p className="text-4xl">

                        {card.icon}

                    </p>

                    <h2 className="mt-4 font-semibold">

                        {card.title}

                    </h2>

                    <p className="text-3xl font-bold">

                        {card.value}

                    </p>

                </div>

            ))}

        </div>

    );

}

export default DashboardStats;