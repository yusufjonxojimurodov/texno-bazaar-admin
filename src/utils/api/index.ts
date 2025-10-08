import axios from "axios";
import { message } from "ant-design-vue";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}`,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 429
      ) {
        message.warn("Server bilan muammo");
      }
    }
    return Promise.reject(error);
  }
);

export const api = ({ url, open = false, ...props }) => {
  const token = localStorage.getItem("texnoBazaar");

  if (!open) {
    props.headers = {
      Authorization: `Bearer ${token}`,
      ...props.headers,
    };
  }

  return instance({
    url,
    ...props,
  });
};
