<template>
	<div id="subjectDetails" class="subjectDetails">
		<v-breadcrumb></v-breadcrumb>
	</div>
</template>

<script>
import breadcrumb from 'Common/breadcrumb.vue'
export default {
	name: 'subjectDetails',
    components: {
        'v-breadcrumb': breadcrumb
    }
}
</script>

<style lang='scss'>

</style>
