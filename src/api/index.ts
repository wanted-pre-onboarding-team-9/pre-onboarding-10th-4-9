import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest = {
  get: (url: string, request?: any) => baseInstance.get(url, request),
  delete: (url: string, request?: any) => baseInstance.delete(url, request),
  post: (url: string, data?: any, config?: any) => baseInstance.post(url, data, config),
};

export default apiRequest;
