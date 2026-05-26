import axios from "axios";
import { useAuthStore } from "@/stores/authentication";
import router from "@/router";

const api = axios.create({
  baseURL: "/api",

  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  console.log(
    `[API] ${config.method?.toUpperCase()} ${config.url}`,
    config.data,
  );
  return config;
});


api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response (${response.status}):`, response.data);
    return response;
  },
  (error) => {
    const authStore = useAuthStore();
    if (error.response) {
      console.error(
        `[API] Error (${error.response.status}):`,
        error.response.data,
      );
      if (error.response.status === 401) {
        authStore.logout();
        router.push("/login");
      }
    } else if (error.request) {
      console.error("[API] No response received:", error.request);
    } else {
      console.error("[API] Request error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
