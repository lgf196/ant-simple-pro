<template>
  <section class="basic-layout header-fixed slidebar-fixed tag-fixed" :class="{mobile, collapsed}">
    <HeaderBar></HeaderBar>
    <section class="layout-content">
      <SlideBar></SlideBar>
      <div class="layout-content__inner">
        <TagsNav></TagsNav>
        <main class="main">
          <router-view/>
        </main>
        <FooterBar class="footer"></FooterBar>
      </div>
    </section>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
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
    return {
      mobile
    }
  },
  computed: {
    ...mapGetters(['collapsed'])
  }
})
</script>
