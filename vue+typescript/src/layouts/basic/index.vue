<template>
  <section class="basic-layout header-fixed slidebar-fixed tag-fixed" :class="{mobile, collapsed}">
    <SlideBar></SlideBar>
    <div class="layout-content">
      <HeaderBar></HeaderBar>
      <TagsNav></TagsNav>
      <main class="main">
        <router-view/>
      </main>
      <FooterBar class="footer"></FooterBar>
    </div>
  </section>
</template>

<script>
import { defineComponent, computed } from 'vue'
import appStore from '@/store/modules/app'
import HeaderBar from './components/headerbar.vue'
import SlideBar from './components/slidebar.vue'
import TagsNav from './components/tags-nav.vue'
import FooterBar from '@/components/footerbar/index.vue'
import useMobile from './useMobile'
import './index.less'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    HeaderBar,
    SlideBar,
    FooterBar,
    TagsNav
  },
  setup() {
    const mobile = useMobile()
    const collapsed = computed(() => appStore.collapsed)
    return {
      mobile,
      collapsed
    }
  }
})
</script>
