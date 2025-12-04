<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useModels from '../../../../../store/product.models.pinia';

const open = defineModel("open", {
    type: Boolean,
    default: false
})

const modelsStore = useModels()
const { form } = storeToRefs(modelsStore)


function submit() {
    if (form.value.id) {
        modelsStore.updateModel(closeModal)
    } else {
        modelsStore.createModel(closeModal)
    }
}

function closeModal() {
    form.value.label = ""
    form.value.value = ""
    form.value.id = null
    open.value = false
}
</script>

<template>
    <a-modal
        v-model:open="open"
        :title="form.id ? `Modelni o'zgartirish` : 'Model yaratish'"
        centered
    >
        <a-form :model="form" id="modelForm" @finish="submit" layout="vertical">
            <a-row :gutter="[24,24]">
                <a-col :span="12">
                    <a-form-item label="Label" :rules="[{ required: true, message: 'Majburiy maydon' }]" name="label">
                        <a-input v-model:value="form.label" size="large" placeholder="Labelni kiriting" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Value" :rules="[{ required: true, message: 'Majburiy maydon' }]" name="value">
                        <a-input v-model:value="form.value" size="large" placeholder="Valueni kiriting" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <template #footer>
            <div class="flex justify-end items-center gap-2 mt-4">
                <a-button @click="closeModal" danger type="primary" size="large">
                    Bekor qilish
                </a-button>
                <a-button :loading="modelsStore.buttonLoading" form="modelForm" html-type="submit" type="primary" size="large">
                    {{ form.id ? 'Saqlash' : 'Yaratish' }}
                </a-button>
            </div>
        </template>
    </a-modal>
</template>