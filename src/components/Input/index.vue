<template>
  <div id="Input" style="margin: 10px 0;">
    <div class="flex_row" style="align-items: center;width: 100%;margin-bottom: 1px;">
      <div style='flex:none;text-align: end;margin-right: 20px;' :style="'width:' + titleWidth">
        {{title ? title + ' : ' :　''}}
      </div>
      <el-input class="input" v-model="Data.form[Data.name]" :size='size' :show-password='type === "password"'  clearable :disabled='disabled'
                @input="input" @blur='blur' :type='(type === "number" || type === "tel") ? "number" :　type'
                :maxlength='length' :autosize="autosize" :show-word-limit='type === "textarea"' :placeholder='placeholder'
                @mousewheel.native.prevent>
        <i slot="prefix" class="el-input__icon"
         :class="type === 'user' ? 'el-icon-user' :
                 type === 'password' ? 'el-icon-lock'  :
                 type === 'tel' ? 'el-icon-phone-outline'  :
                 type === 'email' ? 'el-icon-message'  : 'el-icon-edit-outline'"
         :style="{color:color,fontWeight:700}"/>
      </el-input>
    </div>
    <div class="flex_row" :class="flu ? 'flutter' : ''" v-if="required && bank">
      <div :style="'width:' + titleWidth"></div>
      <div class="flex_row warning" style='margin-left: 20px;'><i class="el-icon-warning"/> 请输入{{title}}</div>
    </div>
    <div class="flex_row" :class="flu ? 'flutter' : ''" v-if="mistake">
      <div :style="'width:' + titleWidth"></div>
      <div class="flex_row warning" style='margin-left: 20px;'><i class="el-icon-warning"/> 输入格式有误</div>
    </div>
  </div>
</template>

<script>
  import Verify from 'asset/js/reg.js'
  import {color} from 'asset/js/theme.js'
  export default {
    data() {
      return {
        length: 99,  // 输入最大长度
        bank: false,  // 输入框是否为空
        mistake: false,  // 格式是否正确
        flu: false,   // 抖动动画
      }
    },
    props: {  // 从父组件接受的参数
      title: {  // 标题
        type: String,
        default: ''
      },
      titleWidth: {  // 标题宽度，不写自适应
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      Data: { // 父组件数据，必需，用对象可以使子组件操作父组件的数据,内含两个属性，form(父组件的表单数据对象),name(本次要操作form里的属性名)
        type: Object,
        required: true
      },
      size: {  // 输入框尺寸 不输/乱写, medium,small,mini 四种大小
        type: String,
        default: ''
      },
      type: {   // 输入的数据的类型,账号user，密码password，数字number，电话号码tel，邮件email,多行输入框textarea
        type: String,
        default: ''
      },
      autosize: {  // 输入为多行输入时最大最下行数,ex:{minRow:4,maxRow:10}
        type: Object,
        default() {
          return {minRows:4,maxRows:10}
        }
      },
      disabled: {  // 是否禁用输入框
        type: Boolean,
        default: false
      },
      maxlength: {  // 输入最大长度
        type: String,
        default: '300'
      },
      required:{  // 该项输入框是否必填
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: color
      }
    },
    created() {
      this.length = parseInt(this.maxlength)
      console.log(this.length)
      console.log(this.maxlength)
    },
    computed:{
      check() {  // 自动检测输入是否为空
        return this.$store.getters.getAutoCheck
      }
    },
    watch:{
      check(newVal,oldVal){
        if(this.required && !this.Data.form[this.Data.name]){
          this.bank = true
          this.$options.methods.startFlu(this)
        }
      }
    },
    methods: {
      /*验证输入长度*/
      input(e) {
        if(this.type === 'tel')  // 若为手机号类型最大长度不超过11
          if(e.length > 11)
            this.Data.form[this.Data.name]=e.slice(0,11)
        if(e.length > this.length)  // 当类型为number时maxlength失效，手动限制长度
          this.Data.form[this.Data.name]=e.slice(0,this.length)
      },
      /*验证输入格式*/
      blur() {
        if(this.Data.form[this.Data.name]){  // 输入是否为空
          this.bank = false
        }else{
          this.mistake = false
          this.bank = true
          this.$options.methods.startFlu(this)
        }
        if(!this.bank){  // 不空判断格式
          if(this.type === 'tel'){
            if(!Verify.isPhone(this.Data.form[this.Data.name])){  // 电话格式是否正确
              this.mistake = true
              this.$options.methods.startFlu(this)
              return
            }
          }else if(this.type === 'email'){
            if(!Verify.isEmail(this.Data.form[this.Data.name])){  // 邮件格式是否正确
              this.mistake = true
              this.$options.methods.startFlu(this)
              return
            }
          }
          this.mistake = false

        }
      },
      startFlu(that) { // 开启抖动
        that.flu = true
        setTimeout(() => {
          that.flu = false
        },200)
      },
    },
  }
</script>

<style scoped>
  #Input{
    width: 100%;
  }
  .input{
    flex: auto;
  }
  .warning{
    color: red;
  }
</style>
