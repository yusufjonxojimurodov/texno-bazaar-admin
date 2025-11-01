<script setup lang="ts">
import { notification } from 'ant-design-vue'
import IconEye from '../../../components/icons/IconEye.vue'
import { ref } from 'vue'

const open = defineModel("open", { type: Boolean, default: false })

const windowWidth = ref(window.innerWidth)

export interface Product {
    _id: string
    name: string
    model: string
    status: 'ONSALE' | 'NOTFORSALE'
    type: string
    description: string
    price: number | null
    discount: number | null
    discountPrice: number | null
    left: number | null
    createdBy: {
        userName: string
        _id: string
    }
}

const props = defineProps<{ product: Product }>()

console.log(props)

const statusMap: Record<'ONSALE' | 'NOTFORSALE', { color: string; text: string }> = {
    ONSALE: { color: 'success', text: "Sotuvda" },
    NOTFORSALE: { color: 'error', text: "Sotuvda emas" },
}

function copyUser(id: string, type: string) {
    navigator.clipboard.writeText(id)
    notification.success({
        message: type === 'product' ? "Mahsulotning ID nusxalandi" : "Sotuvchining ID nusxalandi"
    })
}

function viewProduct(id: String) {
    window.open(`https://texnobazaar.netlify.app/product/info?productId=${id}`, "_blank")
}
</script>

<template>
    <a-drawer :open="open" :width="windowWidth > 768 ? '45%' : '100%'" @close="open = false"
        title="Mahsulot ma'lumotlari" class="product-drawer">
        <a-card class="shadow-md rounded-2xl !bg-white">
            <div class="flex justify-between items-start mb-4">
                <div class="!w-full md:!w-[150px]">
                    <h2 class="text-2xl font-bold text-gray-800 !mb-1">{{ product.name }}</h2>
                    <p class="text-gray-500 text-sm !p-0 !m-0">Model: <span class="font-medium">{{ product.model
                    }}</span></p>
                    <span @click="copyUser(product._id, 'product')"
                        class="font-mono text-gray-500 rounded-[10px] transition cursor-pointer duration-150 hover:bg-gray-200">ID:{{
                            product._id }}</span>
                </div>
                <a-tag class="!text-[15px] !px-4 !py-1" :color="statusMap[product.status].color">
                    {{ statusMap[product.status].text }}
                </a-tag>
            </div>

            <div class="bg-gray-50 rounded-lg p-3 mb-5">
                <p class="text-gray-700 leading-relaxed">
                    {{ product.description }}
                </p>
            </div>

            <div class="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
                <div>
                    <span class="block text-sm text-gray-500">Mahsulot turi</span>
                    <span class="font-semibold text-[15px]">{{ product.type }}</span>
                </div>

                <div>
                    <span class="block text-sm text-gray-500">Qoldiq soni</span>
                    <span class="font-semibold text-[15px]">{{ product.left }} ta</span>
                </div>

                <div>
                    <span class="block text-sm text-gray-500">Asosiy narx</span>
                    <span class="font-semibold text-blue-600 text-[15px]">{{ product.price }} $</span>
                </div>

                <div>
                    <span class="block text-sm text-gray-500">Chegirma</span>
                    <span class="font-semibold text-green-600 text-[15px]">{{ product.discount }} %</span>
                </div>

                <div>
                    <span class="block text-sm text-gray-500">Chegirmali narx</span>
                    <span class="font-semibold text-red-500 text-[15px]">{{ product.discountPrice }} $</span>
                </div>
            </div>

            <a-divider class="!my-6" />

            <div class="flex items-start justify-between">
                <div>
                    <span class="block text-gray-500 text-sm !m-0 !p-0">Mahsulot egasi</span>
                    <a-tag color="blue" class="!text-[10px] !px-2 !py-0 md:!text-[14px] md:!px-4 md:!py-2 font-medium">
                        {{ product.createdBy.userName }}
                    </a-tag>
                </div>

                <div class="flex justify-center items-end gap-1 flex-col">
                    <div @click="copyUser(product.createdBy._id, 'seller')">
                        <span
                            class="font-mono text-gray-500 text-[12px] md:text-[14px] md:!px-2 md:!py-[4px] rounded-[10px] transition cursor-pointer duration-150 hover:bg-gray-200">ID:{{
                                product.createdBy._id }}</span>
                    </div>
                    <a-button @click="viewProduct(product._id)" type="primary"
                        :size="windowWidth > 768 ? 'middle' : 'small'">
                        <template #icon>
                            <icon-eye class="w-4 h-4 md:w-5 md:h-5" />
                        </template>
                    </a-button>
                </div>
            </div>
        </a-card>
    </a-drawer>
</template>

<style scoped>
.product-drawer :deep(.ant-drawer-body) {
    background-color: #f9fafb;
    padding-top: 16px !important;
}
</style>
