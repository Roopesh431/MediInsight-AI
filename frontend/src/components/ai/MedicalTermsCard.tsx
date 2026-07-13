interface Term {

    term: string;

    meaning: string;

}

interface Props {

    terms: Term[];

}

function MedicalTermsCard({
    terms,
}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold mb-4">

                🩺 Medical Terms

            </h2>

            <div className="space-y-4">

                {terms?.map(
                    (
                        item,
                        index,
                    ) => (

                        <div key={index}>

                            <h3 className="font-semibold">

                                {item.term}

                            </h3>

                            <p className="text-gray-600">

                                {item.meaning}

                            </p>

                        </div>

                    ),
                )}

            </div>

        </div>

    );

}

export default MedicalTermsCard;