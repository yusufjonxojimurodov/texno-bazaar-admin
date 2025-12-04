<script setup lang="ts">
import { ref } from 'vue';
import IconSearch from '../../../components/icons/IconSearch.vue';
import PlusIcon from '../../../components/icons/PlusIcon.vue';
import ModelsForm from './product-model/form/ModelsForm.vue';
import TypesForm from './product-types/form/TypesForm.vue';
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import { debounce } from '../../../utils/helpers/debounce';

const { setQueries, getQueries } = useQueryParams()

const openCreateModalModels = ref(false)
const openCreateModalTypes = ref(false)
const searchValue = ref(getQueries("search") || undefined)

const tabsValue = ref(getQueries("tab") || "1")

function handleTabChange(val: string) {
  tabsValue.value = val
  setQueries({ tab: val })
}

const handleSearch = debounce(({ target }: { target: any }) => {
    setQueries({
        search: target.value?.trim() || undefined
    })
}, 500)
</script>

<template>
    <div class="flex justify-between items-center flex-wrap">
        <a-tabs 
            v-model:activeKey="tabsValue"
            @change="handleTabChange"
            size="large"
        >
            <a-tab-pane key="1" tab="Mahsulot modellari"></a-tab-pane>
            <a-tab-pane key="2" tab="Mahsulot turlari"></a-tab-pane>
        </a-tabs>
        <div class="flex justify-end items-center gap-2 py-2 mb-4 ">
            <a-input @input="handleSearch" v-model:value="searchValue" placeholder="Qidiring..." size="large"
                class="!w-full sm:!w-[220px]">
                <template #addonAfter>
                    <icon-search class="w-5 h-5 text-gray-500" />
                </template>
            </a-input>
            <a-button @click="tabsValue === '1' ? openCreateModalModels = true : openCreateModalTypes = true"
                class="w-[60px] md:!w-[120px] !flex gap-2" type="primary" size="large">
                <template #icon>
                    <plus-icon class="w-5 h-5" />
                </template>
                <span class="!hidden sm:!block">Qo'shish</span>
            </a-button>
        </div>
    </div>

    <models-form v-model:open="openCreateModalModels" />
    <types-form v-model:open="openCreateModalTypes" />
</template>