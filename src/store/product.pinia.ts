import { defineStore } from "pinia";
import { api } from "../utils/api";
import { message } from "ant-design-vue";

const useProduct = defineStore("product", {
  state: () => ({
    products: [],
    totalPages: 0,
    pageSize: 10,
    totalProducts: undefined,
    loading: false,
    buttonLoader: false,
  }),

  actions: {
    getProduct({
      page = 0,
      size = 10,
      search = undefined,
      model = undefined,
      type = undefined,
    }) {
      this.loading = true;

      api({
        url: "/api/products/products/admin",
        method: "GET",
        params: {
          page,
          size,
          search,
          model,
          type,
        },
      })
        .then(({ data }) => {
          this.products = data.products;
          this.totalPages = data.totalPages;
          this.totalProducts = data.totalProducts;
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || "Tizimda xatolik";
          message.error(errorMessage);
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    deleteProduct(id: number) {
      this.buttonLoader = true;

      api({
        url: `/api/products/my/${id}`,
        method: "DELETE",
      })
        .then(() => {
          message.success("Mahsulot o'chirildi");
          this.getProduct({ page: 0, size: 10 });
        })
        .catch((error) => {
          const errorMessage =
            error.response.data?.message || "Tizimda xatolik";
          message.error(errorMessage);
          console.log(error);
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },
  },
});

export default useProduct;
