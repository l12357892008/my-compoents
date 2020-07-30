<template>
  <div id="demo" style="background: white;">
    防抖节流:
    <br />
    <div class="button">
      <my-button class type="success" size="mini" icon="my-icon-arrow-left" @click="debounce">
        防抖
        <i class="my-icon-arrow-right" />
      </my-button>
      <el-button type="peimary" icon="my-icon-arrow-left" size="mini" @click="throttle">
        节流
        <i class="my-icon-arrow-right" />
      </el-button>
    </div>
    <br />my-button:
    <br />
    <div class="button">
      <my-button type="primary" size="mini" round>我</my-button>
      <my-button type="danger" size="smaller">我</my-button>
      <my-button>我</my-button>
      <my-button circle size="mini">我</my-button>
      <br />
      <el-button type="primary" size="mini" round>我</el-button>
      <el-button type="danger" size="small">我</el-button>
      <el-button>我</el-button>
      <el-button circle size="mini">我</el-button>
    </div>
    <br />my-button-group:
    <br />
    <div class="buttonGroup">
      <my-button-group>
        <my-button type="primary" round>我</my-button>
        <my-button type="danger">我</my-button>
        <my-button>我</my-button>
        <my-button type="success">我</my-button>
      </my-button-group>
      <el-button-group>
        <el-button type="primary" round>我</el-button>
        <el-button type="danger">我</el-button>
        <el-button>我</el-button>
        <el-button type="success">我</el-button>
      </el-button-group>
    </div>
    <br />link:
    <br />
    <div class="my-link">
      <my-link icon="my-icon-arrow-left">中文sdf</my-link>
      <el-link>中文asf</el-link>
    </div>
    <br />radio:
    <br />
    <div class="radio" style="margin-left:10px">
      <my-radio v-model="radioValue" label="1" cc="sdafads" @bb="cc"></my-radio>
      <my-radio v-model="radioValue" label="2" border size="mini">我是2</my-radio>
      <my-radio v-model="radioValue" label="3" button></my-radio>
      <my-radio v-model="radioValue" label="3" button disabled></my-radio>
      <my-radio v-model="radioValue" label="3" border disabled></my-radio>
      <br />
      <el-radio v-model="radioValue" label="1"></el-radio>
      <el-radio v-model="radioValue" label="2" border size="mini">我是2</el-radio>
      <el-radio v-model="radioValue" label="1" disabled border></el-radio>
      <br />原生写法:
      <label>
        <input id="jj" type="radio" value="2" v-model="radioValue" />
        sdafasdf
      </label>
    </div>
    <br />RadioGroup:
    <br />
    <div style="margin-left:10px">
      <my-radio-group size v-model="radioValue">
        <my-radio label="1" button></my-radio>
        <my-radio label="2" button></my-radio>
        <my-radio label="3" button></my-radio>
      </my-radio-group>
      <br />
      <el-radio-group v-model="radioValue">
        <el-radio-button label="1"></el-radio-button>
        <el-radio-button label="2"></el-radio-button>
        <el-radio-button label="3"></el-radio-button>
      </el-radio-group>
    </div>
    <br />Input:
    <br />
    <div style="margin-left:10px">
      <my-input
        ref='ddde'
        id="eee"
        v-model="dd"
        type="text"
        clearable
        showWordLimit
        :maxlength="30"
        prefix-icon="my-icon-search"
        suffix-icon="my-icon-date"
      >
        <template slot="prepend">
          <my-button>sadf</my-button>
        </template>
        <template slot="append">.com</template>
      </my-input>
      <br />
      <br />
      <el-input
        showWordLimit
        v-model="dd"
        type="text"
        :maxlength="30"
        prefix-icon="el-icon-search"
        suffix-icon="el-icon-date"
      >
        <i slot="suffix" class="el-input__icon el-icon-date"></i>
        <template slot="prepend">Http://</template>
        <template slot="append">.com</template>
      </el-input>
    </div>
    <br />InputNumber:
    <br />
    <div style="margin-left:10px">
      <my-input-number size='smaller' controls-position='right' v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></my-input-number>
      <el-input-number size='small' controls-position="right" v-model="num" :precision='4' :step="1.55" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    </div>
    <br />checkbox:
    <br />
    <div class="radio" style="margin-left:10px">
      <my-checkbox v-model="radioValue" label="1" cc="sdafads" @bb="cc"></my-checkbox>
      <my-checkbox v-model="radioValue" label="2" border size="mini">我是2</my-checkbox>
      <my-checkbox v-model="radioValue" label="3" button></my-checkbox>
      <my-checkbox v-model="radioValue" label="3" button disabled></my-checkbox>
      <my-checkbox v-model="radioValue" label="3" border disabled></my-checkbox>
      <br />
      <el-checkbox v-model="radioValue" label="1"></el-checkbox>
      <el-checkbox v-model="radioValue" label="2" border size="mini">我是2</el-checkbox>
      <el-checkbox v-model="radioValue" label="1" disabled border></el-checkbox>
      <br />原生写法:
      <label>
        <input id="jj" type="checkbox" value="2" v-model="radioValue" />
        sdafasdf
      </label>
    </div>
  </div>
</template>

<script>
import {
  MyButton,
  MyButtonGroup,
  MyCheckbox,
  MyLink,
  MyRadio,
  MyRadioGroup,
  MyInput,
  MyInputNumber
} from "@/common/index.js";
import { _debounce, _throttle } from "@/utils/de-tro";
export default {
  name: "ffu",
  componentName: "fu",
  data() {
    return {
      cell: [1, 2, 3, 4, 5],
      cc: true, // b   dasfas
      radioValue: "4",
      ew: 30,
      dd: "<div>sb</div>",
      num: 'sd',
      asd: {
        dsa: {
          cc: 3
        }
      }
    };
  },
  props: {},
  mounted() {
    let a = document.getElementById('eee')
    a.select();
  },
  watch: {},
  methods: {
    debounce: _debounce(() => {
      console.log("qer");
    }, 1000),
    throttle: _throttle(() => {
      console.log("asd");
    }, 1000),
    handleChange(){

    }
  },
  components: { MyButton,MyButtonGroup,MyCheckbox,MyLink,MyRadio,MyRadioGroup,MyInput,MyInputNumber }
};
</script>

<style lang="scss" scoped>
#demo {
  font-size: 14px;
  overflow: auto;
  position: relative;
}

#feee{
  background: blue;
  &::after{
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: blue;
  }
}
</style>
