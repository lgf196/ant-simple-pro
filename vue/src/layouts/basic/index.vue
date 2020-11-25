<template>
  <section class="layout">
    <SlideBar></SlideBar>
    <section class="layout-content">
      <HeaderBar></HeaderBar>
      <TagsNav></TagsNav>
      <main class="main">
        <router-view/>
      </main>
      <FooterBar class="footer"></FooterBar>
    </section>
  </section>
</template>

<script>
import HeaderBar from './headerbar'
import SlideBar from './slidebar'
import TagsNav from './tags-nav'
import FooterBar from '@/components/footerbar'
export default {
  name: 'BasicLayout',
  components: {
    HeaderBar,
    SlideBar,
    TagsNav,
    FooterBar
  }
}
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
  }
  .layout-content {
    flex: auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f0f2f5;
    overflow-x: hidden;
  }
  .header {
    z-index: 9;
    width: 100%;
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
