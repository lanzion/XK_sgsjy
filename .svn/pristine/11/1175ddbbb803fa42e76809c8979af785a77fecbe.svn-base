<template>
    <div id="projectReview">
        <div v-if="projectDetail">
            <v-project-intro :status.sync="status"></v-project-intro>
            <div class="bgw">
                <v-tabs :tabs="[
                    { name: '项目详情', type: 'repertoire'},
                    { name: '项目成员', type: 'member'},
                    { name: '项目阶段', type: 'stage'},
                    { name: '项目总结', type: 'summary'},
                    { name: '项目评价', type: 'evaluate'},
                    { name: '讨论区', type: 'discuss'},
                    { name: '资源共享区', type: 'share'}
                ]" :router="router" class="evaluation-tabs"></v-tabs>
                <router-view :ifAdmin="ifAdmin" @changeStutas='getDate' :projectDetail="projectDetail"></router-view>
            </div>
        </div>
        <div style="text-align:center;margin:20px 0;" v-else>暂无数据</div>
    </div>
</template>

<script>
import projectIntro from 'components/project/project_intro.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import { detailProject } from '@/service/project.js'
import { requestDictComb } from '@/service/common.js'
import { mapActions } from 'vuex'

export default {
    name: 'projectReview',
    data () {
        return {
            projectDetail: null,
            router: {
                path: '/admin/project/review'
            },
            status: {num:''},
            ifAdmin: false
        }
    },
    components: {
        'v-project-intro': projectIntro,
        'v-tabs': tabs
    },
    created() {
        this.getDate()
        // 添加路由参数
        this.router.query = this.$route.query;
        let lastPath = this.$route.path.split('/')[this.$route.path.split('/').length-1]
        if(lastPath == "review") {
            this.ifAdmin = true
        }
    },
    methods: {
        ...mapActions({
            save: 'project/save'
        }),
        // 请求数据
        getDate () {
            detailProject({ 'id': this.$route.query.id }).then( res => {
                if(res.data.code === 200){
                    this.projectDetail = res.data.entity
                    this.save(res.data.entity)
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
</style>