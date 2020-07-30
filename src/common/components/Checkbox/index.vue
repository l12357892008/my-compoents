<template>
  <label
    class="my-checkbox"
    :class="[
      bordered && checkboxSize ? 'my-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': bordered },
      { 'is-checked': isChecked },
      { 'is-button': button }
    ]"
    id="id"
  >
    <span
      class="my-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
    >
      <!-- 将input隐藏,以my-checkbox__inner来表现样式 -->
      <span class="my-checkbox__inner" v-if="!button"
        :style="model === label ? activeStyle.fillInner  : null">
      </span>
      <input
        ref="radio"
        class="my-checkbox__original"
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
    <span class="my-checkbox__label"
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
  name: "MyCheckbox",
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
    label: {}, //选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）
    indeterminate: Boolean, // 用以表示 checkbox 的不确定状态，一般用于实现全选的效果
    disabled: Boolean, // 是否禁用
    checked: Boolean,  // 当前是否勾选
    name: String, // 原生name属性
    trueLabel: [String, Number],  // 选中时的值
    falseLabel: [String, Number], // 没有选中时的值
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean, // 是否带边框
    size: String, // Checkbox 的尺寸，仅在 border和button 为真时有效
    button: Boolean // 是否按钮形态
  },
  data() {
    return {
      focus: false ,// 是否获取焦点
      selfModel: false,
      isLimitExceeded: false,  // 若设置最大选择数量是否达到最大限制
    };
  },
  computed: {
    model: {  // 单选框展示的值
      get() {
        return this.isGroup
          ? this.store : this.value !== undefined
            ? this.value : this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          (this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true));

          (this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true));

          this.isLimitExceeded === false &&
          this.dispatch('ElCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },
    isGroup() {
      let parent = this.$parent;
      // 循环遍历父组件直到找到最根部的祖宗组件
      while (parent) {
        if (parent.$options.name !== "MyCheckboxGroup") {
          // 若父组件不是MyRadioGroup就继续往上走，找父组件的父组件
          parent = parent.$parent;
        } else {
          // 如果使用了RadioGrop 那就以该组件的v-model的值为单选值实现唯一选中
          this._checkboxGroup = parent;
          return true;
        }
      }
      // 遍历结束后都没有RadioGrop就直接返回false,绑定值由Radio组件自己完成
      return false;
    },
    isChecked() {  // 判断是否被选中
      if ({}.toString.call(this.model) === '[object Boolean]') {  // 若传入的类型为布尔型
        return this.model;
      } else if (Array.isArray(this.model)) {  // 如果是是checkbox-group情况下
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {   // 使用trueLabel情况
        return this.model === this.trueLabel;
      }
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
@import "../AACSS/checkbox.scss";
</style>
