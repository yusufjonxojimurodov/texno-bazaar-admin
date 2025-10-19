<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useStatistic from '../../../store/statistic.pinia';

const statisticStore = useStatistic()
const { usersStats } = storeToRefs(statisticStore)
</script>

<template>
    <a-card class="bg-white rounded-2xl shadow-2xl">
        <p class="text-[16px] text-amber-500 !font-medium">Foydalanuvchilar: {{ usersStats.totalUsersCount }} ta</p>
        <p class="text-[16px] text-amber-500 !font-medium">Mijozlar: {{ usersStats.customerCount }} ta</p>
        <p class="text-[16px] text-amber-500 !font-medium">Sotuvchilar: {{ usersStats.sellerCount }} ta</p>
        <p class="text-[16px] text-amber-500 !font-medium">Moderatorlar: {{ usersStats.moderatorCount }} ta</p>
        <p class="text-[16px] text-amber-500 !font-medium">Bloklanganlar: {{ usersStats.blockedCount }} ta</p>
    </a-card>
</template>