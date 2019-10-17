<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.title" @keyup.native.enter="changePage(1)" placeholder="请输入竞赛主题"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            recommend: doRecommend,
            norecommend: cancelRecommend,
            del: doDel
        }"></v-admin-operate>
        <!-- 赛事列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="name" label="竞赛主题" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-success" v-if="Number(scope.row.recommend)">荐</el-tag>
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path: `/contest-${$route.params.type}/match/detail`, query: {id: scope.row.id, type: 2} }">{{scope.row.title}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="projects" label="赛事项目" show-overflow-tooltip></el-table-column>
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
            <el-table-column label="竞赛区域" width="200" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id' }, isActive: isStart },
                        del: { callback: doDel, isActive: isStart },
                        start: { callback: doRelease, isActive: isStart },
                        stop: { callback: doOver, isActive: isStop },
                        recommend: { callback: doRecommend, isActive: isNoRecommend },
                        norecommend: { callback: cancelRecommend, isActive: isRecommend },
                        center: { query: { id: 'id', type: 'type' }, isActive: isRelease, isChain: true }
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
    import {
        requestContest,
        requestContestByAdmin,
        delContest,
        releaseContest,
        overContest
    } from '@/service/admin_contest-offline.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    import { baseInfo, userIdentity } from 'Asset/js/getUserInfo.js'
    import adminOperate from '@/components/common/operate.vue'

    export default {
        name: 'contestManage',
        mixins: [subPermission, recommend, setPage],
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
                actorTypeDL (state) {
                    let dicList = (state['actorTypeDicList'] || {}).dicList || []
                    return dicList
                },
            }),
            params: function() {
                return Object.assign( {}, this.search, this.pageParam )
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            /*
             * 获取竞赛列表
             */
            getData() {
                const handler = this.$ls.get('userIdentity') === 'admin' ? requestContestByAdmin : requestContest
                handler(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = (response.data.entity || {}).resultData || []
                        this.items = _data.map(x => {
                            x.type = 2
                            return x
                        })
                        this.$set(this.pageParam, 'totalNum', _data.totalNum)
                    } else {
                        this.showMessage('error', response.data.msg)
                    }
                })
            },
            /*
             * 推荐
             * { "relationIds": ["赛事ID"] , "recommendType": 18 }
             */
            doRecommend({data: item} = {data}) {
                let params = { relationIds: [], recommendType: 18 }
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.recommendOperate(item, params, 18)
                } else {
                    this.$message({ message: '请选择要推荐的竞赛' })
                }
            },
            /*
             * 推荐
             * { "relationIds": ["赛事ID"] }
             */
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
                        this.$message({ message: '您选择的竞赛中包含了未推荐的竞赛' })
                    } else {
                        this.recommendOperate(item, params, 18, true)
                    }
                } else {
                    this.$message({ message: '请选择要取消推荐的竞赛' })
                }
            },
            // 判断是否已推荐
            isRecommend(item) {
                return Number(item.recommend) === 1
            },
            // 判断是否未推荐
            isNoRecommend(item) {
                return Number(item.recommend) !== 1
            },
            isStart(item) {
                return this.isNoRelease(item) && this.isCreator(item)
            },
            isStop(item) {
                return this.isRelease(item) && this.isCreator(item)
            },
            isDel(item) {
                return !this.isRelease(item) && this.isCreator(item)
            },
            // 判断状态是否已发布(1.未发布 2.已发布 3.已终止)
            isRelease(item) {
                return Number(item.status) === 2
            },
            // 判断状态是否未发布
            isNoRelease(item) {
                return Number(item.status) === 1
            },
            isCreator(item) {
                return item.createId == this.$ls.get('loginUId')
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