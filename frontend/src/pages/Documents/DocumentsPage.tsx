import {
    useEffect,
    useState,
} from "react";

import {
    getDocuments,
} from "../../services/documentService";

import type {
    Document,
} from "../../types/document";

import DocumentToolbar
from "../../components/documents/DocumentToolbar";

import DocumentSearch
from "../../components/documents/DocumentSearch";

import DocumentCard
from "../../components/documents/DocumentCard";

import PageContainer
from "../../components/layout/PageContainer";

function DocumentsPage() {

    const [documents, setDocuments] =
        useState<Document[]>([]);

    const [search, setSearch] =
        useState("");

    async function loadDocuments() {

        const data =
            await getDocuments();

        setDocuments(data);

    }

    useEffect(() => {

        loadDocuments();

    }, []);

    const filtered =
        documents.filter((doc) =>

            doc.original_filename
                .toLowerCase()
                .includes(
                    search.toLowerCase(),
                ),

        );

    return (

        <PageContainer
            title="📄 Documents"
            subtitle="Manage your uploaded medical documents."
        >

            <DocumentToolbar />

            <DocumentSearch
                search={search}
                onSearch={setSearch}
            />

            <div className="space-y-5">

                {filtered.map((doc) => (

                    <DocumentCard
                        key={doc.document_id}
                        document={doc}
                        onDelete={loadDocuments}
                    />

                ))}

            </div>

        </PageContainer>

    );

}

export default DocumentsPage;