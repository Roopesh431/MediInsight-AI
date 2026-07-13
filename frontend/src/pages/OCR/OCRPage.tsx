import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import { getOCRText } from "../../services/documentService";

function OCRPage() {

    const { documentId } = useParams();

    const [text, setText] = useState("");

    useEffect(() => {

        async function load() {

            try {

                const data = await getOCRText(
                    documentId!,
                );

                setText(data);

            }

            catch (err) {

                console.error(err);

            }

        }

        load();

    }, [documentId]);

    return (

        <PageContainer
            title="📝 OCR Result"
            subtitle="Extracted text"
        >

            <div className="rounded-xl border bg-white p-6 whitespace-pre-wrap font-mono text-sm">

                {text || "Loading OCR..."}

            </div>

        </PageContainer>

    );

}

export default OCRPage;