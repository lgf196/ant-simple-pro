import {
  ConfigProvider,
  message,
  Button,
  Form,
  Input,
  Checkbox,
  Row,
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Modal,
  Tag,
  Badge,
  Radio,
  List,
  Table,
  Divider,
  Tooltip,
  Space,
  Tabs,
  Spin
} from 'ant-design-vue'

export default function(app) {
  const g = app.config.globalProperties

  app
    .use(ConfigProvider)
    .use(Button)
    .use(Form)
    .use(Input)
    .use(Checkbox)
    .use(Row)
    .use(Layout)
    .use(Menu)
    .use(Dropdown)
    .use(Avatar)
    .use(Modal)
    .use(Tag)
    .use(Badge)
    .use(Radio)
    .use(List)
    .use(Table)
    .use(Divider)
    .use(Tooltip)
    .use(Space)
    .use(Tabs)
    .use(Spin)

  g.$message = message
  g.$info = Modal.info
  g.$success = Modal.success
  g.$error = Modal.error
  g.$warning = Modal.warning
  g.$confirm = Modal.confirm
}
