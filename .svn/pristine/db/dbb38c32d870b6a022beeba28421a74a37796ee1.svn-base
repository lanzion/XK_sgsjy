<template>
    <div id="faq" class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search" placeholder="请输入问题" @keyup.native.enter="changePage(1)"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            add: openDialog
        }"></v-admin-operate>
        <!-- 项目列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column label="问题" show-overflow-tooltip prop="name"></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id' }, callback: openDialog },
                        del: delFaq
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog :visible.sync="visible.show" class="faq-dialog" @close="close" title="常见问题">
            <section class="form-box">
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <!-- 问题描述 -->
                    <el-row>
                        <el-form-item label="问题描述" prop="name">
                            <el-col :span="24">
                                <el-input type="textarea" :maxlength="300" placeholder="请输入问题描述，最多300字符" v-model="form.name"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <!-- 问题解答 -->
                    <el-row>
                        <el-form-item label="问题解答" prop="contentTxt">
                            <el-col :span="24">
                                <el-input v-model="form.contentTxt" v-show="false"></el-input>
                                <div id="editor-trigger" style="height: 200px"></div>
                            </el-col>
                            <div style="position:absolute;font-size:12px;bottom:-27px;color:#d00;" v-if="isTooMuch">
                                输入内容过多
                            </div>
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
    import { editor } from '@/mixin/wangEditor.js'
    import delPopover from '@/components/common/del_popover.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import {
        addfaq,
        requestFaqList,
        requestFaqDetail,
        modifyFaq,
        deleteFaq } from '@/service/admin_configure.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import { mapState } from 'Vuex'
    export default {
        name: 'systemFaq',
        components: {
            'v-pagination': pagination,
            'del-popover': delPopover,
            'v-admin-operate': adminOperate
        },
        mixins: [subPermission, editor, setPage],
        data() {
            return {
                visible:{
                    show:false
                },
                isDropdown: false,
                search: '',
                items: [],
                form:{
                    name:'',
                    contentTxt:'',
                    content:''
                },
                rules:{
                    name:[
                        { required: true, message: '请输入问题描述', trigger: 'blur' }
                    ],
                    contentTxt:[
                        { required: true, message: '请输入问题解答', trigger: 'blur' }
                    ]
                },
                curId:'',                    //当前操作的id
                curIndex:0,                  //当前操作的行数
                id:'',                        //查看详情id
                isTooMuch: false,
                flag: true
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let param = {
                    name: this.search  // 问题关键字
                }
                requestFaqList( param, this.pageParam ).then(res => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum);
                    }
                })
            },
            // 获取问题详情
            getFaqDetail(id) {
                requestFaqDetail({id:id}).then((res) => {
                    if(res.data.code === 200){
                        let detail = res.data.entity;
                        this.form.name = detail.name;
                        this.form.content = detail.content;
                        this.editor.$txt.html(detail.content);
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
            // 打开弹窗
            openDialog ({data = {}} = {data}) {
                console.log(data)
                this.id = data.id || '';
                this.visible.show = true;
            },
            // 关闭弹窗重置表单
            close(){
                this.$refs['form'].resetFields();
                this.editor.$txt.html('');
                this.id = '';
            },
            cancel(){
                this.visible.show = false;
                this.$refs['form'].resetFields();
                this.editor.$txt.html('');
                this.id = '';
            },
            //提交问题
            submit(){
                this.$refs['form'].validate((valid) => {
                    if(valid){
                        let params = {
                            name: this.form.name,
                            content: this.form.content
                        }
                        if(this.id === ''){
                            addfaq(params).then((res) => {
                                if(res.data.code === 200){
                                    this.showMessage('success','新增成功');
                                    this.$refs['form'].resetFields();
                                    this.editor.$txt.html('<p><br></p>');
                                    this.getData();
                                    this.id = '';
                                    this.visible.show = false;
                                }else{
                                    this.showMessage('error',res.data.msg)
                                }
                            })
                        }else{
                            this.$set(params,'id',this.id);
                            modifyFaq(params).then((res) => {
                                if(res.data.code === 200){
                                    this.showMessage('success','修改成功');
                                    this.$refs['form'].resetFields();
                                    this.editor.$txt.html('<p><br></p>');
                                    this.getData();
                                    this.id = '';
                                    this.visible.show = false;
                                }else{
                                    this.showMessage('error',res.data.msg)
                                }
                            })
                        }
                    }
                })
            },
            //删除问题
            delFaq ({data = {}, index} = {data, index}) {
                this.$confirm(`确定要删除该问题吗？`, '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    deleteFaq({id: data.id}).then(res => {
                        if(res.data.code === 200) {
                            this.showMessage('success','删除成功')
                            this.items.splice(index, 1)
                        }else{
                            this.showMessage('warning', res.data.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: `取消操作` })
                })
            }
        },
        watch: {
            'visible.show':{
                handler:function(val,oldVal){
                    if(val) {
                        var self = this;
                        window.setTimeout(function() {
                            if(self.flag) {
                                self.initEditor()
                                self.editor.onchange = function() {
                                    self.form.contentTxt = this.$txt.text();
                                    self.form.content = this.$txt.html();
                                }
                                self.flag = false
                            } else {
                                self.editor.undestroy()
                            }
                            if(self.id !== '') {
                                self.getFaqDetail(self.id)
                            }

                        }, 0);
                        $('#editor-trigger').css('height','200px')
                    } else {
                        this.editor.destroy();
                    }
                },
                deep:true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/asset/scss/vars.scss';
    .operate-btn{
        color: #2797ed;
    }
    .faq-dialog{
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
            .faq-dialog{
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
    #faq{
        .el-dialog{
            width: 900px;
        }
    }
    .faq-dialog{
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

