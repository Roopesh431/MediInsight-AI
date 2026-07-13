import type { Document } from "../../types/document";

import DocumentRow from "./DocumentRow";

interface Props {

    documents: Document[];

    onRefresh?: () => Promise<void>;

}

function RecentDocuments({

    documents,

    onRefresh = async () => {},

}: Props) {

    if (documents.length === 0) {

        return (

            <div className="rounded-2xl border border-dashed bg-white p-16 text-center shadow-sm">

                <div className="text-7xl">

                    📂

                </div>

                <h2 className="mt-6 text-2xl font-bold">

                    No Documents Yet

                </h2>

                <p className="mt-3 text-gray-500">

                    Upload your first medical report to begin AI analysis.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-5">

            {documents.map((document) => (

                <DocumentRow
                    key={document.document_id}
                    document={document}
                    onRefresh={onRefresh}
                />

            ))}

        </div>

    );

}

export default RecentDocuments;