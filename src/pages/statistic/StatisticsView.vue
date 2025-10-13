<script setup lang="ts">
import { watch } from 'vue';
import useStatistic from '../../store/statistic.pinia';
import StatisticDiagrammApex from './components/StatisticDiagrammApex.vue';
import StatisticFilterComponent from './components/StatisticFilterComponent.vue';
import { useRoute } from 'vue-router';
import { useQueryParams } from '../../utils/helpers/useQueryParams';

const route = useRoute()
const statisticStore = useStatistic()
const { getQueries } = useQueryParams()

watch(() => route.query, () => {
    statisticStore.getStatistic({
        month: getQueries("month"),
        year: getQueries("year")
    })
}, { immediate: true })
</script>

<template>
    <a-spin :spinning="statisticStore.loading" size="middle">
        <statistic-filter-component />
        <statistic-diagramm-apex />
    </a-spin>
</template>