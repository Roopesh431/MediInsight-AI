type Status = "completed" | "loading" | "pending";

interface StatusStepProps {
    title: string;
    status: Status;
}

function StatusStep({
    title,
    status,
}: StatusStepProps) {

    function getIcon() {

        switch (status) {

            case "completed":
                return "✔";

            case "loading":
                return "⏳";

            default:
                return "○";

        }

    }

    function getColor() {

        switch (status) {

            case "completed":
                return "text-green-600";

            case "loading":
                return "text-blue-600";

            default:
                return "text-gray-400";

        }

    }

    return (

        <div className="flex items-center gap-3">

            <span className={`font-bold ${getColor()}`}>
                {getIcon()}
            </span>

            <span className={getColor()}>
                {title}
            </span>

        </div>

    );

}

export default StatusStep;