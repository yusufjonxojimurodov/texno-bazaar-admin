<script setup lang="ts">
import { watch } from 'vue';
import useModels from '../../store/product.models.pinia';
import ProductModelsTable from './components/ProductModelsTable.vue';
import ProductModelsFilter from './components/ProductModelsFilter.vue';
import { useQueryParams } from '../../utils/helpers/useQueryParams';
import { useRoute } from 'vue-router';

const modelsStore = useModels()
const { getQueries } = useQueryParams()
const route = useRoute()

watch(() => route.query, () => {
    const search = getQueries("search") || undefined
    modelsStore.getModels({ search: search })
}, { immediate: true })
</script>

<template>
    <product-models-filter />
    <product-models-table />
</template>