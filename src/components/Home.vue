<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import { Connections } from '../services/Connections'
import Add from './connection/Add.vue'

export default defineComponent({
  components: {
    Add
  },
  setup() {
    const connectionsService = new Connections();
    const valueRef = ref(1)
    const panelsRef = ref([1, 2, 3, 4, 5])
    const addableRef = computed(() => {
      return {
        disabled: panelsRef.value.length >= 10
      }
    })
    const closableRef = computed(() => {
      return panelsRef.value.length > 1
    })
    const message = useMessage()
    const dialog = useDialog()
    return {
      value: valueRef,
      panels: panelsRef,
      addable: addableRef,
      closable: closableRef,
      showModal: ref(false),
      handleAdd() {
        const newValue = Math.max(...panelsRef.value) + 1
        panelsRef.value.push(newValue)
        valueRef.value = newValue
      },
      handleClose(name: number) {
        const { value: panels } = panelsRef
        const nameIndex = panels.findIndex(panelName => panelName === name)
        if (!~nameIndex)
          return
        panels.splice(nameIndex, 1)
        if (name === valueRef.value) {
          valueRef.value = panels[Math.min(nameIndex, panels.length - 1)]
        }
      },
      addConnection() {
        connectionsService.getAll();
      }
    }
  }
})
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header style="height: 34px;" bordered>
      Romi DB Manager
    </n-layout-header>
    <n-layout has-sider position="absolute" style="top: 34px">
      <n-layout-sider bordered content-style="padding: 24px;">
        DBs and Tables
        <n-button @click="showModal = true" type="info">
          Add connection
        </n-button>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;">
        <n-tabs v-model:value="value" type="card" :addable="addable" :closable="closable" tab-style="min-width: 80px;"
          @close="handleClose" @add="handleAdd">
          <n-tab-pane v-for="panel in panels" :key="panel" :name="panel">
            {{ panel }}
          </n-tab-pane>
          <template #prefix>
            Editors
          </template>
        </n-tabs>
      </n-layout>
    </n-layout>
    <n-modal v-model:show="showModal" preset="card" style="width: 600px">
      <Add />
    </n-modal>
  </n-layout>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
