<template>
  <div id="demo" style="background: white;">
    防抖节流:<br />
    <div class="button">
      <Button class type="success" size="mini" icon="my-icon-arrow-left" @click="debounce">
        防抖
        <i class="my-icon-arrow-right" />
      </Button>
      <el-button type="peimary" icon="my-icon-arrow-left" size="mini" @click="throttle">
        节流
        <i class="my-icon-arrow-right" />
      </el-button>
    </div>
    <br />Button:<br />
    <div class="button">
      <Button type="primary" size="mini" round>我</Button>
      <Button type="danger" size="smaller">我</Button>
      <Button>我</Button>
      <Button circle size="mini">我</Button>
      <br />
      <el-button type="primary" size="mini" round>我</el-button>
      <el-button type="danger" size="small">我</el-button>
      <el-button>我</el-button>
      <el-button circle size="mini">我</el-button>
    </div>
    <br />ButtonGroup:<br />
    <div class="buttonGroup">
      <ButtonGroup>
        <Button type="primary" round>我</Button>
        <Button type="danger">我</Button>
        <Button>我</Button>
        <Button type="success">我</Button>
      </ButtonGroup>
      <el-button-group>
        <el-button type="primary" round>我</el-button>
        <el-button type="danger">我</el-button>
        <el-button>我</el-button>
        <el-button type="success">我</el-button>
      </el-button-group>
    </div>
    <br />link:<br />
    <div class="A">
      <A icon="my-icon-arrow-left">中文sdf</A>
      <el-link>中文asf</el-link>
    </div>
    <br />radio:<br />
    <div class="radio" style="margin-left:10px">
      <Radio v-model="radioValue" label="1"></Radio>
      <Radio v-model="radioValue" label="2" border size='mini'>我是2</Radio>
      <Radio v-model="radioValue" label="3" button></Radio>
      <Radio v-model="radioValue" label="3" button disabled></Radio>
      <Radio v-model="radioValue" label="3" border disabled></Radio>
      <br/>
      <el-radio v-model="radioValue" label="1"></el-radio>
      <el-radio v-model="radioValue" label="2" border size="mini">我是2</el-radio>
      <el-radio v-model="radioValue" label="1" disabled border></el-radio>
      <br/>
      原生写法:
      <label>
        <input id="jj" type="radio" value="2" v-model="radioValue" />
        sdafasdf
      </label>
    </div>
    <br/>RadioGroup:<br/>
    <div style="margin-left:10px">
      <RadioGroup size="" v-model="radioValue">
        <Radio label="1" button></Radio>
        <Radio label="2" button></Radio>
        <Radio label="3" button></Radio>
      </RadioGroup>
      <br/><br/>
      <el-radio-group v-model="radioValue">
        <el-radio-button label="1"></el-radio-button>
        <el-radio-button label="2"></el-radio-button>
        <el-radio-button label="3"></el-radio-button>
      </el-radio-group>
    </div>
    <Input v-model="dd" :bmd='cell' />
    <!-- <el-input v-model="dd" type="number" max='32' step="2" autofocus></el-input> -->
    <input v-model="dd" type="number"  @compositionstart="ccd"
        @compositionupdate="cca"
        @compositionend="ccw"/>
  </div>
</template>

<script>
import { Button, ButtonGroup, A, Radio, RadioGroup,Input } from "@/common/index.js";
import { _debounce, _throttle } from "@/utils/de-tro";
export default {
  name: "ffu",
  componentName: "fu",
  data() {
    return {
      cell: [1, 2, 3, 4, 5],
      cc: true, // b   dasfas
      radioValue: "4",
      dd: "<div>sb</div>",
      asd: {
        dsa: {
          cc: 3
        }
      }
    };
  },
  props: {},
  mounted() {},
  watch: {},
  methods: {
    debounce: _debounce(() => {
      console.log("qer");
    }, 1000),
    throttle: _throttle(() => {
      console.log("asd");
    }, 1000),
    ccd(){
      console.log('d');
    },
    cca(){
      console.log('a');
    },
    ccw(){
      console.log('w');
    }
  },
  components: { Button, ButtonGroup, A, Radio, RadioGroup, Input }
};
</script>

<style lang="scss" scoped>
#demo {
  font-size: 14px;
}
</style>
