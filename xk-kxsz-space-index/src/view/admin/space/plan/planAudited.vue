<!-- 已审 -->
<template>
    <div>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.name" @keyup.native.enter="changePage(1)" placeholder="请输入商业策划名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="类目">
                        <el-select v-model="dataParams.category" placeholder="请选择类目" clearable>
                            <el-option v-for="item in businessPlanCategoryDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                    <el-form-item label="状态" >
                        <el-select v-model="dataParams.auditStatus" placeholder="请选择状态" clearable>
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
            hot: handleHot,
            nohot: handleHot,
            del: doDel
        }"></v-admin-operate>
        <!-- 商业策划列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="商业策划名称" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-hot" v-if="scope.row.isHot">热</el-tag>
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/space/plan/detail', query: {id: scope.row.id} }">{{scope.row.name}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="validDate" label="有效期" width="110" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.validDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column> -->
            <el-table-column prop="category" label="类目" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.category | translate(businessPlanCategoryDL, {key: 'id'})}}
                </template>
            </el-table-column>
            <el-table-column prop="createName" label="发布人" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="110" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.createDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="auditStatus" label="状态" width="90" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
                        {{scope.row.auditStatus | translate(auditStatusDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" fixed="right" width="330">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        record: {callback: doRecord, isActive: isInAuditing },
                        hot: { callback: handleHot, isActive: isNoHot },
                        nohot: { callback: handleHot, isActive: isHot },
                        del: doDel
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog title="审核记录" :visible.sync="auditRecordVisible" class="audit-record-dialog">
            <el-table class="data-table back-stage-table" border :data="recordDatas">
                <el-table-column property="auditOrgName" label="审核节点" show-overflow-tooltip></el-table-column>
                <el-table-column property="userName" label="审核人" show-overflow-tooltip></el-table-column>
                <el-table-column property="auditDate" label="审核时间" width="180">
                    <template scope="scope">
                        {{scope.row.auditDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column property="auditStatus" label="审核结果" width="100">
                    <template scope="scope">
                        <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
                            {{scope.row.auditStatus | translate(auditStatusDL)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column property="remarks" label="审核意见" show-overflow-tooltip></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import multi_select from 'Common/select/multi_select.vue'  // 分类下拉
    import { requestSchoolList, doRecommend } from '@/service/common.js'  // 学校接口
    import { subPermission } from '@/mixin/getAdminMenu.js'  // 配置信息混入
    import { setPage } from '@/mixin/adminPagination.js'
    import pagination from '@/components/common/admin_pagination.vue'  // 分页组件
    import { requestPlanList, requestPlanAuditDetail, hotPlan, delPlan } from '@/service/admin_space.js'  // 列表数据接口
    import dataTranslation from '@/js/dataTranslation.js'  // 翻译方法
    import adminOperate from '@/components/common/admin_operate.vue'  // 配置按钮组件
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
                // 省市区
                region: {},
                // 列表数据
                items: [],
                // 请求参数
                dataParams: {
                    name: '',
                    // 商业策划名称
                    category: '',
                    // 商业策划分类
                    schoolId: '',
                    // 学校id
                    provinceId: '',
                    // 省级id
                    cityId: '',
                    // 城市id
                    areaId: '',
                    // 区县id
                    auditStatus: ''
                    // 状态
                },
                _dataParams: {},
                // 选中
                checkedItems: [],
                // 审核记录弹框可见
                auditRecordVisible: false,
                // 审核记录数据
                recordDatas: []
            }
        },
        mounted() {
            // 判断登陆账号是不是学校
            this.isSchool = this.$ls.get('userIdentity') == 'school' ? true : false
            this._dataParams = Object.assign({}, this.dataParams)
            this.getDictComb("businessPlanCategory")
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
                _region.provinceId = _province || ''
                _region.cityId = _city || ''
                _region.areaId = _area || ''
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
             * 获取商业策划列表
             */
            getData() {
                requestPlanList(this.dataParams, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.pageParam, 'totalNum', _data.totalNum || 0);
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
             * 审核记录
             * { "businessPlanId": ["商业策划ID"] }
             */
            doRecord({data: item} = {data}) {
                requestPlanAuditDetail({businessPlanId: item.id}).then(response => {
                    if (response.data.code == 200) {
                        this.auditRecordVisible = true
                        let _data = response.data.appendInfo || {}
                        this.recordDatas = _data.list || []
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            /*
             * 设为/取消热门
             * [{ "id": ["商业策划ID"], isHot: 1/0 }]
             */
            handleHot({data: item, model} = {data, model}) {
                let params = [],
                    isSetHot = model === 'hot',
                    handleTxt = isSetHot ? '设为' : '取消',
                    value = isSetHot ? 1 : 0,
                    flag   = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    for( let i = 0; i < item.length; i++ ) {
                        if(!this.isAudited(item[i])) {
                            flag = true
                            break
                        }
                    }
                    if (flag) {
                        this.$message({ message: '只能设置审核通过的商业策划' })
                    } else {
                        this.$confirm(`此操作将该商业策划${handleTxt}热门，是否继续？`, `${handleTxt}热门`, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            customClass: '__custom-msg-box'
                        }).then(() => {
                            item.forEach(x => {
                                params.push({ id: x.id, isHot: value })
                            });
                            hotPlan(params).then(response => {
                                if (response.data.code == 200) {
                                    item.forEach(x => {
                                        x.isHot = value
                                    })
                                    this.$message({message: `${handleTxt}热门成功`, type: 'success'})
                                } else {
                                    this.$message.error(response.data.msg)
                                }
                            })
                            this.$refs.multipleTable.clearSelection()
                        }).catch(() => {})
                    }
                } else {
                    this.$message({ message: '请选择要设置的商业策划' })
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
                    this.$confirm('确定要删除该商业策划吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delPlan(params).then((res) => {
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
                    this.$message({message: '请选择要删除的商业策划'})
                }
            },
            // 判断是否可以取消热门
            isNoHot(item) {
                return Number(item.auditStatus) === 1 && Number(item.isHot) !== 1
            },
            // 判断是否可以设为热门
            isHot(item) {
                return Number(item.auditStatus) === 1 && Number(item.isHot) === 1
            },
            // 判断是否已审
            isAudited(item) {
                return Number(item.auditStatus) === 1
            },
            // 判断是否进入审核流程
            isInAuditing(item) {
                return Number(item.auditStatus) > 0
            },
            // 重置搜索表单
            resetSearchForm() {
                this.$refs.region.checkedItems = []
                this.dataParams = Object.assign({}, this._dataParams, {name: this.dataParams.name})
                this.screeningDropdown = false
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                businessPlanCategoryDL (state) {
                    let dicList = (state['businessPlanCategoryDicList'] || {}).dicList || []
                    return dicList
                },
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList
                },
            })
        }
    }
</script>
