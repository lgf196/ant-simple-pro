<template>
  <div role="tablist" class="emoji-mart-anchors">
    <button
      v-for="category in categories"
      role="tab"
      :aria-label="category.name"
      :aria-selected="category.id == activeCategory.id"
      :key="category.id"
      :class="{
        'emoji-mart-anchor': true,
        'emoji-mart-anchor-selected': category.id == activeCategory.id
      }"
      :style="{ color: category.id == activeCategory.id ? color : '' }"
      :data-title="i18n.categories[category.id]"
      @click="$emit('click', category)"
    >
      <div aria-hidden="true" v-html="svgs[category.id]" />
      <span aria-hidden="true" class="emoji-mart-anchor-bar" :style="{ backgroundColor: color }"></span>
    </button>
  </div>
</template>

<script>
import svgs from '../svgs'
export default {
  name: 'Anchors',
  props: {
    i18n: {
      type: Object,
      required: true
    },
    color: {
      type: String
    },
    categories: {
      type: Array,
      required: true
    },
    activeCategory: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    this.svgs = svgs
  }
}
</script>
