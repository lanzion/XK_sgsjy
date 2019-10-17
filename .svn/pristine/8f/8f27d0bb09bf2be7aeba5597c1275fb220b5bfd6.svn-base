<template>
    <div id="storyDetail" class="detail-container container clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item @click.native="redirect(pages.index.url, { path: 'street' })">活动街区</el-breadcrumb-item>
            <el-breadcrumb-item @click.native="redirect(pages.list.story.url)">故事列表</el-breadcrumb-item>
            <el-breadcrumb-item>故事详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 左边内容 -->
        <section class="content-left fl">
            <!-- 故事信息 -->
            <div class="detail-info">
                <div class="info-title clearfix">
                    <h4 class="title fl">{{storyDetail.name}}</h4>
                    <option-btn class="fr" :title.sync="storyDetail.name" module="story" :img="storyDetail.cover"></option-btn>
                </div>
                <div class="info-introduction clearfix">
                    <span class="fl">故事简介：</span>
                    <p class="">
                        {{storyDetail.introduction}}
                    </p>
                </div>
                <section class="msg-box clearfix">
                    <div class="info-msg fl">
                        <span><i class="icon-i-classify"></i> 分类：</span>
                        <span>{{storyDetail.category | translate(categoryList,{key:'id'})}}</span>
                    </div>
                    <div class="info-msg fl">
                        <span><i class="icon-btn-browse"></i> 浏览：</span>
                        <span>{{storyDetail.browseNum ? storyDetail.browseNum : 0}}</span>
                    </div>
                    <div class="info-msg fl">
                        <span><i class="icon-i-time"></i> 上传时间：</span>
                        <span>{{storyDetail.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</span>
                    </div>
                </section>
            </div>
            <!-- 故事详情，故事评论 -->
            <article class="info-comment">
                <!-- <v-tabs :tabs="[
                      { name: '故事详情', type: 'info'},
                      { name: '故事评论('+storyDetail.commentNum+')', type: 'comment'}
                  ]" :router="router"></v-tabs> -->
                <v-tabs :tabs="[{ name: '故事详情', type: 'info'}]" :router="router"></v-tabs>
                <router-view :content="storyDetail.content" @commentAdd="commentAdd"></router-view>
            </article>
        </section>
        <!-- 右边信息 -->
        <aside class="content-right fr">
            <div class="user-info">
                <publisher-msg :user="storyDetail.user"></publisher-msg>
            </div>
            <div class="related-list bgw">
                <h4 class="clearfix">
                    <span class="title fl">相关故事</span>
                    <a @click="redirect(pages.list.story, { type: 2 })" class="btn-more fr">更多>></a>
                </h4>
                <v-list :items="items" :listData="listData" style="margin: 0;">
                    <template slot-scope="props">
                        <div class="list-item-img__box">
                            <img :src="getFileUrl(props.item.cover) || listDefault">
                        </div>
                        <div class="list-item-title">
                            <p class="item-title" :title="props.item.name">{{ props.item.name | textOverflow(18) }}</p>
                            <p class="item-content">{{props.item.introduction | textOverflow(28)}}</p>
                        </div>
                    </template>
                </v-list>
            </div>
        </aside>
    </div>
</template>

<script>
    import tabs from 'Common/tabs.vue'
    import optionBtn from 'Common/button/com_panel_event.vue'
    import publisherMsg from 'components/story/publisher_msg.vue'
    import list from 'Common/list/graphic/list.vue'
    import { requestStoryDetail, requestFrontendStoryList } from '@/service/story.js'
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'storyDetail',
        components: {
            'v-tabs': tabs,
            optionBtn,
            'v-list': list,
            publisherMsg,
        },
        data() {
            return {
                router: {
                    path: '/street/story'
                },
                storyDetail: {
                    commentNum: 0,
                    category: ''
                },
                listData: {
                    col: 1,
                    pathUrl: '/street/story/info',
                    params: {
                        names: 'id',
                        val: 'id'
                    }
                },
                items: []
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                categoryList(state) {
                    const dicList = (state.storyCategoryDicList || {}).dicList || []
                    return dicList
                }
            })
        },
        created() {
            this.getDictComb('storyCategory')
            this.router.query = this.$route.query
        },
        mounted() {
            this.getStoryDetail()
            this.getRelatedStoryList()
        },
        watch: {
            '$route.query.id'() {
                this.getStoryDetail()
                this.getRelatedStoryList()
                this.router.query = this.$route.query
            }
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb'
            }),
            getStoryDetail() {
                requestStoryDetail({ id: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.storyDetail = Object.assign({}, res.data.entity)
                    }
                })
            },
            // 获取相关故事列表
            getRelatedStoryList() {
                requestFrontendStoryList({ storyId: this.$route.query.id }, { pageSize: 5, pageNum: 1 }).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                    }
                })
            },
            commentAdd() {
                this.storyDetail.commentNum++
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/item_list.scss';
    @import '~@/assets/css/scss/cols.scss';
    *{
        box-sizing: border-box;
    }
    .detail-container {
        // margin-top: 20px;
        .content-left{
            width: 902px;
            .detail-info{
                padding: 15px;
                background-color: #fff;
                margin-bottom: 20px;
                min-height: 152px;
                .info-title{
                    margin-bottom: 20px;
                    .title{
                        font-size: 22px;
                        color: #00b5f0;
                        padding-right: 175px;
                    }
                }
                .info-introduction{
                    font-size: 14px;
                    line-height: 1.5em;
                    min-height: 50px;
                }
                .info-msg{
                    margin-right: 40px;
                    font-size: 14px;
                    color: #b1b1b1;
                    margin-top: 15px;
                }
            }
            .info-comment{
                min-height: 560px;
                background-color: #fff;
            }
        }
        .content-right{
            width: 274px;
            .user-info{
                margin-bottom: 20px;
                background-color:#fff;
            }
            .related-list{
                h4{
                    font-size: 17px;
                    padding: 14px 15px;
                    border-bottom: 1px solid #ccc;
                    .btn-more{
                        cursor: pointer;
                        &:hover{
                            color: #00a0e9;
                        }
                    }
                }
                .list-item-title{
                    .item-content{
                        line-height: 1.5em;
                        color: #999;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
.related-list {
    .list .list-item__box {
        border-bottom: 1px solid #ccc;
        border-radius: 0;
    }
}
</style>
