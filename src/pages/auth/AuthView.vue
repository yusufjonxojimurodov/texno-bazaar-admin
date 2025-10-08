<script setup lang="ts">
import LoginComponent from './components/LoginComponent.vue';
</script>

<template>
   <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md shadow-sm p-5 rounded-2xl bg-white">
         <div class="mb-6">
            <h2 class="text-center !font-semibold text-3xl">Tizimga kirish</h2>
            <p class="text-center text-gray-600">
               Bu platforma <span class="font-semibold">TexnoBazaar</span> online marketining yagona boshqaruv
               platformasi
            </p>
         </div>
         <login-component />
      </div>
   </div>
</template>
