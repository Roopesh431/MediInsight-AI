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
            return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

        if (percent >= 70)
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";

        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

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