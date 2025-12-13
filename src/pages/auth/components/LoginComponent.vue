<script setup lang="ts">
import { ref } from 'vue';
import { phoneCodeValidator } from '../../../utils/helpers/phone.validator.ts';
import { formatPhoneNumber } from '../../../utils/helpers/format.phone.number.ts';
import DocumentationModal from '../../../components/modals/DocumentationModal.vue';
import useUser from '../../../store/user.pinia';

interface loginForm {
    phone: string,
    password: string
}

const authStore = useUser()

const openDocumentationModal = ref<boolean>(false)
const passwordInput = ref<any>(null);
const loginModel = ref<loginForm>({
    phone: "",
    password: ""
})

function login() {
    const payload = {
        ...loginModel.value,
        phone: "+998" + loginModel.value.phone.replace(/[-\s]/g, "")
    };
    authStore.login(payload)
}

const phoneRules = [
    {
        required: true,
        message: "Majburiy maydon",
    },
    {
        validator: (_rule: any, value: any) => {
            if (!value) return Promise.resolve();
            const val = value || '';
            const cleanVal = val.replace(/[-\s]/g, '');

            if (!phoneCodeValidator(cleanVal)) {
                return Promise.reject(new Error("Raqamni tog'ri formatda kiriting"));
            } else if (cleanVal.length < 9) {
                return Promise.reject(new Error("Minimal 9 ta raqamdan iborat bo'lishi kerak"));
            }
            return Promise.resolve();
        },
        trigger: "blur"
    }
];

function handleInput(value: any) {
    loginModel.value.phone = formatPhoneNumber(value) ?? "";
}

function focusPassword() {
    passwordInput.value?.focus()
}
</script>

<template>
    <a-card class="w-full md:w-[48%]">
        <div>
            <h2 class="text-[32px]">Tizimga kirish</h2>
        </div>
        <a-form @finish="login" layout="vertical" :model="loginModel">
            <a-form-item label="Telefon raqam" name="phone" :rules="phoneRules">
                <a-input @keyup.enter="focusPassword" autocomplete="off" size="large"
                    v-model:value="loginModel.phone" addonBefore="+998" :maxLength="12" @input="handleInput"
                    placeholder="00-000-00-00" />
            </a-form-item>
            <a-form-item label="Parol" name="password" :rules="{ required: true, message: 'Majburiy maydon' }">
                <a-input-password  ref="passwordInput" autocomplete="new-password"
                    size="large" v-model:value="loginModel.password" placeholder="Parolingizni kiriting" />
            </a-form-item>

            <p @click="openDocumentationModal = true" class="text-[#FF8682]! cursor-pointer text-end font-medium!">
                Parolni
                unutdingizmi ?</p>

            <div class="flex justify-end items-center">
                <a-button html-type="submit" type="primary" :loading="authStore.loading"
                    class="btn btn-success w-full!" size="large">
                    <template #icon>
                        Tizimga kirish
                    </template>
                </a-button>
            </div>
        </a-form>
    </a-card>

    <documentation-modal v-model:open="openDocumentationModal" />
</template>