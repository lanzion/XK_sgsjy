<template>
    <div class="infoDetail" >
        <el-breadcrumb separator=">" class="container breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path, query: item.query }" :key="index">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bgc_w container">
            <div class="independentDetail">
                <h1 class="title">{{detail.title}}</h1>
                <time class="date">发布时间：{{detail.publishDate | dateFormat('yyyy-MM-dd hh:mm:ss')}}</time>
                <article v-html='detail.content'></article>
            </div>
            <ul class="attList" v-if="detail.portalNoticeDetailResource && detail.portalNoticeDetailResource.length">
                <li class="attList_title fl">附件:</li>
                <li v-for="(i, k) in detail.portalNoticeDetailResource" class="attList_li"> <a :href="downloadUrl(i.resourceId, i.resourceName)" :download="i.resourceId.split('/')[i.resourceId.split('/').length - 1]" class="btn" title="下载">{{ i.resourceName }} </a></li>
            </ul>
        </div>
     </div>
</template>

<script>
import { mapActions } from 'vuex'
import { requestInfoDetail } from '@/service/common.js'

export default {
    name: 'infoDetail',
    data() {
        return {
            breadcrumb: [
                { path: '/', title: '首页' },
                { path: '/news/list', title: '资讯' },
                { path: '', title: '资讯详情', query: { id: this.$route.query.id } }
            ],
            noticeType: {},
            detail: {}
        }
    },
    mounted() {
        this.analysisPath()
        this.getDictComb('noticeType').then((res) => {
            if (res.dicList) {
                const _noticeType = {}
                res.dicList.forEach((x) => {
                    _noticeType[x.id] = x.name
                })
                this.noticeType = _noticeType
            }
        })
        requestInfoDetail({ id: this.$route.query.id }).then((res) => {
            if (res.data.code === 200) {
                this.detail = res.data.entity || {}
            }
        })
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        analysisPath() {
            const type = this.$route.params.type
            this.$set(this.breadcrumb[1], 'title', this.noticeType[type])
            this.$set(this.breadcrumb[2], 'title', `${this.noticeType[type]}详情`)
        }
    },
    watch: {
        '$route.path': 'analysisPath',
        noticeType: 'analysisPath'
    }
}
</script>

<style lang='scss'>
@import '~@/assets/css/scss/datails.scss';
</style>

<style lang='scss' scoped>
.infoDetail {
    margin-bottom: 60px;
    font-size: 14px;

    .breadcrumb {
        line-height: 4;
    }

    .independentDetail {
        min-height: 580px;
    }
    .attList {
        margin-top: 30px;
        padding: 30px 145px 50px;
        .attList_li {
            margin-left: 3em;
            padding-bottom: 5px;
            a {
                color: #0391D9;
            }
        }
    }
}
</style>