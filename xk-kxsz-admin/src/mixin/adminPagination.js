export const setPage = {
    data() {
        return {
            pageParam: {
                pageNum: 1,
                pageSize: parseInt(localStorage.getItem('XK-MAKER__ADMIN_PS')) || 15
            },
        }
    },
    mounted() {

    },
    methods: {
        // 分页改变
        setPageNum(pageNum) {
            this.$set(this.pageParam, 'pageNum', Number(pageNum))
        },
        setPageSize(pageSize) {
            this.$set(this.pageParam, 'pageSize', Number(pageSize))
            localStorage.setItem('XK-MAKER__ADMIN_PS', pageSize)
        },
    }
}