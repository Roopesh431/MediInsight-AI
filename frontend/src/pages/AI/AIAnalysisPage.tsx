import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import { getAnalysis } from "../../services/documentService";

function AIAnalysisPage() {

    const { documentId } = useParams();

    const [report, setReport] = useState<any>(null);

    useEffect(() => {

        async function load() {

            const data = await getAnalysis(
                documentId!,
            );

            setReport(data);

        }

        load();

    }, [documentId]);

    if (!report) {

        return (

            <PageContainer
                title="🤖 AI Report"
                subtitle="Loading analysis..."
            >

                <p>Loading...</p>

            </PageContainer>

        );

    }

    return (

        <PageContainer
            title="🤖 AI Report"
            subtitle="AI Medical Analysis"
        >

            <div className="grid grid-cols-2 gap-5">

                <div className="rounded-xl border bg-white p-5">

                    <h3 className="font-semibold">

                        Patient

                    </h3>

                    <p>{report.patient_name}</p>

                </div>

                <div className="rounded-xl border bg-white p-5">

                    <h3 className="font-semibold">

                        Hospital

                    </h3>

                    <p>{report.hospital}</p>

                </div>

                <div className="rounded-xl border bg-white p-5">

                    <h3 className="font-semibold">

                        Doctor

                    </h3>

                    <p>{report.doctor}</p>

                </div>

                <div className="rounded-xl border bg-white p-5">

                    <h3 className="font-semibold">

                        Total Charges

                    </h3>

                    <p>₹ {report.total_charges}</p>

                </div>

            </div>

            <div className="mt-6 rounded-xl border bg-white p-6">

                <h2 className="text-xl font-bold mb-4">

                    Summary

                </h2>

                <p>{report.summary}</p>

            </div>

            <div className="mt-6 rounded-xl border bg-white p-6">

                <h2 className="text-xl font-bold mb-4">

                    Procedures

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-2">

                                Date

                            </th>

                            <th className="text-left p-2">

                                Code

                            </th>

                            <th className="text-left p-2">

                                Charge

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {report.procedures?.map(
                            (p: any, index: number) => (

                                <tr
                                    key={index}
                                    className="border-b"
                                >

                                    <td className="p-2">

                                        {p.date}

                                    </td>

                                    <td className="p-2">

                                        {p.code}

                                    </td>

                                    <td className="p-2">

                                        ₹ {p.charge}

                                    </td>

                                </tr>

                            ),
                        )}

                    </tbody>

                </table>

            </div>

        </PageContainer>

    );

}

export default AIAnalysisPage;