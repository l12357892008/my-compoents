/**
 * @description 分页配置信息
 */
export default {
    data() {
        return {
            fetchFnName: 'getList',   // 加载列表数据方法名称（组件内部如有不同 可替换）,换页后调用的重新获取类别的方法
            page: {
                sizes: [20, 50, 100],
                size: 20,
                page: 1,
                total: 0,
            }
        }
    },
    watch: {
        ['page.total'](value) {
            switch (true) {
                case value < 20:
                    this.page.sizes = [20]
                    break
                case value < 50:
                    this.page.sizes = [20, 50]
                    break
                case value < 100:
                    this.page.sizes = [20, 50, 100]
                    break
                default:
                    this.page.sizes = [20, 50, 100]
            }
        },
    },
    methods: {
        // 切换每页条数
        handleSizeChange(val) {
            this.page.size = val
            this.page.page = 1
            this[this.fetchFnName]
        },
        // 页码切换
        handleCurrentChange(val) {
            this.page.page = val
            this[this.fetchFnName]
        },
    },
}
