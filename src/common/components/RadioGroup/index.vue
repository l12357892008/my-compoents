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
    size: String,
    fill: String,
    textColor: String,
    disabled: Boolean
  },
  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value)
    })
  },
  computed: {
    _myFormItemSize() {
      return (this.myFormItem || {})._myFormItemSize
    },
    radioGroupSize(){
      return this.size || this._myFormItemSize
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

<style scoped>
</style>
