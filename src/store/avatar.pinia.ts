import { defineStore } from "pinia";
import { api } from "../utils/api";
import { message } from "ant-design-vue";

const useAvatar = defineStore("avatar", {
  state: () => ({
    avatar: "",
    loading: false,
  }),

  actions: {
    getAvatar() {
      this.loading = true;

      api({
        url: "/api/avatar/users/get/avatar",
        method: "GET",
      })
        .then(({ data }) => {
          this.avatar = data.avatarUrl;
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "Tizimga xatolik";
          message.error(errorMessage);
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export default useAvatar