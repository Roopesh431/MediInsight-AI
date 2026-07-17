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

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    async function loadDocuments() {

        try {

            setLoading(true);

            const data =
                await getDocuments();

            setDocuments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

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

            <div className="flex flex-col md:flex-row gap-4 mb-6">

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
                    className="rounded-xl border bg-white px-4 py-3 shadow-sm"
                >

                    <option>All</option>
                    <option>uploaded</option>
                    <option>ocr_completed</option>
                    <option>ai_completed</option>

                </select>

            </div>

            {/* Summary */}

            <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">

                <div className="flex flex-wrap gap-6">

                    <div>

                        <p className="text-sm text-gray-500">

                            Total Documents

                        </p>

                        <p className="text-2xl font-bold">

                            {documents.length}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">

                            Showing

                        </p>

                        <p className="text-2xl font-bold">

                            {filtered.length}

                        </p>

                    </div>

                </div>

            </div>

            {loading ? (

                <div className="rounded-2xl bg-white border p-12 text-center">

                    <div className="animate-spin text-5xl">

                        🏥

                    </div>

                    <p className="mt-5 text-gray-500">

                        Loading documents...

                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {filtered.length === 0 ? (

                        <div className="rounded-xl border border-dashed bg-white p-12 text-center">

                            <div className="text-6xl">

                                📂

                            </div>

                            <h2 className="mt-5 text-xl font-bold">

                                No matching documents

                            </h2>

                            <p className="mt-2 text-gray-500">

                                Try changing your search or upload a new medical bill.

                            </p>

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

            )}

        </PageContainer>

    );

}

export default DocumentsPage;