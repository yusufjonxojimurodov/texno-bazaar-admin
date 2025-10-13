<script setup lang="ts">
import { computed } from "vue";
import ApexChart from "vue3-apexcharts";
import useStatistic from "../../../store/statistic.pinia";

const statisticStore = useStatistic();

const series = computed(() => {
    if (!statisticStore.graphInfo?.weekly) return [];

    return [
        {
            name: "Tashriflar (visits)",
            data: statisticStore.graphInfo.weekly.map((w) => w.visits),
        },
        {
            name: "Foydalanuvchilar (users)",
            data: statisticStore.graphInfo.weekly.map((w) => w.users),
        },
    ];
});

const chartOptions = computed(() => ({
    chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
    },
    stroke: {
        curve: "smooth",
        width: 3,
    },
    dataLabels: { enabled: false },
    xaxis: {
        categories: statisticStore.graphInfo?.weekly
            ? statisticStore.graphInfo.weekly.map((w) => ` ${w.week}-Hafta`)
            : [],
        title: { text: "Haftalar" },
    },
    yaxis: {
        title: { text: "Soni" },
    },
    colors: ["#00E396", "#FEB019"],
    legend: {
        position: "top",
    },
}));

const monthNames = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];

const currentMonthName = computed(() => {
    const month = statisticStore.graphInfo?.month;
    return month ? monthNames[month - 1] : "";
});
</script>

<template>
    <div class="p-5">
        <h2 class="text-xl font-semibold mb-4 text-center">
            {{ statisticStore.graphInfo.year }}-yil
            {{ currentMonthName }} statistikasi
        </h2>

        <div v-if="!statisticStore.graphInfo?.weekly?.length" class="text-center py-8 text-gray-500">
            <a-empty title="Ma'lumot topilmadi" />
        </div>

        <div v-else>
            <ApexChart width="100%" height="350" type="line" :options="chartOptions" :series="series" />
        </div>
    </div>
</template>
