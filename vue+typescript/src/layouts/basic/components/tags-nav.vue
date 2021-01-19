<template>
  <div class="tags-nav" v-if="tagsNavVisible">
    <ScrollPane :horizontalBar="false" :verticalBar="false" ref="scrollPane" class="scroll-pane">
      <div
        v-for="(item, index) in totalTags"
        :key="index"
        class="nav-tag"
        :class="{active: isActive(item)}"
        :ref="setItemRef"
        :data-route-path="item.path"
        @click="onClickTag(item)"
      >
        <span class="nav-tag__title">{{item.meta && item.meta.title}}</span>
        <CloseOutlined v-if="!isAffix(item)" class="nav-tag__icon" @click.stop="onDeleteTag(item)" />
      </div>
    </ScrollPane>
    <div class="tag-option">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <span class="title">标签设置</span>
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="onTagMenuClick">
            <a-menu-item key="1">
              关闭其它
            </a-menu-item>
            <a-menu-item key="2">
              关闭标签
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { CloseOutlined, DownOutlined } from '@ant-design/icons-vue'
import ScrollPane from '@/components/scrollbar/scroll-pane'
import { routes } from '@/router/routes'
import { getAffixTags } from '@/utils'
export default {
  components: {
    ScrollPane,
    CloseOutlined,
    DownOutlined
  },
  data() {
    return {
      tagRefs: [],
      tags: []
    }
  },
  watch: {
    $route: {
      handler(newRoute) {
        this.addTag(newRoute)
        this.moveToView(newRoute)
      },
      immediate: true
    }
  },
  computed: {
    tagsNavVisible() {
      return this.$store.state.app.tagsNavVisible
    },
    totalTags() {
      return getAffixTags(routes).concat(this.tags)
    }
  },
  methods: {
    setItemRef(el) {
      this.tagRefs.push(el)
    },
    isActive(item) {
      return item.path === this.$route.path
    },
    isAffix(item) {
      return item.meta && item.meta.affix
    },
    addTag(item) {
      if (!item.meta) {
        return
      }
      if (!item.meta.title) {
        return
      }
      if (item.meta.affix) {
        return
      }
      const current = this.totalTags.find(v => v.path === item.path)
      if (!current) {
        this.tags = this.tags.concat(item)
      }
    },
    moveToView(route) {
      this.$nextTick(() => {
        const scroll = this.$refs.scrollPane
        for (let i = 0; i < this.tagRefs.length; i++) {
          const item = this.tagRefs[i]
          // 找出 tagRefs 中 对应当前路由的 tag
          if (item && item.dataset['route-path'] === route.path) {
            scroll.moveToTarget(item, this.tagRefs)
            break
          }
        }
      })
    },
    onDeleteTag(route) {
      this.tags = this.tags.filter(item => item.path !== route.path)
      if (this.isActive(route)) {
        this.toLastView()
      }
    },
    toLastView() {
      const latestView = this.tags.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.path)
      } else {
        this.$router.push('/')
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
    onTagMenuClick(e) {
      // 关闭其它
      if (e.key === '1') {
        const route = this.$route
        this.tags = this.tags.filter(item => item.path === route.path)
        if (!this.isActive(route)) {
          this.onClickTag(route)
        }
      }
      // 关闭标签
      if (e.key === '2') {
        this.$store.commit('app/SET_TAGS_NAV_VISIBLE', false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tags-nav {
  position: relative;
  height: @tags-nav-header;
  padding-left: 10px;
  padding-right: 35px;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px #f0f1f2;
}
.scroll-pane {
  width: auto;
  flex: 1;
}
.tag-option {
  padding-left: 7px;
  box-shadow: -10px 0 15px -5px #f0f1f2;
  display: flex;
  align-items: center;
  .ant-dropdown-link {
    .title {
      padding-right: 6px;
    }
  }
}
.item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
}
.nav-tag {
  display: inline-block;
  height: 26px;
  line-height: 26px;
  margin-top: 4px;
  margin-left: 5px;
  background: #fff;
  border: 1px solid #e9eaec;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  color: #666;
  font-weight: 400;
  vertical-align: middle;
  &.active {
    background: #e6f7ff;
    color: #1890ff;
  }
  .nav-tag__title {
    float: left;
    white-space: nowrap;
    padding: 0 5px;
  }
  .nav-tag__icon {
    padding: 0 5px 0 0;
  }
}
</style>
