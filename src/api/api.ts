import axios from "axios";
import { toast } from "sonner";  // Import Sonner's toast

const baseUrl = process.env.REACT_APP_BASE_URL;

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
});

// Function to show a session expired toast
const showSessionExpiredToast = (err: string) => {
  toast.error(err, {
    duration: 4000, // Toast duration (4 seconds)
    position: 'top-left', // Position of the toast
  });
};

api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    const requestConfig = error.config;
    // exempt some requests from 401 redirect
    if (requestConfig.headers.ExemptedRequest === "true") {
      return;
    }

    if (error.response && error.response.status === 401) {
      showSessionExpiredToast("Session expired. Please sign in.");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 4000);
      return;
    }

    if (error.code === "ECONNABORTED" && token) {
      showSessionExpiredToast("Request timed out. Please try again later.");
      return Promise.reject(
        new Error("Request timed out. Please try again later.")
      );
    }

    return Promise.reject(error);
  }
);

export default api;
