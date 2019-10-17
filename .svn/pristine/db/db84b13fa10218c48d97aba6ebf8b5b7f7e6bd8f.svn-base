<template>
  	<div id="schoolWorks">
   		<div class="container listBox">
	      	<div class="screeningBox">
	 			<v-cascade></v-cascade>
	        	<v-classificationDictionary :model="'technicalClassification'"></v-classificationDictionary>
	      	</div>
			<v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs"></v-tabs>
			<v-list :optionData="optionData"></v-list>
		</div>
 	</div>
</template>

<script>
import cascade from './../../common/screening/cascade.vue'
import classificationDictionary from './../../common/screening/classificationDictionary.vue'
import tabs from 'Common/classificationList/list/graphic/list.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
export default {
  	name: 'schoolWorks',
  	components: {
  		"v-cascade": cascade,
    	"v-classificationDictionary": classificationDictionary,
		  'v-tabs': tabs,
		  'v-list': list
  	},
  	data () {
  		return {
  			tabs: [
				{ name: '全部作品', type: 0},
				{ name: '人气最高', type: 1},
				{ name: '最新', type: 2}
			],
			cur_tab: 0,
			is_always_req: true,
			is_search: true,
			count: {
				num: 234,
				name: '作品'
			},
  			classificationDictionary: [
        		{"name":"技术","url":"common/getDictComb",params:{"paramName":"groupCode","paramVal":"technicalClassification"},ifAll:true,"resName":"TechnologyId"}
      		],
      		optionData: {
        		dataUrl:'maker/resource/getReceptionList',
        		list_col:5,
        		pathUrl:'',
            ispagination:true,
            linkTo:'/classSpace/works/details'
      		}
  		}
  	},
  	methods: {
  		setCurTab: function (index) {
	  		this.cur_tab = index;
	  	}
  	}
}

</script>

<style lang='scss' scoped>
</style>
