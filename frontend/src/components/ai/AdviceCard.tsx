interface Props {

    advice: string[];

}

function AdviceCard({
    advice,
}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">

            <h2 className="text-xl font-bold mb-4 dark:text-white">

                💡 Patient Advice

            </h2>

            <ul className="space-y-3 list-disc pl-5 dark:text-gray-200">

                {advice?.map(
                    (
                        item,
                        index,
                    ) => (

                        <li key={index}>

                            {item}

                        </li>

                    ),
                )}

            </ul>

        </div>

    );

}

export default AdviceCard;