import { defineStore } from "pinia";
import { api } from "../utils/api";
import useUser from "./user.pinia";

const useAvatar = defineStore("avatar", {
  state: () => ({
    avatar: "",
    avatarUrl: "",
    loading: false,
  }),

  actions: {
    getAvatar() {
      const userStore = useUser();
      if (userStore.user.avatar_content_type) {
        api({
          url: `/api/upload/avatar/${userStore.user.avatar_content_type}`,
          method: "GET",
        })
          .then((res) => {
            const data = res.data || res;
            const cleanBase64 = data.avatar.trim().replaceAll("\n", "");
            this.avatarUrl = `data:${data.mimetype};base64,${cleanBase64}`;
          })
          .catch(console.error);
      }
    },
  },
});

export default useAvatar;
