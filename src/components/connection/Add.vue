<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue'
import type { FormInst } from 'naive-ui'
import { Connections } from '../../services/Connections'
import {createNotifier} from "../../services/Notify";
import {useNotification} from "naive-ui";

export default defineComponent({
  emits: ['added'],
  setup(_, {emit}) {
    const connectionsService = new Connections();
    const notification = useNotification();
    const notifier = createNotifier(notification);
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
        connectionsService.add(toRaw(connection.value)).then(response => {
          if (response.type === 'success') {
            emit('added');
          }
          notifier.notify(response.message, response.type);
        }).catch((error) => {
          notifier.notify(error.message, 'error')
        });
      },
      test() {
        // TODO: make this generic for other types of services
        connectionsService.test(toRaw(connection.value)).then((response) => {
          notifier.notify(response.message, response.type)
        }).catch((error) => {
          notifier.notify(error.message, 'error')
        });
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
