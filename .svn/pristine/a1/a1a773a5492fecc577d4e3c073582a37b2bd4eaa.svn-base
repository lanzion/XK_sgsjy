<template>
    <div id="subjectOverview" class="subjectOverview">
        <!-- <v-breadcrumb></v-breadcrumb> -->
        <el-breadcrumb class="breadcrumbs" separator=">">
          <el-breadcrumb-item :to="{ path: '/space/school/subject', query: { id: $route.query.id } }">课题</el-breadcrumb-item>
          <el-breadcrumb-item>{{breadcrumbName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="overview">
            <v-screeningTabs></v-screeningTabs>
            <v-screeningList></v-screeningList>
        </div>
    </div>
</template>

<script>
import screeningTabs from 'Common/module/subject/subjectTabs.vue'
import screeningList from 'Common/module/subject/subjectList.vue'
import breadcrumb from 'Common/breadcrumb.vue'
export default {
    name: 'subjectOverview',
    components: {
        'v-screeningTabs': screeningTabs,
        'v-screeningList': screeningList,
        'v-breadcrumb': breadcrumb
    },
    data() {
        return {
            breadcrumbName: ''
        }
    },
    mounted() {
        const _route = this.$route.path.substring(strNum)
        switch (_route){
            case '/guide':
                breadcrumbName = '课题指南'
                break
            case '/research':
                breadcrumbName = '在研课题'
                break
            case '/activity':
                breadcrumbName = '课题活动'
                break
            case '/results':
                breadcrumbName = '课题成果'
                break
            case '/resource':
                breadcrumbName = '课题资源'
                break
            default:
                break
        }
    },
    methods: {
    }
}
</script>

<style lang='scss' scoped>
.overview {
    position: relative;
    margin-bottom: 50px;
}
</style>
