import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getDocuments,
} from "../../services/documentService";

import type {
    Document,
} from "../../types/document";

import DocumentToolbar from "../../components/documents/DocumentToolbar";
import DocumentSearch from "../../components/documents/DocumentSearch";
import DocumentCard from "../../components/documents/DocumentCard";
import PageContainer from "../../components/layout/PageContainer";

function DocumentsPage() {

    const [documents, setDocuments] =
        useState<Document[]>([]);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    async function loadDocuments() {

        const data =
            await getDocuments();

        setDocuments(data);

    }

    useEffect(() => {

        loadDocuments();

    }, []);

    const filtered =
        useMemo(() => {

            return documents.filter((doc) => {

                const matchesSearch =
                    doc.original_filename
                        .toLowerCase()
                        .includes(
                            search.toLowerCase(),
                        );

                const matchesStatus =
                    statusFilter === "All"
                        ? true
                        : doc.status === statusFilter;

                return (
                    matchesSearch &&
                    matchesStatus
                );

            });

        }, [
            documents,
            search,
            statusFilter,
        ]);

    return (

        <PageContainer
            title="📄 Documents"
            subtitle="Manage uploaded medical documents"
        >

            <DocumentToolbar />

            <div className="flex gap-4 mb-6">

                <div className="flex-1">

                    <DocumentSearch
                        search={search}
                        onSearch={setSearch}
                    />

                </div>

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value,
                        )
                    }
                    className="rounded-xl border px-4"
                >

                    <option>All</option>
                    <option>uploaded</option>
                    <option>ocr_completed</option>
                    <option>ai_completed</option>

                </select>

            </div>

            <div className="space-y-5">

                {filtered.length === 0 ? (

                    <div className="rounded-xl border border-dashed p-12 text-center bg-white">

                        <div className="text-6xl">

                            📂

                        </div>

                        <h2 className="mt-5 text-xl font-bold">

                            No matching documents

                        </h2>

                    </div>

                ) : (

                    filtered.map((doc) => (

                        <DocumentCard
                            key={doc.document_id}
                            document={doc}
                            onDelete={loadDocuments}
                        />

                    ))

                )}

            </div>

        </PageContainer>

    );

}

export default DocumentsPage;