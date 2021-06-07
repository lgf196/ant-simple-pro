<template>
  <div class="emoji-mart" :style="customStyles">
    <div class="emoji-mart-bar emoji-mart-bar-anchors" v-if="showCategories">
      <anchors
        :data="data"
        :i18n="mergedI18n"
        :color="color"
        :categories="categories"
        :active-category="activeCategory"
        @click="onAnchorClick"
      />
    </div>

    <slot name="searchTemplate" :data="data" :i18n="i18n" :auto-focus="autoFocus" :on-search="onSearch">
      <search
        v-if="showSearch"
        ref="search"
        :data="data"
        :i18n="mergedI18n"
        :auto-focus="autoFocus"
        :on-search="onSearch"
        @search="onSearch"
      />
    </slot>

    <category
      v-show="searchEmojis"
      class="emoji-mart-search-results"
      :data="data"
      :i18n="mergedI18n"
      id="search"
      name="Search"
      :emojis="searchEmojis"
      :emoji-props="emojiProps"
    />
    <DynamicScroller
      v-show="!searchEmojis"
      ref="dynScroller"
      :items="scrollerCategories"
      :min-item-size="60"
      class="scroller"
      :buffer="400"
      key-field="id"
      :emit-update="true"
      @update="onScrollUpdate"
    >
      <template v-slot:default="{ item, active, index }">
        <DynamicScrollerItem :item="item" :active="active" :data-index="index">
          <category
            v-show="item.show"
            ref="categories"
            :key="item.category.id"
            :data="item.data"
            :i18n="item.mergedI18n"
            :id="item.category.id"
            :name="item.category.name"
            :emojis="item.category.emojis"
            :emoji-props="item.emojiProps"
          />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

    <slot
      name="previewTemplate"
      :data="data"
      :title="title"
      :emoji="previewEmoji"
      :idle-emoji="idleEmoji"
      :show-skin-tones="showSkinTones"
      :emoji-props="emojiProps"
      :skin-props="skinProps"
      :on-skin-change="onSkinChange"
    >
      <div class="emoji-mart-bar emoji-mart-bar-preview" v-if="showPreview">
        <preview
          :data="data"
          :title="title"
          :emoji="previewEmoji"
          :idle-emoji="idleEmoji"
          :show-skin-tones="showSkinTones"
          :emoji-props="emojiProps"
          :skin-props="skinProps"
          :on-skin-change="onSkinChange"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import '../vendor/raf-polyfill'
import store from '../utils/store'
import frequently from '../utils/frequently'
import { deepMerge, measureScrollbar } from '../utils'
import { pickerProps } from '../utils/shared-props'
import Anchors from './anchors.vue'
import Category from './category.vue'
import Preview from './preview.vue'
import Search from './search.vue'
/*
 * Note about `buffer` setting for DynamicScroller: this is a
 * fix for #49 - when clicking on the "Flags" category for the first
 * time, the category is not scrolled to the top of the component.
 * This is because the last category size is not calculated yet and
 * virtual scroller takes 'minItemSize' as category height.
 *
 * Virtual scroller (RecycleScroller component) uses `buffer` value
 * to  decide how many components to render intitially depending on
 * the scroll area size + buffer*2 (and all categories initially
 * have min size, 60px).
 *
 * By increasing buffer to 400px, we make the scroller to perform
 * size calculation for all categories and the following
 * scrollToItem() calls work correctly.
 */
import { DynamicScroller, DynamicScrollerItem } from 'vue3-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'

const I18N = {
  search: 'Search',
  notfound: 'No Emoji Found',
  categories: {
    search: 'Search Results',
    recent: 'Frequently Used',
    smileys: 'Smileys & Emotion',
    people: 'People & Body',
    nature: 'Animals & Nature',
    foods: 'Food & Drink',
    activity: 'Activity',
    places: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom'
  }
}
export default {
  name: 'VirtualScrollPicker',
  emits: ['select', 'skin-change'],
  components: {
    Anchors,
    Category,
    Preview,
    Search,
    DynamicScroller,
    DynamicScrollerItem
  },
  props: {
    ...pickerProps,
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeSkin: this.skin || store.get('skin') || this.defaultSkin,
      activeCategory: null,
      previewEmoji: null,
      searchEmojis: null
    }
  },
  computed: {
    customStyles() {
      return {
        width: this.calculateWidth + 'px',
        ...this.pickerStyles
      }
    },
    emojiProps() {
      return {
        native: this.native,
        skin: this.activeSkin,
        set: this.set,
        emojiTooltip: this.emojiTooltip,
        emojiSize: this.emojiSize,
        onEnter: this.onEmojiEnter.bind(this),
        onLeave: this.onEmojiLeave.bind(this),
        onClick: this.onEmojiClick.bind(this)
      }
    },
    skinProps() {
      return {
        skin: this.activeSkin
      }
    },
    calculateWidth() {
      return this.perLine * (this.emojiSize + 12) + 12 + 2 + measureScrollbar()
    },
    scrollerCategories() {
      let id = 0
      return this.categories.map(category => {
        return {
          id: id++,
          category,
          show: !this.searchEmojis && (this.infiniteScroll || category === this.activeCategory),
          mergedI18n: this.mergedI18n,
          data: this.data,
          emojisLength: category.emojis.length,
          emojiProps: this.emojiProps
        }
      })
    },
    mergedI18n() {
      return Object.freeze(deepMerge(I18N, this.i18n))
    },
    idleEmoji() {
      try {
        return this.data.emoji(this.emoji)
      } catch (e) {
        console.error('Default preview emoji `' + this.emoji + '` is not available, check the Picker `emoji` property')
        console.error(e)
        return this.data.firstEmoji()
      }
    }
  },
  created() {
    this.categories = []
    this.categories.push(...this.data.categories())
    this.categories = this.categories.filter(category => {
      return category.emojis.length > 0
    })
    this.categories[0].first = true
    Object.freeze(this.categories)
    this.activeCategory = this.categories[0]
    this.skipScrollUpdate = false
  },
  methods: {
    onScrollUpdate(startIndex, endIndex) {
      if (this.skipScrollUpdate) {
        this.skipScrollUpdate = false
      } else {
        // The `endIndex-2` seems to work, but this depends on the internals
        // of the virtual scroller, I didn't observe it to be less than 0,
        // but just for the case, we aslo have a fallback to `0` here.
        const activeIndex = endIndex - 2 > 0 ? endIndex - 2 : 0
        this.activeCategory = this.categories[activeIndex]
      }
    },
    onAnchorClick(category) {
      const i = this.categories.indexOf(category)
      this.$refs.dynScroller.scrollToItem(i)
      this.activeCategory = this.categories[i]
      this.skipScrollUpdate = true
    },
    onSearch(value) {
      const emojis = this.data.search(value, this.maxSearchResults)
      this.searchEmojis = emojis
    },
    onEmojiEnter(emoji) {
      this.previewEmoji = emoji
    },
    onEmojiLeave() {
      this.previewEmoji = null
    },
    onEmojiClick(emoji) {
      this.$emit('select', emoji)
      frequently.add(emoji)
    },
    onSkinChange(skin) {
      this.activeSkin = skin
      store.update({ skin })
      this.$emit('skin-change', skin)
    }
  }
}
</script>
