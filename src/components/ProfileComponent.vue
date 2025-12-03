<script setup lang="ts">
import { watch } from 'vue';
import useAvatar from '../store/avatar.pinia';
import useHelper from '../store/helper.pinia';
import useUser from '../store/user.pinia';
import IconLogOut from './icons/IconLogOut.vue';
import IconProfile from './icons/IconProfile.vue';

const helperStore = useHelper()
const userStore = useUser()
const avatarStore = useAvatar()

watch(() => userStore.user, () => {
    if (userStore.user) {
        avatarStore.getAvatar()
    }
})
</script>

<template>
    <div class="flex justify-center items-center gap-2">
        <a-dropdown trigger="hover">
            <template #default>
                <a-avatar class="cursor-pointer!" :size="58">
                    <template #icon>
                        <img v-if="avatarStore.avatarUrl" :src="avatarStore.avatarUrl" alt="avatar" />
                        <icon-profile v-else />
                    </template>
                </a-avatar>
            </template>

            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <span class="!font-semibold !text-[14px]"> {{ userStore.user.name }}
                            {{ userStore.user.surname }}</span>
                    </a-menu-item>
                    <a-menu-item key="1">
                        <a-popconfirm ok-text="Ha" cancel-text="Yo'q" @confirm="helperStore.leave()"
                            title="Hisobingizdan chiqmoqchimisiz ?">
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