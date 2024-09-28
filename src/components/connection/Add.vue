<script lang="ts">
import { computed, defineComponent, ref, toRaw } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { Connections } from '../../services/Connections'

export default defineComponent({
  setup() {
    const connectionsService = new Connections();
    const formRef = ref<FormInst | null>(null)
    const connection = ref({
      driver: '',
      url: ''
    });
    return {
      formRef,
      connection: connection,
      save() {
        connectionsService.add(toRaw(connection.value));
      }
    }
  }
})
</script>

<template>
  <n-form ref="formRef" inline :label-width="80" :model="connection">
    <n-form-item label="Driver" path="driver">
      <n-input v-model:value="connection.driver" placeholder="Input driver" />
    </n-form-item>
    <n-form-item label="URL" path="url">
      <n-input v-model:value="connection.url" placeholder="Input url" />
    </n-form-item>
    <n-button @click="save" type="info">
      Save
    </n-button>
  </n-form>
</template>

<style scoped></style>
