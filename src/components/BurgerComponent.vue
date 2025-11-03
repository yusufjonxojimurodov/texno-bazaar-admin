<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import SettingModalComponent from './modals/SettingModalComponent.vue';
import SettingPasswordModal from './modals/SettingPasswordModal.vue';
import IconUsers from '../components/icons/IconUsers.vue';
import IconProducts from '../components/icons/IconProducts.vue';
import IconStatistic from '../components/icons/IconStatistic.vue';
import IconAd from '../components/icons/IconAd.vue';
import IconSetting from '../components/icons/IconSetting.vue';
import IconAccaount from '../components/icons/IconAccaount.vue';
import IconSecurity from '../components/icons/IconSecurity.vue';
import IconClose from './icons/IconClose.vue';

const open = defineModel("open", { type: Boolean, default: false })
const router = useRouter()

const openSettingModal = ref<boolean>(false)
const openPasswordModal = ref<boolean>(false)

function closeDrawer() {
    open.value = false
}
</script>

<template>
    <div class="!relative">
        <a-drawer :closable="false" :width="'70%'" placement="left" @close="closeDrawer" :open="open">
            <div @click="closeDrawer"
                class="!pl-6 !p-2 !bg-white rounded-r-[30px] absolute z-[9999] right-[-55px] top-1">
                <icon-close class="w-6 h-6" />
            </div>
            <template #title>
                <h2 class="text-[24px] text-center !font-bold text-[#0D2240] !p-0 !m-0">TEXNOBAZAAR</h2>
            </template>

            <a-menu class="w-full !bg-white" mode="inline">
                <a-menu-item @click="router.push('/')" class="!mt-2 shadow-sm bg-transparent" key="1">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-users class="w-5 h-5" />
                        <span class="text-[14px] !font-semibold">Foydalanuvchilar</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push('/products')" class="!mt-2 shadow-sm bg-transparent" key="2">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-products class="w-5 h-5" />
                        <span class="text-[14px] !font-semibold">Mahsulotlar</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push('/statistics')" class="!mt-2  shadow-sm bg-transparent" key="3">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-statistic class="w-5 h-5" />
                        <span class="text-[14px] !font-semibold"></span>
                    </div>
                </a-menu-item>
                
                <a-menu-item @click="router.push('/banners')" class="!mt-2 shadow-sm bg-transparent" key="4">
                    <div class="flex justify-start gap-2 items-center">
                        <icon-ad class="w-5 h-5" />
                        <span class="text-[14px] !font-semibold">Bannerlar</span>
                    </div>
                </a-menu-item>
                <a-sub-menu class="!mt-2  shadow-sm bg-transparent" key="5">
                    <template #title>
                        <div class="flex justify-start gap-2 items-center">
                            <icon-setting class="w-5 h-5" />
                            <span class="text-[14px] !font-semibold">Sozlamalar</span>
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
                        <div @click="openPasswordModal = true"
                            class="transition duration-200 cursor-pointer hover:text-blue-500 !w-full !flex !justify-start gap-2 items-center">
                            <icon-security class="w-5 h-5" />
                            <span class="text-[14px] !font-semibold">Huquqlarni tahrirlash</span>
                        </div>
                        
                    </div>
                </a-sub-menu>
                    <a-sub-menu class="!mt-2  shadow-sm bg-transparent" key="5">
                    <template #title>
                        <div class="flex justify-start gap-2 items-center">
                            <icon-setting class="w-5 h-5" />
                            <span class="text-[14px] !font-semibold">Sozlamalar</span>
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
                        <div @click="openPasswordModal = true"
                            class="transition duration-200 cursor-pointer hover:text-blue-500 !w-full !flex !justify-start gap-2 items-center">
                            <icon-security class="w-5 h-5" />
                            <span class="text-[14px] !font-semibold">Huquqlarni tahrirlash</span>
                        </div>
                        
                    </div>
                </a-sub-menu>
            </a-menu>
            <p class="absolute bottom-2 left-[38%] !font-semibold text-gray-500">Version 1.0.9</p>
        </a-drawer>
    </div>

    <setting-modal-component v-model:open="openSettingModal" />
    <setting-password-modal v-model:open="openPasswordModal" />
</template>