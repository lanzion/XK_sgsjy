<template>
	<div id="project">
		<div class="container listBox">
            <div class="screeningBox bgc_w">
                <v-cascade :changeCascade="changeCascade" model="project"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
                <v-classificationDictionary model="learningStages" :changeDataDic="changeApplyScope"></v-classificationDictionary>
            </div>
            <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" @searchVal="searchParam" :total="pageParam.totalNum"></v-tabs>
            <el-row :gutter="20" class="list is-el-layout" v-if="items.length">
                <el-col :span="6" class="list-item__box" v-for="(item, index) in items" :key="item.id">
                    <div class="bgc_w item" @click="redirect(pages.detail.project, { query: { id: item.id }})">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.imgUrl) || listDefault})` }"></div>
                        </div>
                        <h6 class="list-item-title ellipsis">{{ item.name }} </h6>
                        <ul class="cols-list list-item-count clearfix">
                            <li class="cols-item icon-i-time"> {{item.startDate | dateFormat('yyyy-MM-dd')}} </li>
                            <li class="cols-item fr icon-i-person"> {{item.currNum}}/{{item.totalNum}} </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
        </div>
	</div>
</template>

<script>
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import cascade from 'Common/screening/cascade.vue'
import tabs from 'Common/tabs.vue'
import list from 'Common/list/graphic/list.vue'
import pagination from 'Common/pagination.vue'
import { projectList } from '@/service/project.js'
import { mapState } from 'vuex'

export default {
    name: 'project',
    components: {
        'v-classificationDictionary': classificationDictionary,
        'v-cascade': cascade,
        'v-tabs': tabs,
        'v-list': list,
        'v-pagination': pagination
    },
    data() {
        return {
            // field: this.$store.state.edu.fieldSelected.idArr.join('-'),
            technology: '',
            applyScope: '',
            search: '',
            tabs: [
                { name: '全部项目', type: 0 },
                { name: '正在报名', type: 1 },
                { name: '最多参与', type: 2 }
            ],
            cur_tab: 0,
            is_search: true,
            count: { name: '项目' },
            items: [],
            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0
            },
            route: 'educationBureauSpace'
        }
    },
    mounted() {
        this.getData({ orgId: this.$route.query.id }, this.pageParam)
    },
    computed: {
        ...mapState({
            field: state => state.edu.fieldSelected.idArr.join('-')
        }),
        params: function () {
            return Object.assign({}, { field: this.field }, { technology: this.technology }, { applyScope: this.applyScope }, { search: this.search }, { cur_tab: this.cur_tab }, { pageParam: this.pageParam })
        }
    },
    methods: {
        setCurTab: function (index) {
            this.cur_tab = index
        },
        getData(param) {
            projectList(param, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.items = res.data.entity.resultData
                    this.$set(this.$data.pageParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        },
        searchParam(val) {
            this.search = val
        },
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            const params = this.params
            switch (this.cur_tab) {
                case '1':
                    this.getData({ technologyId: params.technology, applyScopeId: params.applyScope, projectType: params.field, name: params.search, orgId: this.$route.query.id, enroll: 1 })
                    break
                case '2':
                    this.getData({ technologyId: params.technology, applyScopeId: params.applyScope, projectType: params.field, name: params.search, orgId: this.$route.query.id, partSort: 1 })
                    break
                default:
                    this.getData({ technologyId: params.technology, applyScopeId: params.applyScope, projectType: params.field, name: params.search, orgId: this.$route.query.id })
                    break
            }
        },
        changeCascade(data) {
            const cascadeCode = Array.from(data, x => x.id)
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
            handler: function (val) {
                switch (val.cur_tab) {
                    case '1':
                        this.getData({ technologyId: val.technology, applyScopeId: val.applyScope, projectType: val.field, name: val.search, orgId: this.$route.query.id, enroll: 1 })
                        break
                    case '2':
                        this.getData({ technologyId: val.technology, applyScopeId: val.applyScope, projectType: val.field, name: val.search, orgId: this.$route.query.id, partSort: 1 })
                        break
                    default:
                        this.getData({ technologyId: val.technology, applyScopeId: val.applyScope, projectType: val.field, name: val.search, orgId: this.$route.query.id })
                        break
                }
            },
            deep: true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
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
.item {
        border-radius: 5px;
        overflow: hidden;
    }
</style>
