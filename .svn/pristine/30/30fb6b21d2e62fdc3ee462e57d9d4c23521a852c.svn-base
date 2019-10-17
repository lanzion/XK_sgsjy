<template>
    <div id="planCheckedList">
        <div class="select-box">
            <el-select v-model="selected.category" placeholder="选择策划分类" clearable style="width:174px;">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </div>
        <ul class="list" v-if="datas.length > 0">
            <li v-for="(item,index) in datas" class="clearfix">
                <div class="img-box">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                    <!-- <img :src="getFileUrl(item.cover) || listDefault" /> -->
                </div>
                <div class="msg-box verticle-middle">
                    <div class="story-name clearfix">
                        <router-link :to="{path:'/street/co/plan/detail/info',query:{id:item.id}}" class="name fl">
                            {{item.name}}
                        </router-link>
                    </div>
                    <div class="story-content clearfix">
                        <p class="contents">
                            {{item.remark | textOverflow(70)}}
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
                    <p class="story_msg">
                        <span><i class="icon-i-browse" title="浏览"></i> {{item.browseNum === null ? 0 : item.browseNum}}</span>&nbsp;&nbsp;
                        <span><i class="icon-btn-collection" title="收藏"></i> {{item.collectNum === null ? 0 : item.collectNum}}</span>&nbsp;&nbsp;
                        <span><i class="icon-i-reply" title="评论"></i> {{item.commentCount === null ? 0 : item.commentCount}}</span>&nbsp;&nbsp;
                        <span><i class="icon-btn-i-share2" title="分享"></i> {{item.shareNum === null ? 0 : item.shareNum}}</span>&nbsp;&nbsp;
                        <span><i class="" title="邀约">邀约</i> {{item.inviteCount === null ? 0 : item.inviteCount}}</span>&nbsp;&nbsp;
                    </p>
                </div>
                <div class="option-box verticle-middle">
                    <a href="javaScript:;" class="invite" @click="showInviteList(item.id)"><i title="邀约">邀约列表</i></a>
                </div>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <invite-list :visible="visible" :businessPlanId="businessPlanId"></invite-list>
        <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
    import delPopover from 'Common/del_popover.vue'
    import pagination from 'Common/pagination.vue'
    import inviteList from 'components/businessPlan/invite_list.vue'
    import { requestPlanBackendList } from '@/service/businessPlan.js'
    import { requestDictComb } from '@/service/common.js'
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'planCheckedList',
        components: {
            'del-popover': delPopover,
            'v-pagination': pagination,
            inviteList
        },
        data() {
            return {
                visible: {
                    show: false
                },
                datas: [],
                param: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                // 故事类型
                // categoryList: [],
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
                },
                businessPlanId: '',
                userId: ''
            }
        },
        props: {
            search: {
                type: String,
                default: ''
            }
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.userId = this.$ls.get('loginInfo').userInfo.id
            }
            this.getDictComb('businessPlanCategory')
            this.getPlanList()
            // this.getCategoryList()
        },
        computed: {
            ...mapState('dictionaryCommon', {
                categoryList(state) {
                    const dicList = (state.businessPlanCategoryDicList || {}).dicList || []
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
                    this.getPlanList()
                },
                deep: true
            }
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb'
            }),
            changePage(val) {
                this.param.pageNum = val
                this.getPlanList()
            },
            // 获取分类列表
            getCategoryList() {
                requestDictComb({ groupCode: 'businessPlanCategory' }).then((res) => {
                    if (res.data.code === 200) {
                        this.categoryList = res.data.entity.dicList
                        this.categoryList.unshift({ id: null, name: '全部分类' })
                    }
                })
            },
            // 获取列表
            getPlanList() {
                const data = {
                    auditStatus: 1,
                    category: this.selected.category === null ? '' : this.selected.category,
                    name: this.selected.name,
                    createId: this.userId
                }
                requestPlanBackendList(data, { pageNum: this.param.pageNum, pageSize: this.param.pageSize }).then((res) => {
                    if (res.data.code === 200) {
                        this.param.totalNum = res.data.entity.totalNum
                        this.datas = res.data.entity.resultData
                        this.$emit('totalNum', res.data.entity.totalNum)
                    }
                })
            },
            // 获取邀约列表
            showInviteList(id) {
                this.businessPlanId = id
                this.visible.show = true
            }
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
#planCheckedList {
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
                        word-wrap: break-word;
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
                width: 88px;
                .invite{
                    font-size: 14px;
                    display: inline-block;
                    vertical-align: top;
                    padding: 10px;
                    border: 1px solid $theme_color;
                    color: $theme_color;
                    &:hover{
                        color: #fff;
                        background-color: $theme_color;
                    }
                }
            }
        }
    }
}

</style>
<style lang="scss">
    #planCheckedList{
        .el-dialog--small{
            width: 782px!important;
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