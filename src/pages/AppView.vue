<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconUsers from '../components/icons/IconUsers.vue';
import IconLeft from '../components/icons/IconLeft.vue';
import IconRight from '../components/icons/IconRight.vue';
import IconProducts from '../components/icons/IconProducts.vue';
import IconStatistic from '../components/icons/IconStatistic.vue';
import IconAd from '../components/icons/IconAd.vue';
import IconSetting from '../components/icons/IconSetting.vue';
import IconAccaount from '../components/icons/IconAccaount.vue';
import IconSecurity from '../components/icons/IconSecurity.vue';
import useUser from '../store/user.pinia';
import useAvatar from '../store/avatar.pinia';
import ProfileComponent from '../components/ProfileComponent.vue';
import SettingModalComponent from '../components/modals/SettingModalComponent.vue';
import SettingPasswordModal from '../components/modals/SettingPasswordModal.vue';
import IconBurger from '../components/icons/IconBurger.vue';
import BurgerComponent from '../components/BurgerComponent.vue';

const router = useRouter()
const userStore = useUser()
const route = useRoute()
const avatarStore = useAvatar()

const collapsed = ref<boolean>(false)
const openSettingModal = ref<boolean>(false)
const openPasswordModal = ref<boolean>(false)
const openMenuMobil = ref<boolean>(false)
const selectedKeys = ref<string[]>(['1'])

const pageTitles: Record<string, string> = {
    Users: "Foydalanuvchilar",
    Products: "Mahsulotlar",
    Statistics: "Statistika",
    Banners: "Bannerlar",
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

watch(
    () => route.path,
    (newPath) => {
        if (newPath === '/') selectedKeys.value = ['1']
        else if (newPath.includes('/products')) selectedKeys.value = ['2']
        else if (newPath.includes('/statistics')) selectedKeys.value = ['3']
        else if (newPath.includes('/banners')) selectedKeys.value = ['4']
        else selectedKeys.value = []
        openMenuMobil.value = false
    }, { immediate: true })
</script>

<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider :width="240" :collapsed-width="80" class="hidden md:block shadow-xl" :style="sidebarDesign"
            v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div v-if="!collapsed" class="py-4 flex justify-center items-center flex-col gap-1">
                <h2 class="text-[24px] !font-bold text-[#0D2240] !p-0 !m-0">TEXNOBAZAAR</h2>
                <p class="!m-0 !p-0 text-[#394B61] text-[12px] font-semibold">BOSHQARUV PLATFORMASI</p>
            </div>
            <h2 v-else class="text-center py-4 text-lg text-[24px] !font-bold text-[#0D2240]">TB</h2>

            <a-menu class="w-full !bg-white" mode="inline" v-model:selectedKeys="selectedKeys">
                <a-menu-item :title="!collapsed ? '' : 'Foydalanuvchilar'" @click="router.push('/')"
                    class="!mt-2 shadow-sm bg-transparent" key="1">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-users class="w-5 h-5" />
                        <span v-show="!collapsed" class="text-[14px] !font-semibold">Foydalanuvchilar</span>
                    </div>
                </a-menu-item>
                <a-menu-item :title="!collapsed ? '' : 'Mahsulotlar'" @click="router.push('/products')"
                    class="!mt-2 shadow-sm bg-transparent" key="2">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-products class="w-5 h-5" />
                        <span v-show="!collapsed" class="text-[14px] !font-semibold">Mahsulotlar</span>
                    </div>
                </a-menu-item>
                <a-menu-item :title="!collapsed ? '' : 'Statistika'" @click="router.push('/statistics')"
                    class="!mt-2  shadow-sm bg-transparent" key="3">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-statistic class="w-5 h-5" />
                        <span v-show="!collapsed" class="text-[14px] !font-semibold">Statistika</span>
                    </div>
                </a-menu-item>
                <a-menu-item :title="!collapsed ? '' : 'Bannerlar'" @click="router.push('/banners')"
                    class="!mt-2 shadow-sm bg-transparent" key="4">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-ad class="w-5 h-5" />
                        <span v-show="!collapsed" class="text-[14px] !font-semibold">Bannerlar</span>
                    </div>
                </a-menu-item>
                <a-sub-menu class="!mt-2  shadow-sm bg-transparent" key="5">
                    <template #title>
                        <div class="flex justify-start gap-2 items-center">
                            <icon-setting class="w-5 h-5" />
                            <span class="text-[14px] !font-semibold" v-show="!collapsed">Sozlamalar</span>
                        </div>
                    </template>

                    <div class="flex !justify-center !items-start !flex-col gap-6 !px-6 !py-4">
                        <div @click="openSettingModal = true"
                            class="transition duration-200 cursor-pointer hover:text-blue-500 !w-full !flex !justify-start gap-2 items-center">
                            <icon-accaount class="w-5 h-5" />
                            <span class="text-[14px] !font-semibold">Hisob sozlamalari</span>
                        </div>
                        <!-- <div
                            class="transition duration-200 cursor-pointer hover:text-blue-500 !w-full !flex !justify-start gap-2 items-center">
                            <icon-setting-platform class="w-5 h-5" />
                            <span class="text-[14px] !font-semibold" v-show="!collapsed">Platforma sozlamalari</span>
                        </div> -->
                        <div @click="openPasswordModal = true"
                            class="transition duration-200 cursor-pointer hover:text-blue-500 !w-full !flex !justify-start gap-2 items-center">
                            <icon-security class="w-5 h-5" />
                            <span class="text-[14px] !font-semibold">Xavfsizlik sozlamalari</span>
                        </div>
                    </div>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header class="!bg-white flex items-center !p-2 shadow">
                <div class="flex justify-between items-center w-full">
                    <div class="flex justify-start items-center gap-3">
                        <icon-left v-if="!collapsed" class="cursor-pointer w-7 h-7 hidden md:block"
                            @click="toggleMenu" />
                        <icon-right v-else class="cursor-pointer w-7 h-7 hidden md:block" @click="toggleMenu" />
                        <icon-burger @click="() => openMenuMobil = !openMenuMobil" class="w-8 h-8 block md:hidden" />
                        <h2 class="text-[24px] text-[#323232] !p-0 !m-0">{{ currentPageTitle }}</h2>
                    </div>
                    <div>
                        <profile-component />
                    </div>
                </div>
            </a-layout-header>

            <a-layout-content class="custom-content !p-4">
                <router-view />
            </a-layout-content>
        </a-layout>
        <p class="absolute bottom-2 left-18 hidden  md:block !font-semibold text-gray-500">Version 1.0.7</p>
    </a-layout>

    <setting-modal-component v-model:open="openSettingModal" />
    <setting-password-modal v-model:open="openPasswordModal" />
    <burger-component v-model:open="openMenuMobil" />
</template>

<style>
.custom-content {
    overflow-y: auto;
    height: calc(100vh - 64px);
}

.flex.flex-col.items-center.cursor-pointer.text-blue-500 {
    font-weight: 600;
}
</style>