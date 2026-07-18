import { useNavigate } from "react-router-dom";

function DocumentToolbar() {

    const navigate =
        useNavigate();

    return (

        <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold dark:text-white">

                📄 Documents

            </h1>

            <button
                onClick={() => navigate("/")}
                className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >

                Upload New

            </button>

        </div>

    );

}

export default DocumentToolbar;