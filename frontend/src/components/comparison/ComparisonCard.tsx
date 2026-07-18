interface Difference {

    field: string;

    first_value: string;

    second_value: string;

}

interface ProcedureDifference {

    status: "added" | "removed" | "changed";

    code: string | null;

    description: string | null;

    first_charge: number | null;

    second_charge: number | null;

}

interface Props {

    summary: string;

    differences: Difference[];

    procedure_differences: ProcedureDifference[];

    total_charge_delta: number | null;

}

function formatCharge(value: number | null): string {

    if (value === null || value === undefined) {
        return "-";
    }

    return `$${value.toFixed(2)}`;

}

const STATUS_STYLES: Record<
    ProcedureDifference["status"],
    { label: string; badge: string; border: string }
> = {

    added: {
        label: "Added",
        badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        border: "border-green-200 dark:border-green-800",
    },

    removed: {
        label: "Removed",
        badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
        border: "border-red-200 dark:border-red-800",
    },

    changed: {
        label: "Changed",
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
    },

};

function ComparisonCard({

    summary,

    differences,

    procedure_differences,

    total_charge_delta,

}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">

            <h2 className="text-2xl font-bold mb-2 dark:text-white">

                AI Comparison Report

            </h2>

            <p className="text-gray-600 mb-2 dark:text-gray-300">

                {summary}

            </p>

            {total_charge_delta !== null && total_charge_delta !== undefined && (

                <p className="mb-6 font-medium">

                    Total charge change:{" "}
                    <span
                        className={
                            total_charge_delta > 0
                                ? "text-red-600 dark:text-red-400"
                                : total_charge_delta < 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-500 dark:text-gray-400"
                        }
                    >
                        {total_charge_delta > 0 ? "+" : ""}
                        {formatCharge(total_charge_delta)}
                    </span>

                </p>

            )}

            {/* Field-level differences */}
            {differences.length === 0 ? (

                <div className="rounded-xl bg-green-50 border border-green-200 p-5 dark:bg-green-900/20 dark:border-green-800">

                    <p className="font-medium text-green-700 dark:text-green-300">

                        ✅ No field differences detected.

                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {differences.map(

                        (difference, index) => (

                            <div

                                key={index}

                                className="rounded-xl border p-5 dark:border-slate-700"

                            >

                                <h3 className="font-semibold capitalize dark:text-white">

                                    {difference.field.replaceAll(

                                        "_",

                                        " ",

                                    )}

                                </h3>

                                <div className="grid md:grid-cols-2 gap-4 mt-3">

                                    <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">

                                        <p className="text-xs text-gray-500 dark:text-gray-400">

                                            Report 1

                                        </p>

                                        <p className="dark:text-gray-100">

                                            {difference.first_value || "-"}

                                        </p>

                                    </div>

                                    <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">

                                        <p className="text-xs text-gray-500 dark:text-gray-400">

                                            Report 2

                                        </p>

                                        <p className="dark:text-gray-100">

                                            {difference.second_value || "-"}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        ),

                    )}

                </div>

            )}

            {/* Procedure-level differences */}
            <div className="mt-8">

                <h3 className="text-lg font-semibold mb-3 dark:text-white">

                    Procedure Changes

                </h3>

                {procedure_differences.length === 0 ? (

                    <div className="rounded-xl bg-green-50 border border-green-200 p-5 dark:bg-green-900/20 dark:border-green-800">

                        <p className="font-medium text-green-700 dark:text-green-300">

                            ✅ No procedure differences detected.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {procedure_differences.map((diff, index) => {

                            const style = STATUS_STYLES[diff.status];

                            return (

                                <div

                                    key={index}

                                    className={`rounded-xl border p-4 flex items-center justify-between gap-4 ${style.border} dark:bg-slate-900/40`}

                                >

                                    <div>

                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium mr-2 ${style.badge}`}>

                                            {style.label}

                                        </span>

                                        <span className="font-medium dark:text-white">

                                            {diff.description || diff.code || "Unknown procedure"}

                                        </span>

                                        {diff.code && (

                                            <span className="ml-2 text-xs text-gray-400">

                                                {diff.code}

                                            </span>

                                        )}

                                    </div>

                                    <div className="text-sm text-right dark:text-gray-200">

                                        {diff.status === "changed" ? (

                                            <span>

                                                {formatCharge(diff.first_charge)} → {formatCharge(diff.second_charge)}

                                            </span>

                                        ) : (

                                            <span>

                                                {formatCharge(diff.first_charge ?? diff.second_charge)}

                                            </span>

                                        )}

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );

}

export default ComparisonCard;
