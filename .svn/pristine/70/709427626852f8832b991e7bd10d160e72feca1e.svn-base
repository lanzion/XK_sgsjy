<!-- 课题阶段审核 -->
<template>
    <div id="stage_audit">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.subjectName" @keyup.native.enter="changePage(1)" placeholder="请输入课题名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-if="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="研究领域">
                        <v-multiSelect :selectData.sync='subjectType' :ifAll="false" :model="'subject'" :clearable="true"></v-multiSelect>
                    </el-form-item>
                    <el-form-item label="级别">
                        <el-select v-model="dataParams.subjectLevel" placeholder="请选择级别" clearable>
                            <el-option v-for="item in subjectLevelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            audit: openAuditPopup
        }"></v-admin-operate>
        <!-- 列表 -->
       <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="subjectName" label="课题名称" show-overflow-tooltip>
                <template scope="scope">
                    {{ scope.row.subjectName }}
             <!--        <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/space/subject/detail', query: {id: scope.row.id} }">{{scope.row.subjectName}}</router-link>
                    </span> -->
                </template>
            </el-table-column>
            <el-table-column label="课题级别" prop="subjectLevel">
                <template scope="scope">
                    {{scope.row.subjectLevel | translate(subjectLevelOptions)}}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="负责人"></el-table-column>
            <el-table-column prop="createDate" label="申报时间">
                <template scope="scope">
                    {{scope.row.createDate | dateFormat('yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="researchField" label="研究领域" width="100"></el-table-column>
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校"></el-table-column>
            <el-table-column label="阶段" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-success">
                        {{stage[scope.row.subjectStatus]}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="auditStatus" label="审核">
                <template scope="scope">
                    {{scope.row.auditStatus | translate(auditStatusDL)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        audit: openAuditPopup
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog title="审核" :visible.sync="auditPopup">
            <v-adminAudit :close="closeAuditPopup" :stageDetail="stageDetail" @auditSubmit="auditSubmit"></v-adminAudit>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import admin_audit from '@/components/space/subject/stage_audit.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import multi_select from '@/components/common/select/multi_select.vue'  // 分类下拉
    import { requestSchoolList } from '@/service/common.js'  // 学校接口
    import { subPermission } from '@/mixin/getAdminMenu.js'  // 配置信息混入
    import { setPage } from '@/mixin/adminPagination.js'
    import pagination from '@/components/common/admin_pagination.vue'  // 分页组件
    import { requestSubjectStageList, requestSubjectAudit } from '@/service/admin_space.js'  // 列表数据接口
    import dataTranslation from 'Asset/js/dataTranslation.js'  // 翻译方法
    import adminOperate from '@/components/common/operate.vue'  // 配置按钮组件
    export default {
        components: {
            'v-region-select': region,
            'v-multiSelect': multi_select,
            'v-pagination': pagination,
            'v-admin-operate': adminOperate,
            'v-adminAudit': admin_audit
        },
        mixins: [subPermission, setPage],
        data() {
            return {
                auditPopup: false,
                AuditParams: [],
                // 高级筛选开关
                screeningDropdown: false,
                // 分类
                subjectType: [],
                // 省市区
                region: {},
                // 列表数据
                items: [],
                // 请求参数
                dataParams: {
                    // 名称
                    subjectName: '',
                    // 级别
                    subjectLevel: '',
                    // 研究领域
                    researchField: null,
                    // 学校id
                    schoolId: '',
                    // 省级id
                    provinceId: null,
                    // 城市id
                    cityId: null,
                    // 区县id
                    areaId: null,
                },
                _dataParams: {},
                // 选中
                checkedItems: [],
                stageDetail: {},
                stage: {
                    '1': '立项',
                    '2': '中期评估',
                    '3': '结题验收'
                }
            }
        },
        mounted() {
            this._dataParams = Object.assign({}, this.dataParams)
            // 请求列表数据
            this.getData()
        },
        methods: {
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.$set(this.$data, 'region', _region)
                Object.assign(this.dataParams, _region)
                this.dataParams.schoolId = ''
            },
            /*
             * 获取项目列表
             */
            getData() {
                this.dataParams.researchField = this.subjectType.join('-')
                requestSubjectStageList(this.dataParams, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity.resultData;
                        if (_data.length) {
                            _data.forEach(item => {
                                // 适合学段转译
                                dataTranslation(item.applyScopeId, 'periodKey', { key: 'id' }).then(res => {
                                    item.applyScopeId = res;
                                })
                            })
                        }
                        this.items = _data;
                        this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum);
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
            /*
             * 审核
             */
            openAuditPopup(item) {
                if(item.index != undefined) {
                    this.stageDetail = item.data.subjectStageDtoList[parseInt(item.data.subjectStatus)-1]
                    this.AuditParams.push({id: item.data.id})
                }else{
                    this.checkedItems.forEach(i => {
                        this.AuditParams.push({id: i.id})
                    })
                }
                this.auditPopup = true
            },
            closeAuditPopup () {
                this.auditPopup = false
            },
            auditSubmit (item) {
                this.AuditParams.forEach(i => {
                    i.auditStatus = (item.result - 0)
                    i.remarks = item.explain
                })
                requestSubjectAudit(this.AuditParams).then(res => {
                    if (res.data.code == 200) {
                        this.getData()
                        this.closeAuditPopup()
                    }
                })
            },
            // 重置搜索表单
            resetSearchForm() {
                this.subjectType = []
                this.$refs.region.checkedItems = []
                this.dataParams = Object.assign({}, this._dataParams, {name: this.dataParams.subjectName})
                this.screeningDropdown = false
            }
        },
        computed: {
            // 级别数据
            ...mapState('dictionaryCommon', {
                subjectLevelOptions (state) {
                    let dicList = (state['subjectLevelDicList'] || {}).dicList || []
                    return dicList
                },
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList
                },
                subjectStageDL (state) {
                    let dicList = (state['subjectStageDicList'] || {}).dicList || []
                    return dicList
                },
            })
        }
    }
</script>

<style lang="scss">
    #audit_stage {
        .el-dialog {
            width: 640px;
        }
    }
</style>
