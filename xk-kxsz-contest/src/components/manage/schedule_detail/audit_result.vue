<template>
	<el-dialog title="评审结果" :visible.sync="resultsPopop.show" size="small" class="audit_result">
        <div class="content-box">
            <section class="option-box clearfix">
                <v-search class="fl" :tips="'请输入作品名称'" @search="setResultsSearch"></v-search>
                <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': resultsDropdown }" @click="resultsDropdown=!resultsDropdown" style="border-bottom-width: 2px;"></button>
                <div v-show="resultsDropdown" class="bs-screening_wrap">
                    <el-form :inline="true" :model="resultsForm" class="bs-screening_box" label-width="80px" ref="resultsForm">
                        <el-form-item label="分类" prop='projectId'>
                            <el-select v-model="resultsForm.projectId" placeholder="请选择分类" filterable clearable>
                                <el-option v-for="item in detail.projectRelationList" :key="item.id" :label="item.projectName" :value="item.projectId"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="分组" prop='actorGroup'>
                            <el-select v-model="resultsForm.actorGroup" placeholder="请选择分组" filterable clearable>
                                <el-option v-for="item in periodKeyDicList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="形式" prop='actorWay'>
                            <el-select v-model="resultsForm.actorWay" placeholder="请选择参赛形式" filterable clearable>
                                <el-option v-for="item in actorWayDicList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="区域" v-if="!ifSchool">
                            <xk-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></xk-region-select>
                        </el-form-item>
                        <el-form-item label="学校" v-if="!ifSchool" prop='schoolId'>
                            <el-select v-model="resultsForm.schoolId" placeholder="请选择学校" filterable clearable>
                                <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="bs-screening-btn">
                        <button type="button" @click="getResultByWorks">确定</button> | <button type="button" @click="clearResultForm">取消</button>
                    </div>
                </div>
            </section>
            <el-table class="data-table back-stage-table" border :data="resultsList" style="width: 100%" height="300">
                <el-table-column prop="worksName" label="作品名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userName" label="作者" show-overflow-tooltip></el-table-column>
                <el-table-column prop="uploadDate" label="上传时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.uploadDate | dateFormat('yyyy.MM.dd HH:mm')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="projectName" label="分类" width="50"></el-table-column>
                <!-- <el-table-column prop="actorGroup" label="分组" width="50">
                    <template slot-scope="scope">
                        <span>{{scope.row.actorGroup | translate(periodKeyDicList, { key: 'id' })}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="actorWay" label="形式" width="50">
                    <template slot-scope="scope">
                        <span>{{scope.row.actorWay | translate(actorWayDicList, { key: 'id' })}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="provinceName" label="区域" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>
                <el-table-column prop="avgScore" label="平均得分" show-overflow-tooltip></el-table-column>
            </el-table>
            <v-pagination :param="resultsPageParam" @callback="setResultsPageParam"></v-pagination>
        </div>
    </el-dialog>
</template>

<script>
    import pagination from '@/components/common/pagination.vue'  // 分页组件
    import { requestResultByWorks } from '@/service/manage.js'
    import { mapState } from 'vuex'
    // import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import { requestSchoolList } from '@/service/common.js'
    import search from '@/components/common/search.vue'

    export default {
        name: 'audit_result',
        components: {
            'v-pagination': pagination,
            // 'v-region-select': region,
            'v-search': search,
        },
        data() {
            return {
                // 筛选开关
                resultsDropdown: false,
                // 请求表单参数
                resultsForm: {
                    worksName: '',
                    projectId: '',
                    actorGroup: '',
                    actorWay: '',
                    schoolId: ''
                },
                // 结果列表
                resultsList: [],
                // 结果分页
                resultsPageParam: {
                    pageNum: 1,
                    pageSize: 5,
                    totalNum: 1
                },
                // 如果是学校， true是，false不是
                ifSchool: this.$ls.get('userIdentity') === 'school',
                // 学校数据
                schoolOptions: [],
                // 区域
                region: {
                    provinceId: null,
                    cityId: null,
                    areaId: null,
                }
            }
        },
        props: {
            resultsPopop: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            },
            currentRow: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            ...mapState({
                detail: state => state.matchDetail.detail,
                periodKeyDicList: state => state.dictionaryCommon.periodKeyDicList.dicList,
                actorWayDicList: state => state.dictionaryCommon.actorWayDicList.dicList,
            })
        },
        watch: {
            resultsPopop: {
                handler: function (val) {
                    if (val.show) {
                        this.getResultByWorks()
                        // if (this.$ls.get('userIdentity') && this.$ls.get('userIdentity') === 'school') {
                        //     this.getResultByWorks()
                        // }
                    }
                },
                deep: true
            }
            // region: {
            //     handler: function () {
            //         this.getResultByWorks()
            //     }
            // }
        },
        methods: {
            // 地区改变
            changeRegion(items) {
                // console.log(items)
                const _region = {}
                const [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.region = _region
                this.getSchoolData()
            },
            // 请求学校列表数据
            getSchoolData() {
                if (Object.values(this.region).filter(x => x).length) {
                    requestSchoolList(this.region).then((response) => {
                        if (response.data.code === 200) {
                            this.schoolOptions = response.data.appendInfo.comboxList || []
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                }
            },
            clearResultForm() {
                this.resultsDropdown = false
                this.$refs.resultsForm.resetFields()
                this.getResultByWorks()
            },
            setResultsPageParam(val) {
                this.$set(this.resultsPageParam, 'pageNum', val)
                this.getResultByWorks()
            },
            // 设置结果搜索
            setResultsSearch(val) {
                this.resultsForm.worksName = val
                this.getResultByWorks()
            },
            // 结果列表
            getResultByWorks() {
                if (Object.keys(this.currentRow).length > 0) {
                    const param = Object.assign({}, this.region, this.resultsForm, { id: this.currentRow.id })
                    requestResultByWorks(param, this.resultsPageParam).then((res) => {
                        if (res.data.code === 200) {
                            this.resultsList = res.data.entity.resultData
                            this.$set(this.resultsPageParam, 'totalNum', res.data.entity.totalNum)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }
            },
        }
    }
</script>