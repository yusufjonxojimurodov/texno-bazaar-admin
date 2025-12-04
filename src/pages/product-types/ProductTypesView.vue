<script setup lang="ts">
import { watch } from 'vue';
import ProductTypesTable from './components/ProductTypesTable.vue';
import ProductTypesFilter from './components/ProductTypesFilter.vue';
import { useQueryParams } from '../../utils/helpers/useQueryParams';
import { useRoute } from 'vue-router';
import useTypes from '../../store/product.types.pinia';

const typesStore = useTypes()
const { getQueries } = useQueryParams()
const route = useRoute()

watch(() => route.query, () => {
    const search = getQueries("search") || undefined
    typesStore.getTypes({ search: search })
}, { immediate: true })
</script>

<template>
    <product-types-filter />
    <product-types-table />
</template>