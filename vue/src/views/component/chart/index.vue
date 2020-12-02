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
      ></a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      ></a-col>
    </a-row>
    <div id="container"></div>
  </div>
</template>

<script>
import Column from './components/column'
import Bar from './components/bar'
export default {
  name: 'Chart',
  components: {
    Column,
    Bar
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
