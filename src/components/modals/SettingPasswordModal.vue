<script setup lang="ts">
import { notification } from 'ant-design-vue';
import { ref } from 'vue';
import useUser from '../../store/user.pinia';

const open = defineModel("open", { type: Boolean, default: false })

const userStore = useUser()

interface password {
    newPassword: Number | null;
    repeatPassword: Number | null
}

const updatePasswordModel = ref<password>({
    newPassword: null,
    repeatPassword: null
})

function updatePassword() {
    if (updatePasswordModel.value.newPassword !== updatePasswordModel.value.repeatPassword) {
        notification.warn({
            message: "Kirg'izilgan parollar bir xil emas",
            description: "Parolni yangilash uchun yangi yozgan parolingizni qayta yozish uchun mo'ljallangan yozish maydoniga takroran yozishingiz kerak. Agarda parollar mos bo'lmasa parolni yangilay olmaysiz"
        })
        return
    }

    const password = {
        password: updatePasswordModel.value.newPassword
    }

    userStore.updatePassword(password, closeModal)
}

function closeModal() {
    updatePasswordModel.value.newPassword = null
    updatePasswordModel.value.repeatPassword = null
    open.value = false
}
</script>

<template>
    <a-modal :width="650" centered @cancel="closeModal" :open="open">
        <a-form @finish="updatePassword" id="passwordForm" layout="vertical" :model="updatePasswordModel">
            <a-row :gutter="18">
                <a-col :span="12">
                    <a-form-item name="newPassword" label="Yangi parol" :rules="[
                        { required: true, message: 'Majburiy maydon' },
                        { min: 6, message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' },
                    ]">
                        <a-input-password :maxlength="12" size="large" v-model:value="updatePasswordModel.newPassword"
                            placeholder="Yangi parol o‘rnating" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item :rules="[{ required: true, message: 'Yangi parolni takrorlang !' }]"
                        name="repeatPassword" label="Parolni takrorlang">
                        <a-input-password :maxlength="12" size="large"
                            v-model:value="updatePasswordModel.repeatPassword" placeholder="Parolni takroran yozing" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <template #footer>
            <a-space>
                <a-button size="large" @click="closeModal">
                    Bekor qilish
                </a-button>
                <a-button :loading="userStore.buttonLoader" form="passwordForm" html-type="submit" type="primary"
                    size="large">
                    Saqlash
                </a-button>
            </a-space>
        </template>
    </a-modal>
</template>