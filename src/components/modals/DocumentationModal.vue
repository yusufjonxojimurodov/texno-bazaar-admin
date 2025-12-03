<script setup lang="ts">
const open = defineModel("open", {
    type: Boolean,
    default: false
})

const openBot = () => {
    window.open("https://t.me/savdo_x_bot", "_blank")
}
</script>

<template>
    <a-modal @cancel="open = false" :open="open" title="Qo'llanma" centered>
        <p class="text-[16px]! font-medium!">Xurmatli admin yoki moderator platformamizda qaysi telefon raqamingiz orqali ro‘yxatdan o‘tgan
            bo‘lsangiz, o‘sha raqamga ulangan Telegram
            akkauntingizga kirib, bizning bot orqali parolingizni tiklashingiz mumkin.</p>

        <template #footer>
            <div class="flex justify-end items-center mt-4">
                <a-button size="large" @click="open = false">
                    Yopish
                </a-button>

                <a-button size="large" type="primary" @click="openBot">
                    Parol almashtirish
                </a-button>
            </div>
        </template>
    </a-modal>
</template>