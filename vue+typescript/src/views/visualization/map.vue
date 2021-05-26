<template>
  <a-spin :spinning="spinning">
    <div class="analysis">
      <a-row class="button-group">
        <a-tooltip placement="bottom" title="返回">
          <a-row class="back" align="middle" justify="center" @click="onBack">
            <ArrowLeftOutlined class="font-size-30" />
          </a-row>
        </a-tooltip>
      </a-row>
      <div id="mapContainer" class="map-container"></div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

import asyncLoadScript from '@/utils/async-script'
const src =
  'https://webapi.amap.com/maps?v=1.4.7&key=6a169cffad64fb2322801c076ae7d3ec&plugin=AMap.CitySearch,AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder'

export default defineComponent({
  name: 'MapPage',
  components: {
    ArrowLeftOutlined
  },
  setup() {
    const router = useRouter()
    const mapRef = ref<AMap.Map | null>(null)
    const spinning = ref(true)
    onMounted(() => {
      asyncLoadScript(src, window.AMap, err => {
        if (err) {
          spinning.value = false
          message.destroy()
          message.warning('加载地图失败')
          return
        }
        mapRef.value = new window.AMap.Map('mapContainer', {
          zoom: 12
        })
        mapRef.value.on('complete', () => {
          spinning.value = false
        })
        mapRef.value.on('error', err => {
          console.log(err)
        })
      })
    })

    function onBack() {
      router.back()
    }

    onBeforeUnmount(() => {
      mapRef.value && mapRef.value.destroy()
    })

    return {
      onBack,
      spinning
    }
  }
})
</script>

<style lang="less" scoped>
.analysis {
  position: relative;
  height: 100vh;
  .button-group {
    z-index: 9;
    position: absolute;
    top: 10px;
    left: 10px;
    height: 24px;
  }
  .back {
    width: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.map-container {
  height: 100vh;
}
</style>
