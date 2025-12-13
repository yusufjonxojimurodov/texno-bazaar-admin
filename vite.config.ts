import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@font-family': "'Inter', sans-serif", // Bu yerga fontni qo‘yamiz
        },
        javascriptEnabled: true
      }
    }
  }
});
