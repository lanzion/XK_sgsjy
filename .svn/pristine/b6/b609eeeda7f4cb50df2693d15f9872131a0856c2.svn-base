<template>
    <div id="projectRowList">
        <ul class="project_ul" v-if="listData.length">
            <li class="project_li clearfix" v-for="(item, index) in listData" :key="index">
                <div :style="{backgroundImage: 'url(' + fileBaseUrl + item.imgUrl + ')'}" class="img">
                    <div class="tips" v-if="auditStatus == 1">
                        <p class="initiate" v-if="item.status == 1">项目发起</p>
                        <p class="prepare" v-if="item.status == 2">项目准备</p>
                        <p class="design" v-if="item.status == 3">项目设计</p>
                        <p class="making" v-if="item.status == 4">原型制作</p>
                        <p class="iteration" v-if="item.status == 5">测试迭代</p>
                        <p class="appraise" v-if="item.status == 6">项目评价</p>
                        <p class="end" v-if="item.status == 7">已结束</p>
                    </div>
                    <div class="tips" v-else>
                        <p class="submit" v-if="item.auditStatus == -1">待提交</p>
                        <p class="pending" v-if="item.auditStatus == 0">待审核</p>
                        <p class="no-pass" v-if="item.auditStatus == 2">不通过</p>
                        <p class="audit" v-if="item.auditStatus == 3">审核中</p>
                    </div>
                </div>
                <div class="list_content fr">
                    <h2 class="list_title">
                        <router-link :to="{ path: '/admin/project/review', query: {'id': item.id}}" v-if='ifStatus'> {{item.name}} </router-link>
                        <router-link :to="{ path: '/admin/project/preview', query: {'id': item.id}}" v-else> {{item.name}} </router-link>
                        <span>{{item.startDate | dateFormat('yyyy.MM.dd')}}--{{item.endDate | dateFormat('yyyy.MM.dd')}}</span>
                        <div class="option-box fr"  v-if='ifStatus == false'>
                            <operate @on-delete="del(item.id)" @on-edit="edit(item.id)" @on-submit="submit(item.id)" :icon-group="generateIconGroup(item.auditStatus)" label="项目" v-if="!ifStatus"></operate>
                        </div>
                    </h2>
                    <p class="list_p">{{item.content | textOverflow('80')}}</p>
                    <p class="list_p" :class="{ ifStatus: !ifStatus} ">项目分类: {{item.projectTypeName}}
                        <div class="status" v-if='ifStatus == true'>
                            <el-steps :space="100" :active="item.status" finish-status="success" :align-center="true">
                              <el-step v-for="(item,index) in statusData" :title="item" :key="index"></el-step>
                            </el-steps>
                        </div>
                    </p>
                    <button @click="showRecordDialog(item.id)" class="btn-verify-record pa" v-if="auditStatus == 0">审核记录</button>
                </div>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <v-pagination :param.sync='pageParam' :changePage="changePage"></v-pagination>
        <verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'projectId'}" />
    </div>
</template>

