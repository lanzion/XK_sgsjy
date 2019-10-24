<template>
    <div id="detail">
        <el-breadcrumb separator=">" class="container" style="padding: 1em 0;">
            <el-breadcrumb-item v-for="(item, index) in items" :to="{ path: item.path, query: item.query }" :key="index" >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bgc_w container">
            <div class="independentDetail">
                <h1 v-text='title' class="title"></h1>
                <time class="date">发布时间 :{{date | dateFormat('yyyy')}}-{{date | dateFormat('MM')}}-{{date | dateFormat('dd')}}</time>
                <div v-html='mes'></div>
            </div>
            <ul class="attList" v-if="attList.length">
                <li class="attList_title fl">附件:</li>
                <!-- <li v-for="(i, k)  in attList" class="attList_li"> <a :href="downloadUrl(i.resourceId, i.resourceName)" :download="i.resourceId.split('/')[i.resourceId.split('/').length - 1]" class="btn" title="下载">{{ i.resourceName }} </a></li> -->
                <li v-for="(i, k)  in attList" class="attList_li"> <a @click="downloadUrl(i.resourceId, i.resourceId.split('/')[i.resourceId.split('/').length - 1] )" class="btn" title="下载">{{ i.resourceName }} </a></li>
            </ul>
        </div>
     </div>
</template>

<script>
export default {
    name: 'detail',
    data() {
        return {
            items: [],
            mes: '',
            title: '',
            date: '',
            attList: []
        }
    },
    props: {
        lisId: String
    },
    mounted() {
        this.$http.post('admin/notice/detail/searchInfo', { id: this.$route.query.inforId }).then((res) => {
            this.mes = res.data.entity.content
            this.title = res.data.entity.title
            this.date = res.data.entity.publishDate
            this.attList = res.data.entity.portalNoticeDetailResource
        })
        this.analysisPath()
    },
    methods: {
        analysisPath() {
            const type = this.$route.params.type
            const orgType = this.$route.path.split('/')[2]
            let typeName

            if (type === '0') {
                typeName = '资讯'
            } else if (type === '1') {
                typeName = '公告'
            }
            if (orgType === this.pages.detail.edu.path.split('/')[2]) {
                this.items = [
                    { path: this.pages.detail.edu.path, title: '首页', query: { id: this.$route.query.id } },
                    { path: `${this.pages.detail.edu.path}/information`, title: typeName, query: { id: this.$route.query.id, inforId: this.$route.query.inforId } },
                    { path: '', title: `${typeName}详情` }
                ]
            } else {
                this.items = [
                    { path: this.pages.detail.school.path, title: '首页', query: { id: this.$route.query.id } },
                    { path: `${this.pages.detail.school.path}/information`, title: typeName, query: { id: this.$route.query.id, inforId: this.$route.query.inforId } },
                    { path: '', title: `${typeName}详情` }
                ]
            }
        },
    },
    watch: {
        '$route.path': 'analysisPath',
    },
}
</script>

<style lang='scss'>
@import '~@/assets/css/scss/datails.scss';
</style>

<style lang='scss' scoped>
.attList {
    font-size: 14px;
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
</style>