import { config } from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseUrl: config.baseUrl,
  withCredentials: true,
});

export default axiosInstance;
