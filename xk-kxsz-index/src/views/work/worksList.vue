<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="screeningBox bgc_w">
            <v-cascade model="works" :changeCascade="changeCascade"></v-cascade>
            <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
            <dl v-if="$route.path.startsWith('/street')" class="category-box category-input-box clearfix">
                <dd class="category-title"><span class="cate-tit">区域</span>:</dd>
                <dt class="category-list clearfix">
                    <v-region-select class="fl select-region mr10" @region="changeRegion" :clearable="true"/>
                    <el-select v-model="schoolName" placeholder="请选择学校" filterable clearable class="fl select-school mr10" @change="setSearchSchool">
                        <el-option
                            v-for="item in schoolList"
                            :key="item.id"
                            :label="item.schoolName"
                            :value="item.schoolName">
                        </el-option>
                    </el-select>
                    <v-search class="fl" tips="请输入学校名称" @search="setSearchSchool" />
                </dt>
            </dl>
        </div>
        <section class="list-group list-group__works">
            <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" :total="pageParam.totalNum" @searchVal="searchParam" ></v-tabs>
            <el-row :gutter="20" class="list-group__main" v-if="items.length">
                <el-col :span="6" v-for="(item, index) in items" :key="item.id || index">
                    <div class="list-group__item" @click="redirect(pages.detail.works, { query: { id: item.id }})">
                        <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.resourceId) || listDefault})` }" @click="redirect(pages.detail.works, { query: { id: item.id }})"></a>
                        <div class="info">
                            <h6 class="item-title" @click="redirect(pages.detail.works, { query: { id: item.id }})">{{ item.workName }}</h6>
                            <p class="org">{{ item.schoolName || item.schoolId }}</p>
                            <div class="statis">
                                <i class="icon icon-i-browse">{{ item.browseNum}}</i>
                                <i class="icon icon-i-collect">{{ item.collectionCount }}</i>
                                <i class="icon icon-i-like">{{ item.praiseCount }}</i>
                            </div>
                        </div>
                        <div class="author-info clearfix">
                            <div class="face bg-img__wrap fl" :style="{ 'background-image': `url(${getFileUrl(item.face) || faceDefault})` }"></div>
                            <span>{{ item.userName }}</span>
                            <time class="time fr">{{ item.createDate | dateTimeStamp('yyyy-MM-dd') }}</time>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="no-data" v-else>暂无作品数据</div>
            <v-pagination :param.sync='pageParam' :changePage="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
import { requestSchoolList } from '@/service/common.js'
import { requestHot } from '@/service/work.js'
import cascade from '@/components/common/screening/cascade.vue'
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import tabs from '@/components/common/tabs.vue'
import list from '@/components/common/list.vue'
import pagination from '@/components/common/pagination.vue'
import region from '@/components/common/select/region_select.vue'
import search from '@/components/common/search.vue'

export default {
    name: 'worksList',
    components: {
        'v-cascade': cascade,
        'v-classificationDictionary': classificationDictionary,
        'v-tabs': tabs,
        'v-list': list,
        'v-pagination': pagination,
        'v-region-select': region,
        'v-search': search,
    },
    data() {
        return {
            id: this.$route.query.id,
            breadcrumb: [
                { path: '/work', name: '作品' },
                { path: '', name: '列表' }
            ],
            tabs: [
                { name: '全部作品', type: 0 },
                { name: '最多浏览', type: 1, key: 'browseNum' },
                { name: '最多点赞', type: 2, key: 'praiseCount' },
                { name: '最多收藏', type: 3, key: 'collectionCount' },
                { name: '最多分享', type: 4, key: 'dynamicCount' },
            ],
            cur_tab: 0,
            is_search: true,
            isStreet: this.$route.path.startsWith('/street'), // 街区作品
            count: { name: '作品', color: 'lightBlue' },
            cascadeCode: '',
            technology: '',
            items: [],
            pageParam: {
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
        async requestSchoolList() {
            const res = await requestSchoolList(this.region)

            if (res.status === 200 && res.data.code === 200) {
                this.schoolList = (res.data.appendInfo || {}).comboxList || []
            }
        },
        changeRegion([provinceId = null, cityId = null, areaId = null] = []) {
            this.region = { provinceId, cityId, areaId }
            this.schoolName = ''

            // 重置省市区，清空学校列表
            if (!provinceId && !cityId && !areaId) {
                this.schoolList = []
                return false
            }

            this.requestSchoolList()
        },

        // 学校搜索框/下拉框改变
        setSearchSchool(name) {
            this.schoolName = name
        },
        setCurTab: function (index) {
            this.cur_tab = index
        },
        changeCascade(data) {
            const cascadeCode = Array.from(data, x => x.id)
            this.$set(this.$data, 'cascadeCode', cascadeCode.join('-'))
        },
        changeTechnology(item) {
            this.$set(this.$data, 'technology', item.id)
        },
        getData(param) {
            requestHot(param, this.pageParam).then((res) => {
                if (res.data.code === 200 && res.data.entity !== null) {
                    this.items = res.data.entity.resultData
                    this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        },
        searchParam(val) {
            this.search = val
        },
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getData({ orgId: this.id })
        }
    },
    mounted() {
        this.getData({ orgId: this.id })
    },
    computed: {
        params: function () {
            const orderBy = { [this.tabs[this.cur_tab].key]: 1 } || {}

            return Object.assign(orderBy,
                this.region,
                { orgId: this.id },
                { workType: this.cascadeCode },
                { technology: this.technology },
                { workName: this.search },
                { schoolName: this.schoolName }
            )
        }
    },
    watch: {
        params: {
            handler: function (val) {
                this.getData(val)
               // switch (val.cur_tab) {
               //      case '1':
               //      this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'browseNum': 1, schoolName: val.schoolName})
               //      break;cascadeCode
               //      case '2':
               //      this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'praiseCount': 1, schoolName: val.schoolName})
               //      break;
               //      case '3':
               //      this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'collectionCount': 1, schoolName: val.schoolName})
               //      break;
               //      case '4':
               //      this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'dynamicCount': 1, schoolName: val.schoolName})
               //      break;
               //      default:
               //      this.getData({...this.region, 'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, schoolName: val.schoolName})
               //  }
            },
            deep: true
        }
    }
}

</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/form.scss';
@import '~@/assets/css/scss/list.scss';
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/vars.scss';
.mr10 {
    margin-right: 10px;
}
.screeningBox {
    border: none;
}
.breadcrumbs {
    padding: 20px 0;
}
$face-size: 24px;
$box-border: 1px solid #f5f5f5;
.wrap {
    padding-bottom: 100px;
}

.face {
    display: inline-block;
    width: $face-size;
    height: $face-size;
    margin-right: 10px;
    border-radius: 50%;
}

.list-group__link {
    margin-top: 20px;
}

.list-group {
    margin-top: 32px;

    .list-group__header {
        margin-bottom: 20px;
        border-bottom: 1px solid #dfdfdf;
        line-height: 40px;

        .title {
            font-size: 24px;
        }
        .more {
            font-size: 14px;
            color: #999;
            &:hover {
                color: nth($default-color, 1);
            }
        }
    }

    .list-group__main {
        .list-group__item {
            margin-bottom: 20px;
            border-radius: $box-radiu;
            background-color: #fff;
            transition: box-shadow .2s;
            overflow: hidden;

            &:hover {
                box-shadow: $index-box-shadow;
            }

            .item-title {
                &:hover {
                    color: nth($default-color, 1);
                    cursor: pointer;
                }
            }
        }
        .pic {
            display: block;
        }
    }
}
.list-group__works {
    .list-group__item {
        .pic {
            height: 196px;
        }
        .info {
            height: 100px;
            padding: 1em;
            border-bottom: $box-border;
            box-sizing: border-box;
            .item-title {
                font-size: 14px;
                line-height: 2;
            }
            .org,
            .statis {
                color: #bbb;
            }
            .statis {
                line-height: 4;
                .icon {
                    &:before {
                        margin-right: 5px;
                        vertical-align: middle;
                    }
                    & + .icon {
                        margin-left: 10px;
                    }
                }
            }
        }
        .author-info {
            padding: 1em;
            box-sizing: border-box;
            line-height: $face-size;
            .time {
                color: #bbb;
            }
        }
    }
}
</style>
