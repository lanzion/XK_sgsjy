<template>
    <el-dialog title="参赛记录" :visible.sync="visible.show">
        <div class="compete_record">
            <div class="table-box">
                <el-table class="data-table back-stage-table" border :data="recordList" style="width: 100%">
                    <el-table-column prop="phaseName" label="赛程" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="score" label="最终评分" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
            <div class="btn-box">
                <button type="button" class="comfire-btn" @click="close">关闭</button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            close() {
                this.visible.show = false
            }
        },
        props: {
            visible: {
                type: Object,
                default() {
                    return { show: false }
                }
            },
            recordList: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .compete_record {
        padding: 10px 0px;
    }
    .btn-box {
        text-align: right;
        margin-top: 20px;
        button {
            width: 63px;
            height: 30px;
            box-sizing: border-box;
            border: none;
            border-radius: 3px;
            margin-left: 10px;
        }
    }
    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .btn-box {
                .comfire-btn {
                    background-color: $color-value;
                    color: #fff;
                    &:hover {
                        opacity: 0.75;
                    }
                }
                .cancel-btn {
                    border: 1px solid $color-value;
                    color: $color-value;
                    &:hover {
                        color: #fff;
                        background-color: $color-value;
                    }
                }
            }
        }
    }
</style>