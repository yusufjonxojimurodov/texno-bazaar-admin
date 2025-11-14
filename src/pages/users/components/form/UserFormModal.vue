<script setup lang="ts">
import useUser from '../../../../store/user.pinia';
import { storeToRefs } from 'pinia';

const open = defineModel("open", { type: Boolean, default: false });

const userStore = useUser();
const { userModel } = storeToRefs(userStore)

function confirm() {
    if (userModel.value.id) {
        userStore.putUser(userModel.value, userModel.value.id, closeModal);
    } else {
        userStore.createUser(userModel.value, closeModal)
    }
}

function closeModal() {
    userModel.value.name = ""
    userModel.value.surname = ""
    userModel.value.username = ""
    userModel.value.email = ""
    userModel.value.phone = ""
    userModel.value.password = ""
    open.value = false
}
</script>

<template>
    <a-modal @cancel="closeModal" :footer="null" :open="open" title="Foydalanuvchini yangilash">
        <a-form @finish="confirm" layout="vertical" :model="userModel">
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Ismi" name="name">
                <a-input v-model:value="userModel.name" size="large" placeholder="Ismini kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Familyasi" name="surname">
                <a-input v-model:value="userModel.surname" size="large" placeholder="Familyasini kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Telefon raqami" name="phone">
                <a-input v-model:value="userModel.phone" size="large" placeholder="Telefon raqamini kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Foydalanuvchi nomi"
                name="username">
                <a-input v-model:value="userModel.username" size="large" placeholder="Foydalanuvchi nomini kiriting" />
            </a-form-item>
            <a-form-item label="Paroli" name="password">
                <a-input v-model:value="userModel.password" size="large" placeholder="Parolini kiriting" />
            </a-form-item>
            <a-form-item label="Email manzil" name="email">
                <a-input v-model:value="userModel.email" size="large" placeholder="Email manzilini kiriting" />
            </a-form-item>

            <div class="flex justify-end items-center gap-2 !mt-2">
                <a-button @click="closeModal" danger type="primary" size="large">Bekor qilish</a-button>
                <a-button :loading="userStore.buttonLoader" html-type="submit" type="primary"
                    size="large">Saqlash</a-button>
            </div>
        </a-form>
    </a-modal>
</template>