import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    uploadDocument,
    runOCR,
    runAIAnalysis,
} from "../../services/documentService";

import StatusStep from "../common/StatusStep";

function UploadCard() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [selectedFile, setSelectedFile] =
        useState("");

    const [currentStep, setCurrentStep] =
        useState<
            "idle" |
            "uploading" |
            "ocr" |
            "ai" |
            "completed"
        >("idle");

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {

        const file =
            event.target.files?.[0];

        if (!file) return;

        setSelectedFile(file.name);

        try {

            setLoading(true);

            setCurrentStep("uploading");

            const uploaded =
                await uploadDocument(file);

            toast.success(
                "Document uploaded.",
            );

            setCurrentStep("ocr");

            await runOCR(
                uploaded.document_id,
            );

            toast.success(
                "OCR completed.",
            );

            setCurrentStep("ai");

            await runAIAnalysis(
                uploaded.document_id,
            );

            toast.success(
                "AI Analysis completed.",
            );

            setCurrentStep("completed");

            toast.success(
                "Document ready!",
            );

            setTimeout(() => {

                navigate(
                    `/ai/${uploaded.document_id}`,
                );

            }, 1200);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Processing failed.",
            );

            setCurrentStep("idle");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="rounded-2xl bg-white p-8 shadow dark:bg-slate-800">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold dark:text-white">

                        Upload Medical Document

                    </h2>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">

                        Upload a PDF and let MediInsight AI
                        automatically perform OCR and AI
                        analysis.

                    </p>

                </div>

            </div>

            <div className="mt-8">

                <label
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition ${
                        loading
                            ? "cursor-not-allowed opacity-70"
                            : "hover:border-blue-500 hover:bg-blue-50 dark:border-slate-600 dark:hover:bg-slate-700/50"
                    }`}
                >

                    <div className="text-6xl">

                        📄

                    </div>

                    <p className="mt-4 text-lg font-semibold dark:text-white">

                        Click to upload PDF

                    </p>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">

                        Medical Bills • Reports • Prescriptions

                    </p>

                    <input
                        type="file"
                        accept=".pdf"
                        disabled={loading}
                        onChange={handleUpload}
                        className="hidden"
                    />

                </label>

            </div>

            {currentStep !== "idle" && (

                <div className="mt-8 rounded-xl border bg-slate-50 p-6 dark:bg-slate-900/50 dark:border-slate-700">

                    <h3 className="text-lg font-semibold dark:text-white">

                        🤖 MediInsight AI Processing

                    </h3>

                    <p className="mt-2 text-gray-600 dark:text-gray-400">

                        {selectedFile}

                    </p>

                    <div className="mt-6 space-y-4">

                        <StatusStep
                            title="Upload Complete"
                            status={
                                currentStep === "uploading" ||
                                currentStep === "ocr" ||
                                currentStep === "ai" ||
                                currentStep === "completed"
                                    ? "completed"
                                    : "pending"
                            }
                        />

                        <StatusStep
                            title="OCR Extraction"
                            status={
                                currentStep === "ocr"
                                    ? "loading"
                                    : currentStep === "ai" ||
                                      currentStep === "completed"
                                    ? "completed"
                                    : "pending"
                            }
                        />

                        <StatusStep
                            title="AI Analysis"
                            status={
                                currentStep === "ai"
                                    ? "loading"
                                    : currentStep === "completed"
                                    ? "completed"
                                    : "pending"
                            }
                        />

                        <StatusStep
                            title="Ready"
                            status={
                                currentStep === "completed"
                                    ? "completed"
                                    : "pending"
                            }
                        />

                    </div>

                </div>

            )}

        </div>

    );

}

export default UploadCard;