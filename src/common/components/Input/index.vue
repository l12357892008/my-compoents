<template>
  <div></div>
</template>

<script>
import emitter from "../AAMIXINS/emitter";
import migrating from "../AAMIXINS/migrating";
// import merge from '../AAUTILS/merge';
export default {
  name: "MyInput",
  mixins: [emitter, migrating],
  // inheritAttrs:当父组件传递了数据，而子组件中没用props接受，
  // 如果这个数据变量名和普通html元素中属性同名将会覆盖掉子组件的的同名属性，
  // 如父组件中<bb type='text'></bb>,bb子组件中有一个<input type='number'></input>
  // 且bb中没用用props接收父组件传来的type，那么input中的type='number'将会被替换成type='text'
  inheritAttrs: false,
  props: {
    value: [String, Number],
    type: {   // 类型  text/textarea以及其他原生input的type值
      type: String,
      default: "text"
    }, 
    size: String, // 尺寸 big/small/smaller/mini
    resize: String, // 能否被用户缩放 none/both/horizontal,vertical
    form: String, // 原生属性，当input不在form元素包裹内,传入form标签的id使联系上
    disabled: Boolean, // 是否禁用
    readonly: Boolean, // 是否只读,没有禁用时的样式，但同样无法输入
    autosize:{   // 只有type='textarea'时才生效，ex:{ minRows: 2, maxRows: 6 }
      type: Object,
      default: null
    },
    autocomplete: {  // 原生属性autocomplete,为on时会允许浏览器记住用户输入,下次输入时进行提醒，on/off
      type: String,
      default: 'off'
    },    
    validateEvent: {   // 输入时是否触发表单校验,默认校验,传入时驼峰写法无效，应该用validate-event
      type: Boolean,
      default: true
    },
    suffixIcon: String,  // 输入框尾部图标(名称),传入时驼峰写法无效，应该用suffix-icon
    prefixIcon: String,  // 输入框头部图标,传入时驼峰写法无效，应该用prefix-icon
    clearable: Boolean,  // 是否可清空输入
    showPassword: Boolean,  // 是否允许控制密码是否可见,传入时驼峰写法无效，应该用show-password
    showWordLimit: Boolean,  // 是否显示输入数字统计,仅在type='text'和'textarea'时生效,同样驼峰无效，改为show-word-limit
    tabindex: String   // 原生tabIndex，设置tab键控制顺序
  },
  inject: {
    myForm: {
      default: ""
    },
    myFormItem: {
      default: ""
    }
  },
  data() {
    return {
      textareaCalcStyle: {},  // 计算后的多行输入框的样式
      hovering: false,  // 是否悬浮
      focused: false,  // 是否获取焦点
      isComposing: false,  // 是否正在书写中文
      passwordVisible: false  // 密码是否可见
    };
  },
  computed:{
    _myFormItemSize(){  // 获取表单中的全局尺寸控制
      return (this.myFormItem || {}).myFormItemSize;
    },
    validateState(){  // 校验状态
      return this.myFormItem ? this.myFormItem.validateState : '';
    },
    needStatusIcon(){  // 是否需要显示输入检验的反馈的图标
      return  this.myForm ? this.myForm.statusIcon : false;
    },
    validateIcon() {  // 根据反馈结果选择图标
      return {
        validating: 'my-icon-loading',
        success: 'my-icon-circle-check',
        error: 'my-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle(){  // 多行输入文本样式
      // return merge({}, this.textareaCalcStyle, { resize: this.resize});  // 感觉和Object.assign()一样都是浅拷贝就替换了
      return Object.assign({}, this.textareaCalcStyle, {resize: this.resize});
    },
    inputSize(){   // 尺寸
      return this.size || this._myFormItemSize;
    }
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
</style>
