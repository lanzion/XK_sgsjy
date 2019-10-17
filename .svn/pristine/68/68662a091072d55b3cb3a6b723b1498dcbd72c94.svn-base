<template>
	<div id="subjectDetails" class="subjectDetails">
		<!-- <v-breadcrumb></v-breadcrumb> -->
		<el-breadcrumb-item :to="{ path: 'subject', query: { id: $route.query.id } }">课题</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/space/${type}/subject/guide`, query: { id: $route.query.id } }">在研课题</el-breadcrumb-item>
        <el-breadcrumb-item>课题详情</el-breadcrumb-item>
	</div>
</template>

<script>
import breadcrumb from 'Common/breadcrumb.vue'
export default {
	name: 'subjectDetails',
    components: {
        'v-breadcrumb': breadcrumb
    },
    data() {
        return {
            type: this.$route.path.split('/')[2]						// 空间类型
        }
    }
}
</script>

<style lang='scss'>

</style>
