import React, { useEffect, useRef,memo,useState } from 'react'
import { message, Tooltip, Row } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import styles from './map.module.scss'
import asyncLoadScript from '@/utils/async-script'
import { useRouter } from '@/hooks'
import LoadingCompent from '@/components/routerLoading'
const src = 'https://webapi.amap.com/maps?v=1.4.7&key=6a169cffad64fb2322801c076ae7d3ec&plugin=AMap.CitySearch,AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder'

const Analysis = memo(function Analysis() {
  const mapRef = useRef(null)
  const { history } = useRouter();
  const [isLoading,setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false)
    asyncLoadScript(src, window.AMap, err => {
      if (err) {
        message.destroy()
        message.warning('加载地图失败')
        return
      }
      mapRef.current = new window.AMap.Map('mapContainer', {
        zoom: 12
      })
      mapRef.current.on('complete', ()=>{
        setIsLoading(true)
      });
    })
    return () => {
      mapRef.current.destroy()
    }
  }, [])

  function onBack() {
    history.goBack()
  }

  return (
    <div className={styles.analysis}>
      <Row className={styles.buttonGroup}>
        <Tooltip placement="bottom" title="返回">
          <Row className={styles.back} align="middle" justify="center" onClick={onBack}>
            <ArrowLeftOutlined style={{fontSize:'30px'}}/>
          </Row>
        </Tooltip>
      </Row>
      {
        isLoading ? null : <LoadingCompent tip='地图正在加载中...'/>
      }
      <div id="mapContainer" className={styles.mapContainer}></div>
    </div>
  )
})

export default Analysis;
