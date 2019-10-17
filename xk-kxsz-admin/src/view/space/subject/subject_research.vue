<!-- 在研课题 -->
<template>
    <div>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.name" @keyup.native.enter="changePage(1)" placeholder="请输入课题名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="级别">
                        <el-select v-model="dataParams.subjectLevel" placeholder="请选择级别" clearable>
                            <el-option v-for="item in subjectLevelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="研究领域">
                        <v-multiSelect :selectData.sync='researchField' :ifAll="false" :model="'subject'" :clearable="true"></v-multiSelect>
                    </el-form-item>
                    <el-form-item label="课题阶段">
                        <el-select v-model="dataParams.status" placeholder="请选择状态" clearable>
                            <el-option v-for="item in subjectStageDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域" v-show="!isSchool">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="学校" v-show="!isSchool">
                        <el-select v-model="dataParams.schoolId" placeholder="请选择学校" filterable clearable>
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='getData'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <!-- 列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <!-- <el-table-column type="selection" width="50"></el-table-column> -->
            <el-table-column label="课题名称" show-overflow-tooltip>
                <template scope="scope">
                    {{ scope.row.name }}
            <!--         <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/space/subject/detail', query: {id: scope.row.id} }">{{scope.row.name}}</router-link>
                    </span> -->
                </template>
            </el-table-column>
            <el-table-column label="课题级别">
                <template scope="scope">
                    {{scope.row.subjectLevel | translate(subjectLevelOptions)}}
                </template>
            </el-table-column>
            <el-table-column prop="headUserName" label="负责人"></el-table-column>
            <el-table-column label="立项时间">
                <template scope="scope">
                    {{scope.row.projectDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="researchFieldName" label="研究领域"></el-table-column>
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolId" label="学校"></el-table-column>
            <el-table-column label="阶段" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
                        {{scope.row.status | translate(subjectStageDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        opening: {callback: popupReport, isActive: isInStage},
                        midterm: {callback: popupReport, isActive: isInStage},
                        concluding: {callback: popupReport, isActive: isInStage}
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog :title="statusTitle" :visible.sync="auditRecordVisible" size="tiny" class="auditPopup">
            <p>
                <span class="auditPopup_title fl">内容：</span>
                <span v-if="statusData.auditRemark">{{ statusData.auditRemark }}</span>
                <span v-else>无内容</span>
            </p>
            <p>
                <span class="auditPopup_title fl">附件：</span>
                <a :href="fileBaseUrl + statusData.resourceId" :download="statusData.resourceId.split('/')[statusData.resourceId.split('/').length - 1]" class="btn-download" title="下载" v-if="statusData.resourceId">
                    {{ statusData.resourceId }}
                </a>
                <span v-else>无附件</span>
            </p>
        </el-dialog>

    </div>
</template>

<script>
    import {fileBaseUrl} from 'Asset/js/common-config.js'
    import { mapState } from 'vuex'
    import { requestDictComb } from '@/service/common.js'  // 技术接口
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import multi_select from '@/components/common/select/multi_select.vue'  // 分类下拉
    import { requestSchoolList } from '@/service/common.js'  // 学校接口
    import { subPermission } from '@/mixin/getAdminMenu.js'  // 配置信息混入
    import { setPage } from '@/mixin/adminPagination.js'
    import pagination from '@/components/common/admin_pagination.vue'  // 分页组件
    import { requestSubjectResearchList, requestResourcesAuditDetail } from '@/service/admin_space.js'  // 列表数据接口
    import dataTranslation from 'Asset/js/dataTranslation.js'  // 翻译方法
    import adminOperate from '@/components/common/operate.vue'  // 配置按钮组件
    export default {
        components: {
            'v-region-select': region,
            'v-multiSelect': multi_select,
            'v-pagination': pagination,
            'v-admin-operate': adminOperate,
        },
        mixins: [subPermission, setPage],
        data() {
            return {
                fileBaseUrl,
                // 是否学校
                isSchool: false,
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
                // 分类
                researchField: [],
                // 省市区
                region: {},
                // 列表数据
                items: [],
                // 请求参数
                dataParams: {
                    // 领域
                    researchField: null,
                    // 名称
                    name: '',
                    // 机构id
                    orgId: this.$ls.get('baseInfo') ? this.$ls.get('baseInfo')[this.$ls.get('userIdentity')].id : null,
                    // 学校id
                    schoolId: null,
                    // 城市id
                    cityId: null,
                    // 区县id
                    areaId: null,
                    // 状态
                    auditStatus: 1,
                    // 阶段
                    status: null,
                    // 级别
                    subjectLevel: null
                },
                _dataParams: {},
                // 选中
                checkedItems: [],
                // 审核记录弹框可见
                auditRecordVisible: false,
                // 审核记录数据
                recordDatas: [],
                statusTitle: '',
                statusData: {
                    resourceId: ''
                }
            }
        },
        mounted() {
            // 判断登陆账号是不是学校
            this.isSchool = this.$ls.get('userIdentity') == 'school' ? true : false
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
                this.getSchoolData()
                this.dataParams.schoolId = null
            },
            // 请求学校列表数据
            getSchoolData () {
                requestSchoolList(this.region).then(response => {
                    if (response.data.code == 200) {
                        this.schoolOptions = response.data.appendInfo.comboxList
                    }
                })
            },
            /*
             * 获取课题列表
             */
            getData() {
                this.dataParams.researchField = this.researchField.join('-')
                requestSubjectResearchList(this.dataParams, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity.resultData;
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
            isInStage(item, {model = ''} = {model}) {
                switch(model) {
                    case 'opening':
                        return item.auditStatus == 1 && item.status > 1
                    case 'midterm':
                        return item.auditStatus == 1 && item.status > 2
                    case 'concluding':
                        return item.auditStatus == 1 && item.status > 3
                }
            },
            popupReport({model = '', index} = {model, index}) {
                if(model == 'opening') {
                    this.statusTitle = '开题报告'
                    this.statusData = this.items[index].subjectStageDtoList[0]
                }else if(model == 'midterm') {
                    this.statusTitle = '中期报告'
                    this.statusData = this.items[index].subjectStageDtoList[1]
                }else if(model == 'concluding') {
                    this.statusTitle = '结题报告'
                    this.statusData = this.items[index].subjectStageDtoList[2]
                }
                this.auditRecordVisible = true
            },
            /*
             * 审核记录
             * { "projectId": ["课题ID"] }
             */
            doRecord({data: item} = {data}) {
                requestResourcesAuditDetail({projectId: item.id}).then(response => {
                    if (response.data.code == 200) {
                        this.auditRecordVisible = true
                        let _data = response.data.appendInfo || {}
                        this.recordDatas = _data.list || []
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            // 重置搜索表单
            resetSearchForm() {
                this.researchField = []
                this.$refs.region.checkedItems = []
                this.dataParams = Object.assign({}, this._dataParams, {name: this.dataParams.name})
                this.screeningDropdown = false
            }
        },
        computed: {
            // 学段数据
            ...mapState('dictionaryCommon', {
                subjectLevelOptions (state) {
                    let dicList = (state['subjectLevelDicList'] || {}).dicList || []
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

<style lang='scss' scoped>
.auditPopup {
    p {
        padding: 10px 20px;
        line-height: 2;
        .auditPopup_title {
            font-weight: bold;
        }
        .btn-download {
            color: rgb(3, 145, 217);
            word-wrap: break-word;
        }
    }
}
</style>