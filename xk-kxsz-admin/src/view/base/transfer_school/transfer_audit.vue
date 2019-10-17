<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.name" @keyup.native.enter="changePage(1)" placeholder="请输入学生/教师姓名"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="身份">
                        <el-select v-model="search.identity" placeholder="请选择转校身份" filterable clearable>
                            <el-option v-for="item in identityDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="search.auditStatus" placeholder="请选择审核状态" filterable clearable>
                            <el-option v-for="item in transferStatusDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{

        }"></v-admin-operate>
        <!-- 学生列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="account" label="账号" sortable show-overflow-tooltip>
                <template scope="scope">
                    <a class="resource-name" @click="viewDetail(scope.row)">
                       {{scope.row.account}}
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="姓名" sortable width="80"></el-table-column>
            <el-table-column prop="sex" label="性别" sortable width="80">
                <template scope="scope">
                    {{scope.row.sex | translate(sexDL)}}
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机" width="150">
                <template scope="scope">
                    {{scope.row.phone || '暂无'}}
                </template>
            </el-table-column>
            <el-table-column prop="provinceName" label="身份" show-overflow-tooltip>
                <template scope="scope">
                    {{identityType[scope.row.identity]}}
                </template>
            </el-table-column>
            <el-table-column prop="oldSchoolName" label="转出学校" show-overflow-tooltip></el-table-column>
            <el-table-column prop="newSchoolName" label="转入学校" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="转校说明" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lockStatus" label="审核状态" sortable width="110">
                <template scope="scope">
                    <el-tag :class="['__color-'+transferStatusStyle[scope.row.auditStatus]]">
                        {{scope.row.auditStatus | translate(transferStatusDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        approve: { callback: approve, isActive: ifAudit },
                        reject: { callback: reject, isActive: ifAudit }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog class="transfer-detail-dialog" :visible.sync="detailVisible" size="tiny" title="用户详情">
            <div class="detail-box" v-if="Object.keys(curItem).length">
                <el-row class="detail-item">
                    <el-col :span="3" class="detail-item-tit">身份:</el-col>
                    <el-col :span="20">{{identityType[curItem.identity]}}</el-col>
                </el-row>
                <el-row class="detail-item">
                    <el-col :span="3" class="detail-item-tit">账号:</el-col>
                    <el-col :span="20">{{curItem.account}}</el-col>
                </el-row>
                <el-row class="detail-item">
                    <el-col :span="3" class="detail-item-tit">姓名:</el-col>
                    <el-col :span="20">{{curItem.userName}}</el-col>
                </el-row>
                <el-row class="detail-item">
                    <el-col :span="3" class="detail-item-tit">性别:</el-col>
                    <el-col :span="20">{{curItem.sex | translate(sexDL)}}</el-col>
                </el-row>
                <el-row class="detail-item">
                    <el-col :span="3" class="detail-item-tit">手机:</el-col>
                    <el-col :span="20">{{curItem.phone || '暂无'}}</el-col>
                </el-row>
                <el-row class="detail-item" v-if="curItem.identity === '0'">
                    <el-col :span="3" class="detail-item-tit">学籍号:</el-col>
                    <el-col :span="20">暂无</el-col>
                </el-row>
                <el-row class="detail-item">
                    <el-col :span="3" class="detail-item-tit">证件号码:</el-col>
                    <el-col :span="20">暂无</el-col>
                </el-row>
                <el-row class="detail-item">
                    <el-col :span="3" class="detail-item-tit">原学校:</el-col>
                    <el-col :span="20">{{curItem.oldSchoolName}}</el-col>
                </el-row>
                <el-row class="detail-item">
                    <el-col :span="3" class="detail-item-tit">转入学校:</el-col>
                    <el-col :span="20">{{curItem.newSchoolName}}</el-col>
                </el-row>
            </div>
            <section class="bs-d-btn-group" v-if="ifAudit(curItem)">
                <button class="bs-search-button i-form-button" type="button" @click="approve({ data: curItem })">通过</button>
                <button class="bs-search-button i-form-button is-plain" type="button" @click="reject({ data: curItem })">拒绝</button>
            </section>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'Vuex'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestTransferSchoolList, transferSchoolAudit } from '@/service/admin_base.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    import { baseInfo } from 'Asset/js/getUserInfo.js'
    import adminOperate from '@/components/common/operate.vue'

    export default {
        name: 'studentManage',
        mixins: [subPermission, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
        },
        data() {
            return {
                transferStatusStyle: {
                    '1': 'auditing',
                    '2': 'auditing',
                    '3': 'success',
                    '4': 'fail'
                },
                // 高级筛选开关
                screeningDropdown: false,
                search: {
                    identity: '',
                    auditStatus: '',
                    name: ''
                },
                _search: {},
                auditResult:'',
                region: {},
                items: [],
                checkedItems: [],             // 选中项
                curItem: {},
                detailVisible: false,          //审核弹窗是否可见
                gradeList: [],
                identityDL: [
                    { id: '0', name: '学生' },
                    { id: '1', name: '教师' }
                ],
                identityType: {
                    0: '学生',
                    1: '教师'
                },
                schoolId: this.$ls.get('baseInfo').baseInfo.id // 当前登录学校id
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                sexDL (state) {
                    let dicList = (state['sexDicList'] || {}).dicList || []
                    return dicList
                },
                transferStatusDL (state) {
                    let dicList = (state['transferStatusDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            params: function() {
                return Object.assign( {}, this.search );
            }
        },
        created() {
        },
        mounted() {
            this._search = Object.assign( {}, this.search )
            this.getData()
        },
        methods: {
            resetSearchForm() {
                this.search = Object.assign({}, this._search, { name: this.search.name })
                this.screeningDropdown = false
            },
            /*
             * 获取学生列表
             */
            getData() {
                console.log(this.pageParam)
                requestTransferSchoolList(this.params, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.showMessage('error', response.data.msg);
                    }
                })
            },
            // 判断是否可审核
            ifAudit(item) {
                const status = item.auditStatus
                const oldSchoolId = item.oldSchoolId
                const newSchoolId = item.newSchoolId
                if (Number(status) === 3 || Number(status) === 4) {
                    return false
                } else if ((Number(status) === 1 && this.schoolId === oldSchoolId) || (Number(status) === 2 && this.schoolId === newSchoolId)) {
                    return true
                } else {
                    return false
                }
            },
            // 审核
            audit(item, status) {
                const msg = status === 4 ? '拒绝' : '通过'
                this.$confirm(`确定要${msg}转校吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    const params = {
                        id: item.id,
                        auditStatus: status
                    }
                    transferSchoolAudit(params).then((res) => {
                        if (res.data.code === 200) {
                            this.$message({ message: '审核成功', type: 'success' })
                            item.auditStatus = status
                            this.detailVisible = false
                        } else {
                            this.$message({ message: res.data.msg, type: 'error' })
                        }
                    })
                }).catch(() => {})
            },
            approve({data: item} = {data}) {
                this.audit(item, item.auditStatus + 1)
            },
            reject({data: item} = {data}) {
                this.audit(item, 4)
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
            viewDetail(item) {
                this.detailVisible = true
                this.curItem = Object.assign(item)
            }
        }
    }
</script>

<style lang="scss">
    .transfer-detail-dialog {
        .el-dialog {
            width: 600px;
        }
    }
</style>

<style lang="scss" scoped>
    .transfer-detail-dialog {
        .detail-box {
            .detail-item {
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 5px;
                .detail-item-tit {
                    text-align: right;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
