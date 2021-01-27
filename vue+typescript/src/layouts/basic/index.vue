<template>
  <section
    class="basic-layout header-fixed tag-fixed"
    :class="{
      mobile,
      collapsed,
      'hidden-tags-nav': !tagsNavVisible,
      'slidebar-fixed': windowWidth > 750,
      'has-drawer': windowWidth <= 750
    }"
  >
    <template v-if="windowWidth > 750">
      <SlideBar />
    </template>
    <a-drawer
      v-else
      class="basic-drawer"
      placement="left"
      :closable="false"
      v-model:visible="drawerVisible"
      :width="200"
    >
      <SlideBar />
    </a-drawer>
    <div class="layout-content">
      <HeaderBar
        @open-drawer="onOpenDrawer"
        :windowWidth="windowWidth"
        :drawerVisible="drawerVisible"
      />
      <TagsNav />
      <main class="main">
        <router-view />
      </main>
      <FooterBar class="footer" />
    </div>
    <BackTop />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import appStore from '@/store/modules/app'
import HeaderBar from './components/headerbar.vue'
import SlideBar from './components/slidebar.vue'
import TagsNav from './components/tags-nav.vue'
import FooterBar from '@/components/footerbar/index.vue'
import BackTop from './components/back-top.vue'
import useMobile from './useMobile'
import useResizeWidth from '@/hooks/useResizeWidth'
import './index.less'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    HeaderBar,
    SlideBar,
    FooterBar,
    TagsNav,
    BackTop
  },
  setup() {
    const drawerVisible = ref(false)
    const mobile = useMobile()
    const collapsed = computed(() => appStore.collapsed)
    const tagsNavVisible = computed(() => appStore.tagsNavVisible)
    const { width } = useResizeWidth()

    watch(
      width,
      newWidth => {
        appStore.TOGGLE_SLIDE_BAR(newWidth < 1200)
      },
      {
        immediate: true
      }
    )

    function onOpenDrawer() {
      drawerVisible.value = true
      appStore.TOGGLE_SLIDE_BAR(false)
    }

    return {
      mobile,
      collapsed,
      tagsNavVisible,
      windowWidth: width,
      drawerVisible,
      onOpenDrawer
    }
  }
})
</script>
