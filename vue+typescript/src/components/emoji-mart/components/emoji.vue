<template>
  <component
    :is="tag"
    v-if="view.canRender"
    :title="view.title"
    :aria-label="view.ariaLabel"
    :data-title="title"
    class="emoji-mart-emoji"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <span :class="view.cssClass" :style="view.cssStyle">{{ view.content }}</span>
  </component>
</template>

<script>
import { emojiProps } from '../utils/shared-props'
import { EmojiView } from '../utils/emoji-data'
export default {
  name: 'Emoji',
  emits: ['click', 'mouseenter', 'mouseleave'],
  props: {
    ...emojiProps,
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    view() {
      return new EmojiView(this.emojiObject, this.skin, this.set, this.native, this.fallback, this.tooltip, this.size)
    },
    sanitizedData() {
      return this.emojiObject._sanitized
    },
    title() {
      return this.tooltip ? this.emojiObject.short_name : null
    },
    emojiObject() {
      if (typeof this.emoji === 'string') {
        return this.data.findEmoji(this.emoji)
      }
      return this.emoji
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.emojiObject)
    },
    onMouseEnter() {
      this.$emit('mouseenter', this.emojiObject)
    },
    onMouseLeave() {
      this.$emit('mouseleave', this.emojiObject)
    }
  }
}
</script>
