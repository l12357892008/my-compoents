<!--
  describe:
  1.引入: import {$当前组件名称} from '@/common/components/AAIndex'
  2.接受属性:
    必填项: 无
    可选项:
      1.size: String,按钮大小,可选值: 'big/small/smaller/mini'
  3.搞了点样式而已，没具体吊用
  4.ex:<ButtonGroup size='mini' style="margin:20px">
        <Button type="primary">我1</Button>
        <Button type="primary">我</Button>
        <Button>我</Button>
      </ButtonGroup>
-->
<template>
  <div class="my-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MyButtonGroup",
  data() {
    return {};
  },
  props: {
    size: String,  // 按钮大小，'big/small/smaller/mini'
  },
  created() {},
  computed: {
    buttonGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
@import "../AACSS/button-group.scss";
</style>
