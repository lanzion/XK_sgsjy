<!-- 待审 -->
<template>
    <div>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.name" @keyup.native.enter="changePage(1)" placeholder="请输入课程名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="课程分类">
                        <v-multiSelect :selectData.sync='courseType' :ifAll="false" :model="'course'" :clearable="true"></v-multiSelect>
                    </el-form-item>
                    <el-form-item label="技术">
                        <el-select v-model="dataParams.technology" placeholder="请选择技术" filterable clearable>
                            <el-option v-for="item in technologyOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="级别">
                        <el-select v-model="dataParams.grade" placeholder="请选择级别" clearable>
                            <el-option v-for="item in gradeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            audit: openAuditPopup
        }"></v-admin-operate>
        <!-- 课程列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="课程名称" show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/space/course/detail', query: {id: scope.row.courseId} }">{{scope.row.name}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="typeName" label="课程分类"></el-table-column>
            <el-table-column prop="technology" label="技术"></el-table-column>
            <el-table-column prop="grade" label="级别">
                <template scope="scope">
                    {{ scope.row.grade | translate(gradeOptions, {key: 'id'}) }}
                </template>
            </el-table-column>
            <el-table-column prop="teacherId" label="授课教师"></el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="110" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.createDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="auditStatus" label="状态"></el-table-column> -->
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校"></el-table-column>
            <el-table-column label="操作" fixed="right" width="80">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        audit: openAuditPopup
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog title="审核" :visible.sync="auditPopup" size="tiny">
            <v-adminAudit :close="closeAuditPopup" @auditSubmit="auditSubmit"></v-adminAudit>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import admin_audit from 'Common/popupWindow/admin_audit.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import multi_select from 'Common/select/multi_select.vue'  // 分类下拉
    import { requestSchoolList } from '@/service/common.js'  // 学校接口
    import { subPermission } from '@/mixin/getAdminMenu.js'  // 配置信息混入
    import { setPage } from '@/mixin/adminPagination.js'
    import pagination from '@/components/common/admin_pagination.vue'  // 分页组件
    import { requestCourseAuditList, requestCourseAudit } from '@/service/admin_space.js'  // 列表数据接口
    import dataTranslation from '@/js/dataTranslation.js'  // 翻译方法
    import adminOperate from '@/components/common/admin_operate.vue'  // 配置按钮组件
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
                // 是否学校
                isSchool: false,
                auditPopup: false,
                AuditParams: [],
                // 高级筛选开关
                screeningDropdown: false,
                // 学校数据
                schoolOptions: [],
                // 技术数据: [],
                courseType: [],
                // 省市区
                region: {},
                // 列表数据
                items: [],
                // 请求参数
                dataParams: {
                    technology: '',
                    // 技术分类
                    name: '',
                    // 项目名称
                    courseType: null,
                    // 项目分类
                    grade: '',
                    // 级别
                    schoolId: '',
                    // 学校id
                    provinceId: null,
                    // 省级id
                    cityId: null,
                    // 城市id
                    areaId: null,
                    // 区县id
                },
                _dataParams: {},
                // 选中
                checkedItems: [],
            }
        },
        mounted() {
            // 判断登陆账号是不是学校
            this.isSchool = this.$ls.get('userIdentity') == 'school' ? true : false
            this._dataParams = Object.assign({}, this.dataParams)
            // 请求技术数据
            this.getDictComb("technicalClassification")
            // 请求列表数据
            this.getData()
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
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
                this.dataParams.schoolId = ''
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
             * 获取项目列表
             */
            getData() {
                this.dataParams.courseType = this.courseType.join('-')
                requestCourseAuditList(this.dataParams, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        this.items = response.data.entity.resultData;
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
                if(item.index != undefined || this.checkedItems.length) {
                    if(item.index != undefined) {
                        this.AuditParams.push({id: item.data.id})
                    }else{
                        this.checkedItems.forEach(i => {
                            this.AuditParams.push({id: i.id})
                        })
                    }
                    this.auditPopup = true
                }else {
                    this.$message({message: '请选择待审课程'})
                }
            },
            closeAuditPopup () {
                this.auditPopup = false
            },
            auditSubmit (item) {
                this.AuditParams.forEach(i => {
                    i.auditStatus = (item.result - 0)
                    i.remarks = item.explain
                })
                requestCourseAudit(this.AuditParams).then(res => {
                    if (res.data.code == 200) {
                        this.$message({type: 'success', message: `审核成功` })
                        this.getData()
                        this.closeAuditPopup()
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            },
            resetSearchForm() {
                this.courseType = []
                this.$refs.region.checkedItems = []
                this.dataParams = Object.assign({}, this._dataParams, {name: this.dataParams.name})
                this.screeningDropdown = false
            }
        },
        computed: {
            // 级别数据
            ...mapState('dictionaryCommon', {
                gradeOptions (state) {
                    let dicList = (state['courseGradeDicList'] || {}).dicList || []
                    return dicList
                },
                technologyOptions (state) {
                    let dicList = (state['technicalClassificationDicList'] || {}).dicList || []
                    return dicList
                }
            })
        }
    }
</script>