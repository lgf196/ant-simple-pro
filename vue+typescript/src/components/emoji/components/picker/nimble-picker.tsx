import { defineComponent, ref, PropType, onMounted, getCurrentInstance } from 'vue'
import * as svgIcons from '../../svgs'
import store from '../../utils/store'
import frequently from '../../utils/frequently'
import { deepMerge, measureScrollbar, getSanitizedData } from '../../utils'
import { uncompress, Data, Category } from '../../utils/data'
import { pickerPropTypes } from '../../utils/shared-props'
import { CustomEmoji, CategoryName, EmojiData, EmojiSkin } from '../../utils/types'

import Anchors, { AnchorsCompType } from '../anchors'
import CategoryComp, { CategoryCompType } from '../category'
import Preview, { PreviewCompType } from '../preview'
import Search, { SearchCompType } from '../search'

const I18N = {
  search: 'Search',
  clear: 'Clear', // Accessible label on "clear" button
  notfound: 'No Emoji Found',
  skintext: 'Choose your default skin tone',
  categories: {
    search: 'Search Results',
    recent: 'Frequently Used',
    people: 'Smileys & People',
    nature: 'Animals & Nature',
    foods: 'Food & Drink',
    activity: 'Activity',
    places: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom'
  },
  categorieslabel: 'Emoji categories', // Accessible title for the list of categories
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
  props: {
    ...pickerPropTypes,
    data: {
      type: Object as PropType<Data>,
      required: true
    }
  },
  setup(props) {
    const { ctx }: any = getCurrentInstance()
    const previewComp = ref<PreviewCompType>()
    const searchComp = ref<SearchCompType>()
    const categoryRefs = ref<CategoryCompType[]>([])
    const anchorsComp = ref<AnchorsCompType>()
    const scrollEl = ref<HTMLElement>()
    const firstRenderTimeout = ref(0)
    const leaveTimeout = ref(0)
    const scrollTopRef = ref(0)
    const clientHeightRef = ref(0)
    const scrollHeightRef = ref(0)
    const hasStickyPosition = ref(false)
    const waitingForPaint = ref(false)
    const themeRef = ref(props.theme)
    const custom = ref<CustomEmoji[]>([])
    const skinRef = ref<EmojiSkin | null>(null)
    const recentCategory = ref({
      id: 'recent',
      name: 'Recent',
      emojis: []
    })
    const serachCategory = ref({
      id: 'search',
      name: 'Search',
      emojis: [] as EmojiData[],
      anchor: false
    })
    const i18n = ref(deepMerge(I18N, props.i18n))
    const icons = ref(deepMerge(svgIcons, props.icons))
    const firstRender = ref(true)
    const categories = ref<Category[]>([])
    const hideRecent = ref(true)
    const darkMatchMedia = ref<MediaQueryList>()
    let allCategories = [...props.data.categories]
    if (props.data.compressed) {
      uncompress(props.data)
    }
    if (props.custom.length > 0) {
      const customCategories: Record<string, any> = {}
      let customCategoriesCreated = 0

      props.custom.forEach(emoji => {
        if (!customCategories[emoji.customCategory]) {
          customCategories[emoji.customCategory] = {
            id: emoji.customCategory ? `custom-${emoji.customCategory}` : 'custom',
            name: emoji.customCategory || 'Custom',
            emojis: [],
            anchor: customCategoriesCreated === 0
          }

          customCategoriesCreated++
        }

        const category = customCategories[emoji.customCategory]

        const customEmoji = {
          ...emoji,
          // `<Category />` expects emoji to have an `id`.
          id: emoji.short_names[0],
          custom: true
        }

        category.emojis.push(customEmoji)
        custom.value.push(customEmoji)
      })

      allCategories = allCategories.concat(Object.keys(customCategories).map(key => customCategories[key]))
    }
    if (props.include) {
      allCategories.sort((a, b) => {
        if (
          (props.include as CategoryName[]).indexOf(a.id as CategoryName) >
          (props.include as CategoryName[]).indexOf(b.id as CategoryName)
        ) {
          return 1
        }
        return -1
      })
    }
    for (let categoryIndex = 0; categoryIndex < allCategories.length; categoryIndex++) {
      const category = allCategories[categoryIndex]
      const isIncluded =
        props.include && props.include.length ? props.include.indexOf(category.id as CategoryName) > -1 : true
      const isExcluded =
        props.exclude && props.exclude.length ? props.exclude.indexOf(category.id as CategoryName) > -1 : false
      if (!isIncluded || isExcluded) {
        continue
      }

      if (props.emojisToShowFilter) {
        const newEmojis = []

        const { emojis } = category
        for (let emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
          const emoji = emojis[emojiIndex]
          if (props.emojisToShowFilter(props.data.emojis[emoji] || emoji)) {
            newEmojis.push(emoji)
          }
        }

        if (newEmojis.length) {
          const newCategory = {
            emojis: newEmojis,
            name: category.name,
            id: category.id
          }

          categories.value.push(newCategory)
        }
      } else {
        categories.value.push(category)
      }
    }
    const includeRecent =
      props.include && props.include.length ? props.include.indexOf(recentCategory.value.id as CategoryName) > -1 : true
    const excludeRecent =
      props.exclude && props.exclude.length
        ? props.exclude.indexOf(recentCategory.value.id as CategoryName) > -1
        : false
    if (includeRecent && !excludeRecent) {
      hideRecent.value = false
      categories.value.unshift(recentCategory.value)
    }

    if (categories.value[0]) {
      ;(categories.value[0] as any).first = true
    }

    categories.value.unshift((serachCategory.value as any) as Category)

    onMounted(() => {
      if (firstRender.value) {
        testStickyPosition() // eslint-disable-line
        firstRenderTimeout.value = window.setTimeout(() => {
          firstRender.value = false
        }, 60)
      }
    })

    function testStickyPosition() {
      const stickyTestElement = document.createElement('div')

      const prefixes = ['', '-webkit-', '-ms-', '-moz-', '-o-']

      prefixes.forEach(prefix => {
        stickyTestElement.style.position = `${prefix}sticky`
      })

      hasStickyPosition.value = !!stickyTestElement.style.position.length
    }

    function getPreferredTheme() {
      if (props.theme !== 'auto') {
        return props.theme
      }
      if (themeRef.value) {
        return themeRef.value
      }
      if (typeof matchMedia !== 'function') {
        return 'light'
      }

      if (!darkMatchMedia.value) {
        darkMatchMedia.value = matchMedia('(prefers-color-scheme: dark)')
        darkMatchMedia.value.addListener(handleDarkMatchMediaChange) // eslint-disable-line
      }

      if (darkMatchMedia.value.media.match(/^not/)) {
        return 'light'
      }
      return darkMatchMedia.value.matches ? 'dark' : 'light'
    }

    function handleDarkMatchMediaChange() {
      themeRef.value = darkMatchMedia.value?.matches ? 'dark' : 'light'
    }

    function handleEmojiOver(emoji: EmojiData) {
      if (!previewComp.value) {
        return
      }

      // Use Array.prototype.find() when it is more widely supported.
      const emojiData = custom.value.filter(customEmoji => customEmoji.id === emoji.id)[0]
      for (const key in emojiData) {
        if (Object.prototype.hasOwnProperty.call(emojiData, key)) {
          emoji[key] = emojiData[key]
        }
      }
      previewComp.value.setEmoji(emoji)
      clearTimeout(leaveTimeout.value)
    }

    function handleEmojiLeave() {
      if (!previewComp.value) {
        return
      }
      leaveTimeout.value = window.setTimeout(() => {
        previewComp.value?.setEmoji()
      }, 16)
    }

    function handleEmojiClick(emoji: EmojiData, e: MouseEvent) {
      props.onClick(emoji, e)
      handleEmojiSelect(emoji) // eslint-disable-line
    }

    function handleEmojiSelect(emoji: EmojiData) {
      props.onSelect(emoji)
      if (!hideRecent.value && !props.recent) {
        frequently.add(emoji)
      }

      // const component = categoryRefs.value['category-1'] TODO
      const component = categoryRefs.value[1]
      if (component) {
        const maxMargin = component.maxMargin
        if (props.enableFrequentEmojiSort) {
          component.forceUpdate()
        }

        requestAnimationFrame(() => {
          if (!scrollEl.value) {
            return
          }
          component.memoizeSize()
          if (maxMargin === component.maxMargin) {
            return
          }

          updateCategoriesSize() // eslint-disable-line
          handleScrollPaint() // eslint-disable-line

          if (serachCategory.value.emojis) {
            component.updateDisplay('none')
          }
        })
      }
    }

    function handleScroll() {
      if (!waitingForPaint.value) {
        waitingForPaint.value = true
        requestAnimationFrame(handleScrollPaint) // eslint-disable-line
      }
    }

    function handleScrollPaint() {
      waitingForPaint.value = false

      if (!scrollEl.value) {
        return
      }

      let activeCategory = null
      let scrollTop = 0
      if (serachCategory.value.emojis) {
        activeCategory = serachCategory.value
      } else {
        const target = scrollEl.value
        scrollTop = target.scrollTop
        const scrollingDown = scrollTop > (scrollTopRef.value || 0)
        let minTop = 0

        for (let i = 0, l = categories.value.length; i < l; i++) {
          const ii = scrollingDown ? categories.value.length - 1 - i : i
          const category = categories.value[ii]
          // const component = categoryRefs.value[`category-${ii}`] TODO
          const component = categoryRefs.value[ii]
          if (component) {
            const active = component.handleScroll(scrollTop)

            if (!minTop || component.top < minTop) {
              if (component.top > 0) {
                minTop = component.top
              }
            }

            if (active && !activeCategory) {
              activeCategory = category
            }
          }
        }

        if (scrollTop < minTop) {
          activeCategory = categories.value.filter(category => !((category as any).anchor === false))[0]
        } else if (scrollTop + clientHeightRef.value >= scrollHeightRef.value) {
          activeCategory = categories.value[categories.value.length - 1]
        }
      }

      if (activeCategory) {
        const { name: categoryName } = activeCategory

        if (anchorsComp.value?.selected !== categoryName) {
          anchorsComp.value?.setSelected(categoryName)
        }
      }

      scrollTopRef.value = scrollTop
    }

    function handleSearch(emojis: EmojiData[]) {
      serachCategory.value.emojis = emojis

      for (let i = 0, len = categories.value.length; i < len; i++) {
        // const component = categoryRefs.value[`category-${i}`] TODO
        const component = categoryRefs.value[i]

        if (component && component.name !== 'Search') {
          const display = emojis ? 'none' : 'inherit'
          component.updateDisplay(display)
        }
      }

      ctx.$forceUpdate()
      if (scrollEl.value) {
        scrollEl.value.scrollTop = 0
      }
      handleScroll()
    }

    function handleAnchorClick(category: Category, i: number) {
      // const component = categoryRefs.value[`category-${i}`] TODO
      const component = categoryRefs.value[i]

      const scrollToComponent = () => {
        if (component) {
          let { top } = component

          if ((category as any).first) {
            top = 0
          } else {
            top += 1
          }
          if (scrollEl.value) {
            scrollEl.value.scrollTop = top
          }
        }
      }
      if (serachCategory.value.emojis && serachCategory.value.emojis.length) {
        handleSearch([])
        searchComp.value?.clear()
        requestAnimationFrame(scrollToComponent)
      } else {
        scrollToComponent()
      }
    }

    function handleSkinChange(skin: EmojiSkin) {
      skinRef.value = skin
      store.update({ skin })

      props.onSkinChange(skin)
    }

    function handleKeyDown(e: KeyboardEvent) {
      let handled = false
      if (e.keyCode === 13) {
        let emoji = {} as EmojiData
        if (
          serachCategory.value.emojis &&
          serachCategory.value.emojis.length &&
          (emoji = getSanitizedData(serachCategory.value.emojis[0], skinRef.value, props.set, props.data))
        ) {
          handleEmojiSelect(emoji)
          handled = true
        }
      }
      if (handled) {
        e.preventDefault()
      }
    }

    function updateCategoriesSize() {
      for (let i = 0, len = categories.value.length; i < len; i++) {
        // const component = categoryRefs.value[`category-${i}`] TODO
        const component = categoryRefs.value[i]
        if (component) {
          component.memoizeSize()
        }
      }

      if (scrollEl.value) {
        const target = scrollEl.value
        scrollHeightRef.value = target.scrollHeight
        clientHeightRef.value = target.clientHeight
      }
    }

    function getCategories() {
      return firstRender.value ? categories.value.slice(0, 3) : categories.value
    }

    function setCategoryCompRef(el: any) {
      if (el) {
        categoryRefs.value.push(el as CategoryCompType)
      }
    }

    return () => {
      const {
        perLine,
        emojiSize,
        set,
        sheetSize,
        // sheetColumns,
        // sheetRows,
        title,
        emoji,
        color,
        native,
        backgroundImageFn,
        emojisToShowFilter,
        showPreview,
        showSkinTones,
        emojiTooltip,
        useButton,
        include,
        exclude,
        recent,
        autoFocus,
        skinEmoji,
        notFound,
        notFoundEmoji
      } = props

      const width = perLine * (emojiSize + 12) + 12 + 2 + measureScrollbar()
      const theme = getPreferredTheme()
      const skin = props.skin || skinRef.value || store.get('skin') || props.defaultSkin
      return (
        <section
          style={{ width: width + 'px' }}
          class={`emoji-mart emoji-mart-${theme}`}
          aria-label={title}
          onKeydown={handleKeyDown}
        >
          <div class="emoji-mart-bar">
            <Anchors
              ref={anchorsComp}
              data={props.data}
              i18n={i18n.value}
              color={color}
              categories={categories.value}
              onAnchorClick={handleAnchorClick}
              icons={icons.value}
            />
          </div>

          <Search
            ref={searchComp}
            onSearch={handleSearch}
            data={props.data}
            i18n={i18n.value}
            emojisToShowFilter={emojisToShowFilter}
            include={include}
            exclude={exclude}
            custom={custom.value}
            autoFocus={autoFocus}
          />

          <div ref={scrollEl} class="emoji-mart-scroll" onScroll={handleScroll}>
            {getCategories().map(category => {
              return (
                <CategoryComp
                  ref={setCategoryCompRef}
                  key={category.name}
                  id={category.id}
                  name={category.name}
                  emojis={category.emojis}
                  perLine={perLine}
                  native={native}
                  hasStickyPosition={hasStickyPosition.value}
                  data={props.data}
                  i18n={i18n.value}
                  recent={category.id === recentCategory.value.id ? recent || [] : []}
                  custom={category.id === recentCategory.value.id ? custom.value : undefined}
                  emojiProps={{
                    native,
                    skin,
                    size: emojiSize,
                    set,
                    sheetSize,
                    sheetColumns: (props as any).sheetColumns,
                    sheetRows: (props as any).sheetRows,
                    forceSize: native,
                    tooltip: emojiTooltip,
                    backgroundImageFn,
                    useButton,
                    onOver: handleEmojiOver,
                    onLeave: handleEmojiLeave,
                    onClick: handleEmojiClick,
                    custom: custom.value
                  }}
                  notFound={notFound}
                  notFoundEmoji={notFoundEmoji}
                />
              )
            })}
          </div>

          {(showPreview || showSkinTones) && (
            <div class="emoji-mart-bar">
              <Preview
                ref={previewComp}
                data={props.data}
                title={title}
                emoji={emoji}
                showSkinTones={showSkinTones}
                showPreview={showPreview}
                emojiProps={{
                  native,
                  size: 38,
                  skin,
                  set,
                  sheetSize,
                  sheetColumns: (props as any).sheetColumns,
                  sheetRows: (props as any).sheetRows,
                  backgroundImageFn
                }}
                skinsProps={{
                  skin,
                  onChange: handleSkinChange,
                  skinEmoji
                }}
                i18n={i18n.value}
              />
            </div>
          )}
        </section>
      )
    }
  }
})
