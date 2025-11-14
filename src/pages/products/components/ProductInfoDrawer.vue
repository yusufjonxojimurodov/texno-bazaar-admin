<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { notification } from 'ant-design-vue'
import IconEye from '../../../components/icons/IconEye.vue'
import IconEdit from '../../../components/icons/IconEdit.vue'
import useProduct from '../../../store/product.pinia'

const open = defineModel("open", { type: Boolean, default: false })

export interface Product {
    id: string
    name: string
    model: string
    status: 'ONSALE' | 'NOTFORSALE'
    type: string
    description: string
    price: number | null
    discount: number | null
    discount_price: number | null
    left: number | null
    created_by: {
        username: string
        id: string
    }
}

const props = defineProps<{ product: Product }>()
const productStore = useProduct()

const windowWidth = ref(window.innerWidth)
const isEditing = ref(false)

const editForm = reactive({
    name: '',
    model: '',
    type: '',
    description: '',
    price: null as number | null,
    discount: null as number | null,
    left: null as number | null,
})

watch(
    () => props.product,
    (val) => {
        if (val) {
            editForm.name = val.name
            editForm.model = val.model
            editForm.type = val.type
            editForm.description = val.description
            editForm.price = val.price
            editForm.discount = val.discount
            editForm.left = val.left
        }
    },
    { immediate: true }
)

const models = [
    { label: 'Samsung', value: 'Samsung' },
    { label: 'Xiaomi', value: 'Xiaomi' },
    { label: 'Apple', value: 'Apple' },
    { label: 'Google', value: 'Google' },
    { label: "Huawei", value: "Huawei" },
    { label: "Oppo", value: "Oppo" },
    { label: "Vivo", value: "Vivo" },
    { label: "Honor", value: "Honor" },
    { label: "Boshqalar", value: "Other" },
]

const types = [
    { label: 'Aqlli Soat', value: 'smartwatch' },
    { label: 'Smartfon', value: 'smartfon' },
    { label: 'Televizor', value: 'TV' },
    { label: 'Noutbook', value: 'laptop' },
    { label: 'Monitor', value: 'display' },
    { label: 'Klaviatura', value: 'keyboard' },
    { label: 'Sichqoncha', value: 'mouse' },
    { label: 'Kompyuter', value: 'computer' },
    { label: 'Quloqchin', value: 'headphones' },
    { label: 'Planshet', value: 'tablets' },
    { label: 'Zaryadlovchi qurilmalar', value: 'chargers' },
]

const statusMap = {
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
    window.open(`http://localhost:5173/product/info?productId=${id}`, "_blank")
}

function startEdit() {
    isEditing.value = true
}

function cancelEdit() {
    isEditing.value = false
}

function updateModel() {
    props.product.name = editForm.name
    props.product.model = editForm.model
    props.product.type = editForm.type
    props.product.description = editForm.description
    props.product.price = editForm.price
    props.product.discount = editForm.discount
    props.product.left = editForm.left
}

async function saveEdit(id: string | number) {
    await productStore.updateProduct({ ...editForm }, id, updateModel)
    isEditing.value = false
}
</script>

