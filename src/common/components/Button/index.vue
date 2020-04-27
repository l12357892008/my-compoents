<!--
  describe:
  1.引入: import {$当前组件名称} from '@/common/components/AAIndex'
  2.接受属性:
    必填项: 无
    可选项:
      1.type: String,按钮类型,默认'default',可选值:'primary/success/warning/danger/info/text'
      2.size: String,按钮大小,可选值: 'big/small/smaller/mini'
      3.icon: String,图标class,在按钮文字前面添加图标,如果要在后面直接在文字后加icon
      4.disabled: Boolean,是否禁用按钮
      5.loading: Boolean,是否加载状态,加载状态也禁用按钮
      6.round: Boolean,是否圆角按钮
      7.circle: Boolean,是否圆形按钮
  3.ex:<Button circle disabled type='primary'>提交<i class='my-icon-arrow'/></Button>
-->
<template>
  <button 
    class="my-button" 
    @click="handleClick" 
    :disabled="buttonDisabled || loading" 
    :class="[
      type ? B + type : '',
      buttonSize ? B + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="my-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  data() {
    return {
      B: 'my-button--', // BEM规范中的块
    }
  },
  inject: {
    myForm: {
      default: {
        disabled: false
      }
    }
  },
  props: {
    type: { // 按钮类型，'primary/success/warning/danger/info/text'
      type: String,
      default: "default"
    },
    icon: {  // 图标类名
      type: String,
      default: ''
    },
    size: String, // 按钮大小，'big/small/smaller/mini'
    disabled: Boolean,  // 是否禁用按钮
    loading: Boolean,  // 是否加载状态,加载状态也禁用按钮
    round: Boolean, // 是否圆角按钮
    circle: Boolean, // 是否圆形按钮
  },
  created() {
    console.log(this.buttonDisabled);
  },
  computed: {
    /* 根据父组件传的disabled和两层封装Form中传来的myForm判断是否需要禁用按钮 */
    buttonDisabled() {
      return this.disabled || this.loading || this.myForm.disabled;
    },
    /* 根据父组件和两层封装Form中传来的myForm计算按钮尺寸 */
    buttonSize() {
      return this.size || this.myForm.myFormItemSize
    }
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
@import '../AACSS/button.scss';
</style>
