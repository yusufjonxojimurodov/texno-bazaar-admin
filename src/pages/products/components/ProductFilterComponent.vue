<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { debounce } from '../../../utils/helpers/debounce';
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import IconSearch from '../../../components/icons/IconSearch.vue';
import useTypes from '../../../store/product.types.pinia';
import useModels from '../../../store/product.models.pinia';

const { setQueries, getQueries } = useQueryParams()
const typesStore = useTypes()
const modelStore = useModels()

const searchInput = ref(getQueries("search"))
const valueType = ref(getQueries('type'))
const valueModel = ref(getQueries('model'))

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

onMounted(() => {
    typesStore.getTypes({})
    modelStore.getModels({})
})
</script>

<template>
    <div class="flex justify-end items-center gap-2 py-2 mb-4 flex-wrap">
        <a-input v-model:value="searchInput" @input="handleSearch" class="!w-full sm:!w-[220px]" size="large"
            placeholder="Qidirish..." >
            <template #addonAfter>
                <icon-search class="w-5 h-5 text-gray-500"/>
            </template>
        </a-input>
        <a-select v-model:value="valueType" @change="filterType" allow-clear class="!w-full sm:!w-[220px]"
            :options="typesStore.types" size="large" placeholder="Turini tanlang" />
        <a-select v-model:value="valueModel" @change="filterModel" allow-clear class="!w-full sm:!w-[220px]"
            :options="modelStore.models" size="large" placeholder="Modelni tanlang" />
    </div>
</template>