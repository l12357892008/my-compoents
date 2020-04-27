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
    underline: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    href: String,
    icon: String
  },
  methods: {
    handleClick(event) {
      if(!this.disabled) {
        if(!this.href) {
          this.$$emit('click',event);
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
