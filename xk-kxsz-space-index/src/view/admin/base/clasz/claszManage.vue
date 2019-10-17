<template>
    <div class="backend-content__middle">
        <v-tabs :tabs="tabs" :cur_tab="cur_tab" @cur_tab="setCurTab"></v-tabs>
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.className" @keyup.native.enter="changePage(1)" placeholder="请输入班级名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" v-if="identity!='school'" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-if="identity!='school'" v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="区域">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-select v-model="search.schoolId" placeholder="请选择学校" filterable clearable>
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="年级" v-if="identity == 'school'">
                        <el-select v-model="search.gradeId" placeholder="请选择年级">
                            <el-option v-for="item in gradeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            recommend: doRecommend,
            del: delClass
        }"></v-admin-operate>
        <!-- 班级列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="className" label="班级名称" show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/base/clasz/detail', query: {id: scope.row.id} }">{{scope.row.className}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="alias" label="别名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enrollmentYear" label="入学年份" width="100"></el-table-column>
            <el-table-column prop="gradeName" label="年级" width="120"></el-table-column>
            <el-table-column prop="teacherName" label="班主任"></el-table-column>
            <el-table-column prop="studentName" label="班级管理员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createDate" label="所在区域" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" fixed="right" :width="listBtnGroup.length*72">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        recommend: doRecommend,
                        del: delClass
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import tabs from '@/components/common/classificationList/classification/tabs.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestBaseClasz, delClasz, deClaszByIds } from '@/service/admin_base.js'
    import { doRecommend,requestSchoolList } from '@/service/common.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import { baseInfo, userIdentity } from '@/js/getUserInfo.js'
    import { mapState, mapActions } from 'Vuex'

    export default {
        name: 'claszManage',
        mixins: [subPermission, setPage],
        components: {
            'v-tabs': tabs,
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-region-select': region
        },
        data() {
            return {
                 // 高级筛选开关
                screeningDropdown: false,
                // 学校数据
                schoolOptions: [],
                tabs: [{}],
                cur_tab: 0,
                search: {
                    className: '',
                    status:　1,
                    schoolId: '',
                    gradeId: ''
                },
                _search: {},
                region: {},
                items: [],
                checkedItems: [],            // 选中项
                identity: userIdentity,
                gradeList: []
            }
        },
        computed: {
            params: function() {
                return Object.assign( {}, this.search, this.region, this.pageParam );
            }
        },
        mounted() {
            this._search = Object.assign( {}, this.search )
            let _tabs = [];
            this.headTabs.forEach((x, index) => {
                let _tab = {};
                _tab.name = x.name;
                _tab.type = x.menuId;
                if (x.menuId == 'studying') {
                    _tab.status = 1
                } else if (x.menuId == 'graduate') {
                    _tab.status = 2
                }
                _tabs.push(_tab)
            })
            this.$set(this.$data, 'tabs', _tabs);

            this.getData()
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            resetSearchForm() {
                this.search = Object.assign({}, this._search, { name: this.search.className })
                this.screeningDropdown = false
            },
            setCurTab(index) {
                this.cur_tab = index
                this.search = this._search
                this.$set(this.$data.search, 'status', this.tabs[index].status)
                this.$set(this.$data.pageParam, 'pageNum', 1)
                if (this.$refs.region) {
                    this.$refs.region.checkedItems = []
                }
                this.getData()
            },
            /*
             * 获取班级列表
             */
            getData() {
                requestBaseClasz(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.$message.error({message: response.data.msg});
                    }
                })
            },
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items;

                _region.provinceId = _province;
                _region.cityId = _city;
                _region.areaId = _area;
                this.region = _region
                this.search.schoolId = ''
                this.getSchoolData()
            },
            // 请求学校列表数据
            getSchoolData () {
                if( (this.region.provinceId != null) || (this.region.cityId != null) || (this.region.areaId != null) ) {
                    requestSchoolList(this.region).then(response => {
                        if (response.data.code == 200) {
                            this.schoolOptions = response.data.appendInfo.comboxList || []
                        }
                    })
                }
            },
            // 分页改变
            changePage(val) {
                this.setPageNum(val)
                this.getData()
            },
            changeSize(val) {
                console.log(val)
                this.setPageSize(val)
                this.getData()
            },
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
            /*
             * 推荐
             * { "relationIds": ["班级ID"] , "recommendType": 3 }
             */
            doRecommend({data: item} = {data}) {
                let params = { relationIds: [], recommendType: 3 }
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    item.forEach(x => {
                        params.relationIds.push(x.id)
                    });
                    doRecommend(params).then(response => {
                        if (response.data.code == 200) {
                            this.$message({message: '推荐成功', type: 'success'})
                        } else {
                            this.$message.error(response.data.msg)
                        }
                        this.$refs.multipleTable.clearSelection()
                    })
                } else {
                    this.$message({message: '请选择要推荐的班级'})
                }
            },
            /*
             * 删除
             * id: id
             */
            delClass({data: item} = {data}){
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('此操作将删除该班级，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        deClaszByIds(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({message: '删除成功', type: 'success'})
                                this.getData()
                            } else {
                                this.$message.error({message: res.data.msg})
                            };
                            this.$refs.multipleTable.clearSelection()
                        })
                    }).catch(() => {})
                } else {
                    this.$message({ message: '请选择要删除的班级' })
                }
            },
        }
    }
</script>
