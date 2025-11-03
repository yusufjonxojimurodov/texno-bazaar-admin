<script setup lang="ts">
import IconDelete from "../../components/icons/IconDelete.vue";
import IconEdit from "../../components/icons/IconEdit.vue";
import BaseTable from "../../components/baseComponents/BaseTable.vue";
import { productColumns } from "../../columns/product.table";
import EditProductModal from "./components/formproducts/EditProductModal.vue";
import { ref } from "vue";

// store
import useProduct from "../../store/product.pinia";

const productStore = useProduct();
const openEditModal = ref(false);

const handlePageChange = (pag: any) => {
  const page = pag.current ? pag.current - 1 : 0;
  const size = pag.pageSize || 10;
  productStore.getProducts(page, size);
};

function openModalEdit(id: number) {
  // query qo'shish mumkin
  openEditModal.value = true;
}

const deleteProduct = (id: number) => {
  productStore.deleteProduct(id);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};
</script>

<template>
  <base-table
    @pageChange="handlePageChange"
    :data="productStore.allProducts"
    :columns="productColumns"
    :loading="productStore.loading"
    :total="productStore.totalProducts"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'colIndex'">
        {{ (productStore.currentPage - 1) * productStore.pageSize + index + 1 }}
      </template>

      <template v-else-if="column.dataIndex === 'image'">
        <div class="!flex !justify-center items-center">
          <a-image
            :src="record.image"
            :width="50"
            :height="50"
            style="border-radius: 8px; object-fit: cover"
          />
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'actions'">
        <a-space>
          <a-button
            @click="openModalEdit(record._id)"
            class="!flex !justify-center items-center"
            type="primary"
            size="middle"
          >
            <template #icon>
              <icon-edit class="w-5 h-5" />
            </template>
          </a-button>

          <a-popconfirm
            @confirm="deleteProduct(record._id)"
            ok-text="Ha"
            cancel-text="Yo'q"
            title="Mahsulotni o'chirishga rozimisiz?"
          >
            <a-button
              danger
              type="primary"
              size="middle"
              class="!flex !justify-center !items-center"
            >
              <template #icon>
                <icon-delete class="w-5 h-5" />
              </template>
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>

      <template v-else>
        {{ record[column.dataIndex] }}
      </template>
    </template>
  </base-table>

  <edit-product-modal v-model:open="openEditModal" />
</template>
