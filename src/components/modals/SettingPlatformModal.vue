<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import useWebsite from '../../store/website.pinia';

const open = defineModel("open", { type: Boolean, default: false })

const websiteStore = useWebsite()

const switchValue = ref<boolean>(false)
const text = ref("Tizim nosozligi :(")

const status = computed(() => switchValue.value ? 200 : 500)

onMounted(async () => {
    await websiteStore.getPlatformStatus()
    const statuses = websiteStore.setting.status === 500 ? false : true
    switchValue.value = statuses
})

watch(open, (val) => {
    if (val) {
        window.addEventListener("keydown", saveSettingEnter)
    } else {
        window.removeEventListener("keydown", saveSettingEnter)
    }
})

const currentText = computed(() =>
    switchValue.value ? "Platforma faol xolatda" : "Platforma nofaol holatda"
)

function closeModal() {
    open.value = false
}

function saveSettingEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
        websiteStore.updatePlatformStatus(status.value, text.value, closeModal)
    }
}

function saveSetting() {
    websiteStore.updatePlatformStatus(status.value, text.value, closeModal)
}
</script>

<template>
    <a-modal @cancel="closeModal" :open="open" centered title="TexnoBazaar platforma sozlamalari">
        <div class="flex justify-center items-center flex-col gap-4">
            <div class="flex justify-between items-center !w-full">
                <p class="!p-0 !m-0 text-[24px] !font-semibold">{{ currentText }}</p>
                <a-switch v-model:checked="switchValue" />
            </div>
            <div class="flex justify-start items-center gap-2 flex-col">
                <p class="!p-0 !m-0 text-[24px] !font-semibold">Foydalanuvchilarga bildirishnoma yuborish</p>
                <a-tooltip title="Jarayonda...">
                    <a-input disabled size="large" placeholder="Xabaringizni yozing" />
                </a-tooltip>
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end items-center gap-2 !mt-3">
                <a-button @click="closeModal" size="large">
                    Yopish
                </a-button>
                <a-button @click="saveSetting" :loading="websiteStore.loading" type="primary" size="large">
                    Saqlash
                </a-button>
            </div>
        </template>
    </a-modal>
</template>
