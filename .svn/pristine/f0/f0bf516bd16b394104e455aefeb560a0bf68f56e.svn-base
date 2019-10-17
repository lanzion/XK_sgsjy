<template>
    <div v-show="param.totalNum > 0" id="pagination">
        <div class="block">
            <el-pagination  layout="prev, pager, next, jumper" :total="param.totalNum" :current-page="param.pageNum" @current-change="handleCurrentChange" :page-size="param.pageSize"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        param: {
            type: Object,
            default() {
                return { totalNum: 0, pageSize: 10, pageNum: 1 }
            }
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.param.pageNum = val
            this.$emit('callback', val)
        }
    },
}
</script>

<style lang='scss' scoped>
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
