<template>
    <div class="backend-content__middle">
        <el-form :inline="true" :model="search" class="option-box clearfix">
            <el-form-item label="反馈内容">
                <el-input class="bs-search-input" v-model="search.content" @keyup.native.enter="changePage(1)" placeholder="请输入反馈内容"></el-input>
            </el-form-item>
            <el-form-item label="处理状态">
                <el-select v-model="search.replyStatus" placeholder="请选择处理状态" clearable>
                    <el-option v-for="item in handleStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <button type="button" class="bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            </el-form-item>
        </el-form>
        <!-- 反馈列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column label="反馈邮箱" show-overflow-tooltip prop="mail"></el-table-column>
            <el-table-column label="反馈内容" show-overflow-tooltip prop="content"></el-table-column>
            <el-table-column label="反馈人" show-overflow-tooltip prop="userName">
                <template scope="scope">
                    {{scope.row.userName || '匿名'}}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="反馈时间" sortable show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.createTime | dateFormat('yyyy.MM.dd HH:mm')}}
                </template>
            </el-table-column>
            <el-table-column label="处理状态" show-overflow-tooltip>
                <template scope="scope">
                    {{replyStatus[scope.row.replyStatus]}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        reply: { callback: doToggle, isActive: isVerified }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog :visible.sync="visible.show" class="feedback-dialog" @close="close" title="反馈回复">
            <section class="form-box">
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <!-- 反馈回复 -->
                    <el-row>
                        <el-form-item label="反馈回复" prop="replyContent">
                            <el-col :span="20">
                                <el-input type="textarea" :maxlength="200" placeholder="请输入反馈回复，最多200字符" v-model="form.replyContent"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                </el-form>
            </section>
            <div class="buttonGroup clearfix">
                <a class="btn cancel-btn" @click="cancel">取消</a>
                <a class="btn confirm-btn" @click="submit">提交</a>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { feedbackList, replyFeedback, reportFunc } from '@/service/admin_system.js'
    import adminOperate from '@/components/common/operate.vue'
    import { mapState } from 'Vuex'
    export default {
        name: 'systemFeedback',
        components: {
            'v-pagination': pagination,
            'v-admin-operate': adminOperate
        },
        mixins: [subPermission, setPage],
        data() {
            return {
                visible:{
                    show:false
                },
                screeningDropdown: false,
                replyStatus: {
                    '0':'未回复',
                    '1':'已回复'
                },
                handleStatus: [
                    { label: '未处理', value: 0 },
                    { label: '已处理', value: 1 }
                ],
                search: {
                    content: '',
                    replyStatus: ''
                },
                items: [],
                checkedItems: [],
                form:{
                    replyContent:''
                },
                rules:{
                    replyContent:[
                        { required: true, message: '请输入回复内容', trigger: 'blur' }
                    ]
                },
                curId:'',                    //当前操作的id
                curIndex:0                   //当前操作的行数
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                feedbackList(this.search, this.pageParam).then(res => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum);
                    }
                })
            },
            // 改变分页
            changePage(val) {
                this.setPageNum(val)
                this.getData()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.getData()
            },
            // 打开回复弹窗
            doToggle ({data: item, model, index} = {data, model, index}) {
                this.curIndex = index;
                this.curId = item.id;
                this.visible.show = true;
            },
            // 判断是否已回复,返回false表示已回复,反之亦然
            isVerified(item) {
                let flag = item.replyStatus === 0
                return flag
            },
            // 关闭弹窗重置表单
            close(){
                this.$refs['form'].resetFields();
            },
            cancel(){
                this.visible.show = false;
                this.$refs['form'].resetFields();
            },
            //提交反馈
            submit(){
                this.$refs['form'].validate((valid) => {
                    if(valid){
                        let params = Object.assign({},this.form);
                        this.$set(params,'replyStatus',1);
                        this.$set(params,'id',this.curId);
                        replyFeedback(params).then((res) => {
                            if(res.data.code === 200){
                                this.showMessage('success','回复成功');
                                this.$refs['form'].resetFields();
                                this.$set(this.items[this.curIndex],'replyStatus',1);
                                this.visible.show = false;
                            }else{
                                this.showMessage('error',res.data.msg)
                            }
                        })
                    }
                })
            },
            // 重置搜索表单
            resetSearchForm() {
                this.search = Object.assign({}, this._search, {name: this.search.userName})
                this.screeningDropdown = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .feedback-dialog{
        .form-box{
            padding: 15px;
        }
        .buttonGroup{
            text-align: right;
            padding: 5px 15px 30px;
            .btn{
                display: inline-block;
                border-radius: 3px;
                font-size: 12px;
            }
            .cancel-btn{
                padding: 7px 14px;
                margin-right: 10px;
            }
            .confirm-btn{
                padding: 8px 15px;
            }
        }
    }

    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .feedback-dialog{
                .buttonGroup{
                    .cancel-btn{
                        border:1px solid $color-value;
                        color: $color-value;
                        &:hover{
                            color: #fff;
                            background-color: $color-value;
                        }
                    }
                    .confirm-btn{
                        background: $color-value;
                        color: #fff;
                        &:hover{
                            opacity: 0.75;
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    #feedback{
        .el-dialog{
            width: 600px;
        }
    }
    .feedback-dialog{
        .el-dialog__body{
            padding: 0px;
        }
        .el-textarea__inner{
            height: 102px;
            border-radius: 4px;
        }
        .el-input__inner{
            height: 38px;
            border-radius: 3px;
        }
    }
</style>

