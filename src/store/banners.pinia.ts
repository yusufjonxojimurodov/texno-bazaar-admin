import { defineStore } from "pinia";
import { api } from "../utils/api";
import { notification } from "ant-design-vue";

export interface Banner {
  id: number | string;
  image: string;
  status: string;
  productUrl: string;
  createdAt: string;
}

const useBanners = defineStore("banners", {
  state: () => ({
    banners: [] as Banner[],
    loading: false,
    buttonLoading: false,
  }),

  actions: {
    getBanners() {
      this.loading = true;

      api({
        url: "/api/banner/admin",
        method: "GET",
      })
        .then(({ data }) => {
          this.banners = data;
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async createBanner(form: object) {
      this.buttonLoading = true;

      return api({
        url: "/api/banner/post",
        method: "POST",
        data: form,
      })
        .then(() => {
          notification.success({
            message: "Yangi reklama banneri joylashtirildi",
          });
          this.getBanners();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },

    async updateStatus(status: { status: string }, id: string | number) {
      this.buttonLoading = true;

      return api({
        url: `/api/banner/update/status/banner/${id}`,
        method: "PUT",
        data: status,
      })
        .then(({ data }) => {
          const banner = this.banners.find((b) => b.id === id);
          if (banner) {
            banner.status = data.status;
          }

          notification.success({
            message: "Banner holati yangilandi",
          });
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({ message: errorMessage });
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },

    deleteBanner(id: number) {
      this.buttonLoading = true;

      api({
        url: `/api/banner/delete/${id}`,
        method: "DELETE",
      })
        .then(() => {
          notification.success({
            message: "Reklama banneri saytdan olib tashlandi",
          });
          this.getBanners();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
  },
});

export default useBanners;
