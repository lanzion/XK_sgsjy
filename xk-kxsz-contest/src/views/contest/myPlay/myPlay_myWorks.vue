<template>
    <div class="myPlay_myWorks bgc_w">
        <h4 class="head-tit">我的作品</h4>
        <div class="content-box">
            <section class="option-box clearfix">
                <v-search class="fl" :tips="tips" @search="getSearch"></v-search>
                <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
                <button type="button" class="fr group_button cancel ml15" @click="multipleDel">删除</button>
                <router-link :to="{ path: 'uploadWork', query: Object.assign($route.query) }">
                    <button type="button" class="fr group_button cancel">上传</button>
                </router-link>
                <div v-show="screeningDropdown" class="bs-screening_wrap">
                    <el-form :inline="true" :model="search" class="bs-screening_box">
                        <el-form-item label="审核状态">
                            <el-select v-model="search.auditStatus" placeholder="请选择分类" filterable clearable>
                                <el-option v-for="item in auditStatusDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在赛程">
                            <el-select v-model="search.phaseId" placeholder="请选择分类" filterable clearable>
                                <el-option v-for="item in phaseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="bs-screening-btn">
                        <button type="button" @click="getMemberList">确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                    </div>
                </div>
            </section>
            <!-- 参赛人员列表 -->
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="name" label="作品名称" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <router-link :to="{ path: 'myWorks/detail/comment', query: { id: $route.query.id, worksId: scope.row.id, type: $route.query.type } }" style="color: #23b8ff;">{{ scope.row.name}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="上传时间" show-overflow-tooltip width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="auditStatus" label="审核状态" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.auditStatus | translate(auditStatusDL) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="phaseName" label="所在赛程"></el-table-column>
                <el-table-column prop="browseNum" label="浏览数" show-overflow-tooltip width="80"></el-table-column>
                <el-table-column prop="praiseNum" label="点赞数" show-overflow-tooltip width="80"></el-table-column>
                <!-- <el-table-column prop="score" label="评分" show-overflow-tooltip width="80"></el-table-column> -->
                <!-- <el-table-column prop="auditStatus" label="操作"> -->
                    <!-- <template slot-scope="scope"> -->
                        <!-- <button type="button" class="btn" :class="{'disabled': !!scope.row.isAlloc}" :disabled="!!scope.row.isAlloc" @click="singleDel(scope.row)">删除</button> | -->
                        <!-- <button type="button" class="btn" @click="matchRecord(scope.row.id)">参赛记录</button> -->
                    <!-- </template> -->
                </el-table-column>
            </el-table>
            <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
            <v-record :visible="visible" :recordList='recordList'></v-record>
        </div>
    </div>
</template>

<script>
import search from '@/components/common/search.vue'
import { requestMatchWorksList, requestPhaseList, requestMatchWorksDel, requestRecordsList } from '@/service/matchEntrance.js'
import { projectList } from '@/mixin/projectList.js'
import { mapState } from 'vuex'
import pagination from '@/components/common/pagination.vue'  // 分页组件
import record from '@/components/common/dialog/compete_record.vue'

export default {
    name: 'contest_member',
    mixins: [projectList],
    components: {
        'v-search': search,
        'v-pagination': pagination,
        'v-record': record
    },
    data() {
        return {
            visible: {
                show: false
            },
            tips: '请输入作品名称',
            items: [],
            checkedItems: [],
            screeningDropdown: false, // 高级搜索显示控制
            search: {
                matchId: this.$route.query.id,
                name: '',
                auditStatus: '',
                phaseId: '',
            },
            phaseList: [],
            pageParam: {
                pageSize: 10,
                pageNum: 1,
                totalNum: 1,
            },
            recordList: [],
            csList: []
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            // 审核状态
            auditStatusDL(state) {
                const dicList = (state.auditStatusDicList || {}).dicList || []
                this.csList = (state.contestStatusDicList || {}).dicList || []
                return dicList
            }
        })
    },
    mounted() {
        this.getMemberList()
        requestPhaseList({ matchId: this.$route.query.id }).then((res) => {
            if (res.data.code === 200) {
                this.phaseList = res.data.appendInfo.list
            }
        })
    },
    methods: {
        // 参赛记录
        matchRecord(id) {
            this.visible.show = true
            requestRecordsList({ matchId: this.$route.query.id, worksId: id }).then((res) => {
                if (res.data.code === 200) {
                    this.recordList = res.data.appendInfo.matchRecordsList
                }
            })
        },
        // 改变分页
        changePage(val) {
            this.pageParam.pageNum = val
            this.getMemberList()
        },
        // 单个删除
        singleDel(item) {
            if (item.auditStatus === 1) {
                this.$message({
                    message: '只能删除待审核和未通过的作品'
                })
            } else {
                const delArr = [{ id: item.id }]
                requestMatchWorksDel(delArr).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getMemberList()
                    } else {
                        this.$message({
                            message: res.data.msg
                        })
                    }
                })
            }
        },
        // 多个删除
        // 0待审核 1通过 2未通过   0未开始 1进行中  2已结束
        multipleDel() {
            if (this.checkedItems.length === 0) {
                this.$message({
                    message: '请选择删除作品'
                })
            } else if (this.checkedItems.some(i => i.auditStatus === 1)) {
                console.log('多个删除22', this.checkedItems)
                this.$message({
                    message: '只能删除待审核和未通过的作品'
                })
            } else {
                const delArr = this.checkedItems.map(i => ({
                    id: i.id
                }))
                requestMatchWorksDel(delArr).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getMemberList()
                    } else {
                        this.$message({
                            message: res.data.msg
                        })
                    }
                })
            }
        },
        getSearch(val) {
            this.search.name = val
            this.getMemberList()
        },
        // 改变选中项
        changeSelection(checked) {
            this.checkedItems = checked
        },
        // 重置筛选
        resetSearchForm() {
            this.search = Object.assign({}, { name: '', auditStatus: '', phaseType: '' })
            this.screeningDropdown = false
        },
        getMemberList() {
            requestMatchWorksList(this.search, this.pageParam).then((res) => {
                // auditStatus审核状态
                if (res.data.code === 200) {
                    this.items = res.data.entity.resultData
                    this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        }
    }
}
</script>

<style lang='scss'>
@import '~@/assets/css/scss/contest_manage.scss';
.myPlay_myWorks {
    .el-dialog {
        width: 564px;
    }
}
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.myPlay_myWorks {
    .head-tit {
        font-size: 16px;
        padding: 15px 15px 10px;
        border-bottom: 1px solid #ddd;
    }
    .content-box {
        padding: 20px 15px 20px;
        .option-box {
            margin-bottom: 25px;
        }
        .audit-btn {
            color: $theme-color;
            &:hover{
                color: $theme-color;
            }
        }
    }
    .btn {
        border: none;
        color: #0994EF;
        &:hover {
            color: $theme-color;
        }
        &.disabled {
            color: #999;
        }
    }
}
</style>
