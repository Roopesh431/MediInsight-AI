import {

    Link,

} from "react-router-dom";

function QuickActions() {

    return (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            <Link
                to="/documents"
                className="rounded-2xl bg-white border p-6 shadow hover:shadow-lg transition"
            >

                <div className="text-5xl">

                    📄

                </div>

                <h2 className="mt-4 font-bold">

                    Documents

                </h2>

            </Link>

            <Link
                to="/history"
                className="rounded-2xl bg-white border p-6 shadow hover:shadow-lg transition"
            >

                <div className="text-5xl">

                    🕒

                </div>

                <h2 className="mt-4 font-bold">

                    History

                </h2>

            </Link>

            <Link
                to="/settings"
                className="rounded-2xl bg-white border p-6 shadow hover:shadow-lg transition"
            >

                <div className="text-5xl">

                    ⚙️

                </div>

                <h2 className="mt-4 font-bold">

                    Settings

                </h2>

            </Link>

            <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 shadow">

                <div className="text-5xl">

                    🤖

                </div>

                <h2 className="mt-4 font-bold">

                    AI Ready

                </h2>

            </div>

        </div>

    );

}

export default QuickActions;