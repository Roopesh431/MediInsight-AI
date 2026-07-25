import axios from "axios";

const TOKEN_STORAGE_KEY = "mediinsight-token";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach the JWT to every outgoing request, if one is stored.
api.interceptors.request.use((config) => {

    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

// If the token is invalid/expired, the backend returns 401. Clear the
// stale token and let the app redirect to /login on the next render
// (handled by ProtectedRoute reading the now-empty stored user).
api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error?.response?.status === 401) {

            window.localStorage.removeItem(TOKEN_STORAGE_KEY);
            window.localStorage.removeItem("mediinsight-user");

        }

        return Promise.reject(error);

    },

);

export { TOKEN_STORAGE_KEY };

export default api;
