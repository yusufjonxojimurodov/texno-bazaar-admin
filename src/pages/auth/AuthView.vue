<script setup lang="ts">
import LoginComponent from './components/LoginComponent.vue';
</script>

<template>
   <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div class="flex items-center gap-1 py-6 md:mb-12">
         <img class="w-14 h-14 md:w-20 md:h-20" src="../../assets/images/admin.png" alt="admin_logo">
         <h1 class="text-[18px] sm:text-2xl md:text-3xl font-bold! text-gray-800 p-0! m-0!">TexnoBazaar boshqaruv paneli</h1>
      </div>

      <div
         class="flex flex-col md:flex-row items-stretch gap-8 bg-white shadow-lg rounded-2xl p-8 md:p-12 w-full max-w-4xl">
         <login-component class="h-full" />
         <a-card class="flex-1 w-full bg-gray-50 p-6 rounded-xl shadow-inner !h-[380px]">
            <h2 class="text-xl font-semibold mb-4">Admin imkoniyatlari</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
               <li>Platforma boshqaruvi</li>
               <li>Ma’lumotlar va statistika</li>
               <li>Chat va kommunikatsiyalar</li>
               <li>Xavfsizlik va ruxsatlar</li>
               <li>Maxsus imkoniyatlar</li>
            </ul>
         </a-card>
      </div>
   </div>
</template>
