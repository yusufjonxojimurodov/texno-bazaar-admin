import { defineStore } from "pinia";
import { api } from "../utils/api";
import { message, notification } from "ant-design-vue";
import router from "../router";
import useHelper from "./helper.pinia";

export interface UserInfo {
  birthDate: string;
  chatId: number;
  email: string;
  faceRegistered: boolean;
  name: string;
  phone: string;
  role: string;
  surname: string;
  userName: string;
  _id: string;
}

const useUser = defineStore("user", {
  state: () => ({
    user: {} as UserInfo,
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
      const helperStore = useHelper();

      api({
        url: "/api/users/login",
        method: "POST",
        data: form,
      })
        .then(({ data }) => {
          if (data.role === "admin" || data.role === "moderator") {
            localStorage.setItem("texnoBazaar", data.token);
            helperStore.token = data.token;
            message.success("Tizimga kirdingiz");
            router.push("/dashboard/users");
          } else {
            notification.error({
              message: "Ruxsat Berilmadi",
              description:
                "Siz bu platformaga kirishingiz uchun TexnoBazaar admini bo'lishingiz kerak !",
            });
            return;
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
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
          const errorMessage = error.response?.data.message || error;
          message.error(errorMessage);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getUsers({ page = 0, size = 10, search = undefined, role = undefined }) {
      this.loading = true;

      api({
        url: "/api/users/all/users",
        method: "GET",
        params: {
          page,
          size,
          search,
          role,
        },
      })
        .then(({ data }) => {
          this.allUsers = data.users;
          this.totalUsers = data.totalUsers;
          this.currentPage = page + 1;
          this.pageSize = size;
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
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
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
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
          this.getUsers({ page: 0 });
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error;
          message.error(errorMessage);
          console.error(error);
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
          this.getUsers({ page: 0 });
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          message.error(errorMessage);
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },
  },
});

export default useUser;
