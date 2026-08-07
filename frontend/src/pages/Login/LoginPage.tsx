import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../../components/layout/ThemeToggle";
import { getApiErrorMessage } from "../../utils/apiError";
import logo from "../../assets/webpage.png";


function LoginPage() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const redirectTo =
        (location.state as { from?: Location })?.from?.pathname || "/";

    async function handleSubmit(
        e: React.FormEvent,
    ) {

        e.preventDefault();

        setError(null);

        setLoading(true);

        try {

            await login(email, password);

            navigate(redirectTo, { replace: true });

        }

        catch (err: any) {

            const message = getApiErrorMessage(

                err,

                "Unable to log in. Check your email and password.",

            );

            setError(message);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-900">

            <div className="absolute top-4 right-4">

                <ThemeToggle />

            </div>

            <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:bg-slate-800 dark:border-slate-700">

                
                <div className="flex items-center gap-2">

                    <img src={logo} alt="MediInsight AI" className="h-7 w-7 object-contain" />

                    <h1 className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                        MediInsight AI
                    </h1>

                </div>



                <p className="mt-2 text-gray-500 dark:text-gray-400">

                    Log in to your account.

                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <div>

                        <label className="block mb-1 text-sm font-medium dark:text-gray-200">

                            Email

                        </label>

                        <input

                            type="email"

                            required

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:border-slate-600 dark:text-white"

                            placeholder="you@example.com"

                        />

                    </div>

                    <div>

                        <label className="block mb-1 text-sm font-medium dark:text-gray-200">

                            Password

                        </label>

                        <input

                            type="password"

                            required

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                            className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:border-slate-600 dark:text-white"

                            placeholder="••••••••"

                        />

                    </div>

                    {error && (

                        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">

                            {error}

                        </p>

                    )}

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"

                    >

                        {loading ? "Logging in..." : "Log In"}

                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">

                    Don't have an account?{" "}

                    <Link

                        to="/register"

                        className="font-medium text-blue-600 hover:underline dark:text-blue-400"

                    >

                        Create one

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default LoginPage;
