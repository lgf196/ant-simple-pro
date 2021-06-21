<template>
  <a-modal :width="840" v-model:visible="sVisible" @cancel="onCancel" @ok="onOk" forceRender>
    <div class="cropper-container">
      <div class="img-box">
        <img ref="imageEl" class="cropper-image" alt="404" />
      </div>
      <div class="control-container">
        <div ref="previewEl" class="preview-box"></div>
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
import { defineComponent, PropType, ref, watch } from 'vue'
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
import { fileToDataURI } from '@/utils/image'

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
    moveStep: {
      type: Number,
      default: 4
    },
    file: {
      type: Object as PropType<VFile>
    }
  },
  setup(props, { emit }) {
    const imageEl = ref<HTMLImageElement>()
    const previewEl = ref<HTMLDivElement>()
    const instance = ref<Cropper>()
    const sVisible = ref(false)

    watch(
      () => props.visible,
      newVal => {
        sVisible.value = props.visible
        if (newVal) {
          setTimeout(() => {
            if (imageEl.value && previewEl.value && props.file) {
              instance.value = new Cropper(imageEl.value, {
                preview: previewEl.value,
                checkCrossOrigin: false
              })
              fileToDataURI(props.file).then(dataURI => {
                instance.value?.replace(dataURI)
              })
            }
          }, 20)
        } else {
          instance.value?.destroy()
        }
      }
    )

    function onCancel() {
      emit('update:visible', false)
    }

    function onOk() {
      instance.value?.getCroppedCanvas().toBlob(blob => {
        if (blob && props.file) {
          const { type, name, uid } = props.file
          const newFile = new File([blob], name, { type }) as VFile
          newFile.uid = uid
          emit('submit', newFile)
          emit('update:visible', false)
        }
      })
    }

    function onZoomSub() {
      instance.value?.zoom(-0.1)
    }

    function onZoomAdd() {
      instance.value?.zoom(0.1)
    }

    function onRotateSub() {
      instance.value?.rotate(-45)
    }

    function onRotateAdd() {
      instance.value?.rotate(45)
    }

    function onReset() {
      instance.value?.reset()
    }

    function onMove(...rest: [number, number]) {
      instance.value?.move(...rest)
    }

    function onScaleX() {
      instance.value?.scaleX(-instance.value?.getData().scaleX)
    }

    function onScaleY() {
      instance.value?.scaleY(-instance.value?.getData().scaleY)
    }

    return {
      imageEl,
      previewEl,
      sVisible,
      onCancel,
      onOk,
      onZoomSub,
      onZoomAdd,
      onRotateSub,
      onRotateAdd,
      onReset,
      onMove,
      onScaleX,
      onScaleY
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
