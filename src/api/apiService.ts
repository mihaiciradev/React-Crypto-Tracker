import axios from "axios";
import { baseURL, requestTimeout } from "./constants";

const apiService = axios.create({
  baseURL: baseURL,
  timeout: requestTimeout, // Timeout for requests in milliseconds
});

export default apiService;
