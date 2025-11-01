import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { notification } from "ant-design-vue";
import router from "../../router";

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
        notification.error({
          message: "Server bilan bog'liq xatolik",
          description: "Server bilan bog'lana olmadik yoki server xatoligi !",
        });
      }

      if (status === 401) {
        localStorage.removeItem("texnoBazaar");
        setTimeout(() => {
          router.push("/login");
        }, 0);
      }
    }
    return Promise.reject(error);
  }
);

interface ApiProps extends AxiosRequestConfig {
  url: string;
  open?: boolean;
}

export const api = ({
  url,
  open = false,
  ...props
}: ApiProps): Promise<AxiosResponse> => {
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
