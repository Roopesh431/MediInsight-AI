import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheck, FiX } from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../../components/layout/ThemeToggle";
import { getApiErrorMessage } from "../../utils/apiError";
import logo from "../../assets/webpage.png";

interface PasswordCheck {

    label: string;

    passed: boolean;

}

// Mirrors backend/app/schemas/auth.py's UserCreate validators exactly -
// client-side checks are for instant feedback only, the backend is still
// the real source of truth and re-validates everything independently.
function getPasswordChecks(
    password: string,
    email: string,
    fullName: string,
): PasswordCheck[] {

    const passwordLower = password.toLowerCase();

    const emailLocalPart = email.split("@")[0]?.toLowerCase() ?? "";

    const containsEmail =
        emailLocalPart.length >= 3 &&
        passwordLower.includes(emailLocalPart);

    const containsName = fullName
        .split(/\s+/)
        .filter((part) => part.length >= 3)
        .some((part) => passwordLower.includes(part.toLowerCase()));

    return [

        {
            label: "At least 8 characters",
            passed: password.length >= 8,
        },

        {
            label: "Contains a letter and a number",
            passed: /[A-Za-z]/.test(password) && /\d/.test(password),
        },

        {
            label: "Doesn't contain your email address",
            passed: !containsEmail,
        },

        {
            label: "Doesn't contain your name",
            passed: !containsName,
        },

    ];

}

function RegisterPage() {

    const { register } = useAuth();

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [passwordTouched, setPasswordTouched] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const passwordChecks = useMemo(

        () => getPasswordChecks(password, email, fullName),

        [password, email, fullName],

    );

    const passwordValid = passwordChecks.every((check) => check.passed);

    async function handleSubmit(
        e: React.FormEvent,
    ) {

        e.preventDefault();

        setError(null);

        setPasswordTouched(true);

        if (!passwordValid) {

            setError("Please fix the password requirements below.");

            return;

        }

        setLoading(true);

        try {

            await register(email, password, fullName);

            navigate("/", { replace: true });

        }

        catch (err: any) {

            const message = getApiErrorMessage(

                err,

                "Unable to create an account. Please try again.",

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

                    Create your account.

                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <div>

                        <label className="block mb-1 text-sm font-medium dark:text-gray-200">

                            Full name

                        </label>

                        <input

                            type="text"

                            value={fullName}

                            onChange={(e) => setFullName(e.target.value)}

                            className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:border-slate-600 dark:text-white"

                            placeholder="Jane Doe"

                        />

                    </div>

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

                            onFocus={() => setPasswordTouched(true)}

                            className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:border-slate-600 dark:text-white"

                            placeholder="At least 8 characters"

                        />

                        {passwordTouched && (

                            <ul className="mt-2 space-y-1">

                                {passwordChecks.map((check) => (

                                    <li

                                        key={check.label}

                                        className={`flex items-center gap-2 text-xs ${
                                            check.passed
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-gray-500 dark:text-gray-400"
                                        }`}

                                    >

                                        {check.passed ? (

                                            <FiCheck size={14} />

                                        ) : (

                                            <FiX size={14} />

                                        )}

                                        {check.label}

                                    </li>

                                ))}

                            </ul>

                        )}

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

                        {loading ? "Creating account..." : "Create Account"}

                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">

                    Already have an account?{" "}

                    <Link

                        to="/login"

                        className="font-medium text-blue-600 hover:underline dark:text-blue-400"

                    >

                        Log in

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default RegisterPage;