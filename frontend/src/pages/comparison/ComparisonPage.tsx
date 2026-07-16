import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";

import ComparisonSelector from "../../components/comparison/ComparisonSelector";
import ComparisonCard from "../../components/comparison/ComparisonCard";

import api from "../../services/api";

function ComparisonPage() {

    const [first, setFirst] =
        useState("");

    const [second, setSecond] =
        useState("");

    const [report, setReport] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(false);

    async function compare() {

        if (!first || !second) {

            alert(
                "Select two reports.",
            );

            return;

        }

        setLoading(true);

        try {

            const response =
                await api.get(
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

        catch (error) {

            console.error(
                error,
            );

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

                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"

            >

                Compare Reports

            </button>

            {loading && (

                <p className="mt-6">

                    Comparing...

                </p>

            )}

            {report && (

                <div className="mt-8">

                    <ComparisonCard

                        summary={report.summary}

                        differences={report.differences}

                    />

                </div>

            )}

        </PageContainer>

    );

}

export default ComparisonPage;