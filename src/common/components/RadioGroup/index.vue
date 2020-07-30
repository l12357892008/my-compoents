<!--
  describe:
  1.引入: import {当前组件名称} from '@/common/components/AAIndex'
  2.接受属性:
    必填项: 无
    区别:
      1.size: String,大小，ex:big/small/smaller/mini
-->
<template>
  <div class="my-radio-group">
    <slot></slot>
  </div>
</template>

<script>
import emitter from '../AAMIXINS/emitter'
export default {
  name: 'MyRadioGroup',
  inject: {
    myFormItem: {
      default: ''
    }
  },
  props: {
    value: {},
    size: String,  // 尺寸 big/small/smaller/mini
    fill: String, // radio激活时填充色
    textColor: String,  // radio激活时文本色
    disabled: Boolean  // 是否禁用
  },
  created() {
    // 监听当前上下文this里有没有handleChange这个事件被触发(this.$emit('handleChange'))
    // 由子组件下通过emitter.js方法在当前组件MyRadioGroup触发this.$emit('handleChange')来触发this.$on
    this.$on('handleChange', value => {
      // console.log('我被触发了');
      this.$emit('change', value)
    })
  },
  computed: {
    _myFormItemSize() {
      return (this.myFormItem || {})._myFormItemSize
    },
    radioGroupSize(){
      return this.size || this._myFormItemSize || (this.$MYELEMENT || {}).size;
    }
  },
  watch: {
    value(newVal) {
      this.dispatch('MyFormItem', 'my.form.change', [this.value])
    }
  },
  mixins: [emitter]
}
</script>

<style lang='scss' scoped>
@import '../AACSS/radio-group.scss';
</style>
