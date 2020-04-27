<template>
  <div id="hello">
    <img class="cc" src="@/assets/logo.png" style="margin-top: 60px;"><br />
    <div class="titleIcon flex_center" style="margin-left: 200px;">
      <div class="titleIcon2 flex_center">
        <img class="image" src="./img/group.png" />
      </div>
    </div>
    <el-button class="hover_big" type='text' size='mini' @click='cc'>确定</el-button>
    <Input title='手机号11' :Data='{form:form,name:"ii"}' :titleWidth='title_width' type='tel' style='width: 600px' />
    <el-button-group>
      <el-button type='text' round>sdaf</el-button>
      <el-button type='primary' round>sdaf</el-button>
      <el-button type='primary' round>sdaf</el-button>
    </el-button-group>
    <Button @click="handleClick">dsaf</Button>
  </div>
</template>

<script>
  import Input from '~/Input/index.vue'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        title_width: '150px',
        autoCheck: true,
        form: {}
      }
    },
    created() {
    },
    methods: {
      cc() {
        this.$store.dispatch('setAutoCheck', !this.$store.state.autoCheck)
      },
      handleClick(e){
        alert(e.clientX)
      }
    },
    components: { Input }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #hello {
    /*总体字体大小*/
    font-size: 14px;
    background: yellow;
    flex: 1;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .cc {
    transform: rotate(45deg);
  }

  .titleIcon {
    width: 130px;
    height: 130px;
    background: white;
    transform: rotate(45deg);

    .titleIcon2 {
      width: 110px;
      height: 110px;
      border: 1px solid #F36;

      .image {
        color: #F36;
        width: 60px;
        height: 60px;
        transform: rotate(-45deg);
      }
    }
  }
</style>
