import {
    NavLink,
} from "react-router-dom";

import {
    FiHome,
    FiFileText,
    FiClock,
    FiSettings,
    FiGitBranch,
    FiX,
} from "react-icons/fi";

import {
    BsArrowLeftRight,
} from "react-icons/bs";

interface Props {

    isOpen: boolean;

    onClose: () => void;

}

function Sidebar({ isOpen, onClose }: Props) {

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
            name: "Timeline",
            path: "/timeline",
            icon: <FiGitBranch />,
        },

        {
            name: "Comparison",
            path: "/comparison",
            icon: <BsArrowLeftRight />,
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

        <>

            {/* Mobile backdrop - only rendered while the drawer is open */}
            {isOpen && (

                <div

                    onClick={onClose}

                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"

                />

            )}

            <aside

                className={`
                    fixed z-30 inset-y-0 left-0 w-64 bg-slate-900 text-white
                    transform transition-transform duration-200 ease-in-out
                    lg:static lg:translate-x-0 lg:z-auto
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}

            >

                <div className="p-6 border-b border-slate-700 flex items-center justify-between">

                    <h2 className="text-2xl sm:text-3xl font-bold">

                        Dashboard

                    </h2>

                    <button

                        onClick={onClose}

                        aria-label="Close menu"

                        className="lg:hidden text-slate-300 hover:text-white"

                    >

                        <FiX size={22} />

                    </button>

                </div>

                <nav className="p-4 space-y-2">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={onClose}
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

        </>

    );

}

export default Sidebar;
