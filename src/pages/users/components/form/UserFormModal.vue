<script setup lang="ts">
import useUser from '../../../../store/user.pinia';
import { formatPhoneNumber, normalizePhone } from '../../../../utils/helpers/format.phone.number';
import { phoneCodeValidator } from '../../../../utils/helpers/phone.validator';
import { storeToRefs } from 'pinia';

const open = defineModel("open", { type: Boolean, default: false });

const userStore = useUser();
const { userModel } = storeToRefs(userStore)

function confirm() {
    if (userModel.value.id) {
        const payload = {
            ...userModel.value,
            phone: normalizePhone(userModel.value.phone)
        }
        userStore.putUser(payload, userModel.value.id, closeModal);
    } else {
        const payload = {
            ...userModel.value,
            phone: normalizePhone(userModel.value.phone)
        }
        userStore.createUser(payload, closeModal)
    }
}

function closeModal() {
    userModel.value.id = ""
    userModel.value.name = ""
    userModel.value.surname = ""
    userModel.value.username = ""
    userModel.value.email = ""
    userModel.value.phone = ""
    userModel.value.password = ""
    open.value = false
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
    userModel.value.phone = formatPhoneNumber(value) ?? "";
}
</script>

<template>
    <a-modal centered :width="600" @cancel="closeModal" :footer="null" :open="open"
        :title="userModel.id ? 'Foydalanuvchini yangilash' : 'Foydalanuvchi yaratish'">
        <a-form @finish="confirm" layout="vertical" :model="userModel">
            <a-row :gutter="[24, 24]">
                <a-col :span="12">
                    <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Ismi" name="name">
                        <a-input v-model:value="userModel.name" size="large" placeholder="Ismini kiriting" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Familyasi"
                        name="surname">
                        <a-input v-model:value="userModel.surname" size="large" placeholder="Familyasini kiriting" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[24, 24]">
                <a-col :span="12">
                    <a-form-item :rules="phoneRules" label="Telefon raqami" name="phone">
                        <a-input :maxLength="12" @input="handleInput" addonBefore="+998" v-model:value="userModel.phone"
                            size="large" placeholder="Telefon raqamini kiriting" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Foydalanuvchi nomi"
                        name="username">
                        <a-input v-model:value="userModel.username" size="large"
                            placeholder="Foydalanuvchi nomini kiriting" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[24, 24]">
                <a-col :span="12">
                    <a-form-item :rules="[{ required: userModel.id ? false : true, message: 'Majburiy maydon' }]"
                        label="Paroli" name="password">
                        <a-input v-model:value="userModel.password" size="large" placeholder="Parolini kiriting" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item
                        :rules="[{ required: true, message: 'Majburiy maydon' }, { type: 'email', message: 'Email formati notogri' }]"
                        label="Email manzil" name="email">
                        <a-input v-model:value="userModel.email" size="large" placeholder="Email manzilini kiriting" />
                    </a-form-item>
                </a-col>
            </a-row>

            <div class="flex justify-end items-center gap-2 !mt-2">
                <a-button @click="closeModal" danger type="primary" size="large">Bekor qilish</a-button>
                <a-button :loading="userStore.buttonLoader" html-type="submit" type="primary" size="large">{{
                    userModel.id ? 'Saqlash' : 'Yaratish' }}</a-button>
            </div>
        </a-form>
    </a-modal>
</template>