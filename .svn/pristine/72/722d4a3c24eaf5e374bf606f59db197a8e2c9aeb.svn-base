<template>
	<div id="project">
		<div class="container listBox">
            <el-breadcrumb separator=">" class="navigation" v-if="$route.path.includes('education')">
                <el-breadcrumb-item :to="{ path: '/education/project' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>项目列表</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="screeningBox bgc_w">
                <v-cascade :changeCascade="changeCascade" model="project"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
                <v-classificationDictionary model="learningStages" :changeDataDic="changeApplyScope"></v-classificationDictionary>
            </div>
            <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" @searchVal="searchParam" :total="pageParam.totalNum"></v-tabs>
            <v-list :listData="listData" :items.sync="items">
                <template scope="props">
                    <div class="bgc_w">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.imgUrl) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(props.item.imgUrl) || listDefault"> -->
                        </div>
                        <h6 class="list-item-title ellipsis">{{ props.item.name }} </h6>
                        <ul class="cols-list list-item-count clearfix">
                            <li class="cols-item icon-i-time"> {{props.item.startDate | dateFormat('yyyy-MM-dd')}} </li>
                            <li class="cols-item fr icon-i-person"> {{props.item.currNum}}/{{props.item.totalNum}} </li>
                        </ul>
                    </div>
                </template>
            </v-list>
            <v-pagination :param="pageParam" :changePage="changePage"></v-pagination>
        </div>
	</div>
</template>

<script>
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import cascade from 'Common/screening/cascade.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import pagination from 'Common/pagination.vue'
import { projectList } from '@/service/project.js'
export default {
    name: 'project',
    components: {
        "v-classificationDictionary": classificationDictionary,
        "v-cascade": cascade,
        'v-tabs': tabs,
        'v-list': list,
        'v-pagination': pagination
    },
    data () {
        return {
            field: this.$store.state.edu.fieldSelected.idArr.join('-'),
            technology: '',
            applyScope: '',
            search: '',
            tabs: [
                { name: '全部项目', type: 0},
                { name: '正在报名', type: 1},
                { name: '最多参与', type: 2}
            ],
            cur_tab: 0,
            is_search: true,
            count: {name: '项目'},
            items: [],
            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0
            },
            listData: {
                col: 4,
                pathUrl: '/education/project/detail',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            route: 'educationBureauSpace'
        }
    },
    mounted() {
        this.getData({'orgId': this.$route.query.id}, this.pageParam )
    },
    computed: {
        params: function() {
            return Object.assign( {}, {field:this.field}, {technology:this.technology}, {applyScope:this.applyScope}, {search: this.search}, {cur_tab: this.cur_tab}, {pageParam: this.pageParam})
        }
    },
    methods: {
        setCurTab: function (index) {
            this.cur_tab = index;
        },
        getData (param) {
            projectList(param, this.pageParam).then(res => {
                if(res.data.code == 200) {
                    this.items = res.data.entity.resultData
                    this.$set(this.$data.pageParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        },
        searchParam (val){
            this.search = val
        },
        changePage (val) {
            this.$set(this.pageParam,'pageNum', val)
            let params = this.params
            switch(this.cur_tab){
                case '1':
                    this.getData({'technologyId':params.technology, 'applyScopeId':params.applyScope, 'projectType':params.field, 'name': params.search, 'orgId': this.$route.query.id, 'enroll': 1})
                    break;
                case '2':
                    this.getData({'technologyId':params.technology, 'applyScopeId':params.applyScope, 'projectType':params.field, 'name': params.search, 'orgId': this.$route.query.id, 'partSort': 1})
                    break;
                default:
                    this.getData({'technologyId':params.technology, 'applyScopeId':params.applyScope, 'projectType':params.field, 'name': params.search, 'orgId': this.$route.query.id})
                    break;
            }
        },
        changeCascade (data) {
            let cascadeCode = Array.from(data, x => x.id)
            this.$set(this.$data, 'field', cascadeCode.join('-'))
        },
        changeTechnology(data) {
            this.$set(this.$data, 'technology', data.id)
        },
        changeApplyScope(data) {
            this.$set(this.$data, 'applyScope', data.id)
        },
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
                switch (val.cur_tab) {
                    case '1':
                        this.getData({'technologyId':val.technology, 'applyScopeId':val.applyScope, 'projectType':val.field, 'name': val.search, 'orgId': this.$route.query.id, 'enroll': 1})
                        break;
                    case '2':
                        this.getData({'technologyId':val.technology, 'applyScopeId':val.applyScope, 'projectType':val.field, 'name': val.search, 'orgId': this.$route.query.id, 'partSort': 1})
                        break;
                    default:
                        this.getData({'technologyId':val.technology, 'applyScopeId':val.applyScope, 'projectType':val.field, 'name': val.search, 'orgId': this.$route.query.id})
                        break;
                }
            },
            deep: true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
@import '~@/asset/scss/cols.scss';
.tabs {
    margin-top: 30px;
}
.cols-item {
    border:none !important;
}
.list-item-title {
    height: 30px;
    line-height: 30px;
    text-indent: 1em;
}
.list-item-count {
    padding: 0 14px 10px;
}
</style>
