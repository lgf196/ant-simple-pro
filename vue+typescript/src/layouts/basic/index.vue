<template>
  <section
    class="basic-layout header-fixed slidebar-fixed tag-fixed"
    :class="{
      mobile,
      collapsed,
      'hidden-tags-nav': !tagsNavVisible
    }"
  >
    <SlideBar></SlideBar>
    <div class="layout-content">
      <HeaderBar></HeaderBar>
      <TagsNav></TagsNav>
      <main class="main">
        <router-view/>
      </main>
      <FooterBar class="footer"></FooterBar>
    </div>
    <BackTop />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import appStore from '@/store/modules/app'
import HeaderBar from './components/headerbar.vue'
import SlideBar from './components/slidebar.vue'
import TagsNav from './components/tags-nav.vue'
import FooterBar from '@/components/footerbar/index.vue'
import BackTop from './components/back-top.vue'
import useMobile from './useMobile'
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
    const mobile = useMobile()
    const collapsed = computed(() => appStore.collapsed)
    const tagsNavVisible = computed(() => appStore.tagsNavVisible)
    return {
      mobile,
      collapsed,
      tagsNavVisible
    }
  }
})
</script>
