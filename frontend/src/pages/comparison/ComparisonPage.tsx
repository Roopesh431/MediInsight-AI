import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";

import ComparisonSelector from "../../components/comparison/ComparisonSelector";
import ComparisonCard from "../../components/comparison/ComparisonCard";

import api from "../../services/api";

interface ComparisonReport {

    summary: string;

    differences: {
        field: string;
        first_value: string;
        second_value: string;
    }[];

    procedure_differences: {
        status: "added" | "removed" | "changed";
        code: string | null;
        description: string | null;
        first_charge: number | null;
        second_charge: number | null;
    }[];

    total_charge_delta: number | null;

}

function ComparisonPage() {

    const [first, setFirst] =
        useState("");

    const [second, setSecond] =
        useState("");

    const [report, setReport] =
        useState<ComparisonReport | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    async function compare() {

        if (!first || !second) {

            setError("Select two reports to compare.");

            return;

        }

        if (first === second) {

            setError("Choose two different reports.");

            return;

        }

        setLoading(true);
        setError(null);
        setReport(null);

        try {

            const response =
                await api.get<ComparisonReport>(
                    "/comparison",
                    {
                        params: {

                            first_document_id:
                                first,

                            second_document_id:
                                second,

                        },

                    },
                );

            setReport(
                response.data,
            );

        }

        catch (err: any) {

            const message =
                err?.response?.data?.detail ||
                "Something went wrong while comparing these reports.";

            setError(message);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <PageContainer
            title="🆚 AI Report Comparison"
            subtitle="Compare two analyzed medical reports."
        >

            <ComparisonSelector

                first={first}

                second={second}

                onFirstChange={setFirst}

                onSecondChange={setSecond}

            />

            <button

                onClick={compare}

                disabled={loading}

                className="mt-6 w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"

            >

                {loading ? "Comparing..." : "Compare Reports"}

            </button>

            {error && (

                <p className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">

                    {error}

                </p>

            )}

            {report && (

                <div className="mt-8">

                    <ComparisonCard

                        summary={report.summary}

                        differences={report.differences}

                        procedure_differences={report.procedure_differences}

                        total_charge_delta={report.total_charge_delta}

                    />

                </div>

            )}

        </PageContainer>

    );

}

export default ComparisonPage;
