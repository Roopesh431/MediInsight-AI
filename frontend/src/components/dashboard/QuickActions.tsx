import { Link } from "react-router-dom";

const actions = [
    {
        title: "Upload",
        description: "Upload a new medical bill",
        icon: "📤",
        to: "/documents",
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Recent Documents",
        description: "View previous analyses",
        icon: "📄",
        to: "/documents",
        color: "from-indigo-500 to-blue-600",
    },
    {
        title: "Timeline",
        description: "Medical history timeline",
        icon: "🕒",
        to: "/timeline",
        color: "from-purple-500 to-violet-600",
    },
    {
        title: "Compare Bills",
        description: "Compare multiple reports",
        icon: "📊",
        to: "/comparison",
        color: "from-emerald-500 to-green-600",
    },
];

function QuickActions() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {actions.map((action) => (
                <Link
                    key={action.title}
                    to={action.to}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800 dark:border-slate-700"
                >
                    <div
                        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${action.color}`}
                    />

                    <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
                        {action.icon}
                    </div>

                    <h2 className="mt-5 text-lg font-bold text-slate-800 dark:text-white">
                        {action.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
                        {action.description}
                    </p>
                </Link>
            ))}

            <div className="rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-6 text-white shadow-lg">
                <div className="text-5xl">🤖</div>

                <h2 className="mt-5 text-lg font-bold">
                    AI Status
                </h2>

                <p className="mt-2 text-sm opacity-90">
                    OCR, AI Analysis and Chat services are available.
                </p>
            </div>
        </div>
    );
}

export default QuickActions;