import { defineStore } from "pinia";
import { api } from "../utils/api";
import { message } from "ant-design-vue";

const useBanners = defineStore("banners", {
  state: () => ({
    banners: [],
    loading: false,
    buttonLoading: false,
  }),

  actions: {
    getBanners() {
      this.loading = true;

      api({
        url: "/api/banner",
        method: "GET",
      })
        .then(({ data }) => {
          this.banners = data;
        })
        .catch((error) => {
          const errorMessage =
            error.data?.response?.message || "Tizimda xatolik";
          message.warn(errorMessage);
          console.error(error);
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
          message.success("Yangi banner joylandi");
          this.getBanners();
        })
        .catch((error) => {
          const errorMessage =
            error.data?.response?.message || "Tizimda xatolik";
          message.warn(errorMessage);
          console.error(error);
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
          this.getBanners();
        })
        .catch((error) => {
          const errorMessage =
            error.data?.response?.message || "Tizimda xatolik";
          message.warn(errorMessage);
          console.error(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
  },
});

export default useBanners;
