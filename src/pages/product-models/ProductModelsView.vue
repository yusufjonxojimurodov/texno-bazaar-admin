<script setup lang="ts">
import { onMounted } from 'vue';
import useModels from '../../store/product.models.pinia';
import ProductModelsTable from './components/ProductModelsTable.vue';
import ProductModelsFilter from './components/ProductModelsFilter.vue';

const modelsStore = useModels()

onMounted(() => {
    modelsStore.getModels()
})
</script>

<template>
    <product-models-filter />
    <product-models-table />
</template>