interface ConfidenceBadgeProps {
    confidence: number;
}

function ConfidenceBadge({
    confidence,
}: ConfidenceBadgeProps) {

    const percent = Math.round(
        confidence * 100,
    );

    function getClasses() {

        if (percent >= 90)
            return "bg-green-100 text-green-700";

        if (percent >= 70)
            return "bg-yellow-100 text-yellow-700";

        return "bg-red-100 text-red-700";

    }

    return (

        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getClasses()}`}
        >
            {percent}% Confidence
        </span>

    );

}

export default ConfidenceBadge;