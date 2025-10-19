<script setup lang="ts">
import { ref } from 'vue'
import { message, Upload } from 'ant-design-vue'
import type { UploadFile } from 'ant-design-vue'
import IconImgPlus from '../../../components/icons/IconImgPlus.vue'
import useBanners from '../../../store/banners.pinia'

const bannerStore = useBanners()
const openCreateDrawer = ref(false)

interface BannerModel {
    imgList: UploadFile[]  
    productUrl: string
}

const bannerModel = ref<BannerModel>({
    imgList: [],
    productUrl: ''
})

function beforeUpload(file: File) {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
        message.error('Faqat rasm fayl yuklang!')
        return Upload.LIST_IGNORE
    }

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Rasm hajmi 2MB dan oshmasin!')
        return Upload.LIST_IGNORE
    }

    const uploadFile = {
        uid: String(Date.now()),
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
        originFileObj: file
    } as UploadFile

    bannerModel.value.imgList = [uploadFile]
    return false
}

function handleRemove() {
    bannerModel.value.imgList = []
}

async function createBanner() {
    if (!bannerModel.value.imgList.length) {
        return message.error('Rasm yuklash majburiy!')
    }

    const fileObj = bannerModel.value.imgList[0]?.originFileObj
    if (!fileObj) {
        return message.error('Fayl topilmadi!')
    }

    const formData = new FormData()
    formData.append('image', fileObj)
    formData.append('productUrl', bannerModel.value.productUrl)

    await bannerStore.createBanner(formData)

    openCreateDrawer.value = false
    bannerModel.value = { imgList: [], productUrl: '' }
}
</script>

<template>
    <div class="flex justify-end items-center">
        <a-button @click="openCreateDrawer = true" style="width: 180px;" type="primary" size="large"
            class="!flex justify-center items-center gap-2 !mb-4">
            Banner qo'shish
            <IconImgPlus class="w-5 h-5" />
        </a-button>
    </div>

    <a-drawer :width="500" @close="openCreateDrawer = false" :open="openCreateDrawer" title="Reklama bannerini joylash">
        <a-form layout="vertical" :model="bannerModel" @finish="createBanner">
            <a-form-item label="Rasm yuklang">
                <a-upload :before-upload="beforeUpload" :file-list="bannerModel.imgList" list-type="picture-card"
                    :max-count="1" @remove="handleRemove" :show-upload-list="{ showPreviewIcon: false }">
                    <template #default>
                        <div class="!flex justify-center items-center gap-1" v-if="!bannerModel.imgList.length">
                            <IconImgPlus class="w-6 h-6" />
                            <div class="mt-1 text-gray-500 text-sm">Yuklash</div>
                        </div>
                    </template>
                </a-upload>
            </a-form-item>

            <a-form-item label="Mahsulot linkini joylang" name="productUrl"
                :rules="[{ required: true, message: 'Mahsulot linki majburiy!' }]">
                <a-input size="large" placeholder="Mahsulot linki" v-model:value="bannerModel.productUrl" />
            </a-form-item>

            <div class="flex justify-end items-center">
                <a-button :loading="bannerStore.buttonLoading" size="large" type="primary" html-type="submit"
                    class="!flex justify-center items-center gap-2">
                    Yaratish
                    <template #icon>
                        <IconImgPlus class="w-5 h-5" />
                    </template>
                </a-button>
            </div>
        </a-form>
    </a-drawer>
</template>
