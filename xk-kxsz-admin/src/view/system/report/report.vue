<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.commentContent" @keyup.native.enter="changePage(1)" placeholder="请输入举报内容"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div class="bs-screening_wrap" v-show="screeningDropdown">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="举报原因">
                        <el-select v-model="search.reportContent" placeholder="举报原因" >
                            <el-option v-for="item in reportContent" :key="item.value" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="处理状态">
                        <el-select v-model="search.handleStatus" placeholder="请选择处理状态" clearable>
                            <el-option v-for="item in handleStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="处理结果">
                        <el-select v-model="search.resultStatus" placeholder="请选择处理结果" clearable>
                            <el-option v-for="item in resultStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <!-- 项目列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column label="举报内容" show-overflow-tooltip prop="commentContent"></el-table-column>
            <el-table-column label="举报原因" show-overflow-tooltip prop="reportContent"></el-table-column>
            <el-table-column label="举报人" show-overflow-tooltip prop="userName"></el-table-column>
            <el-table-column prop="createDate" label="举报时间" sortable show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.createDate | dateFormat('yyyy.MM.dd HH:mm')}}
                </template>
            </el-table-column>
            <el-table-column label="处理状态" show-overflow-tooltip>
                <template scope="scope">
                    <span v-if="scope.row.handleStatus === 1">已处理</span>
                    <span v-else>未处理</span>
                </template>
            </el-table-column>
            <el-table-column label="处理结果" show-overflow-tooltip>
                <template scope="scope">
                    <span v-if="scope.row.handleStatus">{{scope.row.resultStatus | translate(resultStatusDL)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        unlock: { callback: doToggle, isActive: isVerified },
                        lock: { callback: doToggle, isActive: isDisproved }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { reportList, reportFunc } from '@/service/admin_system.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    import adminOperate from '@/components/common/operate.vue'
    import { mapState } from 'Vuex'
    export default {
        name: 'systemReport',
        components: {
            'v-pagination': pagination,
            'v-admin-operate': adminOperate
        },
        mixins: [subPermission, setPage],
        data() {
            return {
                screeningDropdown: false,
                reportContent: [
                    { value: '色情淫秽' },
                    { value: '骚扰谩骂' },
                    { value: '广告欺骗' },
                    { value: '反动' },
                    { value: '其他' }
                ],
                handleStatus: [
                    { label: '未处理', value: 0 },
                    { label: '已处理', value: 1 }
                ],
                resultStatus: [
                    { label: '不属实', value: 0 },
                    { label: '属实', value: 1 }
                ],
                search: {
                    commentContent: '',
                    handleStatus: '',
                    resultStatus: '',
                    reportContent: ''
                },
                items: [],
                checkedItems: []
            }
        },
        mounted() {
            this._search = Object.assign({}, this.search)
            this.getData()
        },
        methods: {
            getData() {
                reportList(this.search, this.pageParam).then(res => {
                    if (res.data.entity) {
                        this.items = res.data.entity.resultData
                        this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
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
            // 属实/不属实
            doToggle ({ data: item, model } = { data, model }) {
                let status,text
                if (model === 'lock') {
                    status = 1
                    text = '属实'
                } else {
                    status = 0
                    text = '不属实'
                }
                this.$confirm(`确定该举报${text}吗？`, '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    let param = {
                        resultStatus: status,
                        id: item.id,
                        type: item.type,
                        commentId: item.commentId,
                        handleStatus: 1
                    }
                    reportFunc(param).then(res => {
                        if(res.data.code === 200) {
                            item.resultStatus = status;
                            item.handleStatus = 1;
                        }else{
                            this.showMessage('warning',res.data.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: `取消操作` });
                })
            },
            // 判断是否属实
            isVerified(item) {
                let flag = item.handleStatus != 1 || item.resultStatus === 1
                return flag
            },
            isDisproved(item) {
                let flag = item.handleStatus != 1 || item.resultStatus === 0
                return flag
            },
            // 重置搜索表单
            resetSearchForm() {
                this.search = Object.assign({}, this._search)
                this.screeningDropdown = false
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                handleStatusDL (state) {
                    let dicList = (state['handleStatusDicList'] || {}).dicList || []
                    return dicList
                },
                resultStatusDL (state) {
                    let dicList = (state['resultStatusDicList'] || {}).dicList || []
                    return dicList
                },
            }),
        },
    }
</script>

