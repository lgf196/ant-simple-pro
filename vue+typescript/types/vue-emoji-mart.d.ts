declare module 'vue-emoji-mart' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  const Picker: typeof Component
  const Emoji: typeof Component
  const Anchors: typeof Component
  const Preview: typeof Component
  const Search: typeof Component
  const Category: typeof Component
  const Skins: typeof Component
  const EmojiIndex: any
  const EmojiView: any
  const EmojiData: any
  const sanitize: any
  const uncompress: any
  const store: any
  const frequently: any
  export {
    Picker,
    Emoji,
    Anchors,
    Preview,
    Search,
    Category,
    Skins,
    EmojiIndex,
    EmojiView,
    EmojiData,
    sanitize,
    uncompress,
    store,
    frequently
  }
}
