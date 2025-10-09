<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import IconUsers from '../components/icons/IconUsers.vue';
import IconCollapse from '../components/icons/IconCollapse.vue';
import IconProducts from '../components/icons/IconProducts.vue';
import IconStatistic from '../components/icons/IconStatistic.vue';
import { useRoute, useRouter } from 'vue-router';
import useUser from '../store/user.pinia';
import useAvatar from '../store/avatar.pinia';
import ProfileComponent from '../components/ProfileComponent.vue';

const router = useRouter()
const userStore = useUser()
const route = useRoute()
const avatarStore = useAvatar()

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['1'])
const pageTitles: Record<string, string> = {
    Users: "Foydalanuvchilar",
    Products: "Mahsulotlar",
    Statistics: "Statistika"
}

const currentPageTitle = computed(() => {
    const name = route.name as string
    return pageTitles[name] || 'Bosh sahifa'
})

const toggleMenu = () => {
    collapsed.value = !collapsed.value
}

const sidebarDesign = {
    backgroundColor: "#fff",
}

onBeforeMount(() => {
    userStore.getMe()
    avatarStore.getAvatar()
})
</script>

<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider :width="240" :collapsed-width="80" class="shadow-xl" :style="sidebarDesign"
            v-model:collapsed="collapsed" :trigger="null" collapsible>
            <h2 v-if="!collapsed" class="text-center py-4 text-lg font-bold text-black">TexnoBazaar</h2>
            <h2 v-else class="text-center py-4 text-lg font-bold text-black">T</h2>

            <a-menu class="w-full !bg-white" mode="inline" v-model:selectedKeys="selectedKeys">
                <a-menu-item @click="router.push('/dashboard/users')" class="!mt-2 shadow-sm bg-transparent" key="1">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-users class="w-5 h-5" />
                        <span v-show="!collapsed" class="text-[14px] !font-semibold">Foydalanuvchilar</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push('/dashboard/products')" class="!mt-2 shadow-sm bg-transparent" key="2">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-products class="w-5 h-5" />
                        <span v-show="!collapsed" class="text-[14px] !font-semibold">Mahsulotlar</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push('/dashboard/statistics')" class="!mt-2  shadow-sm bg-transparent"
                    key="3">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-statistic class="w-5 h-5" />
                        <span v-show="!collapsed" class="text-[14px] !font-semibold">Statistika</span>
                    </div>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header class="!bg-white flex items-center !p-2 shadow">
                <div class="flex justify-between items-center w-full">
                    <div class="flex justify-start items-center gap-3">
                        <icon-collapse class="cursor-pointer w-7 h-7" @click="toggleMenu" />
                        <h2 class="text-[24px] !p-0 !m-0">{{ currentPageTitle }}</h2>
                    </div>
                    <div>
                        <profile-component />
                    </div>
                </div>
            </a-layout-header>

            <a-layout-content class="p-4">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>