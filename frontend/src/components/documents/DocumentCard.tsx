import type { Document } from "../../types/document";

import StatusBadge from "../common/StatusBadge";
import ConfidenceBadge from "../common/ConfidenceBadge";

import { useNavigate } from "react-router-dom";

import {
    deleteDocument,
} from "../../services/documentService";

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
            "Are you sure you want to delete this document?",
        );

        if (!confirmed) return;

        try {

            await deleteDocument(
                document.document_id,
            );

            await onDelete();

        }

        catch (error) {

            console.error(error);

            alert("Delete failed.");

        }

    }

    return (

        <div className="rounded-xl border bg-white p-6 shadow">

            <div className="flex justify-between">

                <div>

                    <h2 className="font-semibold text-lg">

                        📄 {document.original_filename}

                    </h2>

                    <div className="mt-2">

                        <StatusBadge
                            status={document.status}
                        />

                    </div>

                    <p className="mt-3">

                        Type: {document.document_type}

                    </p>

                    <div className="mt-3">

                        <ConfidenceBadge
                            confidence={document.confidence}
                        />

                    </div>

                </div>

            </div>

            <div className="flex gap-3 mt-6 flex-wrap">

                <button
                    onClick={() =>
                        navigate(
                            `/ocr/${document.document_id}`,
                        )
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >

                    OCR

                </button>

                <button
                    onClick={() =>
                        navigate(
                            `/ai/${document.document_id}`,
                        )
                    }
                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >

                    AI Report

                </button>

                <button
                    onClick={() =>
                        navigate(
                            `/chat/${document.document_id}`,
                        )
                    }
                    className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                >

                    Chat

                </button>

                <button
                    onClick={handleDelete}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default DocumentCard;