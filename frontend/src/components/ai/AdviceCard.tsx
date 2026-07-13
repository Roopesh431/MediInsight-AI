interface Props {

    advice: string[];

}

function AdviceCard({
    advice,
}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold mb-4">

                💡 Patient Advice

            </h2>

            <ul className="space-y-3 list-disc pl-5">

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