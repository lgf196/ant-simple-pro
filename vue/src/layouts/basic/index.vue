<template>
  <section
    class="basic-layout header-fixed tag-fixed"
    :class="{
      mobile,
      collapsed,
      'hidden-tags-nav': !tagsNavVisible,
      'hidden-tags-nav': !tagsNavVisible,
      'slidebar-fixed': windowWidth > 750,
      'has-drawer': windowWidth <= 750
    }"
  >
    <template v-if="windowWidth > 750">
      <SlideBar></SlideBar>
    </template>
    <a-drawer
      v-else
      class="basic-drawer"
      placement="left"
      :closable="false"
      v-model:visible="drawerVisible"
      :width="200"
    >
      <SlideBar></SlideBar>
    </a-drawer>
    <div class="layout-content">
      <HeaderBar @open-drawer="onOpenDrawer" :windowWidth="windowWidth" :drawerVisible="drawerVisible"></HeaderBar>
      <TagsNav></TagsNav>
      <main class="main">
        <router-view/>
      </main>
      <FooterBar class="footer"></FooterBar>
    </div>
    <BackTop />
  </section>
</template>

<script>
import { watch, ref } from 'vue'
import { mapGetters, useStore } from 'vuex'
import HeaderBar from './headerbar'
import SlideBar from './slidebar'
import TagsNav from './tags-nav'
import FooterBar from '@/components/footerbar'
import BackTop from './back-top'
import { isMobile } from '@/utils/system'
import useResizeWidth from '@/hooks/useResizeWidth'
import './index.less'
export default {
  name: 'BasicLayout',
  components: {
    HeaderBar,
    SlideBar,
    TagsNav,
    FooterBar,
    BackTop
  },
  data() {
    return {
      mobile: isMobile()
    }
  },
  computed: {
    ...mapGetters(['collapsed', 'tagsNavVisible'])
  },
  setup() {
    const drawerVisible = ref(false)
    const { width } = useResizeWidth()
    const store = useStore()
    watch(width, (newWidth) => {
      store.commit('app/TOGGLE_SLIDE_BAR', newWidth < 1200)
    }, {
      immediate: true
    })

    function onOpenDrawer() {
      drawerVisible.value = true
      store.commit('app/TOGGLE_SLIDE_BAR', false)
    }

    return {
      windowWidth: width,
      drawerVisible,
      onOpenDrawer
    }
  }
}
</script>
