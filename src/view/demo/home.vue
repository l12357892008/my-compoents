<template>
  <div id="demo" style="background: white;">
    dsafsdf
    <span class="ss">asdfas</span>
    <span class="ss-ss">asdfas</span>
    <Button class="" type="success" icon='my-icon-arrow-left'>我</Button>
    <i class="my-icon-arrow-left"/>
    <el-button type="peimary">我</el-button>
    <ButtonGroup style="margin:50px">
      <Button type="primary">我</Button>
      <Button type="primary">我</Button>
      <Button>我</Button>
    </ButtonGroup>
    <el-button-group round>
      <el-button round>我</el-button>
      <el-button type="danger">我</el-button>
      <el-button type='danger'>我</el-button>
    </el-button-group>
    <A>链接</A>
  </div>
</template>

<script>
import { Button,ButtonGroup,A } from "@/common/index.js";
export default {
  data() {
    return {
      cc: true, // b   dasfas

      dd: '<div>sb</div>'
    };
  },
  props: {},
  mounted() {},
  methods: {},
  components: { Button,ButtonGroup,A }
};
</script>

<style lang="scss" scoped>
</style>
