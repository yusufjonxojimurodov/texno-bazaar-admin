<script setup lang="ts">
import useAvatar from '../store/avatar.pinia';
import useHelper from '../store/helper.pinia';
import useUser from '../store/user.pinia';

const helperStore = useHelper()
const userStore = useUser()
const avatarStore = useAvatar()
</script>

<template>
    <div class="flex justify-center items-center gap-2">
        <h2 class="text-[18px] !p-0 !m-0 !font-semibold">{{ userStore.user.name }} {{ userStore.user.surname }}</h2>
        <a-dropdown trigger="click">
            <template #default>
                <a-avatar class="cursor-pointer" :size="54" :src="avatarStore.avatar" />
            </template>

            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <a-button @click="helperStore.leave()" type="text" danger size="small">
                            Chiqish
                        </a-button>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>