<template>
    <a-drawer :open="open" :width="windowWidth > 768 ? '50%' : '100%'" @close="open = false"
        title="Mahsulot ma'lumotlari" class="product-drawer">
        <a-card class="shadow-md rounded-2xl !bg-white">
            <div class="flex justify-between items-start mb-4">
                <div class="!w-full md:!w-[40%]">
                    <h2 v-if="!isEditing" class="text-2xl text-gray-800 !mb-1">{{ product.name }}</h2>
                    <a-input v-else size="middle" class="!w-full !text-[20px] !mb-2 !font-medium !text-gray-800"
                        v-model:value="editForm.name" />
                    <p class="text-gray-500 text-sm !p-0 !m-0">Model:
                        <template v-if="!isEditing">{{ product.model }}</template>
                        <a-select :options="models" v-else v-model:value="editForm.model" size="small"
                            class="!w-[100px]" />
                    </p>

                    <span @click="copyUser(product.id, 'product')"
                        class="font-mono text-gray-500 rounded-[10px] transition cursor-pointer duration-150 hover:bg-gray-200">ID:
                        {{
                            product.id }}</span>
                </div>

                <a-tag class="!text-[15px] !px-4 !py-1" :color="statusMap[product.status].color">
                    {{ statusMap[product.status].text }}
                </a-tag>
            </div>

            <div class="bg-gray-50 rounded-lg p-3 mb-5">
                <template v-if="!isEditing">
                    <p class="text-gray-700 leading-relaxed">
                        {{ product.description }}
                    </p>
                </template>
                <template v-else>
                    <a-textarea v-model:value="editForm.description" :rows="3" />
                </template>
            </div>

            <div class="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
                <div>
                    <span class="block text-sm text-gray-500">Mahsulot turi</span>
                    <template v-if="!isEditing">
                        <span class="font-semibold text-[15px]">{{ product.type }}</span>
                    </template>
                    <a-select class="!w-full" :options="types" v-else v-model:value="editForm.type" />
                </div>

                <div>
                    <span class="block text-sm text-gray-500">Qoldiq soni</span>
                    <template v-if="!isEditing">
                        <span class="font-semibold text-[15px]">{{ product.left }} ta</span>
                    </template>
                    <a-input-number v-else v-model:value="editForm.left" class="!w-full" />
                </div>

                <div>
                    <span class="block text-sm text-gray-500">Asosiy narx</span>
                    <template v-if="!isEditing">
                        <span class="font-semibold text-blue-600 text-[15px]">{{ product.price }} $</span>
                    </template>
                    <a-input-number v-else v-model:value="editForm.price" class="!w-full" addon-after="$" />
                </div>

                <div>
                    <span class="block text-sm text-gray-500">Chegirma</span>
                    <template v-if="!isEditing">
                        <span class="font-semibold text-green-600 text-[15px]">{{ product.discount }} %</span>
                    </template>
                    <a-input-number v-else v-model:value="editForm.discount" class="!w-full" addon-after="%" />
                </div>

                <div>
                    <span class="block text-sm text-gray-500">Chegirmali narx</span>
                    <span class="font-semibold text-red-500 text-[15px]">{{ product.discount_price }} $</span>
                </div>
            </div>

            <a-divider class="!my-6" />

            <div class="flex items-start justify-between">
                <div>
                    <span class="block text-gray-500 text-sm !m-0 !p-0">Mahsulot egasi</span>
                    <a-tag color="blue" class="!text-[10px] !px-2 !py-0 md:!text-[14px] md:!px-4 md:!py-2 font-medium">
                        {{ product.created_by.username }}
                    </a-tag>
                </div>

                <div class="flex justify-center items-end gap-1 flex-col">
                    <div @click="copyUser(product.created_by.id, 'seller')">
                        <span
                            class="font-mono text-gray-500 text-[12px] md:text-[14px] md:!px-2 md:!py-[4px] rounded-[10px] transition cursor-pointer duration-150 hover:bg-gray-200">ID:
                            {{ product.created_by.id }}</span>
                    </div>

                    <div class="flex justify-end items-center gap-2">
                        <template v-if="!isEditing">
                            <a-button type="primary" :size="windowWidth > 768 ? 'middle' : 'small'" @click="startEdit">
                                <template #icon>
                                    <icon-edit class="w-4 h-4 md:w-5 md:h-5" />
                                </template>
                            </a-button>
                            <a-button @click="viewProduct(product.id)" type="primary"
                                :size="windowWidth > 768 ? 'middle' : 'small'">
                                <template #icon>
                                    <icon-eye class="w-4 h-4 md:w-5 md:h-5" />
                                </template>
                            </a-button>
                        </template>

                        <template v-else>
                            <a-button danger @click="cancelEdit">Bekor qilish</a-button>
                            <a-button :loading="productStore.buttonLoader" type="primary"
                                @click="saveEdit(product.id)">Saqlash</a-button>
                        </template>
                    </div>
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
