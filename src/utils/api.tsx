import axios from "axios";
const Localhost = "http://127.0.0.1:5000/api/v1/"
const FAKE_STORE =Localhost || import.meta.env.PRODUCT_API_URL||"https://mongo-nnwt.onrender.com/api/v1/";

const api = axios.create({
  baseURL: FAKE_STORE,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to pause before retry
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Add retry count to config
    if (!config._retryCount) {
      config._retryCount = 0;
    }

    const shouldRetry =
      error.code === "ECONNABORTED" || // Timeout
      !error.response || // No response
      (error.response.status >= 500 && error.response.status < 600); // 5xx errors

    if (shouldRetry && config._retryCount < 3) {
      config._retryCount += 1;
      await wait(1000); // Wait 1 second before retry
      return api.request(config); // Retry the request
    }

    // Log final error
    if (error.response) {
      console.error("Final API Error Response:", error.response.data);
    } else if (error.request) {
      console.error("Final: No response from server.");
    } else {
      console.error("Final: Request setup error:", error.message);
    }

    return Promise.reject(
      error.response?.data || { message: "Something went wrong, please try again later." }
    );
  }
);

export default api;
