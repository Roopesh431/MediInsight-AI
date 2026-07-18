import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import {
    getAnalysis,
} from "../../services/documentService";

import InfoCard from "../../components/ai/InfoCard";
import SummaryCard from "../../components/ai/SummaryCard";
import ProcedureTable from "../../components/ai/ProcedureTable";
import AdviceCard from "../../components/ai/AdviceCard";
import MedicalTermsCard from "../../components/ai/MedicalTermsCard";
import SuggestedQuestions from "../../components/ai/SuggestedQuestions";

import Skeleton from "../../components/common/Skeleton";

import toast from "react-hot-toast";
import { exportAIReport } from "../../utils/pdfExport";

function AIAnalysisPage() {

    const { documentId } = useParams();

    const [report, setReport] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function loadReport() {

            try {

                const data =
                    await getAnalysis(
                        documentId!,
                    );

                setReport(data);

            }

            catch (error) {

                console.error(error);

                toast.error(
                    "Unable to load AI report.",
                );

            }

            finally {

                setLoading(false);

            }

        }

        loadReport();

    }, [documentId]);

    if (loading) {

        return (

            <PageContainer
                title="🤖 AI Medical Report"
                subtitle="Generating AI insights..."
            >

                <div className="space-y-6">

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />

                    </div>

                    <Skeleton className="h-40" />

                    <Skeleton className="h-72" />

                    <div className="grid lg:grid-cols-2 gap-6">

                        <Skeleton className="h-60" />

                        <Skeleton className="h-60" />

                    </div>

                </div>

            </PageContainer>

        );

    }

    if (!report) {

        return (

            <PageContainer
                title="🤖 AI Medical Report"
                subtitle="No report available"
            >

                <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:bg-red-900/20 dark:border-red-800">

                    <h2 className="font-semibold text-red-700 dark:text-red-300">

                        Unable to load AI Report

                    </h2>

                    <p className="mt-2 text-gray-600 dark:text-gray-400">

                        Please run AI Analysis first.

                    </p>

                </div>

            </PageContainer>

        );

    }

    return (

        <PageContainer
            title="🤖 AI Medical Report"
            subtitle="Generated using MediInsight AI"
        >

            <div className="flex justify-end mb-6">

                <button

                    onClick={() => {

                        exportAIReport(report);

                        toast.success(
                            "PDF exported successfully!",
                        );

                    }}

                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700 transition"

                >

                    📄 Export PDF

                </button>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                <InfoCard
                    title="Patient"
                    value={report.patient_name ?? "-"}
                />

                <InfoCard
                    title="Hospital"
                    value={report.hospital ?? "-"}
                />

                <InfoCard
                    title="Doctor"
                    value={report.doctor ?? "-"}
                />

                <InfoCard
                    title="Total Charges"
                    value={`₹ ${report.total_charges ?? 0}`}
                />

            </div>

            <div className="mt-6">

                <SummaryCard
                    summary={
                        report.summary ??
                        "No summary available."
                    }
                />

            </div>

            <div className="mt-6">

                <ProcedureTable
                    procedures={
                        report.procedures ?? []
                    }
                />

            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-6">

                <MedicalTermsCard
                    terms={
                        report.medical_terms ?? []
                    }
                />

                <AdviceCard
                    advice={
                        report.patient_advice ?? []
                    }
                />

            </div>

            <div className="mt-6">

                <SuggestedQuestions
                    documentId={documentId!}
                    questions={
                        report.recommended_questions ?? []
                    }
                />

            </div>

        </PageContainer>

    );

}

export default AIAnalysisPage;