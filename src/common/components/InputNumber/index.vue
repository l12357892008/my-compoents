<template>
  <div
    @dragstart.prevent
    :class="[
      'my-input-number',
      inputNumberSize ? 'my-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]"
  >
    <span
      class="my-input-number__decrease"
      role="button"
      v-if="controls"
      v-repeat-click="decrease"
      :class="{'is-disabled': minDisabled}"
      @keydown.enter="decrease"
    >
      <i :class="`my-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <span
      class="my-input-number__increase"
      role="button"
      v-if="controls"
      v-repeat-click="increase"
      :class="{'is-disabled': maxDisabled}"
      @keydown.enter="increase"
    >
      <i :class="`my-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    <my-input
      ref="input"
      :value="displayValue"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange">
    </my-input>
  </div>
</template>

<script>
import MyInput from '../Input' ;
import RepeatClick from "../AAdirectives/repeat-click";
export default {
  name: 'MyInputNumber',
  inject: {
    myForm: { // 若祖先组件中存在form组件，获取其设置
      default: ""
    },
    myFormItem: {
      default: ""
    }
  },
  components:{ MyInput },
  directives: {
    repeatClick: RepeatClick
  },
  data () {
    return {
      currentValue: 0,  // 临时保存一份值
      userInput: null,  // 用户手动输入的值
    }
  },
  props:{
    step:{  // 数字变化间隔
      type: Number,
      default: 1
    },
    stepStrictly: Boolean,  // 严格步数,设置为true后只能输入 数字变化间隔 的倍数，与起始值无关
    max: {  // 最大值
      type: Number,
      default: Infinity
    },
    min: {   // 最小值
      type: Number,
      default: -Infinity
    },
    value: {},  // 值
    disabled: Boolean,  // 禁用
    size: String,   // 尺寸
    controls:{  // 是否显示控制按钮
      type: Boolean,
      default: true
    },
    controlsPosition: {  // 控制按钮位置，不写默认在左右，写right在右边分上下
      type: String,
      default: ''
    },
    name: String,  // 原生name属性
    precision: {  // 小数位数
      type: Number,
      validator(val) {  // 大于0且必须是整数，小于等于8，再多也放不下了
        return val >= 0 && val <= 8 && val === parseInt(val, 10);
      }
    }
  },
  computed:{
    minDisabled() {  // 看看下次减后是否会小于最小值来判断 是否禁用减按钮
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled() { // 看看下次加后是否会大于最大值来判断 是否禁用加按钮
      return this._increase(this.value, this.step) > this.max;
    },
    numPrecision() { // 计算最终小数位数,如果设置了精度,就以精度为准,如果没有设置,按值和步长的最大小数位数为准
      const { value, step, getPrecision, precision } = this;
      const stepPrecision = getPrecision(step);
      if (precision !== undefined) {
        // 若精度小于步长的小数位数,抛出警告
        if (stepPrecision > precision) {
          console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
        }
        return precision;
      } else {
        return Math.max(getPrecision(value), stepPrecision);
      }
    },
    controlsAtRight(){  // 控制按钮是否在右边
      return this.controls && this.controlsPosition === 'right';
    },
    _myFormItemSize() { // 获取表单中的全局尺寸控制
      return (this.myFormItem || {}).myFormItemSize;
    },
    inputNumberSize() { // 最终展示的尺寸
      return this.size || this._myFormItemSize || (this.$MYELEMENT || {}).size;
    },
    inputNumberDisabled() { // 最终判断是否禁用
      return this.disabled || !!(this.myForm || {}).disabled;
    },
    displayValue() {  // 最终展示出来的值
      if (this.userInput !== null) {  // 用户手动输入就显示手动输入的
        return this.userInput;
      }
      let currentValue = this.currentValue;
      if (typeof currentValue === 'number') {
        if (this.stepStrictly) {
          const stepPrecision = this.getPrecision(this.step);
          const precisionFactor = Math.pow(10, stepPrecision);
          currentValue = Math.round(currentValue / this.step) * precisionFactor * this.step / precisionFactor;
        }
        if (this.precision !== undefined) {
          currentValue = currentValue.toFixed(this.precision);
        }
      }
      return currentValue;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        let newVal = value === undefined ? value : Number(value);
        if (newVal !== undefined) {
          if (isNaN(newVal)) {
            return;
          }

          if (this.stepStrictly) {  // 调整为严格步数的倍数
            const stepPrecision = this.getPrecision(this.step);
            const precisionFactor = Math.pow(10, stepPrecision);
            newVal = Math.round(newVal / this.step) * precisionFactor * this.step / precisionFactor;
          }

          if (this.precision !== undefined) {  // 调位数
            newVal = this.toPrecision(newVal, this.precision);
          }
        }
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        this.currentValue = newVal;
        this.userInput = null;
        this.$emit('input', newVal);  // 改变父组件里的值
      }
    }
  },
  methods: {
    toPrecision(num, precision) {  // 将num的小数位数调整成precision指定的位数
      if (precision === undefined) precision = this.numPrecision;
      // 通过 (3 * 100) / 100 = 3.00  的方式转变位数
      return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
    },
    getPrecision(value) {  // 获取传入值的小数位数
      if (value === undefined) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf('.');
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    _increase(val, step) {  // 预先计算一下下次加了之后的值
      if (typeof val !== 'number' && val !== undefined) return this.currentValue;
      const precisionFactor = Math.pow(10, this.numPrecision);
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
    },
    _decrease(val, step) {  // 预先计算一下下次减了之后的值
      if (typeof val !== 'number' && val !== undefined) return this.currentValue;
      const precisionFactor = Math.pow(10, this.numPrecision);
      // 小数计算一般先用乘法变成整数,运算完再用除法变回小数，避免精度丢失
      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
    },
    increase() {  // 实际增加
      if (this.inputNumberDisabled || this.maxDisabled) return;
      const value = this.value || 0;
      const newVal = this._increase(value, this.step);
      this.setCurrentValue(newVal);
    },
    decrease() {  // 实际减少
      if (this.inputNumberDisabled || this.minDisabled) return;
      const value = this.value || 0;
      const newVal = this._decrease(value, this.step);
      this.setCurrentValue(newVal);
    },
    setCurrentValue(newVal) {  // 在increase或decrease或用户手动输入后修改currentValue并向上发送事件
      const oldVal = this.currentValue;
      if (typeof newVal === 'number' && this.precision !== undefined) {
        newVal = this.toPrecision(newVal, this.precision);
      }
      if (newVal >= this.max) newVal = this.max;
      if (newVal <= this.min) newVal = this.min;
      if (oldVal === newVal) return;
      this.userInput = null;
      this.$emit('input', newVal);
      this.$emit('change', newVal, oldVal);
      this.currentValue = newVal;
    },
    handleBlur(event) {
      this.$emit('blur', event);
    },
    handleFocus(event) {
      this.$emit('focus', event);
    },
    handleInput(value) {
      this.userInput = value;
    },
    handleInputChange(value) {
      const newVal = value === '' ? undefined : Number(value);
      if (!isNaN(newVal) || value === '') {
        this.setCurrentValue(newVal);
      }
      this.userInput = null;
    },
    select() {
      this.$refs.input.select();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../AACSS/input-number.scss";
</style>
