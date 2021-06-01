<template>
  <div class="vc-editable-input">
    <input
      :aria-labelledby="labelId"
      class="vc-input__input"
      v-model="val"
      @keydown="handleKeyDown"
      @input="update"
      ref="input"
    />
    <span :for="label" class="vc-input__label" :id="labelId">{{ labelSpanText }}</span>
    <span class="vc-input__desc">{{ desc }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'editableInput',
  emits: ['change'],
  props: {
    label: String,
    labelText: String,
    desc: String,
    value: {
      type: [String, Number],
      required: true
    },
    max: Number,
    min: Number,
    arrowOffset: {
      type: Number,
      default: 1
    }
  },
  computed: {
    val: {
      get(): string | number {
        return this.value
      },
      set(v: any) {
        // TODO: min
        if (!(this.max === undefined) && +v > this.max) {
          ;(this.$refs.input as HTMLInputElement).value = String(this.max)
          return
        }
        return v
      }
    },
    labelId(): string {
      return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`
    },
    labelSpanText(): string {
      return this.labelText || this.label || ''
    }
  },
  methods: {
    update(e: MouseEvent) {
      this.handleChange((e.target as HTMLInputElement).value)
    },
    handleChange(newVal: string) {
      const data: Record<string, string> = {}
      if (this.label) {
        data[this.label] = newVal
      }
      if (data.hex === undefined && data['#'] === undefined) {
        this.$emit('change', data)
      } else if (newVal.length > 5) {
        this.$emit('change', data)
      }
    },
    handleKeyDown(e: KeyboardEvent) {
      let val = this.val
      const number = Number(val)

      if (number) {
        const amount = this.arrowOffset || 1

        // Up
        if (e.keyCode === 38) {
          val = number + amount
          this.handleChange(String(val))
          e.preventDefault()
        }

        // Down
        if (e.keyCode === 40) {
          val = number - amount
          this.handleChange(String(val))
          e.preventDefault()
        }
      }
    }
  }
})
</script>

<style>
.vc-editable-input {
  position: relative;
}
.vc-input__input {
  padding: 0;
  border: 0;
  outline: none;
}
.vc-input__label {
  text-transform: capitalize;
}
</style>
