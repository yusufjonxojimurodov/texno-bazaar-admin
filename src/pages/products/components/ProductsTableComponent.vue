<script setup lang="ts">
import BaseTable from '../../../components/baseComponents/BaseTable.vue';
import useProduct from '../../../store/product.pinia';
import { productColumn } from '../../../columns/product.table';
import IconDelete from '../../../components/icons/IconDelete.vue';

const productStore = useProduct()

const handlePageChange = (pag: any) => {
    const page = pag.current ? pag.current - 1 : 0
    const size = pag.pageSize || 0
    productStore.getProduct({ page, size })
}

function deleteProduct(id: number) {
    productStore.deleteProduct(id)
    return new Promise(resolve => {
        setTimeout(() => resolve(true), 3000);
    });
}
</script>

<template>
    <base-table :loading="productStore.loading" @page-change="handlePageChange" :data="productStore.products"
        :columns="productColumn">
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'colIndex'">
                <span class="!text-center">{{ (productStore.totalPages - 1) * productStore.pageSize + index + 1
                    }}</span>
            </template>
            <template v-else-if="column.dataIndex === 'description'">
                <p class="w-50 !m-0 !p-0"> {{ record.description }}</p>
            </template>
            <template v-else-if="column.dataIndex === 'createdBy'">
                <a target="_blank" :href="`https://t.me/${record.createdBy.userName}`" class="!m-0 !p-0">{{
                    record.createdBy.userName
                    }}</a>
            </template>
            <template v-else-if="column.dataIndex === 'price'">
                {{ record.price }}$
            </template>
            <template v-else-if="column.dataIndex === 'discount'">
                <div class="flex justify-center items-center">
                    <a-tag color="success" v-if="record.discount > 5">
                        <span class="!text-[14px] !font-semibold">
                            {{ record.discount }}%
                        </span>
                    </a-tag>
                    <a-tag color="error" v-else>
                        <span class="!text-[14px] !font-semibold">
                            {{ record.discount ? record.discount : '0' }}%
                        </span>
                    </a-tag>
                </div>
            </template>
            <template v-else-if="column.dataIndex === 'discountPrice'">
                {{ record.discountPrice }}$
            </template>
            <template v-else-if="column.dataIndex === 'actions'">
                <div class="flex justify-center items-center gap-2">
                    <a-popconfirm :disabled="record.role === 'admin'" @confirm="deleteProduct(record._id)" ok-text="Ha"
                        cancel-text="Yo'q" title="O'chirishga rozimisiz?">
                        <a-button :disabled="record.role === 'admin'" danger type="primary" size="small"
                            class="!flex !justify-center !items-center">
                            <template #icon>
                                <icon-delete class="w-5 h-5" />
                            </template>
                        </a-button>
                    </a-popconfirm>
                </div>
            </template>
            <template v-else>
                {{ record[column.dataIndex] }}
            </template>
        </template>
    </base-table>
</template>