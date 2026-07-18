interface StatusBadgeProps {
    status: string;
}

function StatusBadge({
    status,
}: StatusBadgeProps) {

    function getClasses() {

        switch (status) {

            case "uploaded":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";

            case "ocr_completed":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";

            case "ai_completed":
                return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

            default:
                return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300";

        }

    }

    function getLabel() {

        switch (status) {

            case "uploaded":
                return "📄 Uploaded";

            case "ocr_completed":
                return "📝 OCR Complete";

            case "ai_completed":
                return "🤖 AI Complete";

            default:
                return status;

        }

    }

    return (

        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getClasses()}`}
        >
            {getLabel()}
        </span>

    );

}

export default StatusBadge;