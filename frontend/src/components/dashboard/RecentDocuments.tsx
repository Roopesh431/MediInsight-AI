import { useEffect, useState } from "react";

import { getDocuments } from "../../services/documentService";

import type { Document } from "../../types/document";
import DocumentRow from "./DocumentRow";

import DashboardStats from "./DashboardStats";

function RecentDocuments() {

    const [documents, setDocuments] = useState<Document[]>([]);

    async function loadDocuments() {

        try {

            const data = await getDocuments();

            setDocuments(data);

        } catch (error: any) {

    console.error("Upload Error:", error);

    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
    }

    alert("Upload Failed.");
}
    }

    useEffect(() => {

        loadDocuments();

    }, []);

    return (

        <div className="bg-white rounded-xl shadow p-8 mt-8">

            <DashboardStats
            documents={documents}
            />

            <h2 className="text-xl font-semibold mb-4">
                Recent Documents
            </h2>

            {documents.length === 0 ? (

                <p>No documents uploaded.</p>

            ) : (

                <div className="space-y-4">

    {documents.map((doc) => (

        <DocumentRow
            key={doc.document_id}
            document={doc}
            onRefresh={loadDocuments}
        />

    ))}

</div>

            )}

        </div>

    );
}

export default RecentDocuments;