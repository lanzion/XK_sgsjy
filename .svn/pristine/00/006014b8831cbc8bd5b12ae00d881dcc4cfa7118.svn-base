<template>
    <div>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.name" @keyup.native.enter="changePage(1)" placeholder="请输入投资人名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="区域">
                        <v-region-select @region="changeRegion" ref="region" :rangeItems="rangeItems" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="search.lockStatus" placeholder="请选择状态" filterable clearable>
                            <el-option v-for="item in lockStatusDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="search.auditStatus" placeholder="请选择审核状态" filterable clearable>
                            <el-option v-for="item in auditStatusDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            recommend: doRecommend,
            lock: doLock,
            unlock: doLock,
            audit: popupAudit,
            del: doDel,
            pwd: popupPwd
        }"></v-admin-operate>
        <!-- 投资人列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="account" label="证件照">
                <template scope="scope">
                    <a :href="getFileUrl(scope.row.certiPic1)" target="_blank">
                        <img :src="getFileUrl(scope.row.certiPic1)" />
                    </a>
                    <a :href="getFileUrl(scope.row.certiPic2)" target="_blank">
                        <img :src="getFileUrl(scope.row.certiPic2)" />
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="account" label="账号" sortable show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/base/users/investor/detail', query: {id: scope.row.id} }">{{scope.row.account}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="certiNum" label="证件号" width="200" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" label="联系电话" width="140" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="provinceName" label="所在区域" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="lockStatus" label="状态" sortable width="90">
                <template scope="scope">
                    <el-tag :class="['__color-'+lockStatusStyle[scope.row.lockStatus]]">
                        {{scope.row.lockStatus | translate(lockStatusDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="auditStatus" label="审核" sortable width="90">
                <template scope="scope">
                    <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
                        {{scope.row.auditStatus | translate(auditStatusDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        recommend: { callback: doRecommend, isActive: isRecommend },
                        lock: { callback: doLock, isActive: isUnLocked },
                        unlock: { callback: doLock, isActive: isLocked },
                        audit: { callback: popupAudit, isActive: isAudited },
                        del: doDel,
                        pwd: popupPwd
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog class="dialog-audit" :visible.sync="auditVisible" size="tiny" title="投资人审核">
            <div class="radio-box">
                <span class="radio-label">审核结果：</span>
                <el-radio class="radio" v-model="auditResult" label="1">通过</el-radio>
                <el-radio class="radio" v-model="auditResult" label="2">不通过</el-radio>
            </div>
            <section class="bs-d-btn-group">
                <button class="bs-search-button i-form-button" type="button" @click="doAudit">确定</button>
                <button class="bs-search-button i-form-button is-plain" type="button" @click="auditVisible=false">取消</button>
            </section>
        </el-dialog>
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
    import { userLock } from '@/mixin/lockUser.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { doRecommend, requestSchoolList } from '@/service/common.js'
    import {
        requestBaseInvestor,
        userBatchAudit,
        delBaseInvestor,
        resetPwd
    } from '@/service/admin_base.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    import adminOperate from '@/components/common/operate.vue'
    import region from '@/components/common/select/region_pub_select.vue' // 省市区下拉
    export default {
        name: 'investorManage',
        mixins: [subPermission, userLock, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-region-select': region,
            'v-reset-pwd': reset_pwd
        },
        data() {
            return {
                lockStatusStyle: {
                    '0': 'success',
                    '1': 'fail'
                },
                auditStatusStyle: {
                    '-1': 'pending',
                    '0': 'submit',
                    '1': 'success',
                    '2': 'fail',
                    '3': 'auditing'
                },
                // 高级筛选开关
                screeningDropdown: false,
                // 学校数据
                schoolOptions: [],
                search: {
                    name: '',
                    lockStatus: '',
                    auditStatus: ''
                },
                _search: {},
                auditResult:'',
                region: {},
                items: [],
                checkedItems: [],            // 选中项
                curItem: null,
                auditVisible: false,          //审核弹窗是否可见
                gradeList: [],
                pwdVisible: false,
                newPwd: null,
                rangeItems: '-1'              //区域范围
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                lockStatusDL (state) {
                    let dicList = (state['lockStatusDicList'] || {}).dicList || []
                    return dicList
                },
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList.filter(x => x.person);
                }
            }),
            params: function() {
                return Object.assign( {}, this.search, this.region, this.pageParam );
            }
        },
        created(){
            if (this.$ls.get('userIdentity') === 'education') {
                let edu = this.$ls.get('baseInfo').baseInfo
                this.rangeItems = edu.id
            }
        },
        mounted() {
            this._search = Object.assign( {}, this.search )
            this.getData();
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            resetSearchForm() {
                this.$refs.region.checkedItems = []
                this.search = Object.assign({}, this._search, { name: this.search.name })
                this.screeningDropdown = false
            },
            /*
             * 获取投资人列表
             */
            getData() {
                requestBaseInvestor(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.showMessage('error',response.data.msg);
                    }
                })
            },
            /*
             * 推荐
             * { "relationIds": ["投资人ID"] , "recommendType": 1 }
             */
            doRecommend({data: item} = {data}) {
                let params = { relationIds: [], recommendType: 1 },
                    flag   = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    for( let i = 0; i < item.length; i++ ) {
                        if(!this.isRecommend(item[i]) && !this.isLocked(item[i])) {
                            flag = true;
                            break;
                        }
                    }
                    if(flag) {
                        this.$message({ message: '只能推荐审核通过且未锁定的投资人' })
                    } else {
                        item.forEach(x => {
                            params.relationIds.push(x.id);
                        });
                        doRecommend(params).then(response => {
                            if (response.data.code == 200) {
                                this.$message({ message: '推荐成功', type: 'success' });
                            } else {
                                this.$message.error(response.data.msg);
                            };
                            this.$refs.multipleTable.clearSelection();
                        })
                    }
                } else {
                    this.$message({ message: '请选择要推荐的投资人' });
                }
            },
            // 判断是否可推荐
            isRecommend(item) {
                return (Number(item.auditStatus) == 1 && Number(item.lockStatus) == 0 && Number(item.recommend) == 0)
            },
            // 判断是否已审核
            isAudited(item) {
                return Number(item.auditStatus) == 0
            },
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.$set(this.$data, 'region', _region)
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
                this.checkedItems = checked
            },
            // 启用/停用
            doLock({ data: item, model } = { data, model }) {
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                this.lockOperate({
                    item: item,
                    model: model,
                    identity: '投资人'
                })
            },
            /*
             * 审核
             * id: ''
             * auditStatus: 审核状态
             */
            doAudit() {
                if(this.auditResult != ''){
                    let items = this.checkedItems.length ? this.checkedItems : [this.curItem],
                        auditStatus = Number(this.auditResult),
                        params = [];
                    items.forEach(x => {
                        params.push({id: x.id, auditStatus: auditStatus})
                    });
                    userBatchAudit(params).then((res) => {
                        if(res.data.code === 200){
                            this.showMessage('success', '审核成功')
                            items.forEach(x => {
                                x.auditStatus = auditStatus
                                if (auditStatus == 1) {
                                    x.lockStatus = 0
                                }
                            })
                        }else{
                            this.showMessage('error', res.data.msg)
                        }
                        this.auditVisible = false
                        this.auditResult = ''
                        this.$refs.multipleTable.clearSelection()
                    })
                } else {
                    this.showMessage('warning', '请选择审核结果')
                }
            },
            popupAudit({data = {}, index} = {data, index}){
                if (JSON.stringify(data) === '{}') {
                    if (this.checkedItems.length > 0) {
                        this.auditVisible = true;
                    } else {
                        this.showMessage('info', '请选择要审核的投资人')
                    }
                } else {
                    this.auditVisible = true
                    this.curItem = data
                }
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
                    }else{
                        this.showMessage('error', response.data.msg)
                    }
                })
                this.$refs.resetPwd.resetForm()
                this.closeResetPwdDialog()
            },
            popupPwd({data = {}, index} = {data, index}) {
                if (JSON.stringify(data) === '{}') {
                    if (this.checkedItems.length > 0) {
                        this.pwdVisible = true
                    } else {
                        this.showMessage('info', '请勾选要修改密码的投资人')
                    }
                } else {
                    this.pwdVisible = true
                    this.curItem = data
                }
            },
            /*
             * 删除
             * id: id
             */
            doDel({data:item}={data}){
                let params = [];
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    this.$confirm('确定要删除该投资人吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delBaseInvestor(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({message: '删除成功', type: 'success'})
                                this.getData();
                            } else {
                                this.$message.error({ message: res.data.msg })
                            };
                            this.$refs.multipleTable.clearSelection();
                        })
                    }).catch(() => {});
                } else {
                    this.$message({message: '请选择要删除的投资人'})
                }
            },
            closeResetPwdDialog() {
                this.pwdVisible = false
                this.$refs.resetPwd.resetForm()
            }
        }
    }
</script>
