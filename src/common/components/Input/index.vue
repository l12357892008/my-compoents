<!--
  describe:
  1.引入: import {当前组件名称} from '@/common'
  2.接受属性:
    1.type: String,类型,默认'text',可选值:'text/textarea以及其他原生input的type值'
    2.size: String,按钮大小,可选值: 'big/small/smaller/mini'
    3.value/v-model: String/number,绑定值
    4.minlength和maxlength: number,原生属性,最大最小输入长度
    5.placeholder: String,输入框占位文本
    6.show-word-limit: Boolean,是否显示输入字数统计,只在type='text/textarea'时生效
    7.clearable: Boolean,是否可清空
    8.show-password: Boolean,是否显示切换密码图标
    9.disabled: boolean,是否禁用
    10.prefix-icon: string,输入框头部图标类名
    11.suffix-icon: string,输入框尾部图标类名
    13.autosize: boolean/object,默认false,自适应内容高度,可以传入对象如{ minRows: 2, maxRows: 6 }
    14.autocomplete: string,原生属性，是否自动补全,可选值:on/off
    15.name: string,原生属性
    16.readonly: boolean,是否只读
    17.min/max:原生属性,最大最小值
    18.step: 原生属性,输入字段合法数字间隔
    19.resize: boolean,是否能被用户缩放,可选值:none,both,horizontal,vertical
    20.autofocus: boolean,原生属性,自动获取焦点
    21.form: string,原生属性
    22.label: string,输入框关联的label文字
    23.tabindex: string,输入框的tabindex
    24.validate-event: boolean 输入时是否触发表单校验
  3.插槽:
    <i slot="suffix" class="my-input__icon my-icon-date"></i>
    <i slot="suffix" class="my-input__icon my-icon-date"></i>
    <template slot="prepend">
      <my-button>sadf</my-button>
    </template>
    <template slot="append">.com</template>
  4.事件: @blur     @focus   @change   @input   @clear
  5.方法: 获取根据id class 或ref 获取dom元素 .focus() .blur() .select()
-->
<template>
  <div :class="[
      type === 'textarea' ? 'my-textarea' : 'my-input',
      inputSize ? 'my-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'my-input-group': $slots.prepend || $slots.append,
        'my-input-group--append': $slots.append,
        'my-input-group--prepend': $slots.prepend,
        'my-input--prefix': $slots.prefix || prefixIcon,
        'my-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- 普通input输入框 -->
    <template v-if="type !== 'textarea'">
      <!-- 前置元素，标签或下拉框等,根据是否传入了prepend插槽来显示 -->
      <div class="my-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- 前置内容，图标等,支持插槽和prefix-icon两种传入方式-->
      <span class="my-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name='prefix'></slot>
        <i class="my-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
      </span>
      <!-- 主体 input -->
      <input
        :tabindex = 'tabindex'
        class="my-input__inner"
        :type = "showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled = 'inputDisabled'
        :readonly = 'readonly'
        :autocomplete="autocomplete"
        ref = 'input'
        v-bind="$attrs"
        @compositionstart = "handleCompositionStart"
				@compositionupdate = "handleCompositionUpdate"
				@compositionend = "handleCompositionEnd"
				@input = "handleInput"
				@focus = "handleFocus"
				@blur = "handleBlur"
				@change = "handleChange"
      />
      <!-- 后置内容 -->
      <span class="my-input__suffix" v-if="getSuffixVisible">
        <span class="my-input__suffix-inner">
          <template>
            <slot name='suffix'></slot>
            <i class="my-input__icon" v-if="suffixIcon" :class='suffixIcon'></i>
          </template>
          <!-- 清空图标 -->
          <i v-if="showClear" class="my-input__icon my-icon-circle-close my-input__clear" @mousedown.prevent @click="clear" />
          <!-- 显示密码 -->
          <i v-if='showPwdVisible' class='my-input__icon my-icon-view my-input__clear' @click="handlePasswordVisible" />
          <!-- 长度限制 -->
          <span v-if="isWordLimitVisible" class="my-input__count">
            <span class="my-input__count-inner">
              {{textLength}}/{{$attrs.maxlength}}
            </span>
          </span>
          <!-- 表单校验结果图标 -->
          <i class="my-input__icon" v-if="validateState" :class="['my-input__validateIcon', validateIcon]" />
        </span>
      </span>
      <!-- 后置元素，如.com或者搜索标签 -->
      <div class="my-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>

    <!-- 多行输入文本域 -->
    <template v-else>
      <textarea
        :tabindex="tabindex"
        class="my-textarea__inner"
        ref = 'textarea'
        v-bind="$attrs"
        :disabled = 'inputDisabled'
        :readonly = 'readonly'
        :autocomplete="autocomplete"
        :style="textareaStyle"
        @compositionstart = "handleCompositionStart"
        @compositionupdate = "handleCompositionUpdate"
        @compositionend = "handleCompositionEnd"
        @input = "handleInput"
        @focus = "handleFocus"
        @blur = "handleBlur"
        @change = "handleChange"
      ></textarea>
      <span v-if="isWordLimitVisible" class="my-input__count">{{ textLength }}/{{ $attrs.maxlength }}</span>
    </template>
  </div>
