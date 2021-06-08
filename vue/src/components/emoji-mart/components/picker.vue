<template>
  <section class="emoji-mart emoji-mart-static" :style="customStyles">
    <div class="emoji-mart-bar emoji-mart-bar-anchors" v-if="showCategories">
      <anchors
        :data="data"
        :i18n="mergedI18n"
        :color="color"
        :categories="view.allCategories"
        :active-category="view.activeCategory"
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
        @arrowLeft="onArrowLeft"
        @arrowRight="onArrowRight"
        @arrowDown="onArrowDown"
        @arrowUp="onArrowUp"
        @enter="onEnter"
      />
    </slot>

    <div role="tabpanel" class="emoji-mart-scroll" ref="scroll" @scroll="onScroll">
      <div id="emoji-mart-list" ref="scrollContent" role="listbox" aria-expanded="true">
        <category
          v-for="(category, idx) in view.filteredCategories"
          v-show="infiniteScroll || category == view.activeCategory"
          :ref="'categories_' + idx"
          :key="category.id"
          :data="data"
          :i18n="mergedI18n"
          :id="category.id"
          :name="category.name"
          :emojis="category.emojis"
          :emoji-props="emojiProps"
        />
      </div>
    </div>

    <slot
      name="previewTemplate"
      :data="data"
      :title="title"
      :emoji="view.previewEmoji"
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
          :emoji="view.previewEmoji"
          :idle-emoji="idleEmoji"
          :show-skin-tones="showSkinTones"
          :emoji-props="emojiProps"
          :skin-props="skinProps"
          :on-skin-change="onSkinChange"
        />
      </div>
    </slot>
  </section>
</template>

<script>
import '../vendor/raf-polyfill'
import store from '../utils/store'
import frequently from '../utils/frequently'
import { deepMerge, measureScrollbar } from '../utils'
import { pickerProps } from '../utils/shared-props'
import { PickerView } from '../utils/picker'
import Anchors from './anchors.vue'
import Category from './category.vue'
import Preview from './preview.vue'
import Search from './search.vue'

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
  name: 'VPicker',
  emits: ['select', 'skin-change'],
  components: {
    Anchors,
    Category,
    Preview,
    Search
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
      view: new PickerView(this)
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
        selectedEmoji: this.view.previewEmoji,
        selectedEmojiCategory: this.view.previewEmojiCategory,
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
    // emojisPerRow() {
    //   const listEl = this.$refs.scrollContent
    //   const emojiEl = listEl.querySelector('.emoji-mart-emoji')
    //   return Math.floor(listEl.offsetWidth / emojiEl.offsetWidth)
    // },
    filteredCategories() {
      return this.view.filteredCategories
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
  methods: {
    onScroll() {
      if (this.infiniteScroll && !this.waitingForPaint) {
        this.waitingForPaint = true
        window.requestAnimationFrame(this.onScrollPaint.bind(this))
      }
    },
    onScrollPaint() {
      this.waitingForPaint = false
      this.view.onScroll()
    },
    onAnchorClick(category) {
      this.view.onAnchorClick(category)
    },
    onSearch(value) {
      this.view.onSearch(value)
    },
    onEmojiEnter(emoji) {
      this.view.onEmojiEnter(emoji)
    },
    onEmojiLeave(emoji) {
      this.view.onEmojiLeave(emoji)
    },
    onArrowLeft($event) {
      const oldIdx = this.view.previewEmojiIdx
      this.view.onArrowLeft()
      if ($event && this.view.previewEmojiIdx !== oldIdx) {
        // Prevent cursor movement inside the input
        $event.preventDefault()
      }
    },
    onArrowRight() {
      this.view.onArrowRight()
    },
    onArrowDown() {
      this.view.onArrowDown()
    },
    onArrowUp($event) {
      this.view.onArrowUp()
      // Prevent cursor movement inside the input
      $event.preventDefault()
    },
    onEnter() {
      this.$emit('select', this.view.previewEmoji)
      frequently.add(this.view.previewEmoji)
    },
    onEmojiClick(emoji) {
      this.$emit('select', emoji)
      frequently.add(emoji)
    },
    onSkinChange(skin) {
      this.activeSkin = skin
      store.update({ skin })
      this.$emit('skin-change', skin)
    },
    getCategoryComponent(index) {
      const component = this.$refs['categories_' + index]
      if (component && '0' in component) {
        // Vue 2 has $refs under v-for as an array.
        return component['0']
      }
      // Vue 3 does not support $refs as array.
      return component
    }
  }
}
</script>
