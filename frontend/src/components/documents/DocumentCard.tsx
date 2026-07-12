import type { Document } from "../../types/document";

import StatusBadge from "../common/StatusBadge";
import ConfidenceBadge from "../common/ConfidenceBadge";

import {
    useNavigate,
} from "react-router-dom";

interface Props {

    document: Document;

}

function DocumentCard({
    document,
}: Props) {

    const navigate =
        useNavigate();

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

                        Type:
                        {" "}
                        {document.document_type}

                    </p>

                    <div className="mt-3">

                        <ConfidenceBadge
                            confidence={
                                document.confidence
                            }
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
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >

                    OCR

                </button>

                <button
                    onClick={() =>
                        navigate(
                            `/ai/${document.document_id}`,
                        )
                    }
                    className="rounded-lg bg-green-600 px-4 py-2 text-white"
                >

                    AI Report

                </button>

                <button
                    onClick={() =>
                        navigate(
                            `/chat/${document.document_id}`,
                        )
                    }
                    className="rounded-lg bg-purple-600 px-4 py-2 text-white"
                >

                    Chat

                </button>

                <button
                    className="rounded-lg bg-red-600 px-4 py-2 text-white"
                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default DocumentCard;