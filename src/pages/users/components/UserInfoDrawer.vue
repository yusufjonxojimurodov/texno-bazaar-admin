<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import IconPersonalInformation from "../../../components/icons/IconPersonalInformation.vue";
import IconSystemInformation from "../../../components/icons/IconSystemInformation.vue";

const open = defineModel("open", { type: Boolean, default: false });

export interface User {
    name: string;
    surname: string;
    avatarUrl: string;
    role: string;
    userName: string;
    phone: number | string;
    email: string;
    birthDate: string | number;
    chatId: string | number;
    points: number;
    rating: number;
}

const props = defineProps<{ user: User }>();

const windowWith = ref<number>(window.innerWidth)

function closeDrawer() {
    open.value = false;
}

function openTelegramChat() {
    window.open(`https://t.me/${props.user.userName}`, "_blank")
}

function callUser() {
    window.open(`tel:${props.user.phone}`, "_blank")
}

function openEmailUser() {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(props.user.email)}`;
    window.open(url, "_blank");
}

const role = {
    blocked: { color: "error", text: "Bloklangan" },
    seller: { color: "green", text: "Sotuvchi" },
    customer: { color: "blue", text: "Mijoz" },
    moderator: { color: "gold", text: "Admin yordamchisi" },
    admin: { color: "success", text: "Admin" },
}

console.log(props.user)
</script>

<template>
    <a-drawer :width="windowWith > 768 ? '45%' : '100%'" :open="open" @close="closeDrawer" placement="right">
        <template #title>
            <div class="flex justify-between items-center">
                <h3 class="!m-0">Foydalanuvchi ma'lumotlari</h3>
                <a-tag class="!text-[14px]" color="success">
                    {{
                        user.role === "seller"
                            ? "Sotuvchi"
                            : user.role === "customer"
                                ? "Mijoz"
                                : user.role === "moderator"
                                    ? "Admin yordamchisi"
                                    : user.role === "blocked"
                                        ? "Bloklangan"
                                        : user.role === "admin" ?
                                            "Platforma admini"
                                            : "Noma'lum ro'l"
                    }}
                </a-tag>
            </div>
        </template>

        <div class="flex items-center gap-4 border-b border-b-gray-400 pb-4 mb-4">
            <a-avatar :src="user.avatarUrl" :size="70" class="shadow-md" style="border: 2px solid #e5e7eb" />
            <div>
                <h2 class="text-[12px] md:text-xl font-semibold text-gray-800 !m-0">
                    {{ user.name }} {{ user.surname }}
                </h2>
                <div class="flex flex-wrap gap-2 mt-1">
                    <a-tag v-if="user.userName"
                        class="!cursor-pointer !text-[9px] !px-[2px] !p-0 !m-0 md:!text-[12px] md:!px-2"
                        @click="openTelegramChat" color="volcano">{{ user.userName }}</a-tag>
                    <a-tag v-if="user.phone"
                        class="!cursor-pointer !text-[9px] !px-[2px] !p-0 !m-0 md:!text-[12px] md:!px-2"
                        @click="callUser" color="blue">{{ user.phone }}</a-tag>
                    <a-tag v-if="user.email"
                        class="!cursor-pointer !text-[9px] !px-[2px] !p-0 !m-0 md:!text-[12px] md:!px-2"
                        @click="openEmailUser" color="green">{{ user.email }}</a-tag>
                </div>
            </div>
        </div>

        <div class="space-y-2 border-b border-b-gray-400 pb-4 mb-4">
            <div class="flex justify-start items-center gap-1">
                <icon-personal-information class="w-4 h-4" />
                <h4 class="text-lg font-semibold text-gray-800 !p-0 !m-0">Shaxsiy ma'lumotlar</h4>
            </div>
            <p><strong class="text-gray-800">Tug'ilgan sana:</strong> {{ user.birthDate ?
                dayjs(user.birthDate).format("DD.MM.YYYY") :
                "Kiritilmagan"
            }}</p>
            <p><strong class="text-gray-800">Chat ID:</strong> {{ user.chatId || "Kiritilmagan" }}</p>
        </div>

        <div class="space-y-2 border-b border-b-gray-400 pb-4 mb-4">
            <div class="flex justify-start items-center gap-1">
                <icon-system-information class="w-4 h-4" />
                <h4 class="text-lg font-semibold text-gray-800 !p-0 !m-0">Tizim ma'lumotlari</h4>
            </div>
            <p><strong class="text-gray-800">Rol:</strong> <a-tag :color="role[user.role as keyof typeof role].color">
                    {{ role[user.role as keyof typeof role].text }}
                </a-tag>
            </p>
            <p><strong class="text-gray-800">Ball (Points):</strong> {{ user.points ?? 0 }}</p>
            <p><strong class="text-gray-800">Reyting:</strong> {{ user.rating ?? "0.0" }}</p>
        </div>

        <div class="flex justify-end">
            <a-button size="large" type="primary" @click="closeDrawer">Yopish</a-button>
        </div>
    </a-drawer>
</template>
