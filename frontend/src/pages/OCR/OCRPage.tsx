import {
    useParams,
} from "react-router-dom";

import PageContainer
from "../../components/layout/PageContainer";

function OCRPage() {

    const {
        documentId,
    } = useParams();

    return (

        <PageContainer
            title="📝 OCR Result"
            subtitle="Extracted text from the uploaded document."
        >

            <div className="rounded-xl bg-slate-50 p-5">

                <p className="font-semibold">

                    Document ID

                </p>

                <p className="mt-2 text-gray-600">

                    {documentId}

                </p>

            </div>

            <div className="mt-6 rounded-xl border bg-white p-6 min-h-[500px]">

                OCR text will appear here.

            </div>

        </PageContainer>

    );

}

export default OCRPage;