import { useState } from "react";

import { uploadDocument } from "../../services/documentService";
import { delay } from "../../utils/delay";

import StatusStep from "../common/StatusStep";

function UploadCard() {

    const [loading, setLoading] = useState(false);

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

        const file = event.target.files?.[0];

        if (!file) return;

        setSelectedFile(file.name);

        try {

            setLoading(true);

            setCurrentStep("uploading");

            await uploadDocument(file);

            await delay(700);

            setCurrentStep("ocr");

            await delay(700);

            setCurrentStep("ai");

            await delay(700);

            setCurrentStep("completed");

        } catch (error) {

            console.error(error);

            setCurrentStep("idle");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="bg-white rounded-xl shadow p-8">

            <h2 className="text-xl font-semibold mb-6">
                Upload Medical Document
            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={handleUpload}
            />

            {currentStep !== "idle" && (

                <div className="mt-8 space-y-4 border rounded-xl p-5 bg-slate-50">

                    <h3 className="font-semibold text-lg">
                        🤖 MediInsight AI
                    </h3>

                    <p className="text-gray-600">

                        {currentStep === "completed"
                            ? "Document Ready"
                            : "Processing"}

                        <span className="font-medium ml-1">
                            {selectedFile}
                        </span>

                    </p>

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
                        title="Extracting Text"
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
                        title="Ready for Chat"
                        status={
                            currentStep === "completed"
                                ? "completed"
                                : "pending"
                        }
                    />

                    {currentStep !== "completed" && (

                        <p className="text-sm text-gray-500 mt-4">

                            Please wait while MediInsight AI
                            processes your medical document...

                        </p>

                    )}

                    {currentStep === "completed" && (

                        <div className="mt-4 rounded-lg bg-green-50 p-3 border border-green-200">

                            <p className="font-medium text-green-700">
                                🎉 Your document is ready!
                            </p>

                            <p className="text-sm text-green-600">

                                You can now analyze or chat
                                with this document.

                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}

export default UploadCard;