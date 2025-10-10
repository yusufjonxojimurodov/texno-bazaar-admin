<script setup lang="ts">
import { watch } from 'vue';
import useProduct from '../../store/product.pinia';
import ProductsTableComponent from './components/ProductsTableComponent.vue';
import ProductFilterComponent from './components/ProductFilterComponent.vue';
import { useRoute } from 'vue-router';
import { useQueryParams } from '../../utils/helpers/useQueryParams';

const productStore = useProduct()
const { getQueries } = useQueryParams()
const route = useRoute()

watch(() => route.query, () => {
    productStore.getProduct({
        page: 0,
        size: 10,
        search: getQueries('search') || undefined,
        type: getQueries('type') || undefined,
        model: getQueries('model') || undefined,
    })
}, { immediate: true })
</script>

<template>
    <product-filter-component />
    <products-table-component />
</template>