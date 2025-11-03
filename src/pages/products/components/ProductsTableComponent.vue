<script setup lang="ts">
import { reactive, ref } from 'vue';
import { productColumn } from '../../../columns/product.table';
import BaseTable from '../../../components/baseComponents/BaseTable.vue';
import useProduct from '../../../store/product.pinia';
import IconDelete from '../../../components/icons/IconDelete.vue';
import IconCheck from '../../../components/icons/IconCheck.vue';
import IconCancel from '../../../components/icons/IconCancel.vue';
import IconInfo from '../../../components/icons/IconInfo.vue';
import ProductInfoDrawer from './ProductInfoDrawer.vue';
import type { Product } from './ProductInfoDrawer.vue';

const productStore = useProduct()

const loadingMap = reactive<{ [key: string]: boolean }>({})
const openInfoDrawer = ref<boolean>(false)

const productInfo = ref<Product>({
    _id: "",
    name: "",
    model: "",
    status: "ONSALE",
    type: "",
    description: "",
    price: null,
    discount: null,
    discountPrice: null,
    left: null,
    createdBy: {
        userName: "",
        _id: ""
    }
})

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

async function changeStatus(id: string, status: string) {
    const newStatus = status === 'ONSALE' ? 'NOTFORSALE' : 'ONSALE'

    loadingMap[id] = true
    try {
        await productStore.changeStatus(id, newStatus)
    } finally {
        loadingMap[id] = false
    }
}

function openDrawer(record: any) {
    productInfo.value = record as Product
    openInfoDrawer.value = true
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
                    <a-button :loading="loadingMap[record._id]" @click="changeStatus(record._id, record.status)"
                        type="primary" size="small"
                        :class="record.status === 'ONSALE' ? '!bg-[#2ead00]' : '!bg-[#ff0000]'"
                        class="!flex !w-7 !h-7 !rounded-full !justify-center !bg-none hover:!bg-none !items-center">
                        <template #icon>
                            <component :is="record.status === 'ONSALE' ? IconCheck : IconCancel" class="w-5 h-5" />
                        </template>
                    </a-button>
                    <a-button @click="openDrawer(record)" type="primary" size="small"
                        class="!flex !justify-center !items-center !rounded-full !w-7 !h-7">
                        <template #icon>
                            <icon-info class="w-8 h-8" />
                        </template>
                    </a-button>
                    <a-popconfirm :disabled="record.role === 'admin'" @confirm="deleteProduct(record._id)" ok-text="Ha"
                        cancel-text="Yo'q" title="O'chirishga rozimisiz?">
                        <a-button :disabled="record.role === 'admin'" danger type="primary" size="small"
                            class="!flex !rounded-full !justify-center !items-center !w-7 !h-7">
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

    <product-info-drawer v-model:open="openInfoDrawer" :product="productInfo" />
</template>