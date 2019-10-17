<template>
    <div>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.name" @keyup.native.enter="changePage(1)" placeholder="请输入工作室名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="区域" v-if="identity != 'school'">
                        <v-region-select @region="changeRegion" ref="region" :rangeItems="rangeItems" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="学校" v-if="identity != 'school'">
                        <el-select v-model="search.schoolId" placeholder="请选择学校" filterable clearable>
                            <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="search.sex" placeholder="请选择性别" clearable>
                            <el-option v-for="item in sexDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="最高学历">
                        <el-select v-model="search.education" placeholder="请选择最高学历" clearable>
                            <el-option v-for="item in educationDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职称">
                        <el-select v-model="search.title" placeholder="请选择职称" clearable>
                            <el-option v-for="item in titleDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="search.auditStatus" placeholder="请选择状态" clearable>
                            <el-option v-for="item in auditStatusDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <!-- <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            recommend: doRecommend,
        }"></v-admin-operate> -->
        <!-- 工作室所有列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="createName" label="教师姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sex" label="性别" show-overflow-tooltip width="80">
                <template scope="scope">
                    {{scope.row.sex | translate(sexDL)}}
                </template>
            </el-table-column>
            <el-table-column prop="education" label="最高学历" sortable show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.education | translate(educationDL, {key: "id"})}}
                </template>
            </el-table-column>
            <el-table-column prop="birthday" label="出生年月" show-overflow-tooltip width="120">
                <template scope="scope">
                    {{scope.row.birthday | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="职称" sortable show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.title | translate(titleDL, {key: "id"})}}
                </template>
            </el-table-column>
            <el-table-column prop="teachAge" label="教龄" sortable show-overflow-tooltip width="70"></el-table-column>
            <el-table-column prop="name" label="工作室名称" show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/base/studio/detail', query: {id: scope.row.id} }">{{scope.row.name}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="studioTypeName" label="申请领域" sortable show-overflow-tooltip></el-table-column>
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校名称" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatus" label="状态" sortable width="90">
                <template scope="scope">
                    <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
                        {{scope.row.auditStatus | translate(auditStatusDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="120">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        record: popupAudit
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog class="audit-record" :visible.sync="auditVisible" title="审核记录">
            <v-audit-record :auditData.sync="auditData" :close="close"></v-audit-record>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'Vuex'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestSchoolList } from '@/service/common.js'
    import { requestBaseStudio, requestStudioAuditRecord } from '@/service/admin_base.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    // import multi_select from 'Common/select/multi_select.vue'  // 分类下拉
    import audit_record from 'Common/popupWindow/audit_record.vue' //审核记录弹窗
    export default {
        name: 'studio_audited',
        mixins: [subPermission, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-region-select': region,
            // 'v-multiSelect': multi_select,
            'v-audit-record': audit_record
        },
        data() {
            return {
                auditStatusStyle: {
                    '-1': 'pending',
                    '0': 'submit',
                    '1': 'success',
                    '2': 'fail',
                    '3': 'auditing'
                },
                screeningDropdown: false,    // 高级筛选开关
                schoolList: [],           // 学校数据
                auditVisible: false,          // 审核记录弹窗是否可见
                auditResult: '',              // 审核结果
                search: {
                    name: '',
                    sex: '',
                    education: '',
                    title: '',
                    schoolId: '',
                    auditStatus: ''
                },
                _search: {},
                region: {},
                items: [],
                checkedItems: [],           // 选中项
                curId: null,                // 当前编辑数据ID
                auditData: [],               // 审核记录数据
                identity: '',
                rangeItems: '-1'              //区域范围
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList
                },
                titleDL (state) {
                    let dicList = (state['titleDicList'] || {}).dicList || []
                    return dicList
                },
                sexDL (state) {
                    let dicList = (state['sexDicList'] || {}).dicList || []
                    return dicList
                },
                educationDL (state) {
                    let dicList = (state['educationDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            params: function() {
                return Object.assign( {}, this.search, this.region, this.pageParam )
            }
        },
        created(){
            this.identity = this.$ls.get('userIdentity')
            if (this.identity === 'education') {
                let edu = this.$ls.get('baseInfo').baseInfo
                this.rangeItems = edu.id
            }
        },
        mounted() {
            this._search = Object.assign( {}, this.search )
            this.getDictComb("title")
            this.getDictComb("education")
            this.getData()
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            resetSearchForm() {
                if(this.identity != 'school'){
                    this.$refs.region.checkedItems = []
                }
                this.search = Object.assign({}, this._search, { name: this.search.name })
                this.screeningDropdown = false
            },
            /*
             * 获取工作室列表
             */
            getData() {
                requestBaseStudio(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    }
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
                this.getSchoolData()
                this.search.schoolId = ''
            },
            // 请求学校列表数据
            getSchoolData () {
                requestSchoolList(this.region).then(response => {
                    if (response.data.code == 200) {
                        this.schoolList = response.data.appendInfo.comboxList
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
            //获取审核记录
            popupAudit({data = {},index} = {data, index}){
                requestStudioAuditRecord({studioId: data.id}).then((res) => {
                    if(res.data.code === 200){
                        this.auditData = res.data.appendInfo.list
                    }
                });
                this.auditVisible = true;
            },
            // 关闭弹框
            close() {
                this.auditVisible = false;
            }
        }
    }
</script>