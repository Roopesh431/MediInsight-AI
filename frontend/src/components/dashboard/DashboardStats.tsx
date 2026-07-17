import StatsCard from "./StatsCard";

interface Props {
    totalDocuments: number;
    aiReports: number;
    ocrCompleted: number;
    averageConfidence: number;
}

function DashboardStats({
    totalDocuments,
    aiReports,
    ocrCompleted,
    averageConfidence,
}: Props) {

    const stats = [
        {
            title: "Documents",
            value: totalDocuments,
            icon: "📄",
            color: "text-blue-600",
        },
        {
            title: "AI Reports",
            value: aiReports,
            icon: "🤖",
            color: "text-green-600",
        },
        {
            title: "OCR Completed",
            value: ocrCompleted,
            icon: "📝",
            color: "text-purple-600",
        },
        {
            title: "Avg Confidence",
            value: `${averageConfidence}%`,
            icon: "🎯",
            color: "text-orange-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <StatsCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                />
            ))}
        </div>
    );
}

export default DashboardStats;