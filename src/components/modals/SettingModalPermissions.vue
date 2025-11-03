<script setup lang="ts">
import { ref } from 'vue';
import { Switch, Modal, Button, Space } from 'ant-design-vue';

interface Permission {
  name: string;
  key: string;
  value: boolean;
}

const open = defineModel("open", { type: Boolean, default: false });
const selectedModerator = ref<string | null>(null);

const permissions = ref<Permission[]>([
  { name: 'Foydalanuvchilarni tahrirlay olish', key: 'edit_users', value: false },
  { name: 'Mahsulotlarni tahrirlash', key: 'edit_products', value: false },
  { name: 'Bannerlarni tahrirlash', key: 'edit_banners', value: false },
]);

function togglePermission(permission: Permission) {
  permission.value = !permission.value;

  if (selectedModerator.value) {
    fetch(`/api/moderators/${selectedModerator.value}/permissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: permission.key, value: permission.value }),
    });
  }
}

function closeModal() {
  open.value = false;
}
</script>

<template>
  <a-modal :width="650" centered @cancel="closeModal" :open="open" title="Huquqlarni tahrirlash">
    <a-form id="permissionsForm" layout="vertical">
      <div v-for="perm in permissions" :key="perm.key" class="flex justify-between items-center p-2 border rounded mb-2">
        <span>{{ perm.name }}</span>
        <a-switch :checked="perm.value" @change="togglePermission(perm)" />
      </div>
    </a-form>

    <template #footer>
      <a-space>
        <a-button size="large" @click="closeModal">Yopish</a-button>
        <!-- Optional: Saqlash tugmasi, chunki switchlar darhol yuboriladi -->
      </a-space>
    </template>
  </a-modal>
</template>
