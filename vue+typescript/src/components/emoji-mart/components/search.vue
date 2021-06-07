<template>
  <div class="emoji-mart-search">
    <input
      type="text"
      :placeholder="i18n.search"
      role="textbox"
      aria-autocomplete="list"
      aria-owns="emoji-mart-list"
      aria-label="Search for an emoji"
      aria-describedby="emoji-mart-search-description"
      @keydown.left="$event => $emit('arrow-left', $event)"
      @keydown.right="() => $emit('arrow-right')"
      @keydown.down="() => $emit('arrow-down')"
      @keydown.up="$event => $emit('arrow-up', $event)"
      @keydown.enter="() => $emit('enter')"
      v-model="value"
    />
    <span class="hidden" id="emoji-picker-search-description"
      >Use the left, right, up and down arrow keys to navigate the emoji search results.</span
    >
  </div>
</template>

<script>
export default {
  name: 'Search',
  emits: ['search', 'arrow-left', 'arrow-right', 'arrow-down', 'arrow-up', 'enter'],
  props: {
    data: {
      type: Object,
      required: true
    },
    i18n: {
      type: Object,
      required: true
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    onSearch: {
      type: Function,
      required: true
    },
    onArrowLeft: {
      type: Function,
      required: false
    },
    onArrowRight: {
      type: Function,
      required: false
    },
    onArrowDown: {
      type: Function,
      required: false
    },
    onArrowUp: {
      type: Function,
      required: false
    },
    onEnter: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    const $input = this.$el.querySelector('input')
    if (this.autoFocus) {
      $input.focus()
    }
  },
  computed: {
    emojiIndex() {
      return this.data
    }
  },
  watch: {
    value() {
      this.$emit('search', this.value)
    }
  },
  methods: {
    clear() {
      this.value = ''
    }
  }
}
</script>
