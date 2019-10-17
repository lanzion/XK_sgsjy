<template>
	<div id="project">
		<div class="container listBox">
            <div class="screeningBox">
                <v-cascade :changeCascade="changeCascade" model="project"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
                <v-classificationDictionary model="learningStages" :changeDataDic="changeApplyScope"></v-classificationDictionary>
            </div>
            <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" @searchVal="searchParam" :total="pagParam.totalNum"></v-tabs>
            <v-list :listData="listData" :items.sync="items">
                <template scope="props">
                    <div class="list-item-img__box">
                        <img :src="getFileUrl(props.item.imgUrl)">
                    </div>
                    <h6 class="list-item-title">{{ props.item.name }}</h6>
                    <ul class="cols-list list-item-count">
                        <li class="cols-item icon-i-time">{{props.item.startDate | dateFormat('yyyy-MM-dd')}}</li>
                        <li class="cols-item fr icon-i-person">{{props.item.currNum}}/{{props.item.totalNum}}</li>
                    </ul>
                </template>
            </v-list>
        <v-pagination :pagParam.sync="pagParam" @callback="changePage"></v-pagination>
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
            field: '',
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
            pagParam: {
                pageNum: 1,
                pageSize: 10,
                totalNum: ''
            },
            listData: {
                col: 4,
                pathUrl: '/education/project/detail',
                params: {
                    names: 'id',
                    val: 'id'
                }
            }
        }
    },
    mounted() {
        this.getData({'orgId': this.$route.query.id}, this.pagParam )
    },
    computed: {
        params: function() {
            return Object.assign( {}, {field:this.field}, {technology:this.technology}, {applyScope:this.applyScope}, {search: this.search}, {cur_tab: this.cur_tab}, {pagParam: this.pagParam})
        }
    },
    methods: {
        setCurTab: function (index) {
          this.cur_tab = index;
        },
        getData (param) {
            projectList(param, this.pagParam).then(res => {
                if(res.data.code == 200) {
                    this.items = res.data.entity.resultData
                    this.pagParam.totalNum = res.data.entity.totalNum
                }
            })
        },
        searchParam (val){
            this.search = val
        },
        changePage (val) {
            this.$set(this.pagParam,'pageNum', val)
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
.screeningBox {
    border: 1px solid #C9C9C9;
    padding: 10px 15px;
}
.tabs {
    margin-top: 30px;
}
.cols-item {
    border:none !important;
}
</style>
