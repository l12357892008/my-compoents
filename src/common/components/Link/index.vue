<!--
  describe:
  1.引入: import {当前组件名称} from '@/common/components/AAIndex'
  2.接受属性:
    必填项: 无
    可选项:
      1.type: String,按钮类型,默认'default',可选值:'primary/success/warning/danger/info'
      2.icon: String,图标class,在按钮文字前面添加图标,如果要在后面直接在文字后加icon
      3.disabled: Boolean,是否禁用按钮
      4.href: String,原生href属性
      5.underline: Boolean,鼠标悬浮是否显示下划线(默认为true)
  3.方法:
    @click   携带参数:点击事件
-->
<template>
  <a
    :class="[
      'my-link',
      type ? `my-link--${type}` : '',
      {
        'is-disabled' : disabled,
        'is-underline' : !disabled && underline 
      }
    ]" 
    :href="disabled ? null : href" 
    v-bind="$attrs" 
    @click="handleClick"
  >
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default" class="my-link--inner">
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  name: 'MyLink',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    underline: {  // 鼠标悬浮时是否需要下划线
      type: Boolean,
      default: true
    },
    disabled: Boolean,  // 禁用
    href: String,   // 原生href链接
    icon: String   // 左侧图标
  },
  methods: {
    handleClick(event) {
      if(!this.disabled) {
        if(!this.href) {
          this.$emit('click',event);
        }
      }
    }
  },
  components: {}
}
</script>

<style lang='scss' scoped>
@import '../AACSS/link.scss';
</style>
