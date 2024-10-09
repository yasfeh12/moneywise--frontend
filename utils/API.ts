import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:9090/api',
  timeout: 1000,
});

// this code below is not used yet
// const API = {
//   getOverview: () => apiClient.get("/overview"), // for the homescreen and some other page?
//   getReports: (month: string) => apiClient.get(`/reports/${month}`), // for the ReportScreen page
//   getBudgets: () => apiClient.get("/budget"),
// };

export default apiClient;
