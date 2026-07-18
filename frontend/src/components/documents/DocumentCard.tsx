import type { Document } from "../../types/document";

import StatusBadge from "../common/StatusBadge";
import ConfidenceBadge from "../common/ConfidenceBadge";

import { useNavigate } from "react-router-dom";

import { deleteDocument } from "../../services/documentService";

import toast from "react-hot-toast";

interface Props {
    document: Document;
    onDelete: () => Promise<void>;
}

function DocumentCard({
    document,
    onDelete,
}: Props) {

    const navigate = useNavigate();

    async function handleDelete() {

        const confirmed = window.confirm(
            `Delete "${document.original_filename}"?`,
        );

        if (!confirmed) return;

        try {

            await deleteDocument(document.document_id);

            await onDelete();

            toast.success(
                "Document deleted successfully.",
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to delete the document.",
            );

        }

    }

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800 dark:border-slate-700">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                {/* Left */}

                <div className="flex-1">

                    <div className="flex items-center gap-3">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-3xl dark:bg-blue-900/40">
                            📄
                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-slate-800 break-all dark:text-white">
                                {document.original_filename}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                                Medical Document
                            </p>

                        </div>

                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">

                        <StatusBadge
                            status={document.status}
                        />

                        <ConfidenceBadge
                            confidence={document.confidence}
                        />

                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-gray-400">
                                Document Type
                            </p>

                            <p className="font-semibold text-slate-700 dark:text-gray-200">
                                {document.document_type || "Unknown"}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-gray-400">
                                Document ID
                            </p>

                            <p className="font-mono text-sm text-slate-700 break-all dark:text-gray-300">
                                {document.document_id}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="flex flex-col gap-3 lg:w-56">

                    <button
                        onClick={() =>
                            navigate(`/ocr/${document.document_id}`)
                        }
                        className="rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        📝 View OCR
                    </button>

                    <button
                        onClick={() =>
                            navigate(`/ai/${document.document_id}`)
                        }
                        className="rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-700"
                    >
                        🤖 AI Analysis
                    </button>

                    <button
                        onClick={() =>
                            navigate(`/chat/${document.document_id}`)
                        }
                        className="rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700"
                    >
                        💬 AI Chat
                    </button>

                    <button
                        onClick={handleDelete}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700 transition hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/40"
                    >
                        🗑 Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DocumentCard;