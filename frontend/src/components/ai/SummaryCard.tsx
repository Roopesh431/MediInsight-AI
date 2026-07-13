interface Props {

    summary: string;

}

function SummaryCard({
    summary,
}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold mb-4">

                📝 AI Summary

            </h2>

            <p className="leading-7 text-gray-700">

                {summary}

            </p>

        </div>

    );

}

export default SummaryCard;