<script setup lang="ts">
import { watch } from 'vue';
import useUser from '../../store/user.pinia';
import UserTableComponent from './components/UserTableComponent.vue';
import UserFilterComponent from './components/UserFilterComponent.vue';
import { useRoute } from 'vue-router';
import { useQueryParams } from '../../utils/helpers/useQueryParams';

const userStore = useUser()
const route = useRoute()
const { getQueries } = useQueryParams()

watch(() => route.query, () => {
    if (!localStorage.getItem("texnoBazaar")) return;
    if (!route.query.userId && !route.query.id) {
        userStore.getUsers({
            search: getQueries("search") || undefined,
            role: getQueries("role") || undefined
        })
    }
}, { immediate: true })
</script>

<template>
    <user-filter-component />
    <a-card class="!bg-white">
        <user-table-component />
    </a-card>
</template>