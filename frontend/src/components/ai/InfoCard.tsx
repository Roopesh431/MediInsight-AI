interface InfoCardProps {

    title: string;

    value: string | number | null | undefined;

}

function InfoCard({
    title,
    value,
}: InfoCardProps) {

    return (

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">

            <p className="text-sm text-gray-500 dark:text-gray-400">

                {title}

            </p>

            <h3 className="mt-2 text-xl font-semibold dark:text-white">

                {value || "-"}

            </h3>

        </div>

    );

}

export default InfoCard;