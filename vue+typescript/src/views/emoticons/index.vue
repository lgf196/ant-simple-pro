<template>
  <div class="com-page p20">
    <a-row>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <h2 class="mb10 font-size-20">中文版：</h2>
        <Picker :data="emojiIndex" set="apple" @select="onSelect" :i18n="i18nConfig" />
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <h2 class="mb10 font-size-20">英文版：</h2>
        <Picker :data="emojiIndex" set="apple" @select="onSelect" />
      </a-col>
    </a-row>
    <p class="mt10">{{ val }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Picker, EmojiIndex } from 'vue-emoji-mart'
import data from '@/components/emoji-mart/data/all.json'
import '@/components/emoji-mart/emoji-mart.css'
const emojiIndexData = new EmojiIndex(data)

const i18nConfigData = {
  search: '搜索',
  clear: '清除', // Accessible label on "clear" button
  notfound: '没有找到表情',
  skintext: '选择默认肤色',
  categories: {
    search: '搜索结果',
    recent: '经常使用',
    smileys: '笑脸与情感',
    people: '人与身体',
    nature: '动物与自然',
    foods: '食物和饮料',
    activity: '活动',
    places: '旅游与地方',
    objects: '对象',
    symbols: '符号',
    flags: '标志',
    custom: '风俗'
  },
  categorieslabel: '表情符号类别',
  skintones: {
    1: 'Default Skin Tone',
    2: 'Light Skin Tone',
    3: 'Medium-Light Skin Tone',
    4: 'Medium Skin Tone',
    5: 'Medium-Dark Skin Tone',
    6: 'Dark Skin Tone'
  }
}

export default defineComponent({
  components: {
    Picker
  },
  setup() {
    const emojiIndex = ref(emojiIndexData)
    const i18nConfig = ref(i18nConfigData)
    const val = ref('')
    function onSelect(value: any) {
      console.log('value', value)
      val.value = val.value + value.native
    }
    return {
      emojiIndex,
      i18nConfig,
      onSelect,
      val
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
