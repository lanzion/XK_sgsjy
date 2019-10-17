<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="screeningBox bgc_w">
            <v-cascade class="category-box" :changeCascade="changeCascade" model="project"></v-cascade>
            <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
            <v-classificationDictionary model="learningStages" :changeDataDic="changeApplyScope"></v-classificationDictionary>
        </div>
        <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" @searchVal="searchParam" :total="pageParam.totalNum"></v-tabs>
        <el-row class="list-group__project" :gutter="20" v-if="items.length">
            <el-col :span="6" v-for="(item, index) in items" :key="item.id">
                <div class="list-group__item" @click="redirect(pages.detail.project, { query: { id: item.id }, target: '_blank' })">
                    <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.imgUrl)})` }"></a>
                    <div class="info">
                        <h6 class="item-title c_333 ellipsis">{{ item.name }}</h6>
                        <div class="statis c_bbb clearfix">
                            <span class="fl item-date">
                                <i class="icon-i-time"></i>
                                {{item.startDate | dateFormat('yyyy-MM-dd')}}
                            </span>
                            <p class="fr item-type">
                                <span class="school-type primary" v-if="item.applyScopeId.includes('primarySchool')">小学</span>
                                <span class="school-type junior" v-if="item.applyScopeId.includes('middleSchool')">初中</span>
                                <span class="school-type senior" v-if="item.applyScopeId.includes('highSchool')">高中</span>
                            </p>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="empty-block" v-else>暂无数据</div>
        <!-- <el-row :gutter="20" class="list" v-if="items.length">
            <el-col :span="6" class="list-item__box list-item__shadow" v-for="(item, index) in items" :key="item.id || index">
                <div class="list-item bgc_w" @click="redirect(pages.detail.project, { query: { id: item.id }})">
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
        </el-row> -->
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import cascade from '@/components/common/screening/cascade.vue'
import tabs from '@/components/common/tabs.vue'
import list from '@/components/common/list.vue'
import pagination from '@/components/common/pagination.vue'
import { requestProjectList } from '@/service/study.js'

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
            id: this.$route.query.id,
            breadcrumb: [
                { path: '/education', name: '活动培训' },
                { path: '', name: '项目列表' }
            ],
            // field: this.$store.state.edu.fieldSelected.idArr.join('-'),
            field: '',
            technology: '',
            applyScope: '',
            search: '',
            tabs: [
                { name: '全部项目', type: 0 },
                { name: '正在报名', type: 1, param: { enroll: 1 } },
                { name: '最多参与', type: 2, param: { partSort: 1 } }
            ],
            cur_tab: 0,
            is_search: true,
            count: { name: '项目', color: 'lightBlue' },
            items: [],
            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0
            }
        }
    },
    mounted() {
        this.getData({ orgId: this.id, ...this.pageParam })
    },
    computed: {
        params: function () {
            const orderBy = this.tabs[this.cur_tab].param || {}
            return Object.assign(orderBy,
                this.pageParam,
                { projectType: this.field },
                { technologyId: this.technology },
                { applyScopeId: this.applyScope },
                { name: this.search },
                { orgId: this.id }
            )
        }
    },
    methods: {
        setCurTab: function (index) {
            this.cur_tab = index
        },
        getData(param) {
            requestProjectList(param).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.items = _data.resultData || []
                    this.$set(this.pageParam, 'totalNum', _data.totalNum || 0)
                }
            })
        },
        searchParam(val) {
            this.search = val
        },
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
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
                this.getData(val)
            },
            deep: true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/vars.scss';
$box-radiu: 5px;
$face-size: 24px;
/* .cols-item {
    border:none !important;
}
.list-item-title {
    height: 30px;
    line-height: 30px;
    text-indent: 1em;
}
.list-item-count {
    padding: 0 14px 10px;
} */


.list-group__project {
    margin-top: 18px;
    .list-group__item {
        margin-bottom: $box-item-margin;
        border-radius: $box-radiu;
        background-color: #fff;
        transition: box-shadow .2s;
        overflow: hidden;
        &:hover {
            box-shadow: $index-box-shadow;
        }
        .pic {
            height: 176px;
            display: block;
        }
        .info {
            padding: 15px;
            border-bottom: 3px solid #e4e4e4;
            box-sizing: border-box;
            .item-title {
                font-size: 14px;
                margin-bottom: 15px;
                &:hover {
                    color: nth($default-color, 1);
                    cursor: pointer;
                }
            }
            .statis {
                line-height: 15px;
                .item-date {
                    width: 85px;
                    i {
                        vertical-align: middle;
                    }
                }
                .item-type {
                    width: 168px;
                    text-align: right;
                    .school-type {
                        border-radius: 13px;
                        padding: 0px 4px;
                        margin-left: 5px;
                        color: #fff;
                    }
                    .primary {
                        background-color: #80c269
                    }
                    .junior {
                        background-color: #ffa900;
                    }
                    .senior {
                        background-color: #367dd5;
                    }
                }
            }
        }
        &:hover {
            .info {
                border-color: nth($default-color, 1);
            }
        }
        .author-info {
            padding: 1em;
            box-sizing: border-box;
            line-height: $face-size;
        }
    }
}
</style>
