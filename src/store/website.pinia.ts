import { defineStore } from "pinia";
import { api } from "../utils/api";
import { notification } from "ant-design-vue";

export interface website {
  status: number;
  text: string;
}

const useWebsite = defineStore("website", {
  state: () => ({
    setting: {} as website,
    loading: false,
  }),

  actions: {
    updatePlatformStatus(status: number, text: string, callback: Function) {
      this.loading = true;

      api({
        url: "/api/website/update/platform/status",
        method: "PUT",
        data: {
          status: status,
          text: text,
        },
      })
        .then(() => {
          notification.success({
            message:
              status === 200
                ? "TexnoBazaar platformasi aktivlashtirildi"
                : "TexnoBazaar platformasi faolsizlantirildi",
          });
          callback?.();
          this.getPlatformStatus();
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async getPlatformStatus() {
      this.loading = true;
      return api({
        url: "/api/website/get/platform/status",
        method: "GET",
      })
        .then(({ data }) => {
          this.setting = data;
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export default useWebsite;
