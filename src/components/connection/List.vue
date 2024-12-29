<script lang="ts">
import {defineComponent, ref} from 'vue'
import { Connections } from '../../services/Connections'
import {TreeOption} from "naive-ui";
import {Connection} from "../../services/Connection";

export default defineComponent({
  setup() {
    const connectionsService = new Connections();
    const connectionService = new Connection();
    const connections = ref([]);
    connectionsService.getAll().then(getAllResult => {
      connections.value = getAllResult.map(connection => {
        return {
          label: connection.host + ' - ' + connection.database,
          key: connection.id,
          isLeaf: false
        }
      });
    })
    return {
      connections: connections,
      async loadTables(node: TreeOption) {
        const tables = await connectionService.getTablesById(node.key);
        node.children = tables.map(table => {
          return {
            label: table,
            key: node.key + table,
            isLeaf: true
          }
        })
      }
    }
  }
})
</script>

<template>
  <div>
    <n-tree block-line :data="connections" expand-on-click :on-load="loadTables" virtual-scroll style="height: 100%"/>
  </div>
</template>

<style scoped>
</style>
