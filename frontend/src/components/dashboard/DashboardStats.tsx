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

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            <StatsCard

                title="Documents"

                value={totalDocuments}

                icon="📄"

                color="text-blue-600"

            />

            <StatsCard

                title="AI Reports"

                value={aiReports}

                icon="🤖"

                color="text-green-600"

            />

            <StatsCard

                title="OCR Completed"

                value={ocrCompleted}

                icon="📝"

                color="text-purple-600"

            />

            <StatsCard

                title="Avg Confidence"

                value={`${averageConfidence}%`}

                icon="🎯"

                color="text-orange-500"

            />

        </div>

    );

}

export default DashboardStats;