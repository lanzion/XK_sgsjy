<template>
    <div id="storyCheckedList">
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
                </div>
                <div class="msg-box verticle-middle">
                    <div class="story-name ellipsis clearfix">
                        <router-link :to="{path:'/street/excellent/story/detail/info',query:{id:item.id}}" class="name fl">
                            {{item.name}}
                        </router-link>
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
                    <p class="story_msg">
                        <span><i class="icon-i-browse" title="浏览"></i> {{item.browseNum === null ? 0 : item.browseNum}}</span>&nbsp;&nbsp;
                        <span><i class="icon-btn-collection on" title="收藏"></i> {{item.collectionNum === null ? 0 : item.collectionNum}}</span>&nbsp;&nbsp;
                        <span><i class="icon-i-reply" title="评论"></i> {{item.commentNum === null ? 0 : item.commentNum}}</span>&nbsp;&nbsp;
                        <span><i class="icon-btn-i-share2" title="分享"></i> {{item.shareNum === null ? 0 : item.shareNum}}</span>&nbsp;&nbsp;
                    </p>
                </div>
                <!-- <div class="option-box verticle-middle">
                    <del-popover title="删除" class="delete" :delData="{ url:'maker/story/delByIds', params:[{id: item.id}], name:'故事' }" v-on:callback="getStoryList"></del-popover>
                </div> -->
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
    import delPopover from 'Common/del_popover.vue'
    import pagination from 'Common/pagination.vue'
    import { mapActions, mapState } from 'vuex'
    import { requestStoryBackendList } from '@/service/story.js'

    export default {
        name: 'storyCheckedList',
        components: {
            'del-popover': delPopover,
            'v-pagination': pagination,
        },
        data() {
            return {
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
            // 获取故事列表
            getStoryList() {
                const data = {
                    auditStatusTeaOrStu: 1,
                    category: this.selected.category === null ? '' : this.selected.category,
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
#storyCheckedList {
    padding: 0 18px 20px;
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
    #storyCheckedList{
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