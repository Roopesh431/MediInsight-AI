import type { ReactNode } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

type MainLayoutProps = {
    children: ReactNode;
};

function MainLayout({
    children,
}: MainLayoutProps) {

    return (
        <div className="h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar />

                <main className="flex-1 bg-slate-100 p-8 overflow-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default MainLayout;