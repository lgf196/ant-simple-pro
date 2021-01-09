<template>
  <section class="layout header-fixed slidebar-fixed tag-fixed" :class="{mobile, collapsed}">
    <section class="layout-content">
      <SlideBar></SlideBar>
      <div class="layout-content__inner">
        <HeaderBar></HeaderBar>
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
import { mapGetters } from 'vuex'
import HeaderBar from './headerbar'
import SlideBar from './slidebar'
import TagsNav from './tags-nav'
import FooterBar from '@/components/footerbar'
import { isMobile } from '@/utils/system'
import './index.less'
export default {
  name: 'BasicLayout',
  components: {
    HeaderBar,
    SlideBar,
    TagsNav,
    FooterBar
  },
  data() {
    return {
      mobile: false
    }
  },
  computed: {
    ...mapGetters(['collapsed'])
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      const val = isMobile()
      this.mobile = val
      this.$store.commit('app/TOGGLE_SLIDE_BAR', val)
    }
  }
}
</script>

<style lang="less" scoped>
  // .layout {
  //   display: flex;
  // }
  .layout-content {
    flex: auto;
    display: flex;
    // flex-direction: column;
    // min-height: 100vh;
    background: #f0f2f5;
    overflow-x: hidden;
  }
  .layout-content__inner {
    flex: auto;
  }
  .global-header {
    display: flex;
    position: relative;
    height: 64px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  }
  .footer {
    padding: 15px 0;
    height: 80px;
  }
  .main {
    min-height: calc(100vh - @header-height - 36px - 80px);
  }
</style>
