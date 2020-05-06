<template>
  <div id="demo" style="background: white;">
    <div class="button">
      <Button class type="success" size='mini' icon="my-icon-arrow-left">我</Button>
      <i class="my-icon-arrow-left" />
      <Radio v-model="radioValue" size='mini' label="1" border></Radio>
      <el-button type="peimary" icon="my-icon-arrow-left" size="mini">我</el-button>
    </div>
    <div class="buttonGroup">
      <ButtonGroup style="margin:20px">
        <Button type="primary">我</Button>
        <Button type="primary">我</Button>
        <Button>我</Button>
      </ButtonGroup>
      <el-button-group round>
        <el-button round>我</el-button>
        <el-button type="danger">我</el-button>
        <el-button type="danger">我</el-button>
      </el-button-group>
    </div>
    <div class="A">
      <A icon="my-icon-arrow-left">中文sdf</A>
      <el-link>中文asf</el-link>
    </div>
    <div class="radio" style="margin-left:10px">
      <Radio v-model="radioValue" label="1" border disabled button></Radio>
      <Radio v-model="radioValue" label="2" border size='small' button>ww</Radio>
      <label>
        <input id="jj" type="radio" value="2" v-model="radioValue" />
        sdafasdf
      </label>
      <el-radio v-model="radioValue" label="3" border disabled  size="mini"></el-radio>
      <el-radio v-model="radioValue" label="4" border ></el-radio>
      <el-radio v-model="radioValue" label="1" disabled border></el-radio>
    </div>
  </div>
</template>

<script>
import { Button, ButtonGroup, A, Radio } from "@/common/index.js";
export default {
  name: 'ffu',
  componentName: 'fu',
  cc: 'asdf',
  data() {
    return {
      cc: true, // b   dasfas
      radioValue: "1",
      dd: "<div>sb</div>"
    };
  },
  props: {},
  mounted() {
  },
  watch: {
    radioValue(newval, oldval) {
      console.log(newval);
    }
  },
  methods: {
  },
  components: { Button, ButtonGroup, A, Radio }
};
</script>

<style lang="scss" scoped>
</style>
