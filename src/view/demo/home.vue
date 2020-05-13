<template>
  <div id="demo" style="background: white;">
    <div class="button">
      <Button class type="success" size="mini" icon="my-icon-arrow-left" @click="debounce">防抖</Button>
      <i class="my-icon-arrow-left" />
      <Radio v-model="radioValue" size="mini" label="1" border></Radio>
      <el-button type="peimary" icon="my-icon-arrow-left" size="mini" @click="throttle">节流</el-button>
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
      <RadioGroup v-model="radioValue">
        <Radio label="2" border size="small" button>ww</Radio>
        <Radio label="3" border size="small" button>ww</Radio>
      </RadioGroup>
      <label>
        <input id="jj" type="radio" value="2" v-model="radioValue" />
        sdafasdf
      </label>
      <el-radio-group v-model="radioValue">
        <el-radio-button label="3"></el-radio-button>
        <el-radio-button label="4"></el-radio-button>
      </el-radio-group>
      <el-radio v-model="radioValue" label="1" disabled border></el-radio>
    </div>
  </div>
</template>

<script>
import { Button, ButtonGroup, A, Radio, RadioGroup } from "@/common/index.js";
import {_debounce,_throttle} from "@/utils/de-tro";
export default {
  name: "ffu",
  componentName: "fu",
  cc: "asdf",
  data() {
    return {
      cell: [1,2,3,4,5],
      cc: true, // b   dasfas
      radioValue: "1",
      dd: "<div>sb</div>",
      asd: {
        dsa: {
          cc: 3
        }
      }
    };
  },
  props: {},
  mounted() {
  },
  watch: {},
  methods: {
    debounce:_debounce(() => {
      console.log('qer');
    },1000),
    throttle:_throttle(() => {
      console.log('asd');
    },1000),
  },
  components: { Button, ButtonGroup, A, Radio, RadioGroup }
};
</script>

<style lang="scss" scoped>
</style>
