<script lang="ts" setup>
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import { debounce } from '../../../utils/helpers/debounce';
import { ref } from 'vue';
import UserFormModal from './form/UserFormModal.vue';
import PlusIcon from '../../../components/icons/PlusIcon.vue';
import IconSearch from '../../../components/icons/IconSearch.vue';
import IconUserCheck from '../../../components/icons/IconUserCheck.vue';

const { setQueries, getQueries } = useQueryParams()

const userSearch = ref(getQueries('search'))
const userRole = ref(getQueries("role"))
const openUserForm = ref(false)
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
            style="width: 180px;" >
            <template #addonAfter>
                <icon-search class="w-5 h-5 text-gray-500"/>
            </template>
        </a-input>
        <a-select allow-clear :options="filterRoleOptions" @change="filterRole" v-model:value="userRole"
            placeholder="Rolni tanlang" size="large" style="width: 180px;" >
            <template #suffixIcon>
                <icon-user-check class="w-4 h-4 text-gray-500"/>
            </template>
        </a-select>
        <a-button @click="openUserForm = true" class="!flex justify-center items-center gap-2" type="primary"
            size="large">
            <template #icon>
                <plus-icon class="w-4 h-4" />
            </template>
            Qo'shish
        </a-button>
    </div>

    <user-form-modal v-model:open="openUserForm" />
</template>