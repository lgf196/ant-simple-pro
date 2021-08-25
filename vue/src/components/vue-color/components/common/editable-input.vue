<template>
  <div class="vc-editable-input">
    <input
      ref="input"
      v-model="val"
      :aria-labelledby="labelId"
      class="vc-input__input"
      @keydown="handleKeyDown"
      @input="update"
    />
    <span :id="labelId" :for="label" class="vc-input__label">{{ labelSpanText }}</span>
    <span class="vc-input__desc">{{ desc }}</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditableInput',
  emits: ['change'],
  props: {
    label: {
      type: String,
      default: ''
    },
    labelText: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
    max: {
      type: Number,
      default: 6
    },
    min: {
      type: Number,
      default: 1
    },
    arrowOffset: {
      type: Number,
      default: 1
    }
  },
  computed: {
    val: {
      get() {
        return this.value
      },
      set(v) {
        // TODO: min
        if (!(this.max === undefined) && +v > this.max) {
          this.$refs.input.value = String(this.max)
          return
        }
        return v
      }
    },
    labelId() {
      return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`
    },
    labelSpanText() {
      return this.labelText || this.label || ''
    }
  },
  methods: {
    update(e) {
      this.handleChange(e.target.value)
    },
    handleChange(newVal) {
      const data = {}
      if (this.label) {
        data[this.label] = newVal
      }
      if (data.hex === undefined && data['#'] === undefined) {
        this.$emit('change', data)
      } else if (newVal.length > 5) {
        this.$emit('change', data)
      }
    },
    handleKeyDown(e) {
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
