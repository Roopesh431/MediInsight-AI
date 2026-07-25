import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../hooks/useAuth";

interface Props {

    onMenuClick: () => void;

}

function getInitials(name: string | null, email: string): string {

    if (name && name.trim()) {

        const parts = name.trim().split(/\s+/);

        const initials = parts
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("");

        if (initials) return initials;

    }

    return email[0]?.toUpperCase() ?? "?";

}

function Navbar({ onMenuClick }: Props) {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    function handleLogout() {

        logout();

        navigate("/login", { replace: true });

    }

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

                {user && (

                    <div className="relative">

                        <button

                            onClick={() => setMenuOpen((open) => !open)}

                            aria-label="Account menu"

                            title={user.full_name || user.email}

                            className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold hover:bg-blue-700"

                        >

                            {getInitials(user.full_name, user.email)}

                        </button>

                        {menuOpen && (

                            <>

                                <div

                                    className="fixed inset-0 z-10"

                                    onClick={() => setMenuOpen(false)}

                                />

                                <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border bg-white p-2 shadow-lg dark:bg-slate-800 dark:border-slate-700">

                                    <div className="px-3 py-2">

                                        <p className="text-sm font-medium dark:text-white truncate">

                                            {user.full_name || "MediInsight User"}

                                        </p>

                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">

                                            {user.email}

                                        </p>

                                    </div>

                                    <button

                                        onClick={handleLogout}

                                        className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"

                                    >

                                        <FiLogOut size={16} />

                                        Log out

                                    </button>

                                </div>

                            </>

                        )}

                    </div>

                )}

            </div>

        </header>

    );

}

export default Navbar;
