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
                        <v-region-select @region="changeRegion" ref="region" :rangeItems="rangeItems" :isAdmin="true" :clearable="true"></v-region-select>
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
            audit: openAuditPopup
        }"></v-admin-operate>
        <!-- 兴趣组待审列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="兴趣组名称" sortable show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/base/interest/detail', query: {id: scope.row.interestId} }">{{scope.row.name}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="interestTypeName" label="分类" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip width="180">
                <template scope="scope">
                    {{scope.row.createDate | dateFormat('yyyy.MM.dd HH:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column prop="areaName" label="所在区域" show-overflow-tooltip></el-table-column>
            <el-table-column prop="schoolName" label="学校名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" fixed="right" :width="150">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        audit: openAuditPopup,
                        record: popupAudit
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog title="审核" :visible.sync="auditPopup" size="tiny">
            <v-adminAudit :close="close" @auditSubmit="auditSubmit"></v-adminAudit>
        </el-dialog>
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
    import { doRecommend, requestSchoolList } from '@/service/common.js'
    import { requestPendingInterest, auditInterest, requestInterestAuditRecord } from '@/service/admin_base.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import multi_select from 'Common/select/multi_select.vue'  // 分类下拉
    import admin_audit from 'Common/popupWindow/admin_audit.vue' //审核记录弹窗
    import audit_record from 'Common/popupWindow/audit_record.vue' //审核记录弹窗
    export default {
        name: 'interest_pending',
        mixins: [subPermission, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-region-select': region,
            'v-multiSelect': multi_select,
            'v-adminAudit': admin_audit,
            'v-audit-record': audit_record
        },
        data() {
            return {
                screeningDropdown: false,    // 高级筛选开关
                schoolOptions: [],           // 学校数据
                search: {
                    name: '',
                    schoolId:''
                },
                _search: {},
                interestType: [],           // 兴趣组分类
                region: {},
                items: [],
                checkedItems: [],           // 选中项
                curIndex: null,             // 当前编辑数据Index
                curId: null,                // 当前编辑数据ID
                auditPopup: false,          //审核弹窗是否可见
                auditParams: [],
                auditVisible:false,          // 审核记录弹窗是否可见
                auditData: [],               // 审核记录数据
                identity:'',
                rangeItems: ''              //区域范围
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
                requestPendingInterest(this.params).then(response => {
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
                this.auditPopup = false
            },
            /*
             * 审核
             */
            openAuditPopup(item) {
                if(item.index != undefined) {
                    this.auditParams.push({id: item.data.id});
                    this.auditPopup = true
                }else if(this.checkedItems.length > 0){
                    this.checkedItems.forEach(i => {
                        this.auditParams.push({id: i.id});
                    });
                    this.auditPopup = true
                }else{
                    this.showMessage('warning','请选择要审核的兴趣组')
                }
            },
            auditSubmit (item) {
                this.auditParams.forEach(i => {
                    i.auditStatus = (item.result - 0)
                    i.remarks = item.explain
                })
                auditInterest(this.auditParams).then(res => {
                    if (res.data.code == 200) {
                        this.showMessage('success','审核成功')
                        this.getData()
                        this.close()
                    }else{
                        this.showMessage('warning',res.data.msg)
                    };
                    this.$refs.multipleTable.clearSelection();
                })
            },
            //获取审核记录
            popupAudit({data = {},index} = {data, index}){
                this.curId = data.interestId;
                this.curIndex = index;
                requestInterestAuditRecord({interestId:this.curId}).then((res) => {
                    if(res.data.code === 200){
                        this.auditData = res.data.appendInfo.list
                    }
                });
                this.auditVisible = true;
            },
        }
    }
</script>
