<!--
  describe:
  1.引入: import {$当前组件名称} from '@/common/components/AAIndex'
  2.接受属性:
    必填项: 无
    可选项:
      1.size: String,按钮大小,可选值: 'big/small/smaller/mini'
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
      return this.size || this._elFormItemSize || (this.$MYELEMENT || {}).size;
    }
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
@import "../AACSS/button-group.scss";
</style>
