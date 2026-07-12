import {
    NavLink,
} from "react-router-dom";

import {
    FiHome,
    FiFileText,
    FiClock,
    FiSettings,
} from "react-icons/fi";

function Sidebar() {

    const menuItems = [

        {
            name: "Home",
            path: "/",
            icon: <FiHome />,
        },

        {
            name: "Documents",
            path: "/documents",
            icon: <FiFileText />,
        },

        {
            name: "History",
            path: "/history",
            icon: <FiClock />,
        },

        {
            name: "Settings",
            path: "/settings",
            icon: <FiSettings />,
        },

    ];

    return (

        <aside className="w-64 bg-slate-900 text-white">

            <div className="p-6 border-b border-slate-700">

                <h2 className="text-3xl font-bold">

                    Dashboard

                </h2>

            </div>

            <nav className="p-4 space-y-2">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>

                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                isActive
                                    ? "bg-slate-700"
                                    : "hover:bg-slate-800"
                            }`

                        }
                    >

                        <span className="text-lg">

                            {item.icon}

                        </span>

                        {item.name}

                    </NavLink>

                ))}

            </nav>

        </aside>

    );

}

export default Sidebar;