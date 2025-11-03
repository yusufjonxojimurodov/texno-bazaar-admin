<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function goHome() {
    const token = localStorage.getItem("texnoBazaar")
    if (token) {
        router.push({ name: "Users" })
    } else {
        router.push({ name: "Login" })
    }
} 
</script>

<template>
    <a-result status="404">
        <template #title>
            Bunday sahifa topilmadi
        </template>
        <template #extra>
            <div class="!flex justify-center items-center">
                <a-button @click="goHome" type="primary" size="large">
                    Bosh sahifaga qaytish
                </a-button>
            </div>
        </template>
    </a-result>
</template>