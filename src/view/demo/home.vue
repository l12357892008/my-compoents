<template>
  <div id="">
    <div class="login-form">
    			<div class="top-login">
    				<span><img src="images/group.png" alt=""></span>
    			</div>
    			<h1>登录</h1>
    			<div class="login-top">
    			<form>
    				<div class="login-ic">
    					<i></i>
    					<input type="text" value="用户" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'User name';}">
    					<div class="clear"> </div>
    				</div>
    				<div class="login-ic">
    					<i class="icon"></i>
    					<input type="password" value="密码" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'password';}">
    					<div class="clear"> </div>
    				</div>

    				<div class="log-bwn">
    					<input type="submit" value="Login">
    				</div>
    				</form>
    			</div>
    			<p class="copy">© 2016 xxxxxxxxxxx</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
    },
    mounted() {
    },
    methods: {
    },
    components: {
    },
  }
</script>

<style scoped>
</style>
