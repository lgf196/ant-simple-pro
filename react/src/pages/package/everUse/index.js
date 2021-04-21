import React, { memo } from 'react'
import style from './everUse.module.scss'
import Button from '@/components/button'
import { FilterOutlined } from '@ant-design/icons';
import SvgIcon from '@/components/svgIcon'
import ImgUpload from '@/components/upload/imgUpload'
import Select from '@/components/select'
import { requestCode } from '@/utils/varbile';
const EverUse = memo(function EverUse(props) {
  const fileList = [
    {
      uid: '-1',
      status: 'success',
      response: {
        code: requestCode.successCode,
        data: { url: 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1618975957299.jpg' },
      },
      url: 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1618975957299.jpg',
    },
    {
      uid: '-2',
      status: 'error',
      thumbUrl: 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1618975957299.jpg',
      response: '服务异常'
    },
  ];
  const selectList = [
    { name: 'react', id: 1 },
    { name: 'vue', id: 2 },
    { name: 'angular', id: 3 }
  ];
  const handChange = (val) => {
    console.log('handChange', val)
  };
  return (
    <div className='bgW'>
      <ul className={`${style.everUser}`}>
        <li>
          <h3>Button组件</h3>
          <p>
            <Button title='新增' />
            <Button iconClass='add' className='left-10px' />
            <Button iconClass='add' className='left-10px' title='新增' />
            <Button icon={<FilterOutlined />} className='left-10px' title='新增' />
            <Button icon={<FilterOutlined />} className='left-10px' title='新增' size='small' type='dashed' danger />
          </p>
          <p><span className={style.toast}>温馨提示</span>：我们在antd <code>Button</code> 组件的基础上进行了二次封装，新增了
                    <code>title，iconClass等属性</code> 具体的请看源码 ，antd <code>Button</code> 原有的属性依旧支持，具体请查看antd官网。</p>
        </li>
        <li>
          <h3>icon(svg)组件</h3>
          <p>
            <SvgIcon iconClass='add' fontSize='30px' fill='red' />
            <SvgIcon iconClass='chart' fontSize='30px' fill='blue' className='left-10px' />
            <SvgIcon iconClass='qp' fontSize='30px' fill='#1890ff' className='left-10px' />
          </p>
          <p><span className={style.toast}>温馨提示</span>：我们内置了对svg的支持，并且写了 <code>SvgIcon</code> 组件，你只需
                    按照我们的要求，将svg组件下载下来，放到项目文件夹 <code>icons/svg</code> 中去即可，<span className={style.toast}>如果你下载的svg名字是中文，建议你改成英文/拼音</span>，组件对应的属性
                    请查看 <code>SvgIcon</code> 的源码。</p>
        </li>
        <li>
          <h3>ImgUpload组件</h3>
          <div>
            <ImgUpload fileList={[...fileList]} typeModule={2} onChange={handChange} />
          </div>
          <p><span className={style.toast}>温馨提示</span>：我们在antd <code>Upload</code> 组件的基础上进行了二次封装，新增了
                    <code>limit，typeModule等属性</code> 具体的请看源码，和提供的案例 ，antd <code>Upload</code> 原有的属性依旧支持，具体请查看antd官网。</p>
        </li>
        <li>
          <h3>Select组件</h3>
          <div>
            <Select data={selectList} valKey='id' valName='name' style={{ width: '200px', marginRight: '10px' }} />
            <Select data={selectList} valKey='id' valName='name' style={{ width: '200px' }} value={2} size='large' />
          </div>
          <p><span className={style.toast}>温馨提示</span>：我们在antd <code>Select</code> 组件的基础上进行了二次封装，新增了
                    <code>data，valKey,valName等属性</code> 具体的请看源码，和提供的案例 ，antd <code>Select</code> 原有的属性依旧支持，具体请查看antd官网。</p>
        </li>
        <li className={style.toast}>
          我们还提供了一些其它的组件，具体请参看项目源码和案例。
        </li>
      </ul>
    </div>
  )
})
export default EverUse
