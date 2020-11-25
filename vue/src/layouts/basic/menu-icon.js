import { MailOutlined, AppstoreOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

export default {
  props: ['name'],
  render() {
    const { name } = this
    if (!name) {
      return h(SmileOutlined)
      // return null
    }
    // icon- 前缀
    if (name.indexOf('icon-') >= 0) {
      return <ComSvgIcon name={name} />
    }
    const icon = {
      MailOutlined,
      AppstoreOutlined
    }[this.type]
    return h(icon)
  }
}
