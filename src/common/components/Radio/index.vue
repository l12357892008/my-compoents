<!--
  describe:
  1.引入: import {当前组件名称} from '@/common/components/AAIndex'
  2.接受属性:
    区别:
      1.size: String,大小，big/small/smaller/mini
      2.button: Boolean,是否为按钮型
-->
<template>
  <label
    class="my-radio"
    :class="[
      bordered && radioSize ? 'my-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border || button },
      { 'is-checked': model === label },
      { 'is-button': button }
    ]"
    :tabindex="tabIndex"
    :style="model === label ? (button ? activeStyle.fillButton : (border ? activeStyle.fillBorder : null))  : null"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
      class="my-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <!-- 将input隐藏,以my-radio__inner来表现样式 -->
      <span class="my-radio__inner" v-if="!button"
        :style="model === label ? activeStyle.fillInner  : null">
      </span>
      <input
        ref="radio"
        class="my-radio__original"
        :value="label"
        type="radio"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      />
    </span>
    <span class="my-radio__label"
     :style="model === label ? (button ? activeStyle.textColor : activeStyle.textColorBorder)  : null"
     @keydown.stop >
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import emitter from "../AAMIXINS/emitter";
export default {
  name: "MyRadio",
  inject: {
    myForm: {
      default: ""
    },
    myFormItem: {
      default: ""
    }
  },
  props: {
    value: {},
    label: {},
    disabled: Boolean, // 是否禁用
    name: String, // 原生name属性
    border: Boolean, // 是否带边框
    size: String, // 尺寸
    button: Boolean // 是否按钮形态
  },
  data() {
    return {
      focus: false // 是否获取焦点
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      // 循环遍历父组件直到找到最根部的祖宗组件
      while (parent) {
        if (parent.$options.name !== "MyRadioGroup") {
          // 若父组件不是MyRadioGroup就继续往上走，找父组件的父组件
          parent = parent.$parent;
        } else {
          // 如果使用了RadioGrop 那就以该组件的v-model的值为单选值实现唯一选中
          this._radioGroup = parent;
          return true;
        }
      }
      // 遍历结束后都没有RadioGrop就直接返回false,绑定值由Radio组件自己完成
      return false;
    },
    bordered() {
      return this.border || this.button;
    },
    activeStyle() {  // myRadioGroup里设定了文字颜色和填充色
      if(!this.isGroup) return {}
      return {
        fillBorder: {
          borderColor: this._radioGroup.fill || ""
        },
        fillInner: {
          backgroundColor: this._radioGroup.fill || "",
          borderColor: this._radioGroup.fill || ""
          },
        fillButton: {
          backgroundColor: this._radioGroup.fill || "",
          borderColor: this._radioGroup.fill || "",
          boxShadow: this._radioGroup.fill
            ? `-1px 0 0 0 ${this._radioGroup.fill}`
            : ""
          },
        textColor:{color: this._radioGroup.textColor || ""},
        textColorBorder:{color: this._radioGroup.fill || ""}
      };
    },
    model: {
      // 单选框的唯一标识值
      get() {
        // get当使用model时调用，根据有无使用RadioGroup返回RadioGroup绑定的值或自身绑定的值
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      // 当model值发生变化时调用通过$emit的input事件来更新父组件的值，只有点击该项单选按钮时才会调用
      // 父组件传来的值变化不会调用该函数
      set(val) {
        if (this.isGroup) {
          this.dispatch("MyRadioGroup", "input", [val]); // mixins混入方法,将$emit放到MyRadioGroup组件中执行
        } else {
          this.$emit("input", val);
        }
        this.$refs.radio &&
          (this.$refs.radio.checked = this.model === this.label);
      }
    },
    radioSize() {
      const temRadioSize =
        this.size ||
        (this.myFormItem || {}).myFormItemSize ||
        (this.$MYELEMENT || {}).size;
      return this.isGroup
        ? this._radioGroup.radioGroupSize || temRadioSize
        : temRadioSize;
    },
    isDisabled() {
      return this._radioGroup
        ? this._radioGroup.disabled ||
            this.disabled ||
            (this.myForm || {}).disabled
        : this.disabled || (this.myForm || {}).disabled;
    },
    tabIndex() {
      // 按tab键时是否切换到该元素
      return this.isDisabled || (this.isGroup && this.model !== this.label)
        ? -1
        : 0;
    }
  },
  methods: {
    handleChange() {
      //
      this.$nextTick(() => {
        // DOM更新完成后才执行，这样才能拿到最新的数据
        this.$emit("change", this.model);
        this.isGroup &&
          this.dispatch("MyRadioGroup", "handleChange", this.model);
      });
    }
  },
  mixins: [emitter]
};
</script>

<style lang='scss' scoped>
@import "../AACSS/radio.scss";
</style>
