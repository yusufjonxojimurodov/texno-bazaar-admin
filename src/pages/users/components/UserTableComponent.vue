<script setup lang="ts">
import IconDelete from '../../../components/icons/IconDelete.vue';
import BaseTable from '../../../components/baseComponents/BaseTable.vue';
import useUser from '../../../store/user.pinia';
import IconEdit from '../../../components/icons/IconEdit.vue';
import { userColumns } from '../../../columns/user.table';
import EditUserModal from './form/EditUserModal.vue';
import { useQueryParams } from '../../../utils/helpers/useQueryParams';
import { ref } from 'vue';

const userStore = useUser()
const { setQueries } = useQueryParams()

const openEditModal = ref<boolean>(false)

const handlePageChange = (pag: any) => {
  const page = pag.current ? pag.current - 1 : 0
  const size = pag.pageSize || 0
  userStore.getUsers(page, size)
}

function openModalEdit(id: number) {
  setQueries({
    userId: id || undefined
  })
  openEditModal.value = true
}

const roleValue = ref([
  {
    label: "Sotuvchi",
    value: "seller"
  },
  {
    label: "Admin",
    value: "admin"
  },
  {
    label: "Mijoz",
    value: "customer"
  },
  {
    label: "Bloklangan",
    value: "blocked"
  }
])

async function handleRole(id: number, newRole: string, record: any) {
  const oldRole = record.role

  record.loading = true

  try {
    const res = await userStore.putRole({ role: newRole, id })

    if (res?.status === 200) {
      record.role = newRole
    } else {
      record.role = oldRole
    }
  } catch (err) {
    record.role = oldRole
  } finally {
    record.loading = false
  }
}


const deleteUser = (id:number) => {
  userStore.deleteUser(id)
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 3000);
  });
};
</script>

<template>
  <base-table @pageChange="handlePageChange" :data="userStore.allUsers" :columns="userColumns"
    :loading="userStore.loading" :total="userStore.totalUsers">
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'colIndex'">
        {{ (userStore.currentPage - 1) * userStore.pageSize + index + 1 }}
      </template>

      <template v-else-if="column.dataIndex === 'avatarUrl'">
        <div class="!flex !justify-center items-center">
          <a-image :src="record.avatarUrl" :width="50" :height="50" style="border-radius: 50%; object-fit: cover" />
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'role'">
        <a-select :loading="record.loading" :disabled="record.role === 'admin'" @change="(value: string) => handleRole(record._id, value, record)"
          style="width: 110px;" size="middle" :options="roleValue" v-model:value="record.role" />
      </template>

      <template v-else-if="column.dataIndex === 'actions'">
        <a-space>
          <a-button @click="openModalEdit(record._id)" class="!flex !justify-center items-center" type="primary"
            size="middle">
            <template #icon>
              <icon-edit class="w-5 h-5" />
            </template>
          </a-button>
          <a-popconfirm @confirm="deleteUser(record._id)" ok-text="Ha" cancel-text="Yo'q"
            title="O'chirishga rozimisiz?">
            <a-button danger type="primary" size="middle" class="!flex !justify-center !items-center">
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

  <edit-user-modal v-model:open="openEditModal" />
</template>