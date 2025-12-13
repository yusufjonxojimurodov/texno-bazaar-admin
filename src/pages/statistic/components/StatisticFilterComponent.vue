<script setup lang="ts">
import { computed } from 'vue';
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import useStatistic from '../../../store/statistic.pinia';

const statisticStore = useStatistic()

const { setQueries, getQueries } = useQueryParams()
const yearValue = computed({
    get() {
        return getQueries("year") || statisticStore.graphInfo?.year?.toString() || "2025"
    },
    set(value) {
        setQueries({ year: value })
    }
})

const monthValue = computed({
    get() {
        return getQueries("month")
            || statisticStore.graphInfo?.month?.toString()
            || "1"
    },
    set(value) {
        setQueries({ month: value })
    }
})


const yearOptions = [
    {
        label: "2026",
        value: "2026"
    },
    {
        label: "2025",
        value: "2025"
    }
]

const monthOptions = [
    {
        label: "Yanvar",
        value: "1"
    },
    {
        label: "Fevral",
        value: "2"
    },
    {
        label: "Mart",
        value: "3"
    },
    {
        label: "Aprel",
        value: "4"
    },
    {
        label: "May",
        value: "5"
    },
    {
        label: "Iyun",
        value: "6"
    },
    {
        label: "Iyul",
        value: "7"
    },
    {
        label: "Avgust",
        value: "8"
    },
    {
        label: "Sentyabr",
        value: "9"
    },
    {
        label: "Oktyabr",
        value: "10"
    },
    {
        label: "Noyabr",
        value: "11"
    },
    {
        label: "Dekabr",
        value: "12"
    },
]

function year(value: any) {
    setQueries({
        year: value
    })
}

function month(value: any) {
    setQueries({
        month: value
    })
}
</script>

<template>
    <div class="flex justify-end items-center gap-2 py-2 mb-4 flex-wrap">
        <a-select v-model:value="yearValue" @change="year" size="large" class="!w-full sm:!w-[220px]" allow-clear
            :options="yearOptions" placeholder="Yilni tanlang" />
        <a-select v-model:value="monthValue" @change="month" size="large" class="!w-full sm:!w-[220px]" allow-clear
            :options="monthOptions" placeholder="Oyni tanlang" />
    </div>
</template>