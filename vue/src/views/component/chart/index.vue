<template>
  <div class="com-page">
    <a-row :gutter="[10, 10]">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <Column></Column>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <Bar></Bar>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <Line></Line>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <Pie></Pie>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Column from './components/column'
import Bar from './components/bar'
import Line from './components/line'
import Pie from './components/pie'
export default {
  name: 'Chart',
  components: {
    Column,
    Bar,
    Line,
    Pie
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.com-page {
  background-color: transparent;
}
::v-deep .ant-col > div {
  background-color: #fff;
}
</style>
