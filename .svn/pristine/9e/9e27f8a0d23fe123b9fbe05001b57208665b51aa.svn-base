<template>
  	<div id="classResource">
    	<div class="container listBox">
	      	<div class="screeningBox">
	 			<v-cascade></v-cascade>
		        <v-classificationDictionary :model="'technicalClassification'"></v-classificationDictionary>
		        <v-classificationDictionary :model="'resourceFormats'"></v-classificationDictionary>
	      	</div>
			<v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs"></v-tabs>
			<v-list :listData="listData"></v-list>
		</div>
  	</div>
</template>

<script>
import cascade from './../../common/screening/cascade.vue'
import classificationDictionary from './../../common/screening/classificationDictionary.vue'
import tabs from './../../common/classificationList/classification/tabs.vue'
import list from '../../resource/resource_list.vue'

export default {
  	name: 'classResource',
 	 components: {
    	"v-cascade": cascade,
    	"v-classificationDictionary": classificationDictionary,
		'v-tabs': tabs,
		'v-list': list
	},
  	data () {
  		return {
  			tabs: [
				{ name: '全部资源', type: 0},
				{ name: '最新上传', type: 1},
				{ name: '最多下载', type: 2},
				{ name: '评分最高', type: 3},
				{ name: '最多浏览', type: 4}
			],
			cur_tab: 0,
			is_always_req: true,
			is_search: true,
			count: {
				num: 234,
				name: '资源'
			},
  			classificationDictionary: [
        		{"name":"技术","url":"common/getDictComb",params:{"paramName":"groupCode","paramVal":"technicalClassification"},ifAll:true,"resName":"TechnologyId"},
        		{"name":"格式","url":"common/getDictComb",params:{"paramName":"groupCode","paramVal":"resourceFormats"},ifAll:true,"resName":"ApplyScopeId"}
      		],
      		listData: {
	        	dataUrl:'maker/resource/getReceptionList',
	        	linkTo:'/classSpace/resource/details'
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