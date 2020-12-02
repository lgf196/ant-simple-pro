<template>
  <div class="footerbar">
    <div>
      <ComSvgIcon name="logo" class="logo"></ComSvgIcon>
      <div class="line"></div>
      <span class="name">Ant Simple Pro</span>
    </div>
    <p>Copyright © 2020 Lgf&qyh</p>
  </div>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style lang="less" scoped>
  .footerbar {
    padding: 36px 0;
    text-align: center;
    color: rgba(0, 0, 0, .45);
  }
  .logo, .line, .name {
    display: inline-block;
    vertical-align: middle;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: rgba(0, 0, 0, .06);
    margin: 0 8px;
  }
</style>
