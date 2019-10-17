<template>
    <div id="storyUncheckedList">
        <div class="select-box">
            <el-select v-model="selected.category" placeholder="选择故事分类" clearable style="width:174px;">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </div>
        <ul class="list" v-if="datas.length > 0">
            <li v-for="(item,index) in datas" class="clearfix">
                <div class="img-box">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                    <!-- <img :src="getFileUrl(item.cover) || listDefault" /> -->
                    <div class="status-label">
                        <p class="submit" v-if="item.auditStatus == -1">待提交</p>
                        <p class="pending" v-if="item.auditStatus == 0">待审核</p>
                        <p class="no-pass" v-if="item.auditStatus == 2">不通过</p>
                        <p class="audit" v-if="item.auditStatus == 3">审核中</p>
                    </div>
                </div>
                <div class="msg-box verticle-middle">
                    <div class="story-name ellipsis clearfix">
                        <router-link v-if="[0, 3].includes(item.auditStatus)" :to="{ path: 'preview', query: { id: item.id } }" class="name fl">
                            {{item.name}}
                        </router-link>
                        <router-link v-if="[-1, 2].includes(item.auditStatus)" :to="{ path: 'publish', query: { id: item.id } }" class="name fl">
                            {{item.name}}
                        </router-link>
                        <!-- <span>{{item.name}}</span> -->
                    </div>
                    <div class="story-content clearfix">
                        <span class="content-label fl">故事简介：</span>
                        <p class="contents ">
                            {{item.introduction | textOverflow(50)}}
                        </p>
                    </div>
                    <div class="story-category clearfix mb10">
                        <p class="category">
                            类目：<span>{{item.category | translate(categoryList,{key:'id'})}}</span>
                        </p>
                        <p class="category">
                            <span>发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                        </p>
                    </div>
                </div>
                <div class="option-box verticle-middle">
                    <v-operate @on-delete="deleteStory(item.id)" @on-edit="editStory(item.id)" @on-submit="submit(item.id,index)"
                        :icon-group="generateIconGroup(item.auditStatus)" label="故事"></v-operate>
                </div>
                <button @click="showRecordDialog(item.id)" v-if="item.auditStatus == 0 || item.auditStatus == 2 || item.auditStatus == 3" class="btn-verify-record pa">审核记录</button>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'storyId'}" />
        <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
    import pagination from 'Common/pagination.vue'
    import operate from 'components/common/operate.vue'
    import verifyRecordDialog from 'components/dialog/verify_record_dialog.vue'
    import { mapActions, mapState } from 'vuex'
    import { requestStoryBackendList, storySubmitAudit, delStory } from '@/service/story.js'

    export default {
        name: 'storyUncheckedList',
        components: {
            'v-pagination': pagination,
            'v-operate': operate,
            verifyRecordDialog
        },
        data() {
            return {
                api: '/maker/storyAudit/selectList',
                dialog: { isVisible: false },
                curRecordId: '', // 当前审核记录ID
                delData: {
                    name: '资源',
                    dataUrl: 'maker/resource/del'
                },
                datas: [],
                param: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                pageParam: {
                    pageSize: 5,
                    pageNum: 1
                },
                storyType: {
                    1: '科技',
                    2: '生活',
                    3: '编剧',
                    4: '人生',
                    5: '经历',
                    6: '背景',
                },
                selected: {
                    category: '',
                    name: ''
                }
            }
        },
        props: {
            search: {
                type: String,
                default: ''
            }
        },
        created() {
            this.getDictComb('storyCategory')
            this.getStoryList()
        },
        computed: {
            ...mapState('dictionaryCommon', {
                categoryList(state) {
                    const dicList = (state.storyCategoryDicList || {}).dicList || []
                    return dicList
                }
            }),
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
                    this.getStoryList()
                },
                deep: true
            }
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb'
            }),
            showRecordDialog(id) { // 显示审核记录弹窗
                this.curRecordId = id
                this.dialog.isVisible = true
            },
            // 获取故事列表
            getStoryList() {
                const data = {
                    auditStatusTeaOrStu: 0,
                    category: this.selected.category == null ? '' : this.selected.category,
                    name: this.selected.name
                }
                requestStoryBackendList(data, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.param.totalNum = res.data.entity.totalNum
                        this.datas = res.data.entity.resultData
                        this.$emit('totalNum', res.data.entity.totalNum)
                    }
                })
            },
            // 切换页数
            changePage(val) {
                this.pageParam.pageNum = val
                this.getStoryList()
            },
            // 待审列表操作按钮
            generateIconGroup(status) {
                const edit = status === -1 || status === 2 ? 'edit' : ''
                const submit = status === -1 || status === 2 ? 'submit' : ''
                const del = status === -1 || status === 2 ? 'delete' : ''
                return [edit, submit, del]
            },
            // 删除活动
            deleteStory(id) {
                delStory([{ id: id }]).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '已删除')
                        this.getStoryList()
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            },
            // 提交审核
            submit(id, index) {
                this.$confirm('此操作将该故事提交审核，是否继续？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    storySubmitAudit({ id: id }).then((res) => {
                        if (res.data.code === 200) {
                            this.showMessage('success', '成功提交审核')
                            this.datas[index].auditStatus = 0
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                }).catch(() => {
                  this.showMessage('info', '已取消提交')
                })
            },
            // 编辑活动
            editStory(id) {
                this.$router.push({ path: '/admin/story/publish', query: { id: id } })
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
.mb10{
    margin-bottom: 10px;
}
.vertical-align-top{
    vertical-align: top;
}
#storyUncheckedList {
    padding: 0px 18px 20px;
    .list {
        li {
            height: 170px;
            padding: 20px 0;
            border-bottom: 1px dashed #ccc;
            position: relative;
            a{
                display: inline-block;
            }
            // 活动图片
            .img-box {
                $img-prev-height: 170px;
                position: relative;
                width: 265px;
                height: $img-prev-height;
                background-color: #e7edf2;
                text-align: center;
                img,
                .bg-img__wrap {
                    width: 100%;
                    height: 100%;
                }
                [class*="icon-file-"],
                [class*=" icon-file-"] {
                    line-height: $img-prev-height;
                    font-size: 80px;
                    color: #b3b3b3;
                }
            }
            // 活动信息
            .msg-box {
                padding-left: 290px;
                padding-right: 150px;
                font-size: 14px;
                width: 100%;
                box-sizing: border-box;
                .story-name{
                    margin-bottom: 15px;
                    height: 22px;
                    line-height: 22px;
                    font-size: 22px;
                    .name{
                        font-size: 22px;
                    }
                    .evaluate{
                        font-size: 16px;
                        color: #fd8c88;
                        margin-left: 50px;
                    }
                }
                .story-name:hover{
                    .name{
                        color: $theme_color;
                    }
                }
                .story-content {
                    width: 100%;
                    font-size: 14px;
                    margin-bottom: 15px;
                    line-height: 22px;
                    .content-label{
                        display:inline-block;
                    }
                    .contents{
                        width: 100%;
                        box-sizing: border-box;
                        word-wrap: break-word;
                        padding-left: 72px;
                    }
                }
                .story-category{
                    .category{
                        line-height: 1.5em;
                    }
                }
                .story_msg{
                    color: #999;
                }
            }
            // 下载编辑分享删除
            .option-box{
                right: 0;
                width: 100px;
                a{
                    font-size: 18px;
                    margin: 0px 5px;
                    cursor: pointer;
                }
                i:hover{
                    color: $theme_color;
                }
            }
        }
    }
}

</style>
<style lang="scss">
    #storyUncheckedList{
        .el-dialog--small{
            width: 1080px!important;
        }
        .el-pagination{
            text-align: right;
            margin-top: 20px;
        }
        #delPopover{
            .delete-btn{
                font-size: 18px;
            }
        }
    }
</style>