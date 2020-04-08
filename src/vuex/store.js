/**
 * @description  cnpm i vuex -S
 **/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {  //这里放全局参数,获取ex: this.$store.state.autoCheck,一般使用getters来获取
  autoCheck: true,  // 表单提交时转换该值，输入组件监听根据需要自动检测输入是否为空
}
const getters = {  // 获取函数,ex: this.$store.getter.getAutoCheck
  getAutoCheck: state => { // 方便统一对返回值做一些处理
    return state.autoCheck
  },
}
const mutations = {  //这里是set方法,ex:this.$store.commit('changAutoCheck',value)
  changAutoCheck(state,value){
    state.autoCheck = value
  }
}
const actions = {         //异步修改数据仓库,ex: this.$store.dispatch('setAutoCheck',value)
  setAutoCheck(context,value){
    context.commit('changAutoCheck',value)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
