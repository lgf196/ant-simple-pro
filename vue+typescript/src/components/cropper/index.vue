<template>
  <a-modal :width="840" v-model:visible="sVisible" @cancel="onCancel" @ok="onOk" forceRender>
    <div class="cropper-container">
      <div class="img-box">
        <img ref="image" class="cropper-image" alt="404" />
      </div>
      <div class="control-container">
        <div ref="preview" class="preview-box"></div>
        <div class="control">
          <a-button type="primary" @click="onZoomSub">
            <template #icon>
              <MinusOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onZoomAdd">
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onRotateSub">
            <template #icon>
              <UndoOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onRotateAdd">
            <template #icon>
              <RedoOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onMove(0, -moveStep)">
            <template #icon>
              <ArrowUpOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onMove(moveStep, 0)">
            <template #icon>
              <ArrowRightOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onMove(0, moveStep)">
            <template #icon>
              <ArrowDownOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onMove(-moveStep, 0)">
            <template #icon>
              <ArrowLeftOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onScaleX">
            <template #icon>
              <ColumnWidthOutlined />
            </template>
          </a-button>
          <a-button type="primary" @click="onScaleY">
            <template #icon>
              <ColumnHeightOutlined />
            </template>
          </a-button>
        </div>
        <a-button class="reset-button" type="primary" @click="onReset">重置</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  MinusOutlined,
  PlusOutlined,
  UndoOutlined,
  RedoOutlined,
  ArrowUpOutlined,
  ArrowRightOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ColumnHeightOutlined,
  ColumnWidthOutlined
} from '@ant-design/icons-vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

type CropperCompState = {
  instance: Cropper | null
  insideSrc: string
  sVisible: boolean
}

type VFile = File & {
  uid: string
}

export default defineComponent({
  emits: ['update:visible', 'submit'],
  components: {
    MinusOutlined,
    PlusOutlined,
    UndoOutlined,
    RedoOutlined,
    ArrowUpOutlined,
    ArrowRightOutlined,
    ArrowDownOutlined,
    ArrowLeftOutlined,
    ColumnHeightOutlined,
    ColumnWidthOutlined
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    },
    moveStep: {
      type: Number,
      default: 4
    },
    file: {
      type: Object as PropType<VFile>
    }
  },
  data(): CropperCompState {
    return {
      instance: null,
      insideSrc: '',
      sVisible: false
    }
  },
  watch: {
    visible(newVal) {
      this.sVisible = newVal
      if (newVal) {
        setTimeout(() => {
          const imageEl = this.$refs.image as HTMLImageElement
          const previewEl = this.$refs.preview as HTMLDivElement
          if (imageEl && previewEl) {
            this.instance = new Cropper(imageEl, {
              preview: previewEl,
              checkCrossOrigin: false
            })
            this.instance.replace(this.src)
          }
        }, 20)
      } else {
        this.instance?.destroy()
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit('update:visible', false)
    },
    onOk() {
      this.instance?.getCroppedCanvas().toBlob(blob => {
        if (blob && this.file) {
          const { type, name, uid } = this.file
          const newFile = new File([blob], name, { type }) as VFile
          newFile.uid = uid
          this.$emit('submit', newFile)
          this.$emit('update:visible', false)
        }
      })
    },
    onZoomSub() {
      this.instance?.zoom(-0.1)
    },
    onZoomAdd() {
      this.instance?.zoom(0.1)
    },
    onRotateSub() {
      this.instance?.rotate(-45)
    },
    onRotateAdd() {
      this.instance?.rotate(45)
    },
    onReset() {
      this.instance?.reset()
    },
    onMove(...rest: [number, number]) {
      this.instance?.move(...rest)
    },
    onScaleX() {
      this.instance?.scaleX(-this.instance?.getData().scaleX)
    },
    onScaleY() {
      this.instance?.scaleY(-this.instance?.getData().scaleY)
    }
  }
})
</script>

<style lang="less" scoped>
.bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}
.img-box {
  display: inline-block;
  height: 340px;
  width: 430px;
  border: 1px solid #ebebeb;
  .bg;
  img {
    max-width: 100%;
    display: block;
  }
}
.control-container {
  display: inline-block;
  width: 350px;
  padding: 0 10px;
  vertical-align: top;
}
.preview-box {
  height: 150px !important;
  width: 150px !important;
  overflow: hidden;
  border: 1px solid #ebebeb;
  .bg;
}
.control {
  margin-top: 15px;
}
.control ::v-deep .ant-btn {
  margin-right: 8px;
  margin-bottom: 15px;
}
.reset-button {
  width: 100%;
}
</style>
