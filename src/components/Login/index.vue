<!-- 登录界面 -->
<!-- 所需依赖:elementui
     使用: <Login @login='function (){}'>
     函数返回值: data:{name:String,password:String}
-->
<template>
  <div id="Login" class="flex_center">
    <div class="flex_col_center" style="width: 100%;align-items: center;">
      <div class="titleIcon flex_center" style="margin-top: -100px;">
        <div class="titleIcon2 flex_center">
          <img class="image" src="./img/group.png" />
        </div>
      </div>
      <div class="BigTitle" style="margin-top: 60px;margin-bottom: 30px;">用户登录</div>
      <div class="flex_col wrapper" style="align-items: center;">
          <Input :Data='{form:form,name:"name"}' placeholder='用户名' type='user' style='width: 80%;margin: 30px 0;'/>
          <Input :Data='{form:form,name:"password"}' placeholder='密码' type='password' style='width: 80%'/>
          <el-button class="submit" @click='login' :style="{backgroundColor:color,width:'80%'}">LOGIN</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Input from '~/Input/index'
  export default {
    data() {
      return {
        form: {
          name: '',  // 账号
          password:'', // 密码
        },
        color: '#F36',  // 按钮颜色
      }
    },
    props: {
    },
    mounted() {
    },
    methods: {
      login() {  // 点击登录按钮向父组件传递账号密码
        if(this.form.name && this.form.password){
          this.$emit('login',this.form)
        }else{
          this.$message.error('请输入账号和密码')
        }
      }
    },
    components:{Input}
  }
</script>

<style lang="scss" scoped>
  #Login{
    background-image: url(./img/background.jpg);
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-position:center;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 100;

    .titleIcon{
      width: 130px;
      height: 130px;
      background: white;
      transform: rotate(45deg);
      .titleIcon2{
        width: 110px;
        height: 110px;
        border: 1px solid #F36;

        .image{
          color: #F36;
          width: 60px;
          height: 60px;
          transform: rotate(-45deg);
        }
      }
    }
    .BigTitle{
      font-size: 20px;
      color: #008B8B;
      font-weight: 700;
    }
    .wrapper{
      width: 32%;
      background: white;
      padding: 20px 15px;
      border-radius: 5px;
      .submit{
        color: white;
        font-size: 18px;
        font-weight: 700;
        margin: 30px 0;
      }
    }
  }
</style>
