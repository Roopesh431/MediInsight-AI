import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "mediinsight-theme";

function getInitialTheme(): Theme {

    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
        return stored;
    }

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    return prefersDark ? "dark" : "light";

}

export function useTheme() {

    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {

        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        window.localStorage.setItem(STORAGE_KEY, theme);

    }, [theme]);

    function toggleTheme() {

        setTheme((current) => (current === "dark" ? "light" : "dark"));

    }

    return { theme, toggleTheme };

}
