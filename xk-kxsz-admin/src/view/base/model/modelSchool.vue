<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.schoolName" @keyup.native.enter="changePage(1)" placeholder="请输入示范校名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="区域" v-if="identity != 'school'">
                        <v-region-select @region="changeRegion" ref="region" :rangeItems="rangeItems" :isAdmin="true" :clearable="true" clearable></v-region-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="search.status" placeholder="请选择状态" filterable clearable>
                            <el-option v-for="item in enableStatusDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
            enable: { callback: lockOperate, isActive: isDisable },
            disable: { callback: lockOperate, isActive: isEnable }
        }"></v-admin-operate>
        <!-- 示范校列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="schoolName" label="示范校名称" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-success" v-if="Number(scope.row.recommend)">荐</el-tag>
                    <span class="resource-name">
                        {{scope.row.schoolName}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" sortable width="90">
                <template scope="scope">
                    <el-tag :class="['__color-'+lockStatusStyle[scope.row.status]]">
                        {{scope.row.status | translate(enableStatusDL)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        recommend: {callback: doRecommend, isActive: isRecommend},
                        norecommend: { callback: cancelRecommend, isActive: isNoRecommend },
                        enable: { callback: lockOperate, isActive: isDisable },
                        disable: { callback: lockOperate, isActive: isEnable }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'Vuex'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { recommend } from '@/mixin/recommend.js'
    import { doRecommend, cancelRecommend } from '@/service/common.js'
    import { requestModelList, changeModelStatus } from '@/service/admin_base.js'

    import dataTranslation from 'Asset/js/dataTranslation.js'
    import adminOperate from '@/components/common/operate.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    export default {
        name:'teacherManage',
        mixins: [subPermission, recommend, setPage],
        components:{
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-region-select': region
        },
        data() {
            return {
                lockStatusStyle: {
                    '1': 'success',
                    '0': 'fail'
                },
                auditStatusStyle: {
                    '-1': 'pending',
                    '0': 'submit',
                    '1': 'success',
                    '2': 'fail',
                    '3': 'auditing'
                },
                // 高级筛选开关
                screeningDropdown: false,
                search: {
                    schoolName: '',
                    status: '',
                },
                _search: {},
                region: {},
                items: [],
                checkedItems: [],            // 选中项
                curItem: null,                 //当前对象
                isBatch: false,               //判断是否是批量审核
                identity:'',
                rangeItems: '-1'              //区域范围
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                enableStatusDL (state) {
                    let dicList = (state['enableStatusDicList'] || {}).dicList || []
                    return dicList
                },
            }),
            params: function() {
                return Object.assign( {}, this.search, this.region )
            }
        },
        created() {
            this.identity = this.$ls.get('userIdentity')
            if (this.identity === 'education') {
                let edu = this.$ls.get('baseInfo').baseInfo
                this.rangeItems = edu.id
            }
        },
        mounted() {
            this._search = Object.assign({}, this.search)
            this.getData()
        },
        methods:{
            resetSearchForm() {
                if(this.identity != 'school'){
                    this.$refs.region.checkedItems = []
                }
                this.search = Object.assign({}, this._search, { schoolName: this.search.schoolName })
                this.screeningDropdown = false
            },
            /*
             * 获取示范校列表
             */
            getData() {
                requestModelList(this.params, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.showMessage('error',response.data.msg);
                    }
                })
            },
            /*
             * 推荐
             * { "relationIds": ["示范校ID"] , "recommendType": 2 }
             */
            doRecommend({data: item} = {data}) {
                let params = { relationIds: [], recommendType: 16 },
                    flag   = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    for( let i = 0; i < item.length; i++ ) {
                        if(!this.isRecommend(item[i]) && !this.isLocked(item[i])) {
                            flag = true
                            break
                        }
                    }
                    if(flag) {
                        this.$message({ message: '只能推荐审核通过,未锁定和未推荐的示范校' })
                    } else {
                        this.recommendOperate(item, params, 16)
                    }
                } else {
                    this.$message({message: '请选择要推荐的示范校'});
                }
            },
            //取消推荐
            cancelRecommend({ data: item } = { data }) {
                let params = { relationIds: [] },
                    flag   = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    for( let i = 0; i < item.length; i++ ) {
                        if(!this.isNoRecommend(item[i])) {
                            flag = true
                            break
                        }
                    }
                    if(flag) {
                        this.$message({ message: '您选择的示范校中包含了未推荐的示范校' })
                    } else {
                        this.recommendOperate(item, params, 16, true)
                    }
                } else {
                    this.$message({message: '请选择要取消推荐的示范校'});
                }
            },
            // 判断是否可推荐
            isRecommend(item) {
                return (Number(item.status) == 1 && Number(item.recommend) == 0)
            },
            //判断是否可取消推荐
            isNoRecommend(item) {
                return Number(item.recommend) == 1
            },
            // 判断是否已启用
            isEnable(item) {
                return Number(item.status) == 1
            },
            // 判断是否停用
            isDisable(item) {
                return Number(item.status) == 0
            },
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.$set(this.$data, 'region', _region)
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
                this.checkedItems = checked;
            },
            /*
             * 批量锁定操作
             * id: ''
             * lockStatus：锁定状态（1：锁定，0：解锁）
             */
            lockOperate({data: item, model} = {data, model}){
                let params = [];
                let text = model == 'enable' ? '启用' : '停用';
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm(`此操作将${text}该示范校，是否继续？`, text, {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        let status = model == 'enable' ? 1 : 0
                        item.forEach(x => {
                            params.push({ schoolId: x.schoolId, status: status })
                        })
                        changeModelStatus(params).then((res) => {
                            if(res.data.code === 200){
                                this.$message({ type: 'success', message: `成功${text}` })
                                item.forEach(x => {
                                    x.status = status
                                })
                            }else{
                                this.$message.error(res.data.msg)
                            };
                            this.$refs.multipleTable.clearSelection();
                        })
                    }).catch(() => {})
                } else {
                    this.$message({ message: `请选择要${text}的示范校` })
                }
            }
        }
    }
</script>

<style lang="scss">
.dialog-audit{
    .el-dialog{
        min-width: 470px;
    }
    .radio-box{
        margin: 40px 0;
        text-align: center;
    }
}
</style>