</template>

<script>
  import emitter from "../AAMIXINS/emitter";
  import migrating from "../AAMIXINS/migrating";
  import calcTextareaHeight from './calcTextareaHeight';
  import {isKorean} from '../AAUTILS/shared';
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
      type: { // 类型  text/textarea以及其他原生input的type值
        type: String,
        default: "text"
      },
      size: String, // 尺寸 big/small/smaller/mini
      resize: String, // 能否被用户缩放 none/both/horizontal,vertical
      form: String, // 原生属性，当input不在form元素包裹内,传入form标签的id使联系上
      disabled: Boolean, // 是否禁用
      readonly: Boolean, // 是否只读,没有禁用时的样式，但同样无法输入
      autosize: { // 只有type='textarea'时才生效，ex:{ minRows: 2, maxRows: 6 }
        type: Object,
        default: null
      },
      autocomplete: { // 原生属性autocomplete,为on时会允许浏览器记住用户输入,下次输入时进行提醒，on/off
        type: String,
        default: 'off'
      },
      validateEvent: { // 输入时是否触发表单校验,默认校验,传入时驼峰写法无效，应该用validate-event
        type: Boolean,
        default: true
      },
      suffixIcon: String, // 输入框尾部图标(名称),传入时驼峰写法无效，应该用suffix-icon
      prefixIcon: String, // 输入框头部图标,传入时驼峰写法无效，应该用prefix-icon
      clearable: Boolean, // 是否可清空输入
      showPassword: Boolean, // 是否允许控制密码是否可见,传入时驼峰写法无效，应该用show-password
      showWordLimit: Boolean, // 是否显示输入数字统计,仅在type='text'和'textarea'时生效,同样驼峰无效，改为show-word-limit
      tabindex: String // 原生tabIndex，设置tab键控制顺序
    },
    inject: {
      myForm: { // 若祖先组件中存在form组件，获取其设置
        default: ""
      },
      myFormItem: {
        default: ""
      }
    },
    data() {
      return {
        textareaCalcStyle: {}, // 计算后的多行输入框的样式
        hovering: false, // 鼠标是否悬浮于该组件上
        focused: false, // 是否获取焦点
        isComposing: false, // 是否正在用输入法拼音输入中文
        passwordVisible: false // 密码是否可见
      };
    },
    created() {
      // 监听inputSelect事件有没有被触发,触发了就选中文本域里的内容
      // 我全文件搜索也没找到哪里有触发这个，先屏蔽了，以后有需要再实现
      this.$on('inputSelect', () => {
        this.getInput().select()
      });
    },
    mounted() {
      this.setNativeInputValue();
      this.resizeTextarea(); // 设置多行输入框最小高度
      this.updateIconOffset();
    },
    updated() { // 组件更新之后
      this.$nextTick(this.updateIconOffset);
    },
    computed: {
      _myFormItemSize() { // 获取表单中的全局尺寸控制
        return (this.myFormItem || {}).myFormItemSize;
      },
      validateState() { // 校验状态
        return this.myFormItem ? this.myFormItem.validateState : '';
      },
      needStatusIcon() { // 是否需要显示输入检验的反馈的图标
        return this.myForm ? this.myForm.statusIcon : false;
      },
      validateIcon() { // 根据反馈结果选择图标
        return {
          validating: 'my-icon-loading',
          success: 'my-icon-circle-check',
          error: 'my-icon-circle-close'
        } [this.validateState];
      },
      textareaStyle() { // 多行输入文本样式
        // return merge({}, this.textareaCalcStyle, { resize: this.resize});  // 感觉和Object.assign()一样都是浅拷贝就替换了
        return Object.assign({}, this.textareaCalcStyle, {
          resize: this.resize
        });
      },
      inputSize() { // 尺寸
        return this.size || this._myFormItemSize;
      },
      inputDisabled() { // 是否禁用
        return this.disabled || (this.myForm || {}).disabled
      },
      nativeInputValue() { // 若有输入将输入转为字符串
        return this.value === null || this.value === undefined ? '' : String(this.value)
      },
      showClear() { // 是否显示清空按钮
        return this.clearable &&
          !this.inputDisabled &&
          !this.readonly &&
          this.nativeInputValue &&
          (this.focused || this.hovering)
      },
      showPwdVisible() { // 是否显示密码
        return this.showPassword &&
          !this.inputDisabled &&
          !this.readonly &&
          (!!this.nativeInputValue || this.focused); // !!a 和 a!=null&&typeof(a)!=undefined&&a!=''等价，但代码量更少
      },
      isWordLimitVisible() { // 是否显示字数限制
        return this.showWordLimit &&
          this.$attrs.maxlength &&
          (this.type === 'text' || this.type === 'textarea') &&
          !this.inputDisabled &&
          !this.readonly;
      },
      getSuffixVisible() {  // 是否显示后置图标
        return this.$slots.suffix ||
          this.suffixIcon ||
          this.showClear ||
          this.showPassword ||
          this.isWordLimitVisible ||
          (this.validateState && this.needStatusIcon);
      },
      // upperLimit(){   // 就返回一个值又不做任何处理我就注释掉了，要用的地方我直接用要返回的值
      //   return this.$attrs.maxlength
      // },
      textLength() { // 输入字符的长度
        // 感觉都是要转字符串再取长度，上面有个nativeInputValue()已经转过字符串了
        // 我觉得再转一次没有意义就替换了
        // if(typeof this.value === 'number'){
        //   return String(this.value)
        // }
        // return (this.value || '').length
        return this.nativeInputValue.length
      },
      inputExceed() { // 是否超过限制
        return this.isWordLimitVisible &&
          (this.textLength > this.$attrs.maxlength)
      }
    },
    watch: {
      value(val, oldVal) { // 输入有变化
        this.$nextTick(this.resizeTextarea); // 重新调整高度
        if (this.validateEvent) { // 若有表单验证则发射'my.form.change'事件给MyFormItem父组件
          this.dispatch('MyFormItem', 'my.form.change', [val]);
        }
      },
      nativeInputValue() { // 若有输入
        this.setNativeInputValue();
      },
      type() { // 若输入框类型改变
        this.$nextTick(() => {
          this.setNativeInputValue();
          this.resizeTextarea(); // 重新调整多行输入框大小
          this.updateIconOffset();
        });
      }
    },
    methods: {
      getInput() { // 获取输入框DOM元素
        return this.$refs.input || this.$refs.textarea;
      },
      focus() { // 手动获取焦点
        this.getInout().focus();
      },
      blur() { // 手动失去焦点
        this.getInput().blur();
      },
      handleFocus(e) { // 处理获取焦点事件
        this.focused = true;
        this.$emit('focus', e); // 上传给父组件，使父组件也能处理coucs事件
      },
      handleBlur(e) { // 处理失去焦点事件
        this.focused = false;
        this.$emit('blur', e); // 上传给父组件，使父组件也能处理blur事件
        if (this.validateEvent) {   // 如果有表单验证,让父组件MyFormItem发送my.form.blur事件
          this.dispatch('MyFormItem', 'my.form.blur', [this.value]);
        }
      },
      resizeTextarea() { // 调整多行输入框大小
        if (this.$isServer) return; // $isServer Vue实例上的属性，用于判断是否运行于服务端
        const {
          autosize,
          type
        } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          }
        }
      },
      // 在create注释掉的那段调用了,就是自身或子组件触发了inputSelect事件就选中文本框里的字符串,且可以通过
      // 获取组件dom  .select()调用该函数
      select() {
        this.getInput().select();
      },
      /* 在mixins引入的migrating里的mounted里调用了
       * 用于迁移指导,如果用户使用了1.0的icon等属性就告诉他这个被废弃了
       * */
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      setNativeInputValue() {   // 把输入框里的值转成字符串形式
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
      },
      handleCompositionStart() {   // 输入法拼音输入汉字开始
        this.isComposing = true;
      },
      handleCompositionUpdate(event) {  // 输入法拼音输入汉字中
        const text = event.target.value;
        const lastCharacter = text[text.length - 1] || '';
        // this.isComposing = !isKorean(lastCharacter);   // 判断是否为韩文或朝鲜文,我觉得用不上
      },
      handleCompositionEnd(event) {   // 输入法拼音输入汉字结束(按下空格或数字)
        if (this.isComposing) {
          this.isComposing = false;
          this.handleInput(event);
        }
      },
      handleInput(event) {   // 处理输入
        // 输入法拼音输入时不应该$emit input事件
        // 浪费资源,如果emit,拼音输入时就会先将value变成拼音字母,在按下空格或数字选中中文时再将value重新变成汉字
        if (this.isComposing) return;

        if (event.target.value === this.nativeInputValue) return;

        this.$emit('input', event.target.value);

        // 避免数据还没更新好就进行设置取到了旧的值
        this.$nextTick(this.setNativeInputValue);

        console.log(this.nativeInputValue.length);
      },
      handleChange(event) {  // @input是输入事实变化,@change是输入框失去焦点后才触发
        this.$emit('change', event.target.value);
      },
      calcIconOffset(place) {  // 计算前置后置内容位移量
        // this.$el当前组件根元素(此例中为my-input 或my-textarea),$root是组件树的根元素
        // 找到class为.my-input__suffix或是.my-input__prefix的元素
        let elList = [].slice.call(this.$el.querySelectorAll(`.my-input__${place}`) || []);
        if (!elList.length) return;
        let el = null;
        // 避免找错
        for (let i = 0; i < elList.length; i++) {
          if (elList[i].parentNode === this.$el) {
            el = elList[i];
            break;
          }
        }
        if (!el) return;
        const pendantMap = {
          suffix: 'append',
          prefix: 'prepend'
        };

        const pendant = pendantMap[place];
        // 如果通过插槽放置了前置后置元素(标签、下拉框等),需要调整前置后置内容(图标)的位置
        // ${place === 'suffix' ? '-' : ''   如果是后置元素就要将后置内容往左移动(-),反之将前置内容右移动
        // 否则会被前置后置元素遮挡住
        if (this.$slots[pendant]) {
          el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.my-input-group__${pendant}`).offsetWidth}px)`;
        } else {
          el.removeAttribute('style');
        }
      },
      updateIconOffset() { // 更新前置后置内容的位置
        this.calcIconOffset('prefix');
        this.calcIconOffset('suffix');
      },
      clear() {   // 处理清空事件
        this.$emit('input', '');   // 让父组件将value设为''
        this.$emit('change', '');
        this.$emit('clear');
      },
      handlePasswordVisible() {   // 切换密码显示与否
        this.passwordVisible = !this.passwordVisible;
        this.focus();
      }
    },
    components: {}
  };
</script>

<style lang='scss' scoped>
@import "../AACSS/input.scss";
</style>
