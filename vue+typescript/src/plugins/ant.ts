import { App } from 'vue'
import {
  ConfigProvider,
  message,
  Button,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Row,
  Col,
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
  Spin,
  Popover,
  Upload,
  Select,
  DatePicker,
  Pagination,
  Cascader,
  Card,
  Progress,
  Switch,
  BackTop,
  Drawer,
  Slider
} from 'ant-design-vue'

export default function (app: App) {
  const g = app.config.globalProperties

  app
    .use(ConfigProvider)
    .use(Button)
    .use(Form)
    .use(Input)
    .use(InputNumber)
    .use(Checkbox)
    .use(Row)
    .use(Col)
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
    .use(Popover)
    .use(Upload)
    .use(Select)
    .use(DatePicker)
    .use(Pagination)
    .use(Cascader)
    .use(Card)
    .use(Progress)
    .use(Switch)
    .use(BackTop)
    .use(Drawer)
    .use(Slider)

  g.$message = message
  g.$info = Modal.info
  g.$success = Modal.success
  g.$error = Modal.error
  g.$warning = Modal.warning
  g.$confirm = Modal.confirm
}
