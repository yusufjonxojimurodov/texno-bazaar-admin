<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useQueryParams } from "../../utils/helpers/useQueryParams";
import useUser from "../../store/user.pinia";

const { setQueries, getQueries } = useQueryParams();
const userStore = useUser()

const open = defineModel("open", { type: Boolean, default: false });

const props = defineProps({
    permissions: {
        type: Object as () => Record<string, boolean>,
        required: true,
    },
});

const permissions = ref({
    editUsers: false,
    deleteUsers: false,
    updateRoleUsers: false,
    editProducts: false,
    deleteProducts: false,
    updateStatusProducts: false,
    updateProducts: false,
    createBanner: false,
    updateBanner: false,
    updateStatusBanner: false,
    deleteBanner: false,
});

const userId = computed(() => getQueries("id"))

type PermissionKeys = keyof typeof permissions.value;

watch(open, (isOpen) => {
    if (isOpen) {
        for (const key in permissions.value) {
            const typedKey = key as PermissionKeys;
            permissions.value[typedKey] = props.permissions[typedKey] ?? false;
        }
    }
});

const permissionLabels: Record<PermissionKeys, string> = {
    editUsers: "Foydalanuvchilarni tahrirlash",
    deleteUsers: "Foydalanuvchilarni o‘chirish",
    updateRoleUsers: "Foydalanuvchi roli o‘zgartirish",
    editProducts: "Mahsulotni tahrirlash",
    deleteProducts: "Mahsulotni o‘chirish",
    updateStatusProducts: "Mahsulot holatini yangilash",
    updateProducts: "Mahsulotni yangilash",
    createBanner: "Banner yaratish",
    updateBanner: "Banner tahrirlash",
    updateStatusBanner: "Banner holatini yangilash",
    deleteBanner: "Bannerni o‘chirish",
};

const savePermissions = () => {
    const permission = {
        permission: permissions.value,
    }
    userStore.updateModeratorPermission(userId.value, permission, closeModal)
};

const closeModal = () => {
    setQueries({ id: undefined });
    open.value = false;
};
</script>

<template>
    <a-modal centered @cancel="closeModal" :open="open" title="Moderator huquqlarini tahrirlash" :width="650">
        <div class="permissions-grid">
            <div v-for="(_, key) in permissions" :key="key" class="permission-item">
                <span>{{ permissionLabels[key as PermissionKeys] }}</span>
                <a-switch v-model:checked="permissions[key as PermissionKeys]" />
            </div>
        </div>

        <template #footer>
            <a-space>
                <a-button @click="closeModal" size="large">Yopish</a-button>
                <a-button :loading="userStore.buttonLoader" size="large" type="primary" @click="savePermissions">
                    Saqlash
                </a-button>
            </a-space>
        </template>
    </a-modal>
</template>

<style scoped>
.permissions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 20px;
    margin-top: 10px;
}

.permission-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    background: #f8f9fa;
    padding: 8px 12px;
    border-radius: 8px;
}
</style>