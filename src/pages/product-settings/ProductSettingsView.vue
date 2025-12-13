<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import useModels from '../../store/product.models.pinia';
import useTypes from '../../store/product.types.pinia';
import { useQueryParams } from '../../utils/helpers/useQueryParams';
import ProductModelsView from './components/product-model/ProductModelsView.vue';
import ProductTypesView from './components/product-types/ProductTypesView.vue';
import ProductSettingsFitler from './components/ProductSettingsFilter.vue';
import { useRoute } from 'vue-router';

const { getQueries } = useQueryParams()
const modelsStore = useModels()
const typesStore = useTypes()
const route = useRoute()

const tabsValue = computed(() => getQueries("tab") || '1')

watch(() => route.query, () => {
    const searchValue = ref(getQueries("search"))
    if (tabsValue.value === '1') {
        modelsStore.getModels({ search: searchValue.value })
    } else {
        typesStore.getTypes({ search: searchValue.value })
    }
}, { immediate: true })
</script>

<template>
    <product-settings-fitler />
    <product-models-view v-if="tabsValue === '1'" />
    <product-types-view v-else/>
</template>