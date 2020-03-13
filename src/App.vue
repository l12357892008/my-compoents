<template>
  <div id="app">
    <div class="flex_row_center">
      head
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods:{

  },

}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: skyblue;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
