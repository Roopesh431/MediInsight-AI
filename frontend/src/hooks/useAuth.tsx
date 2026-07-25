import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";

import {
    fetchCurrentUser,
    loginUser,
    registerUser,
} from "../services/authService";

import { TOKEN_STORAGE_KEY } from "../services/api";

import type { User } from "../types/auth";

interface AuthContextValue {

    user: User | null;

    loading: boolean;

    login: (email: string, password: string) => Promise<void>;

    register: (
        email: string,
        password: string,
        fullName: string,
    ) => Promise<void>;

    logout: () => void;

}

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined,
);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [user, setUser] = useState<User | null>(null);

    // Starts true - we don't know yet whether a stored token is still
    // valid until /auth/me resolves. ProtectedRoute waits on this before
    // deciding to redirect, so a page refresh doesn't briefly bounce a
    // logged-in user to /login before their session is confirmed.
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);

        if (!token) {

            setLoading(false);

            return;

        }

        fetchCurrentUser()

            .then((currentUser) => {

                setUser(currentUser);

            })

            .catch(() => {

                // Token was rejected (expired/invalid) - the api.ts
                // response interceptor already cleared storage.
                setUser(null);

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    async function login(email: string, password: string) {

        const result = await loginUser(email, password);

        window.localStorage.setItem(
            TOKEN_STORAGE_KEY,
            result.access_token,
        );

        setUser(result.user);

    }

    async function register(
        email: string,
        password: string,
        fullName: string,
    ) {

        const result = await registerUser(
            email,
            password,
            fullName,
        );

        window.localStorage.setItem(
            TOKEN_STORAGE_KEY,
            result.access_token,
        );

        setUser(result.user);

    }

    function logout() {

        window.localStorage.removeItem(TOKEN_STORAGE_KEY);

        setUser(null);

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                register,

                logout,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth(): AuthContextValue {

    const context = useContext(AuthContext);

    if (context === undefined) {

        throw new Error(
            "useAuth must be used within an AuthProvider.",
        );

    }

    return context;

}
