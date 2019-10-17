<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.userName" @keyup.native.enter="changePage(1)" placeholder="请输入学习人姓名"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="身份">
                        <el-select v-model="dataParams.identity" placeholder="请选择身份" clearable>
                            <el-option v-for="item in identityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学习类型">
                        <el-select v-model="dataParams.studyType" placeholder="请选择学习类型" clearable>
                            <el-option v-for="item in studyTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域" v-if="!isSchool">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="学校" v-if="!isSchool">
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
        <!-- 活动列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column prop="userName" label="学习人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="identityName" label="身份" show-overflow-tooltip></el-table-column>
            <el-table-column prop="studyType" label="学习类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="busName" label="学习对象" show-overflow-tooltip></el-table-column>
            <el-table-column prop="studyLength" label="学习时长(天)" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.studyLength | timeToDay}}
                </template>
            </el-table-column>
            <el-table-column prop="progress" label="学习进度" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.progress * 100}}%
                </template>
            </el-table-column>
            <el-table-column label="关联成果" show-overflow-tooltip>
                <template scope="scope">
                    <template v-for="(studyResult, i) in scope.row.studyResultList">
                        {{studyResult.worksName}}
                    </template>
                </template>
            </el-table-column>
            <!-- <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column> -->
            <el-table-column prop="schoolName" label="学生所在学校" show-overflow-tooltip></el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import region from '@/components/common/select/region_select.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestStudyList } from '@/service/admin_space.js'
    import { requestSchoolList } from '@/service/common.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    export default {
        name: 'studyManage',
        mixins: [subPermission, setPage],
        components: {
            'v-region-select': region,
            'v-pagination': pagination
        },
        data() {
            return {
                isSchool: this.$ls.get('userIdentity') == 'school' ? true : false,
                screeningDropdown: false, // 高级筛选
                identityOptions: [ // 身份
                    { label: '学生', value: 0 },
                    { label: '教师', value: 1 }
                ],
                studyTypeOptions: [ // 学习类型
                    { label: '课程', value: 1 },
                    { label: '项目', value: 2 },
                    { label: '实训', value: 3 }
                ],
                schoolOptions: [],
                region: {},
                items: [],
                checkedItems: [],// 选中项
                dataParams: {
                    userName: '',
                    identity: '',
                    studyType: '',
                    schoolId: '',
                    orgId: this.$ls.get('loginInfo').userInfo.baseId
                },
                _dataParams: {}
            }
        },
        mounted() {
            this._dataParams = Object.assign({}, this.dataParams)
            this.getData()
        },
        filters: {
            timeToDay (time = 0) {
                const day = time / 1440
                return (day < 1 && day > 0) ? 1 : (time % 1440) ? day.toFixed(2) : day
            }
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
             *  列表数据
             */
            getData() {
                requestStudyList(this.dataParams, this.pageParam).then(res => {
                    if (res.data.entity && res.data.code === 200) {
                        let _data = res.data.entity.resultData;
                        if (_data.length) {
                            _data.forEach(item => {
                                // 学习类型转译
                                dataTranslation(item.studyType, 'studyType').then(res => {
                                    item.studyType = res
                                })
                            })
                        }
                        this.items = _data;
                        this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
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
            resetSearchForm() {
                if (this.$refs.region) {
                    this.$refs.region.checkedItems = []
                }
                this.dataParams = Object.assign({}, this._dataParams, { name: this.dataParams.userName })
                this.screeningDropdown = false
            }
        }
    }
</script>