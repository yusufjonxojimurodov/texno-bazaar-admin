<script setup lang="ts">
import IconDelete from '../../../components/icons/IconDelete.vue';
import BaseTable from '../../../components/baseComponents/BaseTable.vue';
import useUser from '../../../store/user.pinia';
import IconEdit from '../../../components/icons/IconEdit.vue';
import { userColumns } from '../../../columns/user.table';
import UserFormModal from './form/UserFormModal.vue';
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import { computed, ref } from 'vue';
import UserInfoDrawer from './UserInfoDrawer.vue';
import type { User } from './UserInfoDrawer.vue';
import IconInfo from '../../../components/icons/IconInfo.vue';
import IconPermisson from '../../../components/icons/IconPermisson.vue';
import SettingPermissionModalComponent from '../../../components/modals/SettingPermissionModalComponent.vue';
import { storeToRefs } from 'pinia';

const userStore = useUser()
const { userModel } = storeToRefs(userStore)

const { setQueries } = useQueryParams()

const openUserForm = ref<boolean>(false)
const userInfo = ref<User>({
  name: "",
  surname: "",
  avatarUrl: "",
  role: "",
  username: "",
  phone: 0,
  email: "",
  birthDate: "",
  chatId: 0,
  points: 0,
  rating: 0,
})
const infodrawer = ref<boolean>(false)
const openSettingPermissionModal = ref<boolean>(false)
const permissions = ref({})

const handlePageChange = (pag: any) => {
  const page = pag.current ? pag.current - 1 : 0
  const size = pag.pageSize || 0
  userStore.getUsers({ page, size })
}

function openModalEdit(record: any) {
  userModel.value.id = record.id
  userModel.value.name = record.name
  userModel.value.surname = record.surname
  userModel.value.email = record.email
  userModel.value.username = record.username
  userModel.value.phone = record.phone

  openUserForm.value = true
}

const roleValue = ref([
  {
    label: "Sotuvchi",
    value: "seller"
  },
  {
    label: "Mijoz",
    value: "customer"
  },
  {
    label: "Moderator",
    value: "moderator"
  },
  {
    label: "Bloklangan",
    value: "blocked"
  }
])

const filteredRoleOptions = computed(() => {
  if (userStore.user.role === "moderator") {
    return roleValue.value.filter(opt => opt.value !== "moderator")
  }

  return roleValue.value
})

async function handleRole(id: number, newRole: string, record: any) {
  const oldRole = record.role

  record.loading = true

  try {
    await userStore.putRole({ role: newRole, id })
  } catch (err) {
    record.role = oldRole
  } finally {
    record.loading = false
  }
}

const deleteUser = (id: number) => {
  userStore.deleteUser(id)
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 3000);
  });
};

function openInfoDrawer(record: any) {
  infodrawer.value = true
  userInfo.value = record
}

function openPermissionSettingModal(record: any) {
  setQueries({
    id: record.id || undefined
  })
  permissions.value = record.permission
  openSettingPermissionModal.value = true
}
</script>

<template>
  <base-table @pageChange="handlePageChange" :data="userStore.allUsers" :columns="userColumns"
    :loading="userStore.loading" :total="userStore.totalUsers">
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'colIndex'">
        {{ (userStore.currentPage - 1) * userStore.pageSize + index + 1 }}
      </template>

      <template v-else-if="column.dataIndex === 'role'">
        <a-select :loading="record.loading" :disabled="(userStore.user.role === 'admin' && record.role === 'admin') ||
          (userStore.user.role === 'moderator' && (record.role === 'admin' || record.role === 'moderator'))
          " @change="(value: string) => handleRole(record.id, value, record)" style="width: 110px;" size="middle"
          :options="filteredRoleOptions" v-model:value="record.role" />
      </template>
      <template v-else-if="column.dataIndex === 'userName'">
        <a-tag class="!w-full !text-[14px] !px-2 !py-1" color="volcano">
          {{ record.username }}
        </a-tag>
      </template>

      <template v-else-if="column.dataIndex === 'faceRegistered'">
        <a-tag style="width: 90px;" v-if="record.faceRegistered" color="success">
          O'rnatilgan
        </a-tag>
        <a-tag style="width: 90px;" size="large" v-else color="error">
          O'rnatilmagan
        </a-tag>
      </template>

      <template v-else-if="column.dataIndex === 'actions'">
        <a-space>
          <a-button :disabled="(userStore.user.role === 'admin' && record.role === 'admin') ||
            (userStore.user.role === 'moderator' && (record.role === 'admin' || record.role === 'moderator'))
            " @click="openModalEdit(record)" class="!rounded-full !w-8 !h-8 !flex !justify-center items-center"
            type="primary" size="small">
            <template #icon>
              <icon-edit class="w-5 h-5" />
            </template>
          </a-button>
          <a-button @click="openInfoDrawer(record)" class="!rounded-full !w-8 !h-8 !flex !justify-center items-center"
            type="primary" size="small">
            <template #icon>
              <icon-info class="w-8 h-8" />
            </template>
          </a-button>
          <a-button :disabled="record.role !== 'moderator'" @click="openPermissionSettingModal(record)"
            class="!rounded-full !w-8 !h-8 !flex !justify-center items-center" type="primary" size="small">
            <template #icon>
              <icon-permisson class="w-5 h-5" />
            </template>
          </a-button>
          <a-popconfirm :disabled="(userStore.user.role === 'admin' && record.role === 'admin') ||
            (userStore.user.role === 'moderator' && (record.role === 'admin' || record.role === 'moderator'))
            " @confirm="deleteUser(record.id)" ok-text="Ha" cancel-text="Yo'q" title="O'chirishga rozimisiz?">
            <a-button :disabled="(userStore.user.role === 'admin' && record.role === 'admin') ||
              (userStore.user.role === 'moderator' && (record.role === 'admin' || record.role === 'moderator'))
              " danger type="primary" size="small" class="!rounded-full !w-8 !h-8 !flex !justify-center !items-center">
              <template #icon>
                <icon-delete class="w-5 h-5" />
              </template>
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>

      <template v-else>
        {{ record[column.dataIndex] }}
      </template>
    </template>
  </base-table>

  <user-form-modal v-model:open="openUserForm" />
  <user-info-drawer v-model:open="infodrawer" :user="userInfo" />
  <setting-permission-modal-component :permissions="permissions" v-model:open="openSettingPermissionModal" />
</template>