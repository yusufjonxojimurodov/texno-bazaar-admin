<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import useUser from '../../../../store/user.pinia';
import { useQueryParams } from '../../../../utils/helpers/useQueryParams';

const { getQueries } = useQueryParams();

const open = defineModel("open", { type: Boolean, default: false });
const props = defineProps({
    user: Object
});

const userStore = useUser();
const userId = computed(() => getQueries("userId"));

const Editmodel = ref({
    name: "",
    surname: "",
    phone: "",
    email: "",
    userName: "",
    password: ""
});

watch(
    () => props.user,
    (newUser) => {
        if (newUser) {
            Editmodel.value = {
                name: newUser.name || "",
                surname: newUser.surname || "",
                phone: newUser.phone || "",
                userName: newUser.userName || "",
                email: newUser.email,
                password: ""
            };
        }
    },
    { immediate: true }
);

async function putUser() {
    await userStore.putUser(Editmodel.value, userId.value);
    open.value = false;
}
</script>


<template>
    <a-modal @cancel="open = false" :footer="null" :open="open" title="Foydalanuvchini yangilash">
        <a-form @finish="putUser" layout="vertical" :model="Editmodel">
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Ismi" name="name">
                <a-input v-model:value="Editmodel.name" size="large" placeholder="Ismini kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Familyasi" name="surname">
                <a-input v-model:value="Editmodel.surname" size="large" placeholder="Familyasini kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Telefon raqami" name="phone">
                <a-input v-model:value="Editmodel.phone" size="large" placeholder="Telefon raqamini kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Foydalanuvchi nomi"
                name="userName">
                <a-input v-model:value="Editmodel.userName" size="large" placeholder="Foydalanuvchi nomini kiriting" />
            </a-form-item>
            <a-form-item label="Paroli" name="password">
                <a-input v-model:value="Editmodel.password" size="large" placeholder="Parolini kiriting" />
            </a-form-item>
            <a-form-item label="Email manzil" name="email">
                <a-input v-model:value="Editmodel.email" size="large" placeholder="Email manzilini kiriting" />
            </a-form-item>

            <div class="flex justify-end items-center gap-2 !mt-2">
                <a-button @click="open = false" danger type="primary" size="large">Bekor qilish</a-button>
                <a-button :loading="userStore.buttonLoader" html-type="submit" type="primary"
                    size="large">Saqlash</a-button>
            </div>
        </a-form>
    </a-modal>
</template>