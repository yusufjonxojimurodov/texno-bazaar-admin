<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TablePaginationConfig } from 'ant-design-vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    total: {
        type: Number,
        default: 0
    },
    pageSize: {
        type: Number,
        default: 10
    },
    showPagination: {     
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['pageChange'])

const getPagination = () => {
    return props.showPagination
        ? {
              current: 1,
              pageSize: props.pageSize,
              total: props.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total: number) => `Jami ${total} ta yozuv`
          }
        : false
}

const pagination = ref<TablePaginationConfig | false>(getPagination())

watch(
    () => props.total,
    (newVal) => {
        if (pagination.value && typeof pagination.value !== 'boolean') {
            pagination.value.total = newVal
        }
    }
)

watch(
    () => props.showPagination,
    () => {
        pagination.value = getPagination()
    }
)


const handleTableChange = (pag: TablePaginationConfig) => {
    pagination.value = pag
    emit('pageChange', pag)
}
</script>

<template>
   <a-table
        :scroll="{ x: 'max-content' }"
        :data-source="props.data"
        :columns="props.columns"
        :loading="props.loading"
        :pagination="pagination"
        @change="handleTableChange"
        bordered
    >
        <template #bodyCell="{ column, record, index }">
            <slot name="bodyCell" :column="column" :record="record" :index="index" />
        </template>
    </a-table>
</template>