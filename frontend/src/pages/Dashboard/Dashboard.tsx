import {
    useEffect,
    useState,
} from "react";

import UploadCard from "../../components/dashboard/UploadCard";
import RecentDocuments from "../../components/dashboard/RecentDocuments";
import DashboardStats from "../../components/dashboard/DashboardStats";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import QuickActions from "../../components/dashboard/QuickActions";

import {
    getDocuments,
} from "../../services/documentService";

import type {
    Document,
} from "../../types/document";

function Dashboard() {

    const [documents, setDocuments] =
        useState<Document[]>([]);

    async function loadDocuments() {

        const data =
            await getDocuments();

        setDocuments(data);

    }

    useEffect(() => {

        loadDocuments();

    }, []);

    const aiReports =
        documents.filter(
            d => d.status === "ai_completed",
        ).length;

    const ocrCompleted =
        documents.filter(
            d =>
                d.status === "ocr_completed" ||
                d.status === "ai_completed",
        ).length;

    const avgConfidence =
        documents.length === 0
            ? 0
            : Math.round(

                  documents.reduce(

                      (sum, doc) =>

                          sum + doc.confidence,

                      0,

                  ) /
                      documents.length *
                      100,

              );

    return (

        <>

            <WelcomeBanner />

            <DashboardStats
                totalDocuments={documents.length}
                aiReports={aiReports}
                ocrCompleted={ocrCompleted}
                averageConfidence={avgConfidence}
            />

            <QuickActions />

            <UploadCard />

            <RecentDocuments
                documents={documents}
                onRefresh={loadDocuments}
            />

        </>

    );

}

export default Dashboard;