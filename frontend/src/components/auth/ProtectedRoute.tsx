import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute() {

    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {

        return (

            <div className="flex h-screen w-full items-center justify-center bg-slate-100 dark:bg-slate-900">

                <p className="text-gray-500 dark:text-gray-400">

                    Loading...

                </p>

            </div>

        );

    }

    if (!user) {

        return (

            <Navigate

                to="/login"

                state={{ from: location }}

                replace

            />

        );

    }

    return <Outlet />;

}

export default ProtectedRoute;