<script>
import operate from 'components/common/operate.vue'
import pagination from 'Common/pagination.vue';
import delPopover from 'Common/del_popover.vue';
import { adminProjectList } from '@/service/project.js'
import { fileBaseUrl } from '@/js/common-config.js'
import verifyRecordDialog from 'components/my/verify_record_dialog.vue'
import { projectTeaStuListDel, projectTeaStuSubmitAudit } from '@/service/project.js'
export default {
    name: 'projectRowList',
    props: ['selected','search'],
    data () {
        return {
            api: '/maker/projectAudit/selectList',
            dialog: {isVisible: false},
            curRecordId: '', // 当前审核记录ID
            fileBaseUrl,
            //页码信息
            pageParam: {
                pageNum:1,
                pageSize: 5,
                totalNum: 1
            },
            auditStatus: 1,
            ifStatus: true,
            statusData: [
                "项目发起",
                "项目准备",
                "项目设计",
                "原型制作",
                "测试迭代",
                "项目评价"
            ],
            listData: []
        }
    },
    components: {
        'v-pagination': pagination,
        'del-popover': delPopover,
        operate,
        verifyRecordDialog
    },
    created() {
        this.routeChange()
    },
    methods: {
        generateIconGroup (status) {
            const edit = status === -1 || status === 2 ? 'edit' : ''
            const submit = status === -1 && 'submit' || ''
            const del = edit ? 'delete' : ''
            return [edit, submit, del]
        },
        showRecordDialog (id) { // 显示审核记录弹窗
            this.curRecordId = id
            this.dialog.isVisible = true
        },
        edit (id) { // 编辑
            this.$router.push({ path:'/admin/project/publish', query:{id} })
        },
        del (id) { // 删除
            projectTeaStuListDel({id}).then(res => {
                if (res.data.code === 200) {
                    this.$message({
                        message: '成功项目课程',
                        type: 'success'
                    })
                    this.getData({technologyId: this.selected.technology, name: this.search, projectType: this.selected.classification.join('-'), applyScopeId: this.selected.period, isTeacherAudit: this.auditStatus}, this.pageParam)
                    return
                }
                this.$message.error('删除项目失败，请重试')
            }, () => {
                this.$message.error('删除项目失败，请重试')
            })
        },
        submit (id) { // 提交审核
            this.$confirm('此操作将该项目提交审核, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: '__custom-msg-box'
            }).then(() => {
                projectTeaStuSubmitAudit({id}).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({
                          message: '成功提交审核',
                          type: 'success',
                          duration: 1500
                        })
                        this.getData({technologyId: this.selected.technology, name: this.search, projectType: this.selected.classification.join('-'), applyScopeId: this.selected.period, isTeacherAudit: this.auditStatus}, this.pageParam)
                        return
                    }
                        this.$message.error(res.data.msg || '提交审核失败，请重试')
                }).catch(() => {
                    this.$message.error('提交审核失败，请重试')
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消提交'
                })
            })
        },
        //路由判定
        routeChange() {
            let strNum = this.$route.path.lastIndexOf('/')
            let _route = this.$route.path.substring(strNum)
            let list_p = document.querySelectorAll('.list_p')
            if(_route == '/checked') {
                this.ifStatus = true
                this.auditStatus = 1
            }else {
                this.ifStatus = false
                this.auditStatus = 0
            }
        },
        // 请求列表数据
        getData(params, pageParam) {
            adminProjectList( params, pageParam ).then(res => {
                this.listData = res.data.entity.resultData
                this.pageParam.totalNum = res.data.entity.totalNum
                this.$emit('totalNum', res.data.entity.totalNum)
            })
        },
        changePage (val) {
            this.$set(this.pageParam,'pageNum', val)
            this.getData({
                    "technologyId": this.selected.technology,
                    'projectType': this.selected.classification.join('-'),
                    "applyScopeId": this.selected.period,
                    "isTeacherAudit": this.auditStatus,
                    "name": this.search
                }, this.pageParam)
        }
    },
    watch: {
        "$route":"routeChange",
        "selected": {
            handler: function (val, oldVal) {
                this.getData({
                    "technologyId": val.technology,
                    'projectType': val.classification.join('-'),
                    "applyScopeId": val.period,
                    "isTeacherAudit": this.auditStatus
                },this.pageParam)
            },
            deep: true,
            immediate: false
        },
        "auditStatus":{
            handler: function(val, oldVal) {
            this.getData({
                    "technologyId": this.selected.technology,
                    'projectType': this.selected.classification.join('-'),
                    "applyScopeId": this.selected.period,
                    "name": this.search,
                    "isTeacherAudit": val
                },this.pageParam)
            },
            immediate: true
        },
        "search": {
            handler:function(val, oldVal){
                this.getData( {
                        "name": val,
                        "isTeacherAudit": this.auditStatus
                    },this.pageParam)
            },
            immediate: false
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
#projectRowList{
    padding: 0px 15px 15px;
}
.project_li {
    padding: 24px 0;
    height: 172px;
    border-bottom: 1px dotted #C9C9C9;
    // box-sizing: border-box;
    .img {
        position: relative;
        display: inline-block;
        height: 100%;
        width: 264px;
        background-position: center;
        background-size: cover;
        .tips {
            background-color: rgba(0,0,0,0);
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            width: 7em;
            height: 7em;
            p {
                top: -1em;
                left: -4em;
                width: 10em;
                height: 4em;
                line-height: 5em;
                position: absolute;
                padding-top: 8px;
                text-align: center;
                color: #fff;
                transform: rotate(-45deg);
                &.prepare {
                    background-color: #fd7f7a;
                }
                &.initiate {
                    background-color: #2491ec;
                }
                &.design {
                    background-color: #f6aa08;
                }
                &.making {
                    background-color: #22ac38;
                }
                &.iteration {
                    background-color: #019e97;
                }
                &.appraise {
                    background-color: #fd342c;
                }
                &.end {
                    background-color: #c9c9c9;
                }
                &.doing{   /*活动进行中*/
                    background-color: #00a0e9;
                }
                &.begin{  /*活动未开始*/
                    background-color: #46c475;
                }
                &.end{   /*活动已结束*/
                    background-color: #c9c9c9;
                }
                &.submit{  /*审核状态-态待提交*/
                    background-color: #e5e9f1;
                    color: #333;
                }
                &.pending{  /*审核状态-待审核*/
                    background-color: #dc8baa;
                }
                &.audit{  /*审核状态-审核中*/
                    background-color: #2697ee;
                }
                &.no-pass{  /*审核状态-不通过*/
                    background-color: #ff4848;
                }
            }
        }
    }
    .list_content {
        position: relative;
        display:inline-block;
        height: 160px;
        width: 70%;
        word-break: break-word;
        .list_title {
            font-size: 22px;
            color: #3E3E3E;
            height: 25%;
            line-height: 2;
            a:hover {
                color: $theme_color;
            }
            span {
                display: inline-block;
                color: #A6A6A6;
                font-size: 16px;
                margin-left: 5px;
            }
        }
        .list_p {
            display: box;
            margin-right: 100px;
            font-size: 14px;
            line-height: 2;
        }
      .list_p {
        font-size: 14px;
        line-height: 2;
      }
      .status {
        padding: 10px;
      }
    }
    .ifStatus {
        height: 80px;
        line-height:80px !important;
    }
    .option-box {
        position: relative;
        width: 180px;
    }
}
</style>
