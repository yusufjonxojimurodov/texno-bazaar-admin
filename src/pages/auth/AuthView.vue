<script setup lang="ts">
import LoginComponent from './components/LoginComponent.vue';
</script>

<template>
   <div class="min-h-screen relative flex items-center justify-center bg-[#2148C0]">
      <div class="!w-full max-w-md p-5 rounded-2xl z-9999 shadow-md shadow-white">
         <div class="mb-6 flex justify-center items-center">
            <img src="../../assets/images/basket.svg" alt="basket">
         </div>
         <login-component />
      </div>

      <img class="absolute right-0 top-0" src="../../assets/images/login-background1.svg" alt="bg">
      <img class="absolute left-0 bottom-0" src="../../assets/images/login-background2.svg" alt="bg">
   </div>
</template>

<style>
.liquid-glass {
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(20px) saturate(150%);
   -webkit-backdrop-filter: blur(20px) saturate(150%);
   position: relative;
   overflow: hidden;
}

.liquid-glass::before {
   content: "";
   position: absolute;
   top: -50%;
   left: -50%;
   width: 200%;
   height: 200%;
   background: radial-gradient(circle at 30% 30%,
         rgba(0, 0, 0, 0.3),
         rgba(255, 255, 255, 0.05));
   animation: liquid 6s infinite linear;
}

</style>