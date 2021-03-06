<template>
  	<div id="works">
   		<div class="container listBox">
            <el-breadcrumb separator=">" class="navigation" v-if="$route.path.includes('street')">
                <el-breadcrumb-item :to="{ path: '/street/excellent' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>作品列表</el-breadcrumb-item>
            </el-breadcrumb>
	      	<div class="screeningBox bgc_w">
                <v-cascade model="works" :changeCascade="changeCascade"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
                <dl v-if="$route.path.startsWith('/street')" class="category-box category-input-box clearfix">
                    <dd class="category-title">区域:</dd>
                    <dt class="category-list clearfix">
                        <v-region-select class="fl select-region" @region="changeRegion" :clearable="true"/>
                        <el-select v-model="schoolName" placeholder="请选择学校" filterable clearable class="fl select-school"
                                    @change="setSearchSchool">
                            <el-option
                                v-for="item in schoolList"
                                :key="item.id"
                                :label="item.schoolName"
                                :value="item.schoolName">
                            </el-option>
                        </el-select>
                        <v-search class="fl" tips="请输入学校名称" @search="setSearchSchool"/>
                    </dt>
                </dl>
            </div>
            <div>
    			<v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" :total="pagParam.totalNum" @searchVal="searchParam" ></v-tabs>
    			<v-list :listData="listData" :items.sync="items" class="list">
                    <template scope="props">
                        <div class="bgc_w">
                            <div class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.resourceId) || listDefault})` }"></div>
                                <!-- <img :src="getFileUrl(props.item.resourceId) || listDefault" /> -->
                            </div>
                            <h6 class="list-item-title ellipsis">
                                <span>{{props.item.workName | textOverflow(12) }}</span>
                            </h6>
                            <p class="info">
                                <!-- <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{props.item.collectNum || 0}}</span> -->
                                <!-- <span class="info-item" title="评论"><i class="icon-btn-i-reply"></i> {{props.item.commentNum || 0}}</span> -->
                                <span class="info-item" title="浏览"><i class="icon-i-creator"></i> {{props.item.browseNum || 0}}人看过</span>
                            </p>
                        </div>
                    </template>
                </v-list>
            </div>
            <v-pagination :param.sync='pagParam' :changePage="changePage"></v-pagination>
		</div>
 	</div>
</template>

<script>
import cascade from 'Common/screening/cascade.vue'
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import { requestFrontendWorksList } from '@/service/works.js'
import pagination from 'Common/pagination.vue'
import region from '@/components/common/select/region_select.vue'
import search from '@/components/common/search.vue'
import { requestSchoolList } from '@/service/common.js'
export default {
  	name: 'works',
  	components: {
  		"v-cascade": cascade,
    	"v-classificationDictionary": classificationDictionary,
        "v-tabs": tabs,
        "v-list": list,
        "v-pagination": pagination,
        'v-region-select': region,
        'v-search': search,
  	},
  	data () {
  		return {
  			tabs: [
				{ name: '全部作品', type: 0},
				{ name: '最多浏览', type: 1},
                { name: '最多点赞', type: 2},
                { name: '最多收藏', type: 3},
				{ name: '最多分享', type: 4},
			],
			cur_tab: 0,
			is_search: true,
            isStreet: this.$route.path.startsWith('/street'), // 街区作品
			count: {name: '作品', color: 'lightBlue'},
      		listData: {
                col: 4,
                pathUrl: '/space/worksDetail',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            cascadeCode: '',
            technology: '',
            items: [],
            pagParam: {
                pageNum: 1,
                pageSize: 20,
                totalNum: 0
            },
            search: '',
            region: {
                province: null,
                city: null,
                area: null
            },
            schoolName: '',
            schoolList: [], // 学校列表
  		}
  	},
  	methods: {
        async requestSchoolList () {
            const res = await requestSchoolList(this.region)

            if (res.status === 200 && res.data.code === 200) {
                this.schoolList = (res.data.appendInfo || {}).comboxList || []
            }
        },
        changeRegion ([provinceId = null, cityId = null, areaId = null] = []) {
            this.region = {provinceId, cityId, areaId}
            this.schoolName = ''

            // 重置省市区，清空学校列表
            if (!provinceId && !cityId && !areaId) {
                this.schoolList = []
                return false
            }

            this.requestSchoolList()
        },

        // 学校搜索框/下拉框改变
        setSearchSchool (name) {
            this.schoolName = name
        },
  		setCurTab: function (index) {
	  		this.cur_tab = index;
	  	},
        changeCascade (data) {
            let cascadeCode = Array.from(data, x => x.id)
            this.$set(this.$data, 'cascadeCode', cascadeCode.join('-'))
        },
        changeTechnology(item) {
            this.$set(this.$data, 'technology', item.id)
        },
        getData (param) {
            requestFrontendWorksList(param, this.pagParam).then(res => {
                if(res.data.code == 200 && res.data.entity != null) {
                    this.items = res.data.entity.resultData
                    this.$set(this.pagParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        },
        searchParam (val){
            this.search = val
        },
        changePage (val) {
            this.$set(this.pagParam,'pageNum', val)
            this.getData({'orgId': this.$route.query.id})
        }
  	},
    mounted() {
        this.getData({'orgId': this.$route.query.id})
    },
    computed: {
        params: function() {
            return Object.assign( {}, {cascadeCode:this.cascadeCode}, {technology: this.technology}, {search:this.search}, {cur_tab: this.cur_tab}, this.region,{schoolName: this.schoolName})
        }
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
               switch (val.cur_tab) {
                    case '1':
                    this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'browseNum': 1, schoolName: val.schoolName})
                    break;cascadeCode
                    case '2':
                    this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'praiseCount': 1, schoolName: val.schoolName})
                    break;
                    case '3':
                    this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'collectionCount': 1, schoolName: val.schoolName})
                    break;
                    case '4':
                    this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'dynamicCount': 1, schoolName: val.schoolName})
                    break;
                    default:
                    this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, schoolName: val.schoolName})
                }
            },
            deep: true
        }
    }
}

</script>

<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
.info {
    font-size: 14px;
    color: #999;
    text-indent: 1em;
    height: 20px;
    padding-bottom: 8px;
    .info-item + .info-item {
        margin-left: 20px;
    }
}
.screeningBox {
    border: none;
}
.list {
    /* padding: 0 10px; */
    box-sizing: border-box;
}
.list-item-title {
    height: 30px;
    line-height: 30px;
    text-indent: 1em;
    padding-top: 4px;
}
.browseNum {
    height: 40px;
}
</style>
