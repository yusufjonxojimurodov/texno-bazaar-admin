<script setup lang="ts">
import { ref } from 'vue';
import { debounce } from '../../../utils/helpers/debounce';
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import IconSearch from '../../../components/icons/IconSearch.vue';

const { setQueries, getQueries } = useQueryParams()

const searchInput = ref(getQueries("search"))
const valueType = ref(getQueries('type'))
const valueModel = ref(getQueries('model'))
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

const handleSearch = debounce(({ target }: { target: any }) => {
    setQueries({
        search: target.value?.trim() || undefined
    })
}, 500)

function filterType(value: string) {
    setQueries({
        type: value || undefined
    })
}

function filterModel(value: string) {
    setQueries({
        model: value || undefined
    })
}
</script>

<template>
    <div class="flex justify-end items-center gap-3 !mb-3 flex-wrap">
        <a-input v-model:value="searchInput" @input="handleSearch" class="!w-[48%] md:!w-[180px]" size="large"
            placeholder="Qidirish..." >
            <template #addonAfter>
                <icon-search class="w-5 h-5 text-gray-500"/>
            </template>
        </a-input>
        <a-select v-model:value="valueType" @change="filterType" allow-clear class="!w-[48%] md:!w-[180px]"
            :options="types" size="large" placeholder="Turini tanlang" />
        <a-select v-model:value="valueModel" @change="filterModel" allow-clear class="!w-full md:!w-[180px]"
            :options="models" size="large" placeholder="Modelni tanlang" />
    </div>
</template>