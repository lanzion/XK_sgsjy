<template>
    <div>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.name" @keyup.native.enter="changePage(1)" placeholder="请输入兴趣组名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="分类">
                        <v-multiSelect :selectData.sync='interestType' :ifAll="false" :model="'interest'" :clearable="true"></v-multiSelect>
                    </el-form-item>
                    <el-form-item label="区域" v-if="identity != 'school'">
                        <v-region-select @region="changeRegion" :rangeItems="rangeItems" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="学校" v-if="identity != 'school'">
                        <el-select v-model="search.schoolId" placeholder="请选择学校" filterable clearable>
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
            norecommend: cancelRecommend
        }"></v-admin-operate>
        <!-- 兴趣组所有列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="name" label="兴趣组名称" sortable show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-success" v-if="Number(scope.row.recommend)">荐</el-tag>
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/base/interest/detail', query: {id: scope.row.id} }">{{scope.row.name}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="interestTypeFormat" label="分类" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="memberCount" label="成员数" sortable width="100"></el-table-column>
            <el-table-column prop="auditStatus" label="状态" sortable width="90">
                <template scope="scope">
                    <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
                        {{scope.row.auditStatus | translate(auditStatusDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="areaName" label="所在区域" show-overflow-tooltip></el-table-column>
            <el-table-column prop="schoolName" label="学校名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createName" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip sortable width="120">
                <template scope="scope">
                    {{scope.row.createDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        recommend: { callback: doRecommend, isActive: isRecommend },
                        norecommend: { callback: cancelRecommend, isActive: isNoRecommend },
                        record: popupAudit,
                        cancelAudit: { callback: cancelAudit, isActive: isCancel },
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
    import { recommend } from '@/mixin/recommend.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { doRecommend, cancelRecommend, requestSchoolList } from '@/service/common.js'
    import { requestBaseInterest, requestInterestAuditRecord, cancelAuditInterest } from '@/service/admin_base.js'
    import adminOperate from '@/components/common/operate.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import multi_select from '@/components/common/select/multi_select.vue'  // 分类下拉
    import audit_record from '@/components/common/popup/audit_record.vue' //审核记录弹窗
    export default {
        name: 'interest_audited',
        mixins: [subPermission, recommend, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-region-select': region,
            'v-multiSelect': multi_select,
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
                schoolOptions: [],           // 学校数据
                auditVisible:false,          // 审核记录弹窗是否可见
                auditResult:'',              // 审核结果
                search: {
                    name: '',
                    schoolId: ''
                },
                _search: {},
                interestType: [],           // 兴趣组分类
                region: {},
                items: [],
                checkedItems: [],           // 选中项
                curId: null,                // 当前编辑数据ID
                auditData: [],               // 审核记录数据
                identity:'',
                rangeItems: '-1'              //区域范围
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            params: function() {
                this.search.interestType = this.interestType.join('-')
                return Object.assign( {}, this.search, this.region, this.pageParam );
            }
        },
        // watch: {
        //     params: {
        //         handler: function(val,oldVal) {
        //             this.getData()
        //         },
        //         deep: true
        //     }
        // },
        created(){
            this.identity = this.$ls.get('userIdentity')
            if (this.identity === 'school') {
                this.search.schoolId = this.$ls.get('loginInfo').userInfo.baseId
            } else if (this.identity === 'education') {
                let _region = {}
                let edu = this.$ls.get('baseInfo').baseInfo
                _region.provinceId = edu.province
                _region.cityId = edu.city
                _region.areaId = edu.area
                this.$set(this.$data, 'region', _region)
                this.rangeItems = edu.id
            } else {
                this.rangeItems = '-1'
            }
        },
        mounted() {
            this._search = Object.assign( {}, this.search )
            this.getData();
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
             * 获取兴趣组列表
             */
            getData() {
                requestBaseInterest(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    }
                })
            },
            /*
             * 推荐
             * { "relationIds": ["兴趣组ID"] , "recommendType": 11 }
             */
            doRecommend({data: item} = {data}) {
                let params = { relationIds: [], recommendType: 11 },
                    flag   = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    for( let i = 0; i < item.length; i++ ) {
                        if(item[i].auditStatus === 0 || this.isNoRecommend(item[i])) {
                            flag = true
                            break
                        }
                    }
                    if(flag) {
                        this.$message({ message: '只能推荐审核通过且未推荐的兴趣组' })
                    } else {
                        this.recommendOperate(item, params, 11, false)
                    }
                } else {
                    this.showMessage('warning', '请选择要推荐的兴趣组')
                }
            },
            // 取消推荐
            cancelRecommend({data: item} = {data}) {
                let params = { relationIds: [] },
                    flag   = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    for( let i = 0; i < item.length; i++ ) {
                        if(this.isRecommend(item[i])) {
                            flag = true
                            break
                        }
                    }
                    if(flag) {
                        this.$message({ message: '您选择的学生中包含了未推荐的兴趣组' })
                    } else {
                        this.recommendOperate(item, params, 11, true)
                    }
                } else {
                    this.showMessage('warning', '请选择要取消推荐的兴趣组')
                }
            },
            // 撤销审核
            cancelAudit(item) {
                this.$confirm('此操作将撤销该兴趣组的审核，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    const params = {
                        id: item.data.interestId
                    }
                    cancelAuditInterest(params).then((res) => {
                        if (res.data.code === 200) {
                            this.$message({ type: 'success', message: '撤销成功' })
                            this.getData()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }).catch(() => {})
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
                        this.schoolOptions = response.data.appendInfo.comboxList
                    }
                })
            },
            // 分页改变
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
            // 关闭弹框
            close() {
                this.auditVisible = false;
            },
            //获取审核记录
            popupAudit({data = {},index} = {data, index}){
                requestInterestAuditRecord({interestId: data.id}).then((res) => {
                    if(res.data.code === 200){
                        this.auditData = res.data.appendInfo.list
                    }
                });
                this.auditVisible = true;
            },
            // 判断是否可推荐
            isRecommend(item) {
                let flag = Number(item.recommend) === 0 && Number(item.auditStatus) === 1
                return flag
            },
            // 判断是否可取消推荐
            isNoRecommend(item) {
                return Number(item.recommend)
            },
            isCancel(item) {
                return Number(item.auditStatus) === 0 || Number(item.auditStatus) === 3
            },
        }
    }
</script>