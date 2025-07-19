import axios from "axios";


const FAKE_STORE = import.meta.env.VITE_FAKE_STORE|| "https://mongo-nnwt.onrender.com/api/v1/";
// const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;


// Create an Axios instance
const api = axios.create({
  baseURL: `${FAKE_STORE}`,
  timeout: 10000, // timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
    // "x-cg-demo-api-key": apiKey,
  },
});


api.interceptors.request.use(
  (config) => {
  
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Handle the response interceptor for errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error("API error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      console.error("Error during setup:", error.message);
    }
    return Promise.reject(error);
  }
);


export default api;