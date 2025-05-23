<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NList, NListItem, NThing } from 'naive-ui'

interface Connection {
  id: number;
  host: string;
  user: string;
  database: string;
}

export default defineComponent({
  name: 'ConnectionList',
  components: {
    NList,
    NListItem,
    NThing
  },
  props: {
    connections: {
      type: Array as PropType<Connection[]>,
      default: () => []
    }
  },
  setup(props) {
    return {
      // No specific setup logic needed for now, props are accessed directly in the template
    }
  }
})
</script>

<template>
  <div class="connection-list-container">
    <n-list hoverable clickable>
      <n-list-item v-if="connections.length === 0">
        <n-thing>
          <template #header>
            No connections found.
          </template>
          <template #description>
            Click "Add connection" to get started.
          </template>
        </n-thing>
      </n-list-item>
      <n-list-item v-for="connection in connections" :key="connection.id">
        <n-thing>
          <template #header>
            {{ connection.host }}
          </template>
          <template #description>
            Database: {{ connection.database }} (User: {{ connection.user }})
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<style scoped>
.connection-list-container {
  margin-top: 16px;
}
</style>
