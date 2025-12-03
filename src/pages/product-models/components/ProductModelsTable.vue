<script setup lang="ts">
import BaseTable from '../../../components/baseComponents/BaseTable.vue';
import { modelColumn } from '../../../columns/model.table';
import useModels from '../../../store/product.models.pinia';
import IconDelete from '../../../components/icons/IconDelete.vue';
import IconEdit from '../../../components/icons/IconEdit.vue';
import ModelsForm from './form/ModelsForm.vue';
import dayjs from 'dayjs';
import { ref } from 'vue';

const modelsStore = useModels()
const openEditModal = ref(false)

function openEditModalFunc(id: null | number, label: string, value: string) {
    modelsStore.form.id = id
    modelsStore.form.label = label
    modelsStore.form.value = value
    openEditModal.value = true
}

function deleteModel(id: number) {
    modelsStore.deleteModel(id)
}
</script>

<template>
    <base-table :show-pagination="false" :columns="modelColumn" :loading="modelsStore.loading" :data="modelsStore.models">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'label'">
                {{ record.label }}
            </template>
            <template v-else-if="column.dataIndex === 'value'">
                {{ record.value }}
            </template>
            <template v-else-if="column.dataIndex === 'created_at'">
                {{ dayjs(record.created_at).format("DD.MM.YYYY HH:mm") }}
            </template>
            <template v-else-if="column.dataIndex === 'updated_at'">
                {{ dayjs(record.updated_at).format("DD.MM.YYYY HH:mm") }}
            </template>
            <template v-else-if="column.dataIndex === 'actions'">
                <div class="flex justify-center items-center gap-2">
                    <a-button @click="openEditModalFunc(record.id, record.label, record.value)"
                        class="!rounded-full !w-8 !h-8 !flex !justify-center items-center" type="primary" size="small">
                        <template #icon>
                            <icon-edit class="w-5 h-5" />
                        </template>
                    </a-button>
                    <a-popconfirm @confirm="deleteModel(record.id)" title="O'chirishni hohlaysizmi" ok-text="Ha"
                        cancel-text="Yo'q">
                        <a-button danger type="primary" size="small"
                            class="!flex !rounded-full !justify-center !items-center !w-8 !h-8">
                            <template #icon>
                                <icon-delete class="w-5 h-5" />
                            </template>
                        </a-button>
                    </a-popconfirm>
                </div>
            </template>
        </template>
    </base-table>

    <models-form v-model:open="openEditModal" />
</template>