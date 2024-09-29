<script lang="ts">
import { defineComponent } from 'vue'
import AppWrapper from './components/AppWrapper.vue'

export default defineComponent({
  components: {
    AppWrapper
  }
})
</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-modal-provider>
          <n-dialog-provider>
            <AppWrapper />
          </n-dialog-provider>
        </n-modal-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style></style>
