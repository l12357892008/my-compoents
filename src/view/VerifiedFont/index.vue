<template>
  <div id='VerifiedFontPage' class="flex_center">
    <div class="flex_row_middle">
      <VerifiedFont :text='text'/>
      <i class='my-icon-refresh-right' @click="re" style="margin-left: 20px;"/>
    </div>
  </div>
</template>

<script>
  import VerifiedFont from '@/components/VerifiedFont'
  export default {
    data() {
      return {
        cc: '',
        ww: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        text: 'cbfd'
      }
    },
    methods: {
      re(){
        let a = []
        for(let i=0;i < 4;i++){
          let j = this.random(0,this.ww.length)
          a.push(this.ww[j])
        }
        a = a.join('')
        this.text = a
      },
      random(min, max){  // 返回一个在区间[min,max)之间的随机整数
        return Math.floor(Math.random() * (max - min) + min);
      },
    },
    components:{
      VerifiedFont
    }
  }
</script>

<style lang="scss" scoped>
</style>
