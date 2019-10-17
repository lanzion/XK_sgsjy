<template>
    <div v-show="param.totalNum > 0" id="pagination">
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="param.totalNum" :current-page="param.pageNum" @current-change="handleCurrentChange" :page-size="param.pageSize"></el-pagination>
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
                return { totalNum: 0, pageSize: 10, pageNum: 1 }
            }
        },
        changePage: Function // 父组件获取数据的方法
    },
    methods: {
        handleCurrentChange (val){
            this.param.pageNum = val
            this.changePage != undefined ? this.changePage(val) : false
        }
    },
}
</script>

<style lang='scss'>
@import './../../asset/scss/vars.scss';
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
