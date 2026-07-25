import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import {
    getAnalysis,
    getVersionAnalysis,
    runAIAnalysis,
} from "../../services/documentService";

import InfoCard from "../../components/ai/InfoCard";
import SummaryCard from "../../components/ai/SummaryCard";
import ProcedureTable from "../../components/ai/ProcedureTable";
import AdviceCard from "../../components/ai/AdviceCard";
import MedicalTermsCard from "../../components/ai/MedicalTermsCard";
import SuggestedQuestions from "../../components/ai/SuggestedQuestions";
import VersionHistory from "../../components/ai/VersionHistory";

import Skeleton from "../../components/common/Skeleton";

import toast from "react-hot-toast";
import { exportAIReport } from "../../utils/pdfExport";

function AIAnalysisPage() {

    const { documentId } = useParams();

    const [report, setReport] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    const [reanalyzing, setReanalyzing] =
        useState(false);

    // null = viewing the current report; a number = viewing that
    // historical version instead (read-only, not editable/exportable
    // as "current").
    const [viewingVersion, setViewingVersion] =
        useState<number | null>(null);

    // Bumped after a restore or a fresh analysis run so VersionHistory
    // refetches its list.
    const [refreshKey, setRefreshKey] =
        useState(0);

    async function loadCurrentReport() {

        setLoading(true);

        try {

            const data = await getAnalysis(documentId!);

            setReport(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load AI report.");

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadCurrentReport();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documentId]);

    useEffect(() => {

        if (viewingVersion === null) {

            // Switched back to "current" - the report state we already
            // have is correct, no need to refetch.
            return;

        }

        // Captured as a const so TypeScript's null-narrowing survives
        // into the nested async function below (it doesn't persist
        // automatically into a function defined after the guard).
        const versionToLoad: number = viewingVersion;

        let cancelled = false;

        async function loadVersion() {

            setLoading(true);

            try {

                const data = await getVersionAnalysis(
                    documentId!,
                    versionToLoad,
                );

                if (!cancelled) {
                    setReport(data);
                }

            }

            catch (error) {

                console.error(error);

                toast.error("Unable to load that version.");

            }

            finally {

                if (!cancelled) {
                    setLoading(false);
                }

            }

        }

        loadVersion();

        return () => {
            cancelled = true;
        };

    }, [viewingVersion, documentId]);

    async function handleReanalyze() {

        setReanalyzing(true);

        try {

            await runAIAnalysis(documentId!);

            toast.success("Analysis complete - new version created.");

            setViewingVersion(null);

            await loadCurrentReport();

            setRefreshKey((key) => key + 1);

        }

        catch (error) {

            console.error(error);

            toast.error("Re-analysis failed. Please try again.");

        }

        finally {

            setReanalyzing(false);

        }

    }

    function handleRestored() {

        loadCurrentReport();

        setRefreshKey((key) => key + 1);

    }

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

            {viewingVersion !== null && (

                <div className="mb-6 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 dark:bg-amber-900/20 dark:border-amber-800">

                    <p className="text-amber-800 dark:text-amber-300">

                        Viewing version {viewingVersion} (not the current report).

                    </p>

                    <button

                        onClick={() => setViewingVersion(null)}

                        className="rounded-lg border border-amber-300 px-3 py-1.5 text-sm text-amber-800 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/40"

                    >

                        Back to current

                    </button>

                </div>

            )}

            <div className="flex flex-wrap justify-end gap-3 mb-6">

                <button

                    onClick={handleReanalyze}

                    disabled={reanalyzing || viewingVersion !== null}

                    className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-gray-100 disabled:opacity-50 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700"

                >

                    {reanalyzing ? "Re-analyzing..." : "🔄 Re-run Analysis"}

                </button>

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

            <div className="mt-6">

                <VersionHistory

                    documentId={documentId!}

                    refreshKey={refreshKey}

                    viewingVersion={viewingVersion}

                    onViewVersion={setViewingVersion}

                    onRestored={handleRestored}

                />

            </div>

        </PageContainer>

    );

}

export default AIAnalysisPage;
