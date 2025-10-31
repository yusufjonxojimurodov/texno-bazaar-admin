import { defineStore } from "pinia";
import { api } from "../utils/api";
import { notification } from "ant-design-vue";

export interface products {
  _id: String;
  name: String;
  description: String;
  price: Number | null;
  model: String;
  type: String;
  left: Number | null;
  discount: Number | null;
  discountPrice: Number | null;
  createdBy: Object;
  status: String;
}

const useProduct = defineStore("product", {
  state: () => ({
    products: [] as products[],
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
          const errorMessage = error.response?.data.message || error;
          notification.error({
            message: errorMessage,
          });
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
          notification.success({
            message: "Mahsulot o'chirildi",
          });
          this.getProduct({ page: 0, size: 10 });
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

    async changeStatus(id: string, status: string) {
      this.buttonLoader = true;

      return api({
        url: `/api/products/${id}/status`,
        method: "PUT",
        data: {
          status: status,
        },
      })
        .then(({ data }) => {
          const updatedProduct = data?.product;

          const index = this.products.findIndex((item) => item._id === id);
          this.products[index] &&
            (this.products[index]!.status = updatedProduct?.status || status);

          notification.success({
            message:
              status === "ONSALE"
                ? "Mahsulot sotuvga qo'yildi"
                : "Mahsulot sotuvdan olib tashlandi",
          });
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

export default useProduct;
