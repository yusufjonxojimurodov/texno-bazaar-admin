import { defineStore } from "pinia";
import { api } from "../utils/api";
import { notification } from "ant-design-vue";

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
          const errorMessage = error.response?.data.message || error;
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

export default useAvatar;
