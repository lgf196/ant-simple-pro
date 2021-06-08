<template>
  <div class="emoji-mart-preview">
    <template v-if="emoji">
      <div class="emoji-mart-preview-emoji">
        <emoji :data="data" :emoji="emoji" :native="emojiProps.native" :skin="emojiProps.skin" :set="emojiProps.set" />
      </div>

      <div class="emoji-mart-preview-data">
        <div class="emoji-mart-preview-name">{{ emoji.name }}</div>
        <div class="emoji-mart-preview-shortnames">
          <span v-for="shortName in emojiShortNames" :key="shortName" class="emoji-mart-preview-shortname"
            >:{{ shortName }}:</span
          >
        </div>
        <div class="emoji-mart-preview-emoticons">
          <span v-for="emoticon in emojiEmoticons" :key="emoticon" class="emoji-mart-preview-emoticon">{{
            emoticon
          }}</span>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="emoji-mart-preview-emoji">
        <emoji
          :data="data"
          :emoji="idleEmoji"
          :native="emojiProps.native"
          :skin="emojiProps.skin"
          :set="emojiProps.set"
        />
      </div>

      <div class="emoji-mart-preview-data">
        <span class="emoji-mart-title-label">{{ title }}</span>
      </div>

      <div v-if="showSkinTones" class="emoji-mart-preview-skins">
        <skins :skin="skinProps.skin" @change="onSkinChange($event)" />
      </div>
    </template>
  </div>
</template>

<script>
import Emoji from './emoji.vue'
import Skins from './skins.vue'
export default {
  name: 'Preview',
  components: {
    Emoji,
    Skins
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    emoji: {
      type: [String, Object]
    },
    idleEmoji: {
      type: [String, Object],
      required: true
    },
    showSkinTones: {
      type: Boolean,
      default: true
    },
    emojiProps: {
      type: Object,
      required: true
    },
    skinProps: {
      type: Object,
      required: true
    },
    onSkinChange: {
      type: Function,
      required: true
    }
  },
  computed: {
    emojiData() {
      if (this.emoji) {
        return this.emoji
      }
      return {}
    },
    emojiShortNames() {
      return this.emojiData.short_names
    },
    emojiEmoticons() {
      return this.emojiData.emoticons
    }
  }
}
</script>
