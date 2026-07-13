interface Props {

    questions: string[];

}

function SuggestedQuestions({
    questions,
}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold mb-4">

                ❓ Suggested Questions

            </h2>

            <div className="flex flex-wrap gap-3">

                {questions?.map(
                    (
                        question,
                        index,
                    ) => (

                        <button
                            key={index}
                            className="rounded-full bg-blue-100 px-4 py-2 text-blue-700"
                        >

                            {question}

                        </button>

                    ),
                )}

            </div>

        </div>

    );

}

export default SuggestedQuestions;