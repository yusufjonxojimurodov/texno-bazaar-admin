<script setup lang="ts">
import { ref } from 'vue';
import IconSearch from '../../../components/icons/IconSearch.vue';
import PlusIcon from '../../../components/icons/PlusIcon.vue';
import TypesForm from './form/TypesForm.vue';
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import { debounce } from '../../../utils/helpers/debounce';

const { setQueries, getQueries } = useQueryParams()

const openCreateModal = ref(false)
const searchValue = ref(getQueries("search") || undefined)

const handleSearch = debounce(({ target }: { target: any }) => {
    setQueries({
        search: target.value?.trim() || undefined
    })
}, 500)
</script>

<template>
    <div class="flex justify-end items-center gap-2 py-2 mb-4">
        <a-input @input="handleSearch" v-model:value="searchValue" placeholder="Qidiring..." size="large" class="!w-[180px]">
            <template #addonAfter>
                <icon-search class="w-5 h-5 text-gray-500" />
            </template>
        </a-input>
        <a-button @click="openCreateModal = !openCreateModal" class="!w-[120px] !flex gap-2" type="primary"
            size="large">
            <template #icon>
                <plus-icon class="w-5 h-5" />
                Qo'shish
            </template>
        </a-button>
    </div>

    <types-form v-model:open="openCreateModal" />
</template>