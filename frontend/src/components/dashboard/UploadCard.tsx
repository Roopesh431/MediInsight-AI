import { useState } from "react";

import { uploadDocument } from "../../services/documentService";

function UploadCard() {

    const [loading, setLoading] = useState(false);

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {

        const file = event.target.files?.[0];

        if (!file) return;

        try {

            setLoading(true);

            const result = await uploadDocument(
                file,
            );

            console.log(result);

            alert("Upload Successful!");

        } catch (error) {

            console.error(error);

            alert("Upload Failed.");

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

            {loading && (

                <p className="mt-4 text-blue-600">
                    Uploading...
                </p>

            )}

        </div>

    );
}

export default UploadCard;