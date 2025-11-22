import { defineStore } from "pinia";
import { api } from "../utils/api";
import { notification } from "ant-design-vue";
import useHelper from "./helper.pinia";
import router from "../router";

export interface UserInfo {
  birth_date: string;
  chatId: number;
  email: string;
  faceRegistered: boolean;
  name: string;
  phone: string;
  role: string;
  surname: string;
  username: string;
  id: string | number | null;
}

const useUser = defineStore("user", {
  state: () => ({
    user: {} as UserInfo,
    allUsers: [] as UserInfo[],
    userModel: {
      id: "",
      name: "",
      surname: "",
      phone: "",
      email: "",
      username: "",
      password: "",
    },
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
            notification.success({
              message: "Xush kelibsiz !",
            });
            router.push("/");
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
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getMe() {
      api({
        url: "/api/users/getUserMe",
        method: "GET",
      })
        .then(({ data }) => {
          this.user = data;
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        });
    },

    updateMe(form: any, callback: Function) {
      this.buttonLoader = true;

      api({
        url: `/api/users/update-profile`,
        method: "PUT",
        data: form,
      })
        .then(() => {
          this.getMe();
          notification.success({
            message: "Ma'lumotlaringiz yangilandi",
          });
          callback?.();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },

    updateModeratorPermission(
      id: string | number,
      permission: object,
      callback: Function
    ) {
      this.buttonLoader = true;

      api({
        url: `/api/users/permissions/moderator/${id}`,
        method: "PUT",
        data: permission,
      })
        .then(() => {
          notification.success({
            message: "Moderator huquqlari o'zgartirildi",
          });

          callback?.();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },

    updatePassword(password: Object, callback: Function) {
      this.buttonLoader = true;

      api({
        url: "/api/users/update-profile",
        method: "PUT",
        data: password,
      })
        .then(() => {
          notification.success({
            message: "Parol yangilandi",
          });
          callback?.();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.buttonLoader = false;
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
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    createUser(form: object, callback: Function) {
      this.buttonLoader = true;

      api({
        url: "/api/users/register",
        method: "POST",
        data: form,
      })
        .then(({ data }) => {
          this.allUsers.unshift(data.user);
          notification.success({
            message: "Foydalanuvchi yaratildi",
          });
          callback?.();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },

    async putUser(
      form: object,
      id: number | null | string,
      callback: Function
    ) {
      this.buttonLoader = true;

      return api({
        url: `/api/users/admin/update-user/${id}`,
        method: "PUT",
        data: form,
      })
        .then(() => {
          notification.success({
            message: "Foydalanuvchi ma'lumotlari yangilandi",
          });
          callback?.();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
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
          notification.success({
            message: "Foydalanuvchi darajasi o'zgartirildi",
          });
          this.getUsers({ page: 0 });
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
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
          notification.success({
            message: "Foydalanuvchi ma'lumotlari o'chirildi",
          });
          this.getUsers({ page: 0 });
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },
  },
});

export default useUser;
