<template>
	<section id="person_resource">
        <span class="upload-btn" v-popover:popover><i class="icon-btn-add-circle"></i> 个人资源库</span>
        <el-popover
            ref="popover"
            placement="bottom"
            width="600"
            v-model="showPopover">
            <div class="content clearfix">
                <header class="head-tit">个人资源库</header>
                <div class="search-box">
                    <v-search class="fr" @search="setKeyWords"></v-search>
                </div>
                <section class="table-box">
                    <el-table
                        ref="multipleTable"
                        :data="datas"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="资源名称" width="120" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column prop="type" label="资源分类" width="120">
                        </el-table-column>
                        <el-table-column prop="address" label="上传时间">
                            <template slot-scope="scope">
                                {{scope.row.time | dateFormat('yyyy-MM-dd')}}
                            </template>
                        </el-table-column>
                         <el-table-column prop="size" label="大小" width="80">
                            <template slot-scope="scope">
                                {{scope.row.size}}KB
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
            </div>
            <div class="btn-group clearfix">
                <a class="reply_btn reply_btn1" @click="showPopover = false">确定</a>
                <a class="reply_btn reply_btn2" @click="showPopover = false">取消</a>
            </div>
        </el-popover>
    </section>
</template>

<script>
    import search from 'Common/search.vue'
    export default {
        name:'person_resource',
        components:{
            'v-search':search
        },
        data(){
            return{
                showPopover:false,
                datas:[
                    { name:'准备项目材料',type:'手工创造',time:'1500965222000',size:'100KB' },
                    { name:'准备项目材料',type:'手工创造',time:'1500965222000',size:'100KB' }
                ],
                name:''
            }
        },
        props:{
            dialog:{
                type:Object,
                default(){
                    return {
                        show:false
                    }
                }
            }
        },
        methods:{
            /*设置关键词*/
            setKeyWords (str) {
                this.name = str
            },
            handleSelectionChange(val) {
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .buttonGroup {
                .reply_btn1 {
                    background-color: $color-value;
                }
                .reply_btn2 {
                    border: 1px solid $color-value;
                    color: $color-value;
                }
            }
        }
    }
    *{
        box-sizing:border-box;
    }
    .upload-btn{
        width: 96px;
        height: 38px;
        line-height: 38px;
        border:1px solid #ccc;
        padding: 8px;
        margin-right: 15px;
        i{
            font-size: 14px;
            color: $theme_color;
        }
    }
</style>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
.person_resource {
    .el-dialog{
        min-width: 600px;
    }
    .el-dialog__body {
        padding: 0;
    }
    .el-popover{
        .btn-group {
            height: 30px;
            text-align: right;
            padding: 0 10px 10px;
            .reply_btn {
                border:1px solid $theme_color;
                display: inline-block;
                width: 62px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                box-sizing: border-box;
            }
            .reply_btn1 {
                color: #fff;
                background-color: $theme_color;
                margin-right: 10px;
            }
            .reply_btn2 {
                color: $theme_color;
                margin-top: 2px;
            }
        }
        .content{
            width: 100%;
        }
    }
}
</style>