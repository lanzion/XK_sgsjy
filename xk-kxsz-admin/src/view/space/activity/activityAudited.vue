<!-- 已审 -->
<template>
    <div>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.title" placeholder="请输入活动名称" @keyup.native.enter="changePage(1)"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="活动分类">
                        <v-multiSelect :selectData.sync='activityType' :ifAll="false" :clearable="true" :model="'activity'"></v-multiSelect>
                    </el-form-item>
                    <el-form-item label="区域" v-show="!isSchool">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="学校" v-show="!isSchool">
                        <el-select v-model="dataParams.schoolId" placeholder="请选择学校" filterable clearable>
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="dataParams.auditStatus" placeholder="请选择状态" filterable clearable>
                            <el-option v-for="item in auditStatusDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布时间">
                        <el-date-picker v-model="dataParams.createDate" type="date" placeholder="请选择发布时间" clearable></el-date-picker>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker v-model="dataParams.beginDate" type="date" placeholder="请选择开始时间" clearable></el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            recommend: doRecommend,
            norecommend: cancelRecommend,
            hot: handleHot,
            nohot: handleHot,
            del: doDel
        }"></v-admin-operate>
        <!-- 活动列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="title" label="活动主题" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-hot" v-if="scope.row.isHot">热</el-tag>
                    <el-tag class="__color-success" v-if="Number(scope.row.recommend)">荐</el-tag>
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/space/activity/detail', query: {id: scope.row.id} }">{{scope.row.title}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="活动分类" show-overflow-tooltip prop="activityTypeName"></el-table-column>
            <el-table-column prop="compere" label="主持人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="startDate" label="活动时间" width="210" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.startDate | dateFormat('yyyy.MM.dd')}} - {{scope.row.endDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <el-table-column label="报名时间" width="130" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.beginDate | dateFormat('yyyy.MM.dd')}} - {{scope.row.stopDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatus" label="状态" width="90" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
                        {{scope.row.auditStatus | translate(auditStatusDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        recommend: { callback: doRecommend, isActive: isNoRecommend },
                        norecommend: { callback: cancelRecommend, isActive: isRecommend },
                        record: { callback: doRecord, isActive: isInAuditing },
                        hot: { callback: handleHot, isActive: isNoHot },
                        nohot: { callback: handleHot, isActive: isHot },
                        cancelAudit: { callback: cancelAudit, isActive: isCancel },
                        del: doDel
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog class="audit-record" :visible.sync="auditRecordVisible" title="审核记录">
            <v-audit-record :auditData.sync="recordDatas" :close="close"></v-audit-record>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { requestDictComb } from '@/service/common.js'  // 技术接口
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import multi_select from '@/components/common/select/multi_select.vue'  // 分类下拉
    import { requestSchoolList, doRecommend } from '@/service/common.js'  // 学校接口
    import { subPermission } from '@/mixin/getAdminMenu.js'  // 配置信息混入
    import { setPage } from '@/mixin/adminPagination.js'
    import { recommend } from '@/mixin/recommend.js'
    import pagination from '@/components/common/admin_pagination.vue'  // 分页组件
    import { requestActivityList, requestActivityAuditDetail, hotActivity, requestActivityCancelAudit, delActivity } from '@/service/admin_space.js'  // 列表数据接口
    import dataTranslation from 'Asset/js/dataTranslation.js'  // 翻译方法
    import adminOperate from '@/components/common/operate.vue'  // 配置按钮组件
    import audit_record from '@/components/common/popup/audit_record.vue' //审核记录弹窗
    export default {
        components: {
            'v-region-select': region,
            'v-multiSelect': multi_select,
            'v-pagination': pagination,
            'v-admin-operate': adminOperate,
            'v-audit-record': audit_record
        },
        mixins: [subPermission, recommend, setPage],
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
                // 分类
                activityType: [],
                // 省市区
                region: {},
                // 列表数据
                items: [],
                // 请求参数
                dataParams: {
                    technologyId: '',
                    // 技术分类
                    title: '',
                    // 活动名称
                    activityType: null,
                    // 活动分类
                    applyScopeId: '',
                    // 适应范围
                    orgId: this.$ls.get('baseInfo') ? this.$ls.get('baseInfo')[this.$ls.get('userIdentity')].id : null,
                    // 机构id
                    schoolId: '',
                    // 学校id
                    provinceId: null,
                    // 省级id
                    cityId: null,
                    // 城市id
                    areaId: null,
                    // 区县id
                    auditStatus: '',
                    // 状态
                    createDate: '',
                    // 发布时间
                    beginDate: '',
                    // 活动开始时间
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
             * 获取活动列表
             */
            getData() {
                this.dataParams.activityType = this.activityType.join('-')
                requestActivityList(this.dataParams, this.pageParam).then(response => {
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
            /*
             * 推荐
             * { "relationIds": ["活动ID"] , "recommendType": 9 }
             */
            doRecommend({data: item} = {data}) {
                let params = { relationIds: [], recommendType: 9 },
                    flag   = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    for( let i = 0; i < item.length; i++ ) {
                        if(item[i].auditStatus !== 1 || this.isRecommend(item[i])) {
                            flag = true
                            break
                        }
                    }
                    if(flag) {
                        this.$message({ message: '只能推荐审核通过且未推荐的活动' })
                    } else {
                        this.recommendOperate(item, params, 9)
                    }
                } else {
                    this.$message({ message: '请选择要推荐的活动' })
                }
            },
            //取消推荐
            cancelRecommend({data: item} = {data}) {
                let params = { relationIds: [] },
                    flag   = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    for( let i = 0; i < item.length; i++ ) {
                        if( !this.isRecommend(item[i]) ) {
                            flag = true
                            break
                        }
                    }
                    if(flag) {
                        this.$message({ message: '您选择的活动中包含了未推荐的活动' })
                    } else {
                        this.recommendOperate(item, params, 9, true)
                    }
                } else {
                    this.$message({ message: '请选择要取消推荐的活动' })
                }
            },
            /*
             * 审核记录
             * { "activityId": ["活动ID"] }
             */
            doRecord({data: item} = {data}) {
                requestActivityAuditDetail({activityId: item.id}).then(response => {
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
             * [{ "id": ["活动ID"], isHot: 1/0 }]
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
                        this.$message({ message: '只能设置审核通过的活动' })
                    } else {
                        this.$confirm(`此操作将该活动${handleTxt}热门，是否继续？`, `${handleTxt}热门`, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            customClass: '__custom-msg-box'
                        }).then(() => {
                            item.forEach(x => {
                                params.push({ id: x.id, isHot: value })
                            });
                            hotActivity(params).then(response => {
                                if (response.data.code == 200) {
                                    item.forEach(x => {
                                        x.isHot = value
                                    })
                                    this.$message({message: `${handleTxt}热门成功`, type: 'success'})
                                    this.getData()
                                } else {
                                    this.$message.error(response.data.msg)
                                }
                            })
                        }).catch(() => {})
                    }
                } else {
                    this.$message({ message: '请选择要设置的活动' })
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
                    this.$confirm('确定要删除该数据吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delActivity(params).then((res) => {
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
                    this.$message({message: '请选择要删除的数据'})
                }
            },
            // 撤销审核
            cancelAudit(item) {
                this.$confirm('此操作将撤销该活动的审核，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    const params = {
                        id: item.data.id
                    }
                    requestActivityCancelAudit(params).then((res) => {
                        if (res.data.code === 200) {
                            this.$message({ type: 'success', message: '撤销成功' })
                            this.getData()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }).catch(() => {})
            },
            // 判断是否可以取消热门
            isNoHot(item) {
                return Number(item.auditStatus) === 1 && Number(item.isHot) !== 1
            },
            // 判断是否可以设为热门
            isHot(item) {
                return Number(item.auditStatus) === 1 && Number(item.isHot) === 1
            },
            // 判断是否可以推荐
            isNoRecommend(item) {
                return Number(item.auditStatus) === 1 && Number(item.recommend) !== 1
            },
            //判断是否可以取消推荐
            isRecommend(item) {
                return Number(item.recommend) === 1
            },
            // 判断是否已审
            isAudited(item) {
                return Number(item.auditStatus) === 1
            },
            // 判断是否进入审核流程
            isInAuditing(item) {
                return Number(item.auditStatus) > 0
            },
            isCancel(item) {
                return Number(item.auditStatus) === 0 || Number(item.auditStatus) === 3 || Number(item.auditStatus) === 1
            },
            // 关闭弹框
            close() {
                this.auditRecordVisible = false
            },
            resetSearchForm() {
                this.activityType = []
                this.$refs.region.checkedItems = []
                this.dataParams = Object.assign({}, this._dataParams, {name: this.dataParams.name})
                this.screeningDropdown = false
            }
        },
        computed: {
            // 学段数据
            ...mapState('dictionaryCommon', {
                applyScopeIdOptions (state) {
                    let dicList = (state['periodKeyDicList'] || {}).dicList || []
                    return dicList
                },
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
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
