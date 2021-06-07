
declare module 'vue-emoji-mart' {
  import { defineComponent } from 'vue'
  const component: ReturnType<defineComponent>
  const Picker: component
  const Emoji: component
  const Anchors: component
  const Preview: component
  const Search: component
  const Category: component
  const Skins: component
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
