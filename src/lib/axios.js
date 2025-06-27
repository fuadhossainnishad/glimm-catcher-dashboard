import { config } from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config.base_url,
  withCredentials: true,
});
console.log(config.base_url);

export default axiosInstance;
