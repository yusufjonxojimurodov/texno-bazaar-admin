import { defineStore } from "pinia";
import { api } from "../utils/api";
import { message } from "ant-design-vue";
import router from "../router";

const useUser = defineStore("user", {
  state: () => ({
    user: "",
    allUsers: [],
    currentPage: 0,
    pageSize: 10,
    totalUsers: undefined,
    loading: false,
    buttonLoader: false,
  }),

  actions: {
    login(form: object) {
      this.loading = true;

      api({
        url: "/api/users/login",
        method: "POST",
        data: form,
      })
        .then(({ data }) => {
          localStorage.setItem("texnoBazaar", data.token);
          message.success("Tizimga kirdingiz");
          router.push("/dashboard/users");
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data.message || "Tizimda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getMe() {
      this.loading = true;

      api({
        url: "/api/users/getUserMe",
        method: "GET",
      })
        .then(({ data }) => {
          this.user = data;
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data.message || "Tizimda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getUsers(page = 0, size = 10) {
      this.loading = true;

      api({
        url: "/api/users/all/users",
        method: "GET",
        params: {
          page,
          size,
        },
      })
        .then(({ data }) => {
          this.allUsers = data.users;
          this.totalUsers = data.totalUsers;
          this.currentPage = page + 1;
          this.pageSize = size;
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data.message || "Tizimda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async putUser(form: object, id: number) {
      this.buttonLoader = true;

      return api({
        url: `/api/users/admin/update-user/${id}`,
        method: "PUT",
        data: form,
      })
        .then(() => {
          message.success("Foydalanuvchi yangilandi");
          this.getUsers();
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data.message || "Tizimda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },

    async putRole({ role, id }: { role: string; id: number }) {
      this.buttonLoader = true;

      return api({
        url: `/api/users/update/role/${id}`,
        method: "PUT",
        data: { role },
      })
        .then(() => {
          message.success("Rol ozgartirildi");
          this.getUsers();
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "Tizimda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },

    deleteUser(id: number) {
      this.buttonLoader = true;
      api({
        url: `/api/users/user/delete/${id}`,
        method: "DELETE",
      })
        .then(() => {
          message.success("Foydalanuvchi o'chirildi");
          this.getUsers();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message;
          message.error(errorMessage);
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },
  },
});

export default useUser;
