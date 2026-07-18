import type { Document } from "../../types/document";
import StatusBadge from "../common/StatusBadge";
import ConfidenceBadge from "../common/ConfidenceBadge";
import {
    FiFileText,
    FiMessageCircle,
} from "react-icons/fi";

import {
    BsRobot,
} from "react-icons/bs";

import {
    runOCR,
} from "../../services/documentService";

import {
    runAIAnalysis,
} from "../../services/documentService";

import {
    useNavigate,
} from "react-router-dom";

interface DocumentRowProps {
    document: Document;
    onRefresh: () => Promise<void>;
}
function DocumentRow({
    document,
    onRefresh,
}: DocumentRowProps) {

    const navigate = useNavigate();

    const ocrCompleted =
    document.status === "ocr_completed" ||
    document.status === "ai_completed";

const aiCompleted =
    document.status === "ai_completed";

const canRunAI =
    document.status === "ocr_completed";

const canChat =
    document.status === "ai_completed";


async function handleOCR() {

    try {

        await runOCR(
            document.document_id,
        );

        await onRefresh();

    }

    catch (error) {

        console.error(error);

    }

}

async function handleAI() {

    try {

        await runAIAnalysis(
            document.document_id,
        );

        await onRefresh();

    }

    catch (error) {

        console.error(error);

    }

}

    return (

        <div className="border rounded-xl p-5 bg-white shadow-sm dark:bg-slate-800 dark:border-slate-700">

            <div className="flex justify-between items-start">

                <div>

                    <h3 className="font-semibold text-lg dark:text-white">

                        📄 {document.original_filename}

                    </h3>

                    <div className="mt-3">

                        <StatusBadge
                            status={document.status}
                        />

                    </div>

                    <p className="text-gray-500 dark:text-gray-400">

                        Type:
                        <span className="ml-2">
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

            <div className="flex gap-3 mt-5">

                <button onClick={async () => {

                        await handleOCR();

                        navigate(
                            `/ocr/${document.document_id}`,
                        );

                    }}
                    disabled={ocrCompleted}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                        ocrCompleted
                            ? "bg-green-100 text-green-700 cursor-default"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >

                    <FiFileText />

                    {ocrCompleted ? "OCR Done" : "OCR"}

                </button>

                <button
                onClick={async () => {

                    await handleAI();

                    navigate(
                        `/ai/${document.document_id}`,
                    );

                }}
                disabled={!canRunAI || aiCompleted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    aiCompleted
                        ? "bg-green-100 text-green-700 cursor-default"
                        : canRunAI
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400"
                }`}
            >

                <BsRobot />

                {aiCompleted
                    ? "AI Done"
                    : "AI Analysis"}

            </button>

                            
            <button
            onClick={() =>
                navigate(
                    `/chat/${document.document_id}`,
                )
            }
                disabled={!canChat}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    canChat
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400"
                }`}
            >

                <FiMessageCircle />

                Chat

            </button>

            </div>

        </div>

    );

}

export default DocumentRow;