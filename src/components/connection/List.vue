<script lang="ts">
import {defineComponent, ref} from 'vue'
import { Connections } from '../../services/Connections'

export default defineComponent({
  setup() {
    const connectionsService = new Connections();
    const connections = ref([]);
    connectionsService.getAll().then(getAllResult => {
      connections.value = getAllResult.map(connection => {
        let key = connection.host + ' - ' + connection.database;
        return {
          label: key,
          key: key,
          children: [
            {
              label: key,
              key: key,
            }
          ]
        }
      });
    })
    return {
      connections: connections
    }
  }
})
</script>

<template>
  <div>
    <n-tree block-line :data="connections" expand-on-click/>
  </div>
</template>

<style scoped>
</style>
