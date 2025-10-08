<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import IconUsers from '../components/icons/IconUsers.vue';
import IconCollapse from '../components/icons/IconCollapse.vue';
import IconProducts from '../components/icons/IconProducts.vue';
import IconStatistic from '../components/icons/IconStatistic.vue';
import { useRouter } from 'vue-router';
import useUser from '../store/user.pinia';

const router = useRouter()
const userStore = useUser()

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['1'])

const toggleMenu = () => {
    collapsed.value = !collapsed.value
}

const sidebarDesign = {
    backgroundColor: "#fff",
    width: 800
}

onBeforeMount(() => {
    userStore.getMe()
})
</script>

<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider class="shadow-xl" :style="sidebarDesign" v-model:collapsed="collapsed" :trigger="null"
            collapsible>
            <h2 class="text-center py-4 text-lg font-bold text-black">TexnoBazaar</h2>

            <a-menu class="w-full !bg-transparent" mode="inline" v-model:selectedKeys="selectedKeys">
                <a-menu-item @click="router.push('/dashboard/users')" class="!mt-2 shadow-sm bg-transparent" key="1">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-users class="w-5 h-5" />
                        <span class="text-[14px] !font-semibold">Foydalanuvchilar</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push('/dashboard/products')" class="!mt-2 shadow-sm bg-transparent" key="2">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-products class="w-5 h-5" />
                        <span class="text-[14px] !font-semibold">Mahsulotlar</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push('/dashboard/statistics')" class="!mt-2 shadow-sm bg-transparent"
                    key="3">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-statistic class="w-5 h-5" />
                        <span class="text-[14px] !font-semibold">Statistika</span>
                    </div>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header class="!bg-white flex items-center !p-2 shadow">
                <icon-collapse class="cursor-pointer w-7 h-7" @click="toggleMenu" />
            </a-layout-header>

            <a-layout-content class="p-4">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
