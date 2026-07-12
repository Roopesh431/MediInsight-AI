import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {

    return (

        <div className="h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar />

                <main className="flex-1 bg-slate-100 p-8 overflow-auto">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default MainLayout;  