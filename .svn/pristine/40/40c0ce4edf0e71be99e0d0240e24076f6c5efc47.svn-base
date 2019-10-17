<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.title" @keyup.native.enter="changePage(1)" placeholder="请输入竞赛主题"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: doDel
        }"></v-admin-operate>
        <!-- 赛事列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="竞赛主题" show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/contest/match/detail', query: {id: scope.row.id} }">{{scope.row.title}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="projectListString" label="赛事项目" show-overflow-tooltip></el-table-column>
            <el-table-column prop="singleMaxNum" label="最少作品限制" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{ Number(scope.row.singleMaxNum) || '不限' }}
                </template>
            </el-table-column>
            <el-table-column prop="actorType" label="竞赛人群" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.actorType | translate(actorTypeDL)}}
                </template>
            </el-table-column>
            <el-table-column prop="matchStartDate" label="赛事时间" width="200" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.matchStartDate | dateFormat('yyyy.MM.dd')}} - {{scope.row.matchEndDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="enrollStartDate" label="报名时间" width="200" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.enrollStartDate | dateFormat('yyyy.MM.dd')}} - {{scope.row.enrollEndDate | dateFormat('yyyy.MM.dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="actorGroup" label="竞赛分组" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.actorGroup | translate(actorGroupDL, { key: 'id' })}}
                </template>
            </el-table-column>
            <el-table-column prop="actorWay" label="竞赛形式" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.actorWay | translate(actorWayDL)}}
                </template>
            </el-table-column>
            <el-table-column prop="matchGrade" label="竞赛级别" width="90" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.matchGrade | translate(matchGradeDL)}}
                </template>
            </el-table-column>
            <el-table-column label="竞赛区域" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="270">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        //edit: { query: { id: 'id' } },
                        edit: { query: { id: 'id' }, isActive: isNoRelease },
                        del: { callback: doDel, isActive: isnRelease },
                        start: { callback: doRelease, isActive: isNoRelease },
                        stop: { callback: doOver, isActive: isRelease },
                        center: { query: { id: 'id' }, isActive: isRelease }
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
    import {
        requestContest,
        delContest,
        releaseContest,
        overContest
    } from '@/service/admin_contest.js'
    import dataTranslation from '@/js/dataTranslation.js'
    import { baseInfo, userIdentity } from '@/js/getUserInfo.js'
    import adminOperate from '@/components/common/admin_operate.vue'

    export default {
        name: 'contestManage',
        mixins: [subPermission, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination
        },
        data() {
            return {
                search: {
                    title: ''
                },
                items: [],
                checkedItems: [],            // 选中项
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                actorGroupDL (state) {
                    let dicList = (state['periodKeyDicList'] || {}).dicList || []
                    return dicList
                },
                actorWayDL (state) {
                    let dicList = (state['actorWayDicList'] || {}).dicList || []
                    return dicList
                },
                actorTypeDL (state) {
                    let dicList = (state['actorTypeDicList'] || {}).dicList || []
                    return dicList
                },
                matchGradeDL (state) {
                    let dicList = (state['matchGradeDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            params: function() {
                return Object.assign( {}, this.search, this.pageParam )
            }
        },
        created() {
            if (this.$ls.get('userIdentity') === 'education') {
                let edu = this.$ls.get('baseInfo').baseInfo
                this.rangeItems = edu.id
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            /*
             * 获取竞赛列表
             */
            getData() {
                requestContest(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity
                        this.items = _data.resultData || []
                        this.$set(this.pageParam, 'totalNum', _data.totalNum)
                    } else {
                        this.showMessage('error', response.data.msg)
                    }
                })
            },
            // 判断状态是否已发布
            isRelease(item) {
                return Number(item.status) === 2
            },
            // 判断状态是否未发布
            isNoRelease(item) {
                return Number(item.status) === 1
            },
            // 判断是否未发布
            isnRelease(item) {
                return Number(item.status) !== 2
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
             * 发布竞赛
             * id: ''
             */
            doRelease({ data: item, model } = { data, model }){
                this.$confirm(`此操作将发布该竞赛，是否继续？`, `发布`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    releaseContest({ id: item.id }).then((res) => {
                        if(res.data.code === 200){
                            this.$message({type: 'success', message: `发布成功` })
                            item.status = 2
                        } else {
                            this.$message.error(res.data.msg)
                        }
                        this.$refs.multipleTable.clearSelection()
                    })
                }).catch(() => {})
            },
            /*
             * 终止竞赛
             * id: ''
             */
            doOver({ data: item, model } = { data, model }){
                this.$confirm(`此操作将终止该竞赛，是否继续？`, `终止`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    overContest({ id: item.id }).then((res) => {
                        if(res.data.code === 200){
                            this.$message({type: 'success', message: `终止成功` })
                            item.status = 3
                        } else {
                            this.$message.error(res.data.msg)
                        }
                        this.$refs.multipleTable.clearSelection()
                    })
                }).catch(() => {})
            },
            /*
             * 删除
             * id: id
             */
            doDel({ data: item } = { data }){
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('确定要删除该竞赛吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delContest(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({message: '删除成功', type: 'success'})
                                this.getData()
                            } else {
                                this.$message.error({ message: res.data.msg })
                            }
                            this.$refs.multipleTable.clearSelection()
                        })
                    }).catch(() => {})
                } else {
                    this.$message({message: '请选择要删除的竞赛'})
                }
            }
        }
    }
</script>