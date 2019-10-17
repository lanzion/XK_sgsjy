<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.account" @keyup.native.enter="changePage(1)" placeholder="请输入账号"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: doDel,
            lock: doLock,
            unlock: doLock,
            pwd: popupPwd
        }"></v-admin-operate>
        <!-- 平台管理员列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="account" label="账号" width="220" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" label="用户名" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lockStatus" label="状态" width="100" show-overflow-tooltip>
                <template scope="scope">
                    <el-switch v-model="scope.row.lockStatus" on-text="正常" off-text="锁定" on-value="0" off-value="1" :disabled="!switchBtnGroup.some(x => x.menuId==='lock')" @change="doLock({data: scope.row, model: scope.row.lockStatus==='1'?'lock':'unlock'})"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        del: doDel,
                        lock: { callback: doLock, isActive: isUnLocked },
                        unlock: { callback: doLock, isActive: isLocked },
                        pwd: popupPwd
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog class="dialog-audit" :visible.sync="pwdVisible" size="tiny" title="修改密码">
            <v-reset-pwd ref="resetPwd" :close="closeResetPwdDialog" @submit="doResetPwd"></v-reset-pwd>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'Vuex'
    import pagination from '@/components/common/admin_pagination.vue'
    import reset_pwd from '@/components/base/reset_pwd.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { managerLock } from '@/mixin/lockManager.js'
    import { requestBaseAdmin, delBaseAdmin, resetPwd } from '@/service/admin_base.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    import adminOperate from '@/components/common/operate.vue'
    export default {
        name: 'adminManage',
        mixins: [subPermission, managerLock, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-reset-pwd': reset_pwd
        },
        data() {
            return {
                search: {
                    account: '',
                },
                _search: {},
                items: [],
                checkedItems: [],            // 选中项
                pwdVisible: false,
                newPwd: null
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                lockStatusDL (state) {
                    let dicList = (state['lockStatusDicList'] || {}).dicList || []
                    return dicList
                },
            }),
            params: function() {
                return Object.assign( {}, this.search, this.pageParam )
            }
        },
        mounted() {
            this._search = Object.assign( {}, this.search )
            this.getData()
        },
        // watch:{
        //     params:{
        //         handler:function(val,oldVal){
        //             this.getData()
        //         },
        //         deep:true
        //     }
        // },
        methods: {
            /*
             * 获取平台管理员列表
             */
            getData() {
                requestBaseAdmin(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.showMessage('error',response.data.msg);
                    }
                })
            },
            // 平台管理员删除
            doDel({data:item} = {data}){
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('此操作将删除该平台管理员，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delBaseAdmin(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({message: '删除成功', type: 'success'})
                                this.getData()
                            } else {
                                this.$message.error({message: res.data.msg})
                            };
                            this.$refs.multipleTable.clearSelection();
                        })
                    }).catch(() => {});
                } else {
                    this.$message({ message: '请选择要删除的平台管理员' })
                }
            },
            // 锁定/解锁
            doLock({data: item, model} = {data, model}) {
                const flag = !!Object.keys(item).length
                if (flag) {
                    item.lockStatus = model === 'lock' ? '0' : '1'
                    item = [item]
                } else {
                    item = this.checkedItems
                }
                this.lockOperate({
                    item: item,
                    model: model,
                    identity: '平台管理员'
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
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
            /*
             * 修改密码
             * idList: []   // 账号数组
             * newPwd: ''   // 新密码
             */
            doResetPwd(form) {
                let items = this.checkedItems.length ? this.checkedItems : [this.curItem]
                let params = {
                    idList: [],
                    newPwd: form.newPwd
                };
                items.forEach(x => {
                    params.idList.push(x.account)
                });
                resetPwd(params).then(response => {
                    if(response.data.code == 200){
                        this.showMessage('success', '修改成功')
                        this.checkedItems = []
                        this.$refs.multipleTable.clearSelection()
                    }else{
                        this.showMessage('error', response.data.msg)
                    }
                })
                this.$refs.resetPwd.resetForm()
                this.closeResetPwdDialog()
            },
            popupPwd({data = {}, index} = {data, index}) {
                this.curIndex = index
                if (JSON.stringify(data) === '{}') {
                    if (this.checkedItems.length > 0) {
                        this.pwdVisible = true
                    } else {
                        this.showMessage('info', '请勾选要修改密码的平台管理员')
                    }
                } else {
                    this.pwdVisible = true
                    this.curItem = data
                }
            },
            closeResetPwdDialog() {
                this.pwdVisible = false
                this.$refs.resetPwd.resetForm()
            }
        }
    }
</script>
