interface Difference {

    field: string;

    first_value: string;

    second_value: string;

}

interface Props {

    summary: string;

    differences: Difference[];

}

function ComparisonCard({

    summary,

    differences,

}: Props) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold mb-2">

                AI Comparison Report

            </h2>

            <p className="text-gray-600 mb-6">

                {summary}

            </p>

            {differences.length === 0 ? (

                <div className="rounded-xl bg-green-50 border border-green-200 p-5">

                    <p className="font-medium text-green-700">

                        ✅ No differences detected.

                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {differences.map(

                        (difference, index) => (

                            <div

                                key={index}

                                className="rounded-xl border p-5"

                            >

                                <h3 className="font-semibold capitalize">

                                    {difference.field.replaceAll(

                                        "_",

                                        " ",

                                    )}

                                </h3>

                                <div className="grid md:grid-cols-2 gap-4 mt-3">

                                    <div className="rounded-lg bg-red-50 p-3">

                                        <p className="text-xs text-gray-500">

                                            Report 1

                                        </p>

                                        <p>

                                            {difference.first_value || "-"}

                                        </p>

                                    </div>

                                    <div className="rounded-lg bg-green-50 p-3">

                                        <p className="text-xs text-gray-500">

                                            Report 2

                                        </p>

                                        <p>

                                            {difference.second_value || "-"}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        ),

                    )}

                </div>

            )}

        </div>

    );

}

export default ComparisonCard;