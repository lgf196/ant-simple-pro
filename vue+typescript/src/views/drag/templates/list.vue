<template>
  <a-list itemLayout="horizontal" :dataSource="[1, 2]">
    <template #renderItem>
      <a-list-item>
        <a-list-item-meta
          description="简洁，美观，快速上手，支持3大框架；Concise, beautiful, quick to get started, support 3 big frameworks"
        >
          <template #avatar>
            <a-avatar :size="30" style="backgroundcolor: #fff">
              <template #icon>
                <ComSvgIcon name="logo" class="icon-logo"></ComSvgIcon>
              </template>
            </a-avatar>
          </template>
          <template #title>
            <span>Ant-Simple-Pro</span>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TempList'
})
</script>
