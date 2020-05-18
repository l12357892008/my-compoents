<!--
  describe:
  直接在路由中添加路径指向该文件
  {
    path: '/404',
    name: 'Error',
    component: () => import('@/common/pages/Error')
  }
-->
<template>
  <div id="Error" class="flex">
    <div class="head404"></div>
    <div class="txtbg404">
      <div class="txtbox">
        <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
        <p class="paddingbox">请点击以下链接继续浏览网页</p>
        <p @click="$router.go(-1)" style="cursor:pointer">》返回上一页面</p>
        <p @click="$router.replace('/')" style="cursor:pointer">》返回网站首页</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    created() {
      console.log(this.$route);
    }
  }
</script>

<style scoped>
  #Error{
    background: #494949;
    width: 100%;
    height: 100%;
  }
  .head404 {
    width: 580px;
    height: 234px;
    margin: 50px auto 0 auto;
    background: url(./img/head404.png) no-repeat;
  }

  .txtbg404 {
    width: 499px;
    height: 169px;
    margin: 10px auto 0 auto;
    background: url(./img/txtbg404.png) no-repeat;
  }

  .txtbg404 .txtbox {
    width: 390px;
    position: relative;
    top: 30px;
    left: 60px;
    color: #eee;
    font-size: 13px;
  }

  .txtbg404 .txtbox p {
    margin: 5px 0;
    line-height: 18px;
  }

  .txtbg404 .txtbox .paddingbox {
    padding-top: 15px;
  }

  .txtbg404 .txtbox p a {
    color: #eee;
    text-decoration: none;
  }

  .txtbg404 .txtbox p a:hover {
    color: #FC9D1D;
    text-decoration: underline;
  }
</style>
