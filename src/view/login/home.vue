<template>
  <div id="login">
    <Login @login='login'/>
  </div>
</template>

<script>
  import Login from '~/Login/index'
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
      login(data) {
        let _data = {
          name: data.name,
          password: data.password
        }
        // this.$post('',_data).then(res => {
        // })
      }
    },
    components:{Login}
  }
</script>

<style scoped>
</style>
