<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue'
import type { FormInst } from 'naive-ui'
import { Connections } from '../../services/Connections'

export default defineComponent({
  setup() {
    const connectionsService = new Connections();
    const formRef = ref<FormInst | null>(null)
    const connection = ref({
      host: '',
      user: '',
      password: '',
      database: '',
    });
    return {
      formRef,
      connection: connection,
      save() {
        connectionsService.add(toRaw(connection.value));
      },
      test() {
        connectionsService.test(toRaw(connection.value));
      }
    }
  }
})
</script>

<template>
  <div>
    <n-h2>Add connection</n-h2>
    <n-form ref="formRef" :label-width="80" :model="connection">
      <n-alert title="Info" type="info" style="margin-bottom: 20px;">
        Only MySQL is currently supported
      </n-alert>
      <n-form-item label="Host" path="host">
        <n-input v-model:value="connection.host" placeholder="Input host" />
      </n-form-item>
      <n-form-item label="User" path="user">
        <n-input v-model:value="connection.user" placeholder="Input user" />
      </n-form-item>
      <n-form-item label="Password" path="password">
        <n-input v-model:value="connection.password" type="password" placeholder="Input password" />
      </n-form-item>
      <n-form-item label="Database" path="database">
        <n-input v-model:value="connection.database" placeholder="Input database" />
      </n-form-item>
      <n-button type="info" @click="test">
        Test connection
      </n-button>
      <n-button @click="save" type="primary" style="float: right;">
        Save
      </n-button>
    </n-form>
  </div>
</template>

<style scoped></style>
