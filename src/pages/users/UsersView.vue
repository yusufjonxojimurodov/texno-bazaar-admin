<script setup lang="ts">
import { onMounted } from 'vue';
import useUser from '../../store/user.pinia';
import UserTableComponent from './components/UserTableComponent.vue';

const userStore = useUser()

onMounted(() => {
    userStore.getUsers()
})
</script>

<template>
    <user-table-component />
</template>