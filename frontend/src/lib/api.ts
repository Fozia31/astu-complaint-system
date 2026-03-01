import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const token = localStorage.getItem('token');
        const isMock = token && token.startsWith('mock-');

        if (error.response?.status === 401 && !isMock && window.location.pathname !== '/login') {
            console.error("Session expired. Redirecting...");
            localStorage.clear(); 
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;