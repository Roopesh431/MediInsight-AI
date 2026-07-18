import type { Document } from "../../types/document";

import StatusBadge from "../common/StatusBadge";
import ConfidenceBadge from "../common/ConfidenceBadge";

import { useNavigate } from "react-router-dom";

interface DocumentItemProps {

    document: Document;

    showActions?: boolean;

}

function DocumentItem({

    document,

    showActions = true,

}: DocumentItemProps) {

    const navigate = useNavigate();

    return (

        <div className="rounded-xl border bg-white shadow p-5 dark:bg-slate-800 dark:border-slate-700">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="font-semibold text-lg dark:text-white">

                        📄 {document.original_filename}

                    </h2>

                    <div className="mt-2">

                        <StatusBadge
                            status={document.status}
                        />

                    </div>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">

                        Type:
                        <span className="ml-2 font-medium">

                            {document.document_type}

                        </span>

                    </p>

                    <div className="mt-3">

                        <ConfidenceBadge
                            confidence={document.confidence}
                        />

                    </div>

                </div>

            </div>

            {showActions && (

                <div className="flex flex-wrap gap-3 mt-6">

                    <button
                        onClick={() =>
                            navigate(`/ocr/${document.document_id}`)
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        OCR
                    </button>

                    <button
                        onClick={() =>
                            navigate(`/ai/${document.document_id}`)
                        }
                        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                        AI Report
                    </button>

                    <button
                        onClick={() =>
                            navigate(`/chat/${document.document_id}`)
                        }
                        className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                    >
                        Chat
                    </button>

                </div>

            )}

        </div>

    );

}

export default DocumentItem;