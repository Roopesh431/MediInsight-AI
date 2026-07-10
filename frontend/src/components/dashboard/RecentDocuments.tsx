import { useEffect, useState } from "react";

import { getDocuments } from "../../services/documentService";

function RecentDocuments() {

    const [documents, setDocuments] = useState<any[]>([]);

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

            <h2 className="text-xl font-semibold mb-4">
                Recent Documents
            </h2>

            {documents.length === 0 ? (

                <p>No documents uploaded.</p>

            ) : (

                <ul className="space-y-3">

                    {documents.map((doc) => (

                        <li
                            key={doc.document_id}
                            className="border rounded-lg p-3 flex justify-between"
                        >

                            <div>

                                <p className="font-medium">
                                    {doc.original_filename}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {doc.status}
                                </p>

                            </div>

                            <span className="text-blue-600">
                                {doc.document_type}
                            </span>

                        </li>

                    ))}

                </ul>

            )}

        </div>

    );
}

export default RecentDocuments;