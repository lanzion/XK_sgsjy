<template>
    <div class="subject_checked_list">
        <div class="select-box">
            <el-select :style="{marginRight: '10px'}" v-model="selected.status" clearable placeholder="选择状态">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="subject-list">
            <ul class="list-box" v-if="itemData.length > 0">
                <li class="subject-item clearfix" v-for="(item,index) in itemData">
                    <subject-item :item="item" :auditedStatus="auditedStatus" @getSubjectList="getSubjectList"></subject-item>
                </li>
            </ul>
            <div class="empty-block" v-else>暂无数据</div>
            <v-pagination :param="param" :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
    import delPopover from 'Common/del_popover.vue'
    import pagination from 'Common/pagination.vue'
    import subjectItem from 'components/subject/subject_item_msg.vue'
    import { requestBackendSubjectList } from '@/service/subject.js'
    import { loginInfo } from 'Asset/js/getUserInfo.js'

    export default {
        name: 'subject_checked_list',
        components: {
            'del-popover': delPopover,
            'v-pagination': pagination,
            'subject-item': subjectItem
        },
        data() {
            return {
                auditedStatus: '1',
                isAudit: '',
                param: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                // 当前状态(1.申报中,2.开题,3.中期评估,4.结题验收,5.已结束)
                options: [
                    { value: 0, label: '全部状态' },
                    { value: 1, label: '立项' },
                    { value: 2, label: '开题' },
                    { value: 3, label: '中期评估' },
                    { value: 4, label: '结题验收' },
                    { value: 5, label: '已结束' }
                ],
                itemData: [],
                userId: '',
                selected: {
                    status: '',
                    name: ''
                }
            }
        },
        created() {
            this.getSubjectList(this.auditedStatus)
        },
        props: {
            search: {
                type: String,
                default: ''
            }
        },
        computed: {
            params: function () {
                return Object.assign({}, this.selected)
            }
        },
        watch: {
            search(val) {
                this.selected.name = val
            },
            params: {
                handler: function () {
                    this.getSubjectList(this.auditedStatus)
                },
                deep: true
            }
        },
        methods: {
            changePage(val) {
                this.param.pageNum = val
                this.getSubjectList(this.auditedStatus)
            },
            /*
            *获取课题列表
            */
            getSubjectList(auditedStatus) {
                if (loginInfo) {
                    const params = {
                        headUserId: loginInfo.userInfo.id,
                        auditStatus: auditedStatus,
                        status: this.selected.status === 0 ? '' : this.selected.status,
                        name: this.selected.name,
                        isAudit: this.isAudit
                    }
                    requestBackendSubjectList(params, { pageSize: 5, pageNum: this.param.pageNum }).then((res) => {
                        if (res.data.entity === null) {
                            this.itemData = []
                            this.param.totalNum = 0
                            this.$emit('totalNum', 0)
                        } else {
                            this.itemData = res.data.entity.resultData
                            this.param.totalNum = res.data.entity.totalNum
                            this.$emit('totalNum', res.data.entity.totalNum)
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .subject_checked_list{
        padding: 0 18px 20px;
        .select-box{
            margin-bottom: 20px;
        }
        .subject-list{
            .list-box{
                li{
                    padding: 20px;
                    margin-bottom: 20px;
                    border:1px solid #c9c9c9;
                }
                margin-bottom: 50px;
            }
        }
    }
</style>