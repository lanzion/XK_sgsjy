<template>
    <div v-show="param.totalNum > 0" id="pagination">
        <div class="block">
            <el-pagination :layout="layout" :total="param.totalNum" :current-page.sync="param.pageNum" :page-sizes="[10,15, 20, 50, 100,200]" :page-size.sync="param.pageSize" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        'param': {
            type: Object,
            default() {
                return {totalNum: 0, pageSize: 10, pageNum: 1}
            }
        },
        layout: {
            type: String,
            default() {
                return 'total, sizes, prev, pager, next'
            }
        },
        changePage: Function, // 父组件获取数据的方法
        changeSize: Function // 父组件获取数据的方法
    },
    methods: {
        handleCurrentChange(val) {
            this.param.pageNum = val
            this.changePage != undefined ? this.changePage(val) : false
        },
        handleSizeChange(val) {
            this.param.pageSize = val
            this.changeSize != undefined ? this.changeSize(val) : false
        }
    },
}
</script>

<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .el-pager {
            li {
                &:hover {
                    color: $color-value;
                }
                &.active {
                    background-color: $color-value;
                    border-color: $color-value;
                    color: #fff;
                }
            }
        }
        .el-pagination button:hover {
            color: $color-value;
        }
    }
}
</style>
<style lang='scss' scoped>
#pagination {
    width: 100%;
    margin: 20px auto;
    text-align: right;
}
</style>
