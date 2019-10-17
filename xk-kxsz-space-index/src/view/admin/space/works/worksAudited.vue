<!-- 已审 -->
<template>
    <div>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.workName" @keyup.native.enter="changePage(1)" placeholder="请输入作品名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-if="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="作品分类">
                        <v-multiSelect :selectData.sync='workType' :ifAll="false" :model="'works'" :clearable="true"></v-multiSelect>
                    </el-form-item>
                    <el-form-item label="作者身份">
                        <el-select v-model="dataParams.identity" placeholder="请选择归属作品" clearable>
                            <el-option v-for="item in identityOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
            recommend: doRecommend,
            norecommend: cancelRecommend,
            hot: handleHot,
            nohot: handleHot
        }"></v-admin-operate>
        <!-- 作品列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="workName" label="作品名称" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-hot" v-if="scope.row.isHot">热</el-tag>
                    <el-tag class="__color-success" v-if="Number(scope.row.recommend)">荐</el-tag>
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/space/works/detail', query: {id: scope.row.id} }">{{scope.row.workName}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="作品分类" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.workTypeName}}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="作者" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createDate" label="上传时间" show-overflow-tooltip>
                <template scope="scope">
                    {{ scope.row.createDate | dateFormat('yyyy.MM.dd') }}
                </template>
            </el-table-column>
            <el-table-column prop="identity" label="作者身份" show-overflow-tooltip width="100">
                <template scope="scope">
                    {{scope.row.identity | translate(identityOptions, { key:'id' } )}}
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
            <el-table-column label="操作" fixed="right" width="360">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        recommend: { callback: doRecommend, isActive: isNoRecommend },
                        norecommend: { callback: cancelRecommend, isActive: isRecommend },
                        record: {callback: doRecord, isActive: isInAuditing},
                        hot: {callback: handleHot, isActive: isHot},
                        nohot: {callback: handleHot, isActive: isNoHot}
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
                <el-table-column property="auditStatus" label="审核结果">
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
    import { recommend } from '@/mixin/recommend.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import pagination from '@/components/common/admin_pagination.vue'  // 分页组件
    import { requestWorksList, requestWorksAuditDetail, hotWorks } from '@/service/admin_space.js'  // 列表数据接口
    import dataTranslation from '@/js/dataTranslation.js'  // 翻译方法
    import adminOperate from '@/components/common/admin_operate.vue'  // 配置按钮组件
    export default {
        components: {
            'v-region-select': region,
            'v-multiSelect': multi_select,
            'v-pagination': pagination,
            'v-admin-operate': adminOperate,
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
                // 身份
                identityOptions: [
                    { name: '学生', id: '0'},
                    { name: '教师', id: '1'}
                ],
                // 分类
                workType: [],
                // 省市区
                region: {},
                // 列表数据
                items: [],
                // 请求参数
                dataParams: {
                    workName: '',
                    // 作品名称
                    workType: '',
                    // 作品类型
                    identity: '',
                    // 身份
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
             * 获取作品列表
             */
            getData() {
                this.dataParams.workType = this.workType.join('-')
                requestWorksList(this.dataParams, this.pageParam).then(response => {
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
             * { "relationIds": ["作品ID"] , "recommendType": 8 }
             */
            doRecommend({data: item} = {data}) {
                let params = { relationIds: [], recommendType: 8 },
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
                        this.$message({ message: '只能推荐审核通过且未推荐的作品' })
                    } else {
                        this.recommendOperate(item, params, 8)
                    }
                } else {
                    this.$message({ message: '请选择要推荐的作品' })
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
                        this.$message({ message: '您选择的作品中包含了未推荐的作品' })
                    } else {
                        this.recommendOperate(item, params, 8, true)
                    }
                } else {
                    this.$message({ message: '请选择要取消推荐的作品' })
                }
            },
            /*
             * 审核记录
             * { "workId": ["作品ID"] }
             */
            doRecord({data: item} = {data}) {
                requestWorksAuditDetail({workId: item.id}).then(response => {
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
             * [{ "id": ["作品ID"], isHot: 1/0 }]
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
                        if(!this.isAudited(item[i]) ) {
                            flag = true
                            break
                        }
                    }
                    if (flag) {
                        this.$message({ message: '只能设置审核通过的作品' })
                    } else {
                        this.$confirm(`此操作将该作品${handleTxt}热门，是否继续？`, `${handleTxt}热门`, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            customClass: '__custom-msg-box'
                        }).then(() => {
                            item.forEach(x => {
                                params.push({ id: x.id, isHot: value })
                            })
                            hotWorks(params).then(response => {
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
                    this.$message({ message: '请选择要设置的作品' })
                }
            },
            // 判断是否已设为热门
            isHot(item) {
                return Number(item.auditStatus) === 1 && Number(item.isHot) !== 1
            },
            // 判断是否未设为热门
            isNoHot(item) {
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
            // 判断是否已通过审核
            isAudited(item) {
                return Number(item.auditStatus) === 1
            },
            // 判断是否进入审核流程
            isInAuditing(item) {
                return Number(item.auditStatus) > 0
            },
            // 重置搜索表单
            resetSearchForm() {
                this.workType = []
                this.$refs.region.checkedItems = []
                this.dataParams = Object.assign({}, this._dataParams, {name: this.dataParams.workName})
                this.screeningDropdown = false
            }
        },
        computed: {
            // 学段数据
            ...mapState('dictionaryCommon', {
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList
                },
                technologyOptions (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList
                }
            })
        }
    }
</script>
