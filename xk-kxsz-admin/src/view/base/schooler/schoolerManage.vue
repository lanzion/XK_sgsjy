<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.account" @keyup.native.enter="changePage(1)" placeholder="请输入账号"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button v-if="identity != 'school'" class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown = !screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="区域">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-select v-model="search.schoolId" placeholder="请选择学校" filterable clearable>
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: doDel,
            lock: doLock,
            unlock: doLock,
            pwd: popupPwd
        }"></v-admin-operate>
        <!-- 学校管理员列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="account" label="账号" width="220" sortable show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/base/schooler/detail', query: {id: scope.row.id} }">{{scope.row.account}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="provinceName" label="所在区域" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="所属学校" sortable show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column> -->
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
    import { requestBaseSchooler, delBaseSchooler, resetPwd } from '@/service/admin_base.js'
    import { requestSchoolList } from '@/service/common.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    import adminOperate from '@/components/common/operate.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    export default {
        name: 'schoolerManage',
        mixins: [subPermission, managerLock, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-region-select': region,
            'v-reset-pwd': reset_pwd
        },
        data() {
            return {
                // 高级筛选开关
                screeningDropdown: false,
                // 学校数据
                schoolOptions: [],
                search: {
                    account: '',
                    schoolId: ''
                },
                _search: {},
                region: {},
                items: [],
                checkedItems: [],            // 选中项
                identity:'',
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
                return Object.assign( {}, this.search, this.region, this.pageParam )
            }
        },
        created(){
            this.identity = this.$ls.get('userIdentity')
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
            resetSearchForm() {
                if(this.identity != 'school'){
                    this.$refs.region.checkedItems = []
                }
                this.search = Object.assign({}, this._search, { name: this.search.account })
                this.screeningDropdown = false
            },
            /*
             * 获取学校管理员列表
             */
            getData() {
                requestBaseSchooler(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.showMessage('error',response.data.msg);
                    }
                })
            },
            // 学校管理员删除
            doDel({data:item} = {data}){
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('此操作将删除该学校管理员，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delBaseSchooler(params).then((res) => {
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
                    this.$message({ message: '请选择要删除的学校管理员' })
                }
            },
            // 锁定/解锁
            doLock({ data: item, model } = { data, model }) {
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
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.$set(this.$data, 'region', _region)
                this.getSchoolData();
                this.search.schoolId = null;
            },
            // 请求学校列表数据
            getSchoolData () {
                requestSchoolList(this.region).then(response => {
                    if (response.data.code == 200) {
                        this.schoolOptions = response.data.appendInfo.comboxList
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
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked;
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
                        this.$refs.multipleTable.clearSelection();
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
                        this.showMessage('info', '请勾选要修改密码的学校管理员')
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
