<script lang="ts" setup>
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import { debounce } from '../../../utils/helpers/debounce';
import { ref } from 'vue';

const { setQueries, getQueries } = useQueryParams()

const userSearch = ref(getQueries('search'))
const userRole = ref(getQueries("role"))
const filterRoleOptions = ref([
    {
        label: "Admin",
        value: "admin"
    },
    {
        label: "Mijoz",
        value: "customer"
    },
    {
        label: "Sotuvchi",
        value: "seller"
    },
    {
        label: "Moderator",
        value: "moderator"
    },
    {
        label: "Bloklangan",
        value: "blocked"
    },
])

const handleSearch = debounce(({ target }: { target: any }) => {
    setQueries({
        search: target.value?.trim() || undefined
    })
}, 500)

function filterRole(value: string) {
    setQueries({
        role: value || undefined
    })
}
</script>

<template>
    <div class="flex justify-end items-center gap-2 mb-5">
        <a-input v-model:value="userSearch" @input="handleSearch" placeholder="Qidirish..." size="large"
            style="width: 180px;" />
        <a-select allow-clear :options="filterRoleOptions" @change="filterRole" v-model:value="userRole"
            placeholder="Rolni tanlang" size="large" style="width: 180px;" />
    </div>
</template>