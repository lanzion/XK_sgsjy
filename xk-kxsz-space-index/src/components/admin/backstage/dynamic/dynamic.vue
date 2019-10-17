<template>
	<div id="adminDynamic">
		<v-person-dynamic></v-person-dynamic>
	</div>
</template>

<script>
	import personDynamic from '@/components/common/dynamic/person_dynamic.vue';
	export default {
		name: 'adminDynamic',
		data() {
			return {

			}
		},
		mounted() {
		},
	    components: {
	        'v-person-dynamic': personDynamic
	    }
	}
</script>

<style lang="scss" scoped="">
</style>