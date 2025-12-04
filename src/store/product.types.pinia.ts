import { defineStore } from "pinia";
import { api } from "../utils/api";
import { notification } from "ant-design-vue";

export interface types {
  label: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface form {
  id: null | number;
  label: string;
  value: string;
}

const useTypes = defineStore("types", {
  state: () => ({
    types: [] as types[],
    loading: false,
    buttonLoading: false,
    form: {} as form,
  }),

  actions: {
    getTypes({ search = undefined }) {
      this.loading = true;

      api({
        url: "/api/product/types",
        method: "GET",
        params: {
          search,
        },
      })
        .then(({ data }) => {
          this.types = data.types;
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    createType(callback: Function) {
      this.buttonLoading = true;

      api({
        url: "/api/product/create-type",
        method: "POST",
        data: {
          label: this.form.label,
          value: this.form.value,
        },
      })
        .then(({ data }) => {
          this.types.unshift(data.type);
          callback?.();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
          console.error(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },

    updateType(callback: Function) {
      this.buttonLoading = true;

      api({
        url: `/api/product/update-type/${this.form.id}`,
        method: "PUT",
        data: {
          label: this.form.label,
          value: this.form.value,
        },
      })
        .then(() => {
          this.getTypes({});
          callback?.();
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
          console.error(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },

    deleteType(id: number) {
      this.loading = true;

      api({
        url: `/api/product/delete-type/${id}`,
        method: "DELETE",
      })
        .then(() => {
          this.getTypes({});
        })
        .catch((error) => {
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export default useTypes;
