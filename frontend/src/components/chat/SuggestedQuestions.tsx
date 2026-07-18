interface Props {

    questions: string[];

    onSelect: (question: string) => void;

}

function SuggestedQuestions({
    questions,
    onSelect,
}: Props) {

    return (

        <div className="flex flex-wrap gap-3">

            {questions.map((question, index) => (

                <button
                    key={index}
                    onClick={() => onSelect(question)}
                    className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 hover:bg-blue-200 transition dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60"
                >

                    {question}

                </button>

            ))}

        </div>

    );

}

export default SuggestedQuestions;