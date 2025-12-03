import { defineStore } from "pinia";
import { api } from "../utils/api";
import { notification } from "ant-design-vue";

export interface models {
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

const useModels = defineStore("models", {
  state: () => ({
    models: [] as models[],
    loading: false,
    buttonLoading: false,
    form: {} as form,
  }),

  actions: {
    getModels() {
      this.loading = true;

      api({
        url: "/api/product/models",
        method: "GET",
      })
        .then(({ data }) => {
          this.models = data.models;
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

    createModel(callback: Function) {
      this.buttonLoading = true;

      api({
        url: "/api/product/create-model",
        method: "POST",
        data: {
          label: this.form.label,
          value: this.form.value,
        },
      })
        .then(({ data }) => {
          this.models.unshift(data.models);
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

    updateModel(callback: Function) {
      this.buttonLoading = true;

      api({
        url: `/api/product/update-model/${this.form.id}`,
        method: "PUT",
        data: {
          label: this.form.label,
          value: this.form.value,
        },
      })
        .then(() => {
          this.getModels();
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

    deleteModel(id: number) {
      this.loading = true;

      api({
        url: `/api/product/delete-model/${id}`,
        method: "DELETE",
      })
        .then(() => {
          this.getModels();
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
  },
});

export default useModels;
