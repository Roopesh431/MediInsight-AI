interface Props {

    title: string;

    value: string | number;

    icon: string;

    color: string;

}

function StatsCard({

    title,

    value,

    icon,

    color,

}: Props) {

    return (

        <div className="rounded-2xl bg-white shadow-sm border p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div
                    className={`text-4xl ${color}`}
                >

                    {icon}

                </div>

            </div>

        </div>

    );

}

export default StatsCard;