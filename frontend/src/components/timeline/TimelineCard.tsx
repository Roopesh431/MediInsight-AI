import {
    FiCalendar,
    FiFileText,
    FiUser,
    FiHome,
} from "react-icons/fi";

interface Props {

    item: {

        document_id: string;

        document_type: string;

        title: string;

        date: string;

        hospital: string;

        doctor: string;

        summary: string;

    };

}

function TimelineCard({

    item,

}: Props) {

    return (

        <div className="relative flex gap-6">

            <div className="flex flex-col items-center">

                <div className="h-5 w-5 rounded-full bg-blue-600 border-4 border-white shadow" />

                <div className="w-1 flex-1 bg-blue-200" />

            </div>

            <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition-all">

                <div className="flex justify-between items-center">

                    <h2 className="text-xl font-bold">

                        {item.document_type}

                    </h2>

                    <div className="flex items-center gap-2 text-blue-600">

                        <FiCalendar />

                        <span>

                            {item.date}

                        </span>

                    </div>

                </div>

                <div className="mt-4 flex items-center gap-2 text-gray-600">

                    <FiFileText />

                    <span>

                        {item.title}

                    </span>

                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-5">

                    <div className="flex gap-3">

                        <FiHome
                            className="mt-1"
                        />

                        <div>

                            <p className="text-xs text-gray-400 uppercase">

                                Hospital

                            </p>

                            <p>

                                {item.hospital}

                            </p>

                        </div>

                    </div>

                    <div className="flex gap-3">

                        <FiUser
                            className="mt-1"
                        />

                        <div>

                            <p className="text-xs text-gray-400 uppercase">

                                Doctor

                            </p>

                            <p>

                                {item.doctor}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-5">

                    <h3 className="font-semibold mb-2">

                        AI Summary

                    </h3>

                    <p className="leading-7 text-gray-700">

                        {item.summary}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default TimelineCard;