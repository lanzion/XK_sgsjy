<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.name" @keyup.native.enter="changePage(1)" placeholder="请输入学生姓名"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" v-if="!isSchool" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-if="!isSchool" v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="区域">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="学校">
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
            <el-table-column prop="name" label="学生" show-overflow-tooltip></el-table-column>
            <el-table-column prop="objName" label="活动名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="learnLen" label="参与时长(天)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="busName" label="关联成果" show-overflow-tooltip align="left">
                <template scope="scope">
                    <el-tooltip effect="dark" placement="right-start" v-if="scope.row.resultList.length">
                        <div slot="content"><p v-for="(item, index) in scope.row.resultList">{{item.name}}</p></div>
                        <p>{{scope.row.resultList[0].name}}</p>
                    </el-tooltip>
                </template>
            </el-table-column>
            <!-- <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column> -->
            <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import region from '@/components/common/select/region_select.vue'
    import { requestSchoolList } from '@/service/common.js'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import pagination from '@/components/common/admin_pagination.vue'
    import { requestPracticeList } from '@/service/admin_space.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    export default {
        name: 'practiceManage',
        mixins: [subPermission, setPage],
        components: {
            'v-region-select': region,
            'v-pagination': pagination
        },
        data() {
            return {
                isSchool: this.$ls.get('userIdentity') == 'school' ? true : false,
                screeningDropdown: false, // 高级筛选
                schoolOptions: [],
                region: {},
                items: [],
                dataParams: {
                    name: '',
                    orgId: this.$ls.get('baseInfo') ? this.$ls.get('baseInfo')[this.$ls.get('userIdentity')].id : null,
                    schoolId: '',
                    provinceId: null,
                    cityId: null,
                    areaId: null
                },
                _dataParams: {}
            }
        },
        mounted() {
            this._dataParams = Object.assign({}, this.dataParams)
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
                this.dataParams = Object.assign(this.dataParams, _region)
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
             *  列表数据
             */
            getData() {
                requestPracticeList(this.dataParams, this.pageParam).then(res => {
                    if (res.data.entity && res.data.code === 200) {
                        let _data = res.data.entity.resultData
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
                this.$refs.region.checkedItems = []
                this.dataParams = Object.assign({}, this._dataParams, { name: this.dataParams.name })
                this.screeningDropdown = false
            }
        }
    }
</script>
