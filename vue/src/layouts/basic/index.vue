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
      v-model:visible="drawerVisible"
      class="basic-drawer"
      placement="left"
      :closable="false"
      :width="200"
    >
      <SlideBar />
    </a-drawer>
    <div class="layout-content">
      <HeaderBar :window-width="windowWidth" :drawer-visible="drawerVisible" @open-drawer="onOpenDrawer" />
      <TagsNav />
      <main class="main">
        <router-view />
      </main>
      <FooterBar class="footer" />
    </div>
    <BackTop />
  </section>
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
import store from '@/store'
import HeaderBar from './components/headerbar.vue'
import SlideBar from './components/slidebar.vue'
import TagsNav from './components/tags-nav.vue'
import FooterBar from '@/components/footerbar/index.vue'
import BackTop from './components/back-top.vue'
import useMobile from './useMobile'
import { useResizeWidth } from '@/hooks'
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
    const collapsed = computed(() => store.getters.collapsed)
    const tagsNavVisible = computed(() => store.getters.tagsNavVisible)
    const { width } = useResizeWidth()

    watch(
      width,
      newWidth => {
        store.commit('app/TOGGLE_SLIDE_BAR', newWidth < 1200)
      },
      {
        immediate: true
      }
    )

    function onOpenDrawer() {
      drawerVisible.value = true
      store.commit('app/TOGGLE_SLIDE_BAR', false)
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
