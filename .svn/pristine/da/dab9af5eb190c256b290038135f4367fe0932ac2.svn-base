<template>
    <section class="contest_dynamicDetail container">
        <!-- 面包屑 -->
        <nav class="navigation container"><router-link :to="{ path:'/contest/dynamic', query: { id: $route.query.id, type: $route.query.type } }">赛事动态</router-link> > 文章详情</nav>
        <!-- 文章详情 -->
        <article class="independentDetail bgc_w">
            <h1 v-text='detailDate.title' class="title"></h1>
            <time class="date">
                发布人: {{detailDate.createName}} &nbsp;&nbsp;&nbsp;&nbsp;
                发布时间 :{{detailDate.createTime | dateFormat('yyyy-MM-dd HH:mm')}}
                <span class="fr"> <strong>{{ detailDate.browseNum }}</strong> 人浏览&nbsp;&nbsp; </span>
                <!-- <span class="fr"> <strong>{{ detailDate.commentCount }}</strong> 条评论&nbsp;&nbsp;&nbsp;&nbsp; </span> -->
            </time>
            <div v-html='detailDate.content' class="independentDetail content"></div>
            <!-- 上下文章 -->
   <!--          <div class="piece clearfix">
                <p class="fl">上一篇: <span  @click="getDetail( (piece.up?piece.up.id:null) )" :class=" piece.up == null ? 'col':'' "> {{ piece.up != null ? piece.up.title : '已经是第一篇了' }} </span></p>
                <p class="fl">下一篇: <span  @click="getDetail( (piece.next?piece.next.id:null) )" :class=" piece.next == null ? 'col':'' "> {{ piece.next != null ? piece.next.title : '已经是最后一篇了' }} </span></p>
            </div> -->
        </article>
    </section>
</template>

<script>
import { requestDynamicDetail } from '@/service/manage.js'

export default {
    data() {
        return {
            detailDate: {}
        }
    },
    methods: {
        getDatail() {
            requestDynamicDetail({ id: this.$route.query.dynamicId }).then((res) => {
                if (res.data.code === 200) {
                    this.detailDate = res.data.entity
                }
            })
        }
    },
    mounted() {
        this.getDatail()
    }
}
</script>

<style lang='scss'>
.contest_dynamicDetail {
    .content {
        * {
            word-wrap: break-word;
        }
        p {
            margin-bottom: 1em;
        }
        img {
            max-width: 100%;
        }
    }
}
.independentDetail {}
</style>


<style lang='scss' scoped>
@import '~@/assets/css/scss/datails.scss';
$white: #fff;
$red: #d00;
$gray: #c9c9c9;
.contest_dynamicDetail {
    /* 面包屑 */
    .navigation {
        height: 50px;
        line-height: 50px;
        color: #999999;
    }
    /* 文章详情 */
    .independentDetail {
        padding: 20px;
        font-size: 14px;
        background-color: $white;
        box-sizing: border-box;
        &.content {
            padding: 0 145px;
            line-height: 2;
            text-align: justify;
            overflow: hidden;
        }
        .date {
            padding-bottom: 10px;
            border-bottom: 1px solid $gray;
            strong {
                color: #01a8df;
                font-size: 1.14em;
            }
        }
        .piece {
            margin-top: 20px;
            p {
                padding: 10px 0;
                width: 100%;
                text-align: left;
                span {
                    color: #00a1e9;
                    cursor: pointer;
                }
                .col {
                    color: #626262;
                }
            }
        }
    }
}
</style>
