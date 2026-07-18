interface Props {
    title: string;
    value: string | number;
    icon: string;
    color: string;
}

function StatsCard({
    title,
    value,
    icon,
    color,
}: Props) {

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:bg-slate-800 dark:border-slate-700">

            {/* Decorative Gradient */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" />

            <div className="flex items-center justify-between">

                <div className="flex-1">

                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-gray-400">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">
                        {value}
                    </h2>

                    <div className="mt-4 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>

                        <span className="text-xs font-medium text-slate-500 dark:text-gray-400">
                            Updated just now
                        </span>
                    </div>

                </div>

                <div
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:bg-slate-700 ${color}`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default StatsCard;