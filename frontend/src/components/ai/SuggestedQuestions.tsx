import { useNavigate } from "react-router-dom";

interface Props {
    documentId: string;
    questions: string[];
}

function SuggestedQuestions({
    documentId,
    questions,
}: Props) {

    const navigate = useNavigate();

    function handleClick(
        question: string,
    ) {

        navigate(

            `/chat/${documentId}`,

            {

                state: {

                    question,

                },

            },

        );

    }

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">

            <h2 className="mb-4 text-xl font-bold dark:text-white">

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
                            onClick={() => handleClick(question)}
                            className="rounded-full bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60"
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