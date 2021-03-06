<template>
    <div class="feature-detail container clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item @click.native="redirect(`#${pages.detail.model.path}`, { query: { id: $route.query.orgId }, type: 6})">示范校</el-breadcrumb-item>
            <el-breadcrumb-item @click.native="redirect({url: `${pages.detail.model.url}/feature`}, { query: {id: $route.query.orgId}, type: 6 })">创客特色列表</el-breadcrumb-item>
            <el-breadcrumb-item>创客特色详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content_l fl">
            <section class="detail bgw">
                <div class="title-wrapper pr">
                    <h3 class="title ellipsis">{{detail.name || '暂无成果标题'}}</h3>
                    <v-btn-group class="btn-group pa" :title.sync="detail.name" module="course" :img="detail.imageUrl"></v-btn-group>
                    <div class="info clearfix">
                        <div class="info-left fl">
                            <router-link :to="{path: '/schoolSpace/homePage', query: {id: detail.schoolId}}" style="display: inline-block;">
                                <figure class="avatar">
                                    <img :src="getFileUrl(detail.cover) || faceDefault" class="pic" width="40" height="40">
                                </figure>
                                <span>{{detail.createName || '暂无'}}</span>
                            </router-link>
                            <span class="date">{{detail.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
                        </div>
                        <p class="fr">
                            <span class="icon-btn-browse">浏览：<em class="blue">{{detail.browseNum || 0}}</em>人</span>
                        </p>
                    </div>
                </div>
                <div v-html="detail.content || '暂无内容'" class="detail-main"></div>
            </section>

            <section class="comment bgw">
                <h4 class="comment-title">评论</h4>
                <comment :commentProps="commentProps"></comment>
            </section>
        </div>
        <div class="content_r fr bgw">
            <section class="related-info">
                <h3 class="related-info-title">
                    相关特色
                    <router-link :to="generateRoute()" class="link-more fr" target="_blank">更多>></router-link>
                </h3>
                <ul class="list">
                    <li v-for="(item, idx) in list" @click="redirect({url: `${pages.detail.model.url}/feature/detail`}, { query: { id: item.id, orgId: $route.query.orgId }, type: 3 })" :key="idx" :title="item.name" class="related-item">
                        <figure class="cover">
                            <img :src="getFileUrl(item.cover) || listDefault" class="pic" width="255" height="160">
                            <figcaption class="feature-name ellipsis">{{item.name}}</figcaption>
                        </figure>
                    </li>
                    <li v-if="list.length === 0" class="no-data"></li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    import { queryFeatureDetail, requestFeatureList } from '@/service/model_school.js'
    import btnGroup from 'Common/button/com_panel_event.vue'
    import comment from 'Common/comments/comment.vue'

    export default {
        name: 'modelSchoolFeatureDetail', // 教育特色详情

        data() {
            return {
                commentData: {
                    type: 'modelSchoolFeature'
                },
                commentProps: {
                    parmasKey: 'featureId',
                    replyKey: 'comments',
                    addApi: 'maker/modelSchoolFeatureComment/add',
                    reportApi: 'maker/modelSchoolFeatureCommentReport/add',
                    getListApi: 'maker/modelSchoolFeatureComment/selectPager',
                    addPraiseApi: 'maker/modelSchoolFeatureCommentPraise/add',
                    cancelPraiseApi: 'maker/modelSchoolFeatureCommentPraise/add'
                },
                detail: {},
                items: [
                    { label: '本校特色', path: `${this.pages.detail.model.path}/feature` },
                    { label: '特色详情', path: '' },
                ],
                list: []
            }
        },
        beforeRouteUpdate(to, from, next) {
            const { query: { id } } = to
            this.id = id
            this.queryDetail()
            next()
        },
        created() {
            const { id } = this.$route.query
            this.id = id
            this.queryDetail()
        },
        components: {
            'v-btn-group': btnGroup,
            comment,
        },
        methods: {
            // 获取列表
            async requestList() {
                const { id, detail: { schoolId } } = this
                const res = await requestFeatureList({ schoolId, pageSize: 5, pageNum: 1 })

                if (res.status === 200 && res.data.code === 200) {
                    const { resultData } = res.data.entity || {}
                    const filteredArr = (resultData || []).filter(item => item.id !== id)
                    this.list = filteredArr
                }
            },
            // 获取详情
            async queryDetail() {
                const { id } = this
                const res = await queryFeatureDetail({ id })

                if (res.status === 200 && res.data.code === 200) {
                    this.detail = res.data.entity || {}
                    this.requestList()
                }
            },
            generateRoute(path) {
                const { detail: { schoolId: id }, items: [firstItem] } = this
                const _path = path === undefined ? firstItem.path : path

                return { path: _path, query: { id } }
            }
        },
    }
</script>

<style lang='scss'>
.feature-detail {
    .detail-main {
        p {
            text-indent: 24px;
            word-wrap: break-word;
            word-break: break-all;
        }
        img {
            display: block;
            max-width: 72%;
            margin: 16px auto;
        }
        ul, ol {
            padding: 12px;
        }
        table {
            box-sizing: border-box;
            width: 100%;
            margin: 12px 0;
            td {
                text-align: center;
                border: 1px solid #ddd;
                padding: 4px;
            }
        }
        a:hover {
            color: #2797ed;
        }
    }
}
</style>
<style lang='scss' scoped>
    $theme-color: #2797ed;

    .feature-detail {
        font-size: 14px;
        .el-breadcrumb {
            padding: 18px 0;
            .el-breadcrumb__item:last-child {
                pointer-events: none;
            }
        }
        .btn-group {
            right: 0;
            top: 8px;
        }
        .title {
            max-width: 600px;
            height: 33px;
            line-height: 1.5;
            font-size: 22px;
            color: #333;
        }
        .info {
            line-height: 40px;
            margin-top: 12px;
        }
        .info-left {
            font-size: 12px;
            color: #999;
            .avatar {
                display: inline-block;
                width: 40px;
                height: 40px;
                margin-right: 4px;
                vertical-align: middle;
                .pic {
                    border-radius: 50%;
                }
            }
            .date {
                margin-left: 10px;
            }
        }
        .icon-btn-browse:before {
            margin-right: 6px;
            vertical-align: middle;
            font-size: 16px;
        }
        .blue {
            color: $theme-color;
        }
        .detail-main {
            margin-top: 30px;
            line-height: 1.5;
            overflow: hidden;
        }
    }

    .content_l {
        box-sizing: border-box;
        width: 905px;
        margin-right: 20px;
        .detail {
            padding: 25px 12px;
        }
        .comment {
            margin-top: 20px;
            padding: 10px 14px 20px;
            .comment-title {
                // border-bottom: 1px solid #ccc;
                // margin-bottom: 20px;
                line-height: 38px;
                font-size: 16px;
                // text-indent: 10px;
            }
        }
    }

    .content_r {
        box-sizing: border-box;
        width: 275px;
        .related-info {
            counter-reset: item;
            .related-info-title {
                box-sizing: border-box;
                line-height: 40px;
                border-bottom: 1px solid #ddd;
                padding: 0 14px;
                font-size: 16px;
                .link-more {
                    color: #999;
                    &:hover {
                        color: $theme-color;
                    }
                }
            }
            .related-item {
                cursor: pointer;
                border-bottom: 1px solid #ddd;
                .cover {
                    width: 100%;
                    height: 216px;
                }
                .pic {
                    display: block;
                    padding: 10px 10px 0 10px;
                }
                .feature-name {
                    height: 46px;
                    line-height: 46px;
                    padding: 0 10px;
                    &:hover {
                        color: $theme-color;
                    }
                }
            }
        }
    }
</style>
