import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:9090/api",
  timeout: 1000,
});
export default apiClient;
