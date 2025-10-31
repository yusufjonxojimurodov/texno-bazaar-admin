<script lang="ts" setup>
import { reactive, watch } from 'vue';
import useUser from '../../store/user.pinia';
import dayjs from 'dayjs';

const userStore = useUser()

const open = defineModel("open", { type: Boolean, default: false })

interface UpdateForm {
    name: string
    surname: string
    email: string
    birthDate: string | null
}

const updateForm = reactive<UpdateForm>({
    name: "",
    surname: "",
    email: "",
    birthDate: null,
})

watch(
    () => userStore.user,
    (newUser) => {
        if (newUser && Object.keys(newUser).length > 0) {
            Object.assign(updateForm, {
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                birthDate: newUser.birthDate ? dayjs(newUser.birthDate) : null,
            });
        }
    },
    { immediate: true }
);

function updateUser() {
    userStore.updateMe(updateForm, closeModal)
}

function closeModal() {
    open.value = false
}
</script>

<template>
    <a-modal @cancel="open = false" :open="open" title="Profilni tahrirlash" centered>
        <a-form id="updateForm" @finish="updateUser" layout="vertical" :model="updateForm">
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" name="name" label="Ism">
                <a-input v-model:value="updateForm.name" class="!w-full" size="large"
                    placeholder="Ismingizni kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" name="surname" label="Familya">
                <a-input v-model:value="updateForm.surname" class="!w-full" size="large"
                    placeholder="Familyangizni kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" name="email" label="Email manzil">
                <a-input v-model:value="updateForm.email" class="!w-full" size="large"
                    placeholder="Emailingizni kiriting" />
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" name="birthDate"
                label="Tug'ilgan sanangiz">
                <a-date-picker size="large" class="!w-full" v-model:value="updateForm.birthDate" />
            </a-form-item>
        </a-form>

        <template #footer>
            <a-space>
                <a-button @click="open = false" size="large">
                    Yopish
                </a-button>
                <a-button :loading="userStore.buttonLoader" form="updateForm" html-type="submit" size="large" type="primary">
                    Saqlash
                </a-button>
            </a-space>
        </template>
    </a-modal>
</template>