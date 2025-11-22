<script lang="ts" setup>
import { ref } from 'vue';
import useUser from '../../../store/user.pinia';
import { formatPhoneNumber } from '../../../utils/helpers/formatterPhone';

const userStore = useUser()

const loginModel = ref({
    phone: "",
    password: null
})

function login() {
    const formatPhone = loginModel.value.phone.replace(/[^\d+]/g, "").trim()
    userStore.login({
        phone: formatPhone,
        password: loginModel.value.password
    })
}

function phoneInput(e: Event) {
    const value = e.target as HTMLInputElement
    loginModel.value.phone = formatPhoneNumber(value.value)
}
</script>

<template>
    <div>
        <a-form @finish="login" layout="vertical" :model="loginModel">
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" name="phone"
                label="Raqamingizni kirgizing">
                <a-input size="large" placeholder="Raqamingizni kiriting" @input="phoneInput"
                    v-model:value="loginModel.phone" />
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, message: 'Majburiy maydon' }]"
                label="Parolingizni kirgizing">
                <a-input-password size="large" placeholder="Parolingizni kiriting"
                    v-model:value="loginModel.password" />
            </a-form-item>

            <div class="flex justify-end">
                <a-button class="!shadow-none !bg-white !text-black !w-full" :loading="userStore.loading"
                    html-type="submit" type="primary" size="large">
                    <template #icon>
                        Tizimga kirish
                    </template>
                </a-button>
            </div>
        </a-form>
    </div>
</template>

<style scoped>
:deep(.ant-form-item-label > label) {
    color: #ffffff !important;
}
</style>