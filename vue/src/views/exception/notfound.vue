<template>
  <a-row class="notfound" type="flex" align="middle">
    <ComSvgIcon name="404" class="notfound-image"></ComSvgIcon>
    <h3 class="title">404</h3>
    <p class="subtitle">抱歉，该页面不存在</p>
    <router-link to="/">
      <a-button type="primary">返回首页</a-button>
    </router-link>
  </a-row>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="less" scoped>
.notfound {
  flex-direction: column;
  padding-top: 48px;
}
.notfound-image {
  font-size: 300px;
}
.title {
  margin: 18px 0 16px;
  font-size: 24px;
  font-weight: 400;
}
.subtitle {
  margin-bottom: 18px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
