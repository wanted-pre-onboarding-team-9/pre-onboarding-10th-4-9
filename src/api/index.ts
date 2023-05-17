import axios, { Axios } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(
  ({ data }) => data,
  (error) => {
    return Promise.reject(error);
  },
);

const apiRequest = {
  get: (...args: Parameters<Axios['get']>) => baseInstance.get(...args),
  delete: (...args: Parameters<Axios['delete']>) => baseInstance.delete(...args),
  post: (...args: Parameters<Axios['post']>) => baseInstance.post(...args),
};

export default apiRequest;
