interface Procedure {

    date: string;

    code: string;

    description: string;

    charge: number;

}

interface Props {

    procedures: Procedure[];

}

function ProcedureTable({
    procedures,
}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm overflow-x-auto dark:bg-slate-800 dark:border-slate-700">

            <h2 className="text-xl font-bold mb-5 dark:text-white">

                📋 Procedures

            </h2>

            <table className="w-full dark:text-gray-200">

                <thead>

                    <tr className="border-b dark:border-slate-700">

                        <th className="text-left p-2">

                            Date

                        </th>

                        <th className="text-left p-2">

                            Code

                        </th>

                        <th className="text-left p-2">

                            Description

                        </th>

                        <th className="text-right p-2">

                            Charge

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {procedures.map(
                        (
                            procedure,
                            index,
                        ) => (

                            <tr
                                key={index}
                                className="border-b dark:border-slate-700"
                            >

                                <td className="p-2">

                                    {procedure.date}

                                </td>

                                <td className="p-2">

                                    {procedure.code}

                                </td>

                                <td className="p-2">

                                    {procedure.description}

                                </td>

                                <td className="text-right p-2">

                                    ₹ {procedure.charge}

                                </td>

                            </tr>

                        ),
                    )}

                </tbody>

            </table>

        </div>

    );

}

export default ProcedureTable;