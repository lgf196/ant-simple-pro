<template>
  <div class="tags-nav">
    <div ref="scrollWrapper" class="scroll-wrapper" @DOMMouseScroll="handlescroll" @mousewheel="onScroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <a-tag
          v-for="(item, index) in tags"
          :key="index"
          class="nav-tag"
          visible
          :ref="setItemRef"
          :data-route-item="item"
          :color="isActive(item) ? 'blue' : ''"
          :closable="!isAffix(item)"
          @close="onDeleteTag(item)"
          @click="onClickTag(item)"
          @contextmenu.prevent="onOpenMenu(item, $event)"
        >
          {{item.meta && item.meta.title}}
        </a-tag>
      </div>
    </div>
    <ul v-show="visible" :style="menuStyle" class="contextmenu">
      <li @click="onRefreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="onCloseSelectedTag(selectedTag)">关闭</li>
      <li @click="onCloseOthersTags">关闭其他</li>
      <li @click="onCloseAllTags">关闭所有</li>
    </ul>
    <!-- <a-button class="left-button button">
      <template #icon>
        <LeftOutlined />
      </template>
    </a-button>
    <div class="right-button-group">
      <a-button class="right-button button">
        <template #icon>
          <RightOutlined />
        </template>
      </a-button>
      <a-button class="setting-button button">
        <template #icon>
          <SettingOutlined />
        </template>
      </a-button>
    </div> -->
  </div>
</template>

<script>
// import { LeftOutlined, RightOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { getAffixTags } from '@/utils'
import { setTagNav, getTagNav } from '@/utils/local'
import { routes } from '@/router/routes'
export default {
  name: 'TagsNav',
  components: {
    // LeftOutlined,
    // RightOutlined,
    // SettingOutlined
  },
  data() {
    return {
      tagBodyLeft: 0,
      tagNavList: getTagNav() || [],
      menuStyle: {},
      visible: false,
      selectedTag: {},
      tagRefs: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        this.addTag(newRoute)
        this.getTagElementByRoute(newRoute)
      }
    },
    tagNavList(newVal) {
      setTagNav(newVal)
    }
  },
  computed: {
    tags() {
      return getAffixTags(routes).concat(this.tagNavList)
    }
  },
  mounted() {
    document.body.addEventListener('click', this.closeMenu)
    // this.addTag(this.$route)
    // this.getTagElementByRoute(this.$route)
    // watchEffect(() => {
    //   this.addTag(this.$route)
    //   this.getTagElementByRoute(this.$route)
    // })
    // watchEffect(() => {
    //   setTagNav(this.tagNavList)
    // })
  },
  beforeUpdate() {
    this.tagRefs = []
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.closeMenu)
  },
  methods: {
    setItemRef(el) {
      this.tagRefs.push(el)
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(route) {
      return route.meta && route.meta.affix
    },
    onScroll(e) {
      const type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
      this.closeMenu()
    },
    handleScroll(offset) {
      const wrapperWidth = this.$refs.scrollWrapper.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) { // 向左滚动
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else { // 向右滚动
        if (wrapperWidth < bodyWidth) { // 内容超出容器
          if (this.tagBodyLeft >= (wrapperWidth - bodyWidth)) {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, wrapperWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollWrapper.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - tag.offsetWidth))
      }
    },
    getTagElementByRoute(route) {
      this.$nextTick(() => {
        this.tagRefs.forEach(item => {
          if (item && route.path === item.$attrs['data-route-item'].path) {
            const tag = item.$el
            this.moveToView(tag)
          }
        })
      })
    },
    toLastView() {
      const latestView = this.tags.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.path)
      } else {
        this.$router.push('/')
      }
    },
    addTag(route) {
      if (!route.meta || !route.meta.title) {
        return
      }
      if (route.meta && route.meta.affix) {
        return
      }
      const currentIndex = this.tagNavList.findIndex(item => item.path === route.path)
      if (currentIndex >= 0) {
        // this.tagNavList.splice(currentIndex, 1, route)
        // this.tagNavList = this.tagNavList.map((item, index) => {
        //   if (index === currentIndex) {
        //     return route
        //   }
        //   return item
        // })
      } else {
        // this.tagNavList.push(route)
        this.tagNavList = this.tagNavList.concat(route)
      }
    },
    onDeleteTag(route) {
      this.tagNavList = this.tagNavList.filter(item => item.path !== route.path)
      if (this.isActive(route)) {
        this.toLastView()
      }
    },
    onClickTag(route) {
      const { path, params, query } = route
      const p = {
        path
      }
      if (params) {
        p.params = params
      }
      if (query) {
        p.query = query
      }
      this.$router.push(p)
    },
    onRefreshSelectedTag(route) {
      this.$router.replace({
        path: '/redirect' + route.path
      })
    },
    onCloseSelectedTag(route) {
      this.onDeleteTag(route)
    },
    onCloseOthersTags() {
      const route = this.selectedTag
      this.tagNavList = this.tagNavList.filter(item => item.path === route.path)
      if (!this.isActive(route)) {
        this.onClickTag(route)
      }
    },
    onCloseAllTags() {
      this.tagNavList = []
      this.$router.push('/')
    },
    onOpenMenu(route, e) {
      const offsetLeft = this.$el.getBoundingClientRect().left
      const left = e.clientX - offsetLeft
      this.visible = true
      this.selectedTag = route
      this.menuStyle = {
        top: e.clientY - 64 + 'px',
        left: left + 'px'
      }
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .tags-nav {
    position: relative;
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  .scroll-wrapper {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 10px;
    right: 10px;
    bottom: 0;
    overflow: hidden;
  }
  .scroll-body {
    height: 100%;
    display: inline-block;
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    transition: left .3s ease;
  }
  .nav-tag {
    height: 26px;
    line-height: 26px;
    margin-top: 4px;
    border: 1px solid #e9eaec;
    background: #fff;
    cursor: pointer;
    &::v-deep.ant-tag-blue {
      background: #e6f7ff;
      .anticon-close {
        color: rgba(24, 144, 255, 0.85);
        &:hover {
          color: rgba(24, 144, 255, 0.45);
        }
      }
    }
  }
  .contextmenu {
    z-index: 3000;
    background: #fff;
    position: absolute;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .1);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: @primary-bg-color;
      }
    }
  }
  // .left-button {
  //   position: absolute;
  //   left: 0;
  // }
  // .right-button-group {
  //   position: absolute;
  //   right: 0;
  // }
  // .button {
  //   border: 0;
  // }
</style>
