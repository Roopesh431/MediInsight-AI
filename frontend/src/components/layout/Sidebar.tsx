import {
    FaHome,
    FaFileMedical,
    FaHistory,
    FaCog,
} from "react-icons/fa";

function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-white h-full">
            <div className="p-6 text-xl font-bold border-b border-slate-700">
                Dashboard
            </div>

            <nav className="mt-6">
                <ul className="space-y-2 px-4">

                    <li className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 cursor-pointer">
                        <FaHome />
                        Home
                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <FaFileMedical />
                        Documents
                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <FaHistory />
                        History
                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <FaCog />
                        Settings
                    </li>

                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;