interface InfoCardProps {

    title: string;

    value: string | number | null | undefined;

}

function InfoCard({
    title,
    value,
}: InfoCardProps) {

    return (

        <div className="rounded-xl border bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">

                {title}

            </p>

            <h3 className="mt-2 text-xl font-semibold">

                {value || "-"}

            </h3>

        </div>

    );

}

export default InfoCard;