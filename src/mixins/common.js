/**
 * @description 通用属性和方法
 */
export default {
    methods: {
        goBack() { // 返回上一页
          this.$router.go(-1)
        }
    },
}
