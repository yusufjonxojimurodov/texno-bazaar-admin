<script setup lang="ts">
import { onMounted } from 'vue';
import BannerComponent from './components/BannerComponent.vue';
import useBanners from '../../store/banners.pinia';
import BannerCreateComponent from './components/BannerCreateComponent.vue';

const bannerStore = useBanners()

onMounted(() => {
    bannerStore.getBanners()
})
</script>

<template>
    <a-spin :spinning="bannerStore.loading" size="large">
        <banner-create-component />
        <banner-component />
    </a-spin>
</template>