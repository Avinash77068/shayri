import axios from "axios";

const FAKE_STORE = import.meta.env.VITE_FAKE_STORE || "https://mongo-nnwt.onrender.com/api/v1/";

const api = axios.create({
  baseURL: FAKE_STORE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Retry logic: simple retry 3 times with delay
const retryRequest = async (error:any, retries = 3, delay = 1000) => {
  if (retries <= 0) return Promise.reject(error);
  await new Promise((res) => setTimeout(res, delay));
  return api.request(error.config); // Retry the failed request
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Request Setup Error:", error.message);
    }

    // Retry logic on network error or 5xx status
    const shouldRetry =
      error.code === "ECONNABORTED" || // timeout
      !error.response || // no response
      (error.response.status >= 500 && error.response.status < 600);

    if (shouldRetry) {
      return retryRequest(error, 2);
    }

    return Promise.reject(error); // Final fallback if still failing
  }
);

export default api;
