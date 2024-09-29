<script lang="ts">
import { defineComponent } from 'vue'
import Home from './Home.vue'
import { useNotification } from 'naive-ui';


export default defineComponent({
  components: {
    Home
  },
  setup() {
    const notification = useNotification();
    
    window.ipcRenderer.on('notification', (_event, message: any) => {
      notification[message.type ? message.type : 'info']({
        title: message.title ? message.title : 'Info',
        description: message.message ? message.message : '',
        duration: 8000
      });
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
