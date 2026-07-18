import { FiMenu } from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";

interface Props {

    onMenuClick: () => void;

}

function Navbar({ onMenuClick }: Props) {

    return (

        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">

            <div className="flex items-center gap-3">

                <button

                    onClick={onMenuClick}

                    aria-label="Toggle menu"

                    className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"

                >

                    <FiMenu size={20} />

                </button>

                <h1 className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">

                    🏥 MediInsight AI

                </h1>

            </div>

            <div className="flex items-center gap-3">

                <ThemeToggle />

                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    LR
                </div>

            </div>

        </header>

    );

}

export default Navbar;
