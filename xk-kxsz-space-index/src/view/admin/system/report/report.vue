<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search" placeholder="请输入举报内容"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="getData">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': isDropdown }" @click="isDropdown = !isDropdown"></button>
            <div class="bs-screening_box" v-if="isDropdown">
                <span>举报原因: </span>
                <el-select v-model="reportContent.value" placeholder="举报原因" >
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in reportContent.options" :key="item.value" :label="item.value" :value="item.value"></el-option>
                </el-select>
                <span style="margin-left:30px;">处理状态: </span>
                <el-select v-model="handleStatus.value" placeholder="处理状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in handleStatus.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <span style="margin-left:30px;">处理结果: </span>
                <el-select v-model="resultStatus.value" placeholder="处理结果">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in resultStatus.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
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
                    <!-- {{scope.row.handleStatus | translate(handleStatusDL)}} -->
                    <span v-if="scope.row.handleStatus === 1">已处理</span>
                    <span v-else>未处理</span>
                </template>
            </el-table-column>
            <el-table-column label="处理结果" show-overflow-tooltip>
                <template scope="scope">
                    <span v-if="scope.row.handleStatus">{{scope.row.resultStatus | translate(resultStatusDL)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
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
    import delPopover from '@/components/common/del_popover.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { reportList, reportFunc } from '@/service/admin_system.js'
    import dataTranslation from '@/js/dataTranslation.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import { mapState } from 'Vuex'
    export default {
        name: 'systemReport',
        components: {
            'v-pagination': pagination,
            'del-popover': delPopover,
            'v-admin-operate': adminOperate
        },
        mixins: [subPermission, setPage],
        data() {
            return {
                isDropdown: false,
                reportContent: {
                    value: '',
                    options: [
                        { value: '色情淫秽' },
                        { value: '骚扰谩骂' },
                        { value: '广告欺骗' },
                        { value: '反动' },
                        { value: '其他' }
                    ]
                },
                handleStatus: {
                    value: '',
                    options: [
                        { label: '未处理', value: 0 },
                        { label: '已处理', value: 1 }
                    ]
                },
                resultStatus: {
                    value: '',
                    options: [
                        { label: '属实', value: 0 },
                        { label: '不属实', value: 1 }
                    ]
                },
                search: '',
                items: [],
                checkedItems: []
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let param = {
                    commentContent: this.search, // 评论内容
                    handleStatus: this.handleStatus.value,  // 处理结果
                    resultStatus: this.resultStatus.value,  // 处理状态
                    reportContent: this.reportContent.value  // 举报原因
                }
                reportList( param, this.pageParam ).then(res => {
                    if (res.data.entity) {
                        this.items = res.data.entity.resultData
                        this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum);
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
                    status = 0
                    text = '属实'
                } else {
                    status = 1
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
                let flag = item.handleStatus != 1 || item.resultStatus === 0
                return flag
            },
            isDisproved(item) {
                let flag = item.handleStatus != 1 || item.resultStatus === 1
                return flag
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
            params: function() {
                return Object.assign( {}, this.reportContent.value, this.handleStatus.value, this.resultStatus.value );
            }
        },
        watch: {
            params: {
                handler: function (val, oldVal) {
                    this.getData();
                },
                deep: true
            }
        }
    }
</script>

