import { defineStore } from "pinia";
import router from "../router";

const useHelper = defineStore("helper", {
  state: () => ({
    token: "",
  }),

  actions: {
    leave() {
      localStorage.removeItem("texnoBazaar");
      this.token = "";
      router.push("/login");
    },
  },
});

export default useHelper;
