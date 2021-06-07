<template>
  <section
    :class="{
      'emoji-mart-category': true,
      'emoji-mart-no-results': !hasResults
    }"
    :aria-label="i18n.categories[id]"
    v-if="isVisible && (isSearch || hasResults)"
  >
    <div class="emoji-mart-category-label">
      <h3 class="emoji-mart-category-label">{{ i18n.categories[id] }}</h3>
    </div>

    <template v-for="{ emojiObject, emojiView } in emojiObjects">
      <button
        v-if="emojiView.canRender"
        :aria-label="emojiView.ariaLabel"
        role="option"
        aria-selected="false"
        aria-posinset="1"
        aria-setsize="1812"
        type="button"
        :data-title="emojiObject.short_name"
        :key="emojiObject.id"
        :title="emojiView.title"
        class="emoji-mart-emoji"
        :class="activeClass(emojiObject)"
        @mouseenter="emojiProps.onEnter(emojiView.getEmoji())"
        @mouseleave="emojiProps.onLeave(emojiView.getEmoji())"
        @click="emojiProps.onClick(emojiView.getEmoji())"
      >
        <span :class="emojiView.cssClass" :style="emojiView.cssStyle">{{ emojiView.content }}</span>
      </button>
    </template>

    <div v-if="!hasResults">
      <emoji
        :data="data"
        emoji="sleuth_or_spy"
        :native="emojiProps.native"
        :skin="emojiProps.skin"
        :set="emojiProps.set"
      />
      <div class="emoji-mart-no-results-label">{{ i18n.notfound }}</div>
    </div>
  </section>
</template>

<script>
import { EmojiView } from '../utils/emoji-data'
import Emoji from './emoji.vue'
export default {
  name: 'Category',
  components: {
    Emoji
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    i18n: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    emojis: {
      type: Array
    },
    emojiProps: {
      type: Object,
      required: true
    }
  },
  computed: {
    isVisible() {
      return !!this.emojis
    },
    isSearch() {
      return this.name === 'Search'
    },
    hasResults() {
      return this.emojis.length > 0
    },
    emojiObjects() {
      return this.emojis.map(emoji => {
        const emojiObject = emoji
        const emojiView = new EmojiView(
          emoji,
          this.emojiProps.skin,
          this.emojiProps.set,
          this.emojiProps.native,
          this.emojiProps.fallback,
          this.emojiProps.emojiTooltip,
          this.emojiProps.emojiSize
        )
        return { emojiObject, emojiView }
      })
    }
  },
  methods: {
    activeClass(emojiObject) {
      if (!this.emojiProps.selectedEmoji) {
        return ''
      }
      if (!this.emojiProps.selectedEmojiCategory) {
        return ''
      }
      if (this.emojiProps.selectedEmoji.id === emojiObject.id && this.emojiProps.selectedEmojiCategory.id === this.id) {
        return 'emoji-mart-emoji-selected'
      }
      return ''
    }
  }
}
</script>
