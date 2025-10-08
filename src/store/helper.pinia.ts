import { defineStore } from "pinia";

const useHelper = defineStore("helper", {
  state: () => ({
    token: "",
  }),

  actions: {
    leave() {
      localStorage.getItem("texnoBazaarToken");
      this.token = "";
    },
  },
});

export default useHelper;