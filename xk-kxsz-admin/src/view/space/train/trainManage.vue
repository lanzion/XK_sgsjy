<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.theme" @keyup.native.enter="changePage(1)" placeholder="请输入培训名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <!-- <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="学段学科">
                        <el-cascader
                          style="width:100%;"
                          v-model="select"
                          :options="periodList"
                          @active-item-change="handleItemChange"
                          :clearable="true"
                          :props="props"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-select v-model="search.classifyId" placeholder="请选择类别" style="width:100%;" filterable clearable>
                            <el-option
                                v-for="(item,index) in classifyList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域" v-show="!isSchool">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div> -->
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: doDel,
        }"></v-admin-operate>
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="theme" label="培训主题" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="studySectionName" label="报名类别" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.studySectionName}}/{{scope.row.subjectName}}
                </template>
            </el-table-column>
            <!-- <el-table-column label="分类" prop="classifyName" sortable></el-table-column> -->
            <el-table-column prop="startTime" label="培训时间" width="290">
                <template scope="scope">
                    {{scope.row.startTime | dateFormat('yyyy.MM.dd HH:mm')}} - {{scope.row.endTime | dateFormat('yyyy.MM.dd HH:mm')}}
                </template>
            </el-table-column>
            <el-table-column prop="place" label="培训地点" show-overflow-tooltip></el-table-column>
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id' } },
                        del: doDel,
                        viewEnroll: { query: { id: 'id', actorType: 'actorType' } }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import region from '@/components/common/select/region_select.vue'
    import adminOperate from '@/components/common/operate.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import { requestTrainList, delTrainByIds, requestSubjectByPeriodId, requestTrainClassify, requestTrainPeriod } from '@/service/admin_space.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'

    export default {
        name: 'trainManage',
        mixins: [subPermission, setPage],
        components: {
            'v-region-select': region,
            'v-admin-operate': adminOperate,
            'v-pagination': pagination
        },
        data() {
            return {
                // 是否学校
                isSchool: false,
                identity: this.$ls.get('userIdentity'),
                screeningDropdown: false,
                search: {
                    theme: '',
                    studySectionId: '',
                    subject: '',
                    classifyId: '',
                    provinceId: null,
                    cityId: null,
                    areaId: null
                },
                select: [],
                _search: {},
                region: {},
                items: [],
                periodList: [], // 学段数据
                classifyList: [], // 分类数据
                checkedItems: [], // 选中项
                props: {
                    value: 'actorType',
                    label: 'name',
                    children: 'children'
                },
            }
        },
        computed: {
            params: function () {
                return Object.assign({}, { orgId: this.identity === 'admin' ? '' : this.$ls.get('loginInfo').userInfo.space.orgId }, this.search, this.region)
            }
        },
        created() {
            this._search = Object.assign({}, this.search)
            this.getData()
            this.getTrainPeriod()
            this.getClassify()
            // 判断登陆账号是不是学校
            this.isSchool = this.$ls.get('userIdentity') == 'school'
        },
        watch: {
            select: {
                handler: function (val) {
                    if (val.length) {
                        this.search.studySectionId = val[0]
                        this.search.subject = val[1]
                    } else {
                        this.search.studySectionId = ''
                        this.search.subject = ''
                    }
                },
                deep: true
            }
        },
        methods: {
            // 获取学段数据
            getTrainPeriod() {
                requestTrainPeriod({}).then((res) => {
                    if (res.data.code === 200) {
                        const _date = res.data.appendInfo.result
                        this.periodList = _date.map((x) => {
                            this.$set(x, 'children', [])
                            return x
                        })
                    }
                })
            },
            // 根据学段改变获取学科数据
            handleItemChange(val) {
                const id = val[0]
                const index = this.periodList.findIndex(x => x.id === id)
                if (!this.periodList[index].children.length) {
                    requestSubjectByPeriodId({ studySectionId: id }).then((res) => {
                        if (res.data.code === 200) {
                            const _data = res.data.appendInfo.result
                            this.periodList[index].children = _data
                        }
                    })
                }
            },
            // 获取分类数据
            getClassify() {
                requestTrainClassify({}).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.appendInfo.result
                        this.classifyList = _data
                    }
                })
            },

            /*
             * 获取列表
             */
            getData() {
                requestTrainList(this.params, this.pageParam).then((response) => {
                    if (response.data.code == 200) {
                        const _data = response.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum)
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
            // 地区改变
            changeRegion(items) {
                const _region = {}
                const [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.$set(this.$data, 'region', _region)
            },
            /*
             * 删除
             * [{id: "ID"}]
             */
            doDel({ data: item } = { data }) {
                const params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('此操作将删除该培训，是否继续？', '删除', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach((x) => {
                            params.push({ id: x.id })
                        })
                        delTrainByIds(params).then((response) => {
                            if (response.data.code == 200) {
                                this.$message({ message: '删除成功', type: 'success' })
                                this.getData()
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    }).catch(() => {})
                } else {
                    this.$message({ message: '请选择要删除的培训' })
                }
            },
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
            // 重置搜索表单
            resetSearchForm() {
                this.$refs.region.checkedItems = []
                this.search = Object.assign({}, this._search, { name: this.search.theme })
                this.screeningDropdown = false
            }
        }
    }
</script>
