<template>
    <div class="worksDetails container">
        <div class="details-content clearfix ">
            <!-- 面包屑 -->
            <el-breadcrumb separator=">" class="navigation">
                <el-breadcrumb-item @click.native="redirect(pages.index.url)">首页</el-breadcrumb-item>
                <el-breadcrumb-item @click.native="redirect(pages.list.works.url)">作品列表</el-breadcrumb-item>
                <el-breadcrumb-item>作品详情</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 左边部分  作品详情-->
            <div :style="{width: isTeacherOrStudentSpace ? '100%' : '900px'}" class="details-left fl">
                <works-detail :detailData="detailData" @getCreator="getCreator" @getOrgId="getOrgId" ref="workDetail"></works-detail>
            </div>
            <!-- 右边部分  作者信息-->
            <div v-if="!isTeacherOrStudentSpace" class="details-right fr clearfix">
                <author-msg :id="creatorId" @setIdentity="setIdentity"></author-msg>
                <div class="related-works">
                    <h4 class="clearfix bgw"><span class="title fl">相关作品</span><span class="more fr" @click="redirect(pages.list.works.url)">更多>></span></h4>
                    <ul class="list clearfix" v-if="items.length">
                        <li v-for="(item, index) in items" :key="index" class="list_li bgw">
                            <router-link :to="{ path: $route.path, query: { id: item.id} }" target="_blank">
                                <img :src="getFileUrl(item.resourceId) || listDefault" class="list_li_img">
                                <p class="list_li_title">{{item.workName | textOverflow(14) }}</p>
                            </router-link>
                        </li>
                    </ul>
                    <div v-else class="isNull-list">暂无数据</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import worksDetail from 'components/work/works_details.vue'
import authorMsg from 'components/work/author_msg.vue'
import { requestFrontendWorksList } from '@/service/works.js'

export default {
    name: 'worksDetails',
    components: {
        'works-detail': worksDetail,
        'author-msg': authorMsg
    },
    data() {
        return {
            pagParam: {
                pageSize: 4,
                pageNum: 1
            },
            // 详情的参数
            detailData: {
                isStudent: this.$route.path.includes('student')
            },
            creatorId: null,
            isTeacherOrStudentSpace: /^\/space\/student|teacher\/works\/detail/.test(this.$route.path),
            items: []
        }
    },
    created() {
        this.detailData.id = this.$route.query.worksId || this.$route.query.id
    },
    methods: {
        setIdentity(val) {
            const isStudent = val === 'student'
            this.$set(this.detailData, 'isStudent', isStudent)
        },
        getCreator(val) {
            this.$set(this.$data, 'creatorId', val)
        },
        getOrgId() {
            requestFrontendWorksList({ workId: this.$route.query.id }, this.pagParam).then((res) => {
                if (res.data.code === 200 && res.data.entity !== null) {
                    this.items = res.data.entity.resultData
                }
            })
        }
    },
    watch: {
        '$route.query.id'() {
            this.$refs.workDetail.getWorksDetails(this.$route.query.id)
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
.worksDetails{
    margin: 0 auto;
    margin-bottom: 40px;
    .details-content{
        width: 100%;
        .details-left{
            width: 906px;
        }
        .details-right{
            width: 282px;
            .related-works{
                width: 100%;
                margin-top: 20px;
                h4 {
                    height: 50px;
                    line-height: 50px;
                    text-indent: 1em;
                    font-size: 16px;
                    .more {
                        font-size: 14px;
                        color: #999;
                        margin-right: 10px;
                        cursor: pointer;
                        &:hover {
                            color: #23b8ff;
                        }
                    }
                }
                .list {
                    font-size: 14px;
                    .list_li {
                        box-sizing: border-box;
                        border-radius: 5px;
                        overflow: hidden;
                        cursor: pointer;
                        margin-bottom: 10px;
                        .list_li_img {
                            width: 100%;
                            height: 198px;
                        }
                        .list_li_title {
                            font-weight: 400;
                            color: #333;
                            padding: 15px;
                        }
                        &:hover {
                            box-shadow: 3px 3px 8px #ccc;
                            .list_li_title {
                                color: #23b8ff;
                            }
                        }
                        .info {
                            font-size: .85em;
                            margin-bottom: 10px;
                            color: #989898;
                            .info-item + .info-item {
                                margin-left: 20px;
                            }
                        }
                    }

                }
            }
        }
    }
}
</style>
