import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ensure this variable is defined in your .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
