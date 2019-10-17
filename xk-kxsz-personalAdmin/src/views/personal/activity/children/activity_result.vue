<template>
    <section class="admin_activity_result">
        <div class="btn-group" v-if="ifAdmin || isCreater || isMember">
            <upload-result :visible.sync="visible" :callback="getActivityResult"></upload-result>
            <button class="psn-cancel-btn fr" @click="visible.show = true">上传成果</button>
        </div>
        <el-table class="data-table" :data="resultList" style="width: 100%">
            <el-table-column prop="name" label="成果名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <a href="javaScript:;" style="color:#00a0e9;">{{scope.row.name}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="上传人" width="240"></el-table-column>
            <el-table-column prop="createDate" label="上传时间" width="240">
                <template slot-scope='scope'>
                    {{scope.row.createDate | dateFormat("yyyy-MM-dd")}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160" v-if="$ls.get('loginInfo')">
                <template slot-scope="scope">
                    <del-popover v-if="ifAdmin || isCreater" title="删除" class="delete" :delData="{ url:'maker/activity/resource/del', params:{id: scope.row.id}, name:'成果' }" v-on:callback="getActivityResult"></del-popover>
                    <a :href="downloadUrl(scope.row.resourceId, scope.row.name)" :download="scope.row.name"><i title="下载" class="icon-btn-download" style="vertical-align: top;"></i></a>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param="pageParam" :changePage="changePage"></v-pagination>
    </section>
</template>

<script>
// import { fileBaseUrl } from 'Asset/js/common-config.js'
import uploadResult from 'components/activity/upload_result.vue'
import delPopover from 'Common/del_popover.vue'
import pagination from 'Common/pagination.vue'
import { requestActivityResult } from '@/service/activity.js'

export default {
    name: 'activity_result',
    components: {
        'del-popover': delPopover,
        'upload-result': uploadResult,
        'v-pagination': pagination
    },
    data() {
        return {
            // fileBaseUrl,
            visible: {
                show: false
            },
            resultList: [],
            pageParam: {
                totalNum: 0,
                pageSize: 10,
                pageNum: 1
            },
            ifAdmin: false
        }
    },
    props: {
        isMember: {
            type: Boolean,
            default: false
        },
        isCreater: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.ifAdmin = this.$route.path.includes('admin')
    },
    mounted() {
        this.getActivityResult()
    },
    methods: {
        changePage(val) {
            this.pageParam.pageNum = val
            this.getActivityResult()
        },
        getActivityResult() {
            requestActivityResult({ activityId: this.$route.query.id }, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.resultList = res.data.entity.resultData
                    this.pageParam.totalNum = res.data.entity.totalNum
                }
            })
        },
    }
}
</script>
<style lang='scss'>
@import '~@/assets/css/scss/table.scss';
.delete,.download{
	color: #00a0ea;
    cursor: pointer;
}
.admin_activity_result{
    .data-table{
        .el-table__body-wrapper{
            td{
                text-align: center;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .admin_activity_result{
        padding: 5px 15px 15px;
    }
    .btn-group{
        width: 100%;
        margin-bottom: 10px;
        button{
            width: 92px;
            height: 40px;
            color: $theme_color;
            border:1px solid $theme_color;
            margin-bottom: 15px;
        }
        button:hover{
            background-color: $theme_color;
            color: #fff;
        }
    }
</style>