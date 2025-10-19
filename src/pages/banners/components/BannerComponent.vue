<script setup>
import useBanners from '../../../store/banners.pinia';
import dayjs from 'dayjs';
import IconDelete from '../../../components/icons/IconDelete.vue';

const bannerStore = useBanners()

function deleteBanner(id) {
    bannerStore.deleteBanner(id)
    return new Promise(resolve => {
        setTimeout(() => resolve(true), 3000);
    });
}
</script>

<template>
    <div class="!flex justify-start items-center gap-3 flex-wrap">
        <a-card v-for="banner in bannerStore.banners" :key="banner._id" class="bg-white w-[350px] !rounded-[10px]">
            <a-image
                style="width: 300px; height: 200px; object-fit: cover; object-position: center; border-radius: 10px;"
                :src="banner.image" />

            <div class="flex justify-center items-start flex-col gap-3 mt-2">
                <p class="!m-0 !p-0 text-gray-700 !font-medium">Yaratilgan vaqti: {{
                    dayjs(banner.createdAt).format("DD.MM.YYYY HH:mm") }}</p>
                <div class="flex justify-between items-center w-full">
                    <a class="text-[16px]" target="_blank" :href="banner.productUrl">Mahsulotni ko'rish</a>
                    <a-popconfirm @confirm="deleteBanner(banner._id)" title="O'chirishga rozimisiz ?">
                        <a-button type="primary" danger size="small">
                            <icon-delete class="w-5 h-5" />
                        </a-button>
                    </a-popconfirm>
                </div>
            </div>
        </a-card>
    </div>
</template>