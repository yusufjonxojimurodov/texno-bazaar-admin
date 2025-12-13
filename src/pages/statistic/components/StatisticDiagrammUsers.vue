<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useStatistic from '../../../store/statistic.pinia';
import { computed } from 'vue';
import ApexChart from "vue3-apexcharts";

const statisticStore = useStatistic()
const { usersStats } = storeToRefs(statisticStore)

const seriesCount = computed(() => {
    if (!usersStats.value) return []

    return [
        usersStats.value.totalUsersCount ?? 0,
        usersStats.value.customerCount ?? 0,
        usersStats.value.sellerCount ?? 0,
        usersStats.value.moderatorCount ?? 0,
        usersStats.value.blockedCount ?? 0
    ]
})

const chartOptions = computed(() => ({
    chart: {
        type: 'donut'
    },
    labels: [
        'Foydalanuvchilar',
        'Mijozlar',
        'Sotuvchilar',
        'Moderatorlar',
        'Bloklanganlar'
    ],
    legend: {
        position: 'bottom'
    },
    dataLabels: {
        enabled: true
    },
    tooltip: {
        y: {
            formatter: (val: number) => `${val} ta`
        }
    }
}))
</script>

<template>
    <a-card>
        <template #title>
            <div class="flex justify-between">
                <span>Foydalanuvchilar statistikasi</span>
                <span>Platforma ishlayotgandan beri:</span>
            </div>
        </template>

        <ApexChart v-if="usersStats" width="100%" height="320" type="donut" :options="chartOptions"
            :series="seriesCount" />

    </a-card>
</template>