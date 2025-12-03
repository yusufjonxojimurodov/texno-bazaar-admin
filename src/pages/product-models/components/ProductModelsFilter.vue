<script setup lang="ts">
import { ref } from 'vue';
import IconSearch from '../../../components/icons/IconSearch.vue';
import PlusIcon from '../../../components/icons/PlusIcon.vue';
import ModelsForm from './form/ModelsForm.vue';

const openCreateModal = ref(false)
</script>

<template>
    <div class="flex justify-end items-center gap-2 py-2 mb-4">
        <a-input placeholder="Qidiring..." size="large" class="!w-[180px]">
            <template #addonAfter>
                <icon-search class="w-5 h-5 text-gray-500" />
            </template>
        </a-input>
        <a-button @click="openCreateModal = !openCreateModal" class="!w-[120px] !flex gap-2" type="primary" size="large">
            <template #icon>
                <plus-icon class="w-5 h-5" />
                Qo'shish
            </template>
        </a-button>
    </div>

    <models-form v-model:open="openCreateModal"/>
</template>