import { FiMoon, FiSun } from "react-icons/fi";

import { useTheme } from "../../hooks/useTheme";

function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (

        <button

            onClick={toggleTheme}

            aria-label="Toggle dark mode"

            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"

        >

            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}

        </button>

    );

}

export default ThemeToggle;
