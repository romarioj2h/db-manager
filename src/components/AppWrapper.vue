<script lang="ts">
import { defineComponent } from 'vue'
import Home from './Home.vue'
import { createNotifier } from "../services/Notify";
import {useNotification} from "naive-ui";


export default defineComponent({
  components: {
    Home
  },
  setup() {
    const notification = useNotification();
    const notifier = createNotifier(notification);
    window.ipcRenderer.on('notification', (_event, message: any) => {
      notifier.notify(message.message, message.type);
    })
    return {

    }
  }
})
</script>

<template>
  <Home />
</template>

<style></style>
