import toast from "react-hot-toast";

interface Props {

    summary: string;

}

function SummaryCard({
    summary,
}: Props) {

    async function copySummary() {

        try {

            await navigator.clipboard.writeText(
                summary,
            );

            toast.success(
                "Summary copied!",
            );

        }

        catch {

            toast.error(
                "Unable to copy summary.",
            );

        }

    }

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

                <h2 className="text-xl font-bold">

                    📝 AI Summary

                </h2>

                <button

                    onClick={copySummary}

                    className="rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100"

                >

                    📋 Copy

                </button>

            </div>

            <p className="leading-7 text-gray-700 whitespace-pre-line">

                {summary}

            </p>

        </div>

    );

}

export default SummaryCard;