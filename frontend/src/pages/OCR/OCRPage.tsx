import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import OCRToolbar from "../../components/ocr/OCRToolbar";

import {

    getOCRText,

} from "../../services/documentService";

import toast from "react-hot-toast";

function OCRPage() {

    const { documentId } = useParams();

    const [text, setText] =

        useState("");

    const [search, setSearch] =

        useState("");

    useEffect(() => {

        async function load() {

            try {

                const data =

                    await getOCRText(documentId!);

                setText(data);

            }

            catch (error) {

                console.error(error);

                toast.error(
                    "Unable to load OCR text.",
                );

            }

        }

        load();

    }, [documentId]);

    const filteredText =

        useMemo(() => {

            if (!search)

                return text;

            return text

                .split("\n")

                .filter(line =>

                    line

                        .toLowerCase()

                        .includes(

                            search.toLowerCase(),

                        ),

                )

                .join("\n");

        }, [text, search]);

    function copyText() {

        navigator.clipboard.writeText(text);

        toast.success(
            "OCR copied to clipboard!",
        );

    }

    function downloadText() {

        const blob = new Blob(

            [text],

            {

                type: "text/plain",

            },

        );

        const url =

            URL.createObjectURL(blob);

        const a =

            document.createElement("a");

        a.href = url;

        a.download =

            "ocr-result.txt";

        a.click();
        toast.success(
            "OCR downloaded.",
        );
        URL.revokeObjectURL(url);

    }

    return (

        <PageContainer

            title="📝 OCR Result"

            subtitle="Extracted document text"

        >

            <OCRToolbar

                search={search}

                onSearch={setSearch}

                onCopy={copyText}

                onDownload={downloadText}

            />

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <pre className="whitespace-pre-wrap text-sm leading-7 font-mono">

                    {filteredText ||

                        "Loading OCR..."}

                </pre>

            </div>

        </PageContainer>

    );

}

export default OCRPage;