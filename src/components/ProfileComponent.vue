<script setup lang="ts">
import useAvatar from '../store/avatar.pinia';
import useHelper from '../store/helper.pinia';
import useUser from '../store/user.pinia';
import IconLogOut from './icons/IconLogOut.vue';

const helperStore = useHelper()
const userStore = useUser()
const avatarStore = useAvatar()
</script>

<template>
    <div class="flex justify-center items-center gap-2">
        <h2 class="text-[18px] !p-0 !m-0 !font-semibold !hidden md:!block">{{ userStore.user.name }} {{
            userStore.user.surname }}</h2>
        <a-dropdown trigger="click">
            <template #default>
                <a-avatar class="cursor-pointer" :size="54" :src="avatarStore.avatar" />
            </template>

            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <span class="!font-semibold !text-[14px]"> {{ userStore.user.name }}
                            {{ userStore.user.surname }}</span>
                    </a-menu-item>
                    <a-menu-item key="1">
                        <a-popconfirm @confirm="helperStore.leave()" title="Hisobingizdan chiqmoqchimisiz ?">
                            <a-button class="!flex !justify-start !items-center gap-2" danger type="text" size="small">
                                <template #icon>
                                    <icon-log-out />
                                </template>
                                Chiqish
                            </a-button>
                        </a-popconfirm>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>