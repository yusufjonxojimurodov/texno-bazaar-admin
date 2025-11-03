<script setup lang="ts">
import { reactive } from 'vue';
import useBanners from '../../../store/banners.pinia';
import dayjs from 'dayjs';
import IconDelete from '../../../components/icons/IconDelete.vue';
import IconCheck from '../../../components/icons/IconCheck.vue';
import IconCancel from '../../../components/icons/IconCancel.vue';


const bannerStore = useBanners()

const loadingMap = reactive<{ [key: string]: boolean }>({})

function deleteBanner(id: any): Promise<boolean> {
    bannerStore.deleteBanner(id)
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 3000)
    })
}

async function changeStatus(id: string | number, status: string) {
    const newStatus = status === 'ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE'
    const statusBanner = {
        status: newStatus
    }

    loadingMap[id] = true
    try {
        await bannerStore.updateStatus(statusBanner, id)
    } finally {
        loadingMap[id] = false
    }
}
</script>

<template>
    <div class="!flex justify-start items-center gap-3 flex-wrap">
        <a-card v-for="banner in bannerStore.banners" :key="banner._id"
            class="bg-white !w-full md:!w-[350px] !rounded-[10px]">
            <a-image class="!w-full md:!w-[300px] md:!h-[200px]"
                style="object-fit: cover; object-position: center; border-radius: 10px;" :src="banner.image" />

            <div class="flex justify-center items-start flex-col gap-3 mt-2">
                <p class="!m-0 !p-0 text-gray-700 !font-medium">Yaratilgan vaqti: {{
                    dayjs(banner.createdAt).format("DD.MM.YYYY HH:mm") }}</p>
                <div class="flex justify-between items-center w-full">
                    <a class="text-[16px]" target="_blank" :href="banner.productUrl">Mahsulotni ko'rish</a>
                    <div class="flex justify-end items-end gap-2">
                        <a-button :loading="loadingMap[banner._id]" @click="changeStatus(banner._id, banner.status)"
                            type="primary" size="small"
                            :class="banner.status === 'ACTIVE' ? '!bg-[#2ead00]' : '!bg-[#ff0000]'"
                            class="!flex !w-7 !h-7 !rounded-full !justify-center !bg-none hover:!bg-none !items-center">
                            <template #icon>
                                <component :is="banner.status === 'ACTIVE' ? IconCheck : IconCancel" class="w-5 h-5" />
                            </template>
                        </a-button>
                        <a-popconfirm @confirm="deleteBanner(banner._id)" title="O'chirishga rozimisiz ?">
                            <a-button danger type="primary" size="small"
                                class="!flex !rounded-full !justify-center !items-center !w-7 !h-7">
                                <template #icon>
                                    <icon-delete class="w-5 h-5" />
                                </template>
                            </a-button>
                        </a-popconfirm>
                    </div>
                </div>
            </div>
        </a-card>
    </div>
</template>