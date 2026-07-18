import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="h-screen flex flex-col dark:bg-slate-900">

            <Navbar onMenuClick={() => setSidebarOpen((open) => !open)} />

            <div className="flex flex-1 overflow-hidden relative">

                <Sidebar

                    isOpen={sidebarOpen}

                    onClose={() => setSidebarOpen(false)}

                />

                <main className="flex-1 bg-slate-100 p-4 sm:p-6 lg:p-8 overflow-auto dark:bg-slate-900">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default MainLayout;
