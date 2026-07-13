import {
    useEffect,
    useState,
} from "react";

import PageContainer from "../../components/layout/PageContainer";

import {
    getDocuments,
} from "../../services/documentService";

import type {
    Document,
} from "../../types/document";

function HistoryPage() {

    const [documents, setDocuments] =
        useState<Document[]>([]);

    useEffect(() => {

        async function load() {

            const data =
                await getDocuments();

            setDocuments(data);

        }

        load();

    }, []);

    return (

        <PageContainer
            title="📜 History"
            subtitle="Previously processed medical documents"
        >

            <div className="overflow-hidden rounded-xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">

                                File

                            </th>

                            <th className="p-4 text-left">

                                Status

                            </th>

                            <th className="p-4 text-left">

                                Type

                            </th>

                            <th className="p-4 text-left">

                                Confidence

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {documents.map((doc) => (

                            <tr
                                key={doc.document_id}
                                className="border-t hover:bg-slate-50"
                            >

                                <td className="p-4">

                                    {doc.original_filename}

                                </td>

                                <td className="p-4">

                                    {doc.status}

                                </td>

                                <td className="p-4">

                                    {doc.document_type}

                                </td>

                                <td className="p-4">

                                    {(doc.confidence * 100).toFixed(0)}%

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </PageContainer>

    );

}

export default HistoryPage;