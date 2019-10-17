<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="screeningBox bgc_w">
            <v-cascade class="category-box" :changeCascade="changeCascade" model="train"></v-cascade>
            <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
            <v-classificationDictionary model="courseGrade" :changeDataDic="changeApplyScope"></v-classificationDictionary>
        </div>
        <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" @searchVal="searchParam" :total="pageParam.totalNum"></v-tabs>
        <el-row class="list-group__train" :gutter="20" v-if="items.length">
            <el-col :span="8" v-for="(item, index) in items" :key="item.id">
                <div class="list-group__item" @click="redirect(pages.detail.train, { query: { id: item.id } })">
                    <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover)})` }"></a>
                    <div class="info">
                        <h6 class="item-title clearfix">
                            <p class="fl name c_333 ellipsis">{{item.name}}</p>
                            <p class="fr"><span class="score"> {{ item.score }} </span>分</p>
                        </h6>
                        <div class="other-info clearfix">
                            <span class="price">免费</span>
                            <span class="fr c_bbb">{{ item.memberNum || 0 }}人在玩</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="empty-block" v-else>暂无数据</div>
        <!-- <el-row :gutter="20" class="list" v-if="items.length">
            <el-col :span="6" class="list-item__box list-item__shadow" v-for="(item, index) in items" :key="item.id || index">
                <div class="list-item bgc_w" @click="redirect(pages.detail.train, { query: { id: item.id }})">
                    <div class="list-item-img__box">
                        <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                    </div>
                    <h6 class="list-item-title">{{ item.name }} <span class="fr" style="color: #D00;">{{ item.score }}分</span></h6>
                    <ul class="cols-list list-item-count clearfix">
                        <li class="cols-item free"> 免费 </li>
                        <li class="cols-item fr icon-i-person"> {{ item.memberNum ? item.memberNum : 0 }} 人在玩 </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="no-data" v-else>暂无实训室数据</div> -->
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import cascade from '@/components/common/screening/cascade.vue'
import tabs from '@/components/common/tabs.vue'
import pagination from '@/components/common/pagination.vue'
import { requestTrainList } from '@/service/study.js'

export default {
    name: 'train',
    components: {
        'v-classificationDictionary': classificationDictionary,
        'v-cascade': cascade,
        'v-tabs': tabs,
        'v-pagination': pagination
    },
    data() {
        return {
            breadcrumb: [
                { path: '/education', name: '活动培训' },
                { path: '', name: '实训列表' }
            ],
            type: '',
            technology: '',
            grade: '',
            search: '',
            tabs: [
                { name: '全部实训', type: 0 },
                { name: '好评', type: 1, param: { recommend: 1 } },
                { name: '热门', type: 2, param: { recommend: 1 } }
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
        this.getData(this.params)
    },
    computed: {
        params: function () {
            const _param = this.tabs[this.cur_tab].param || {}
            return Object.assign(_param,
                this.pageParam,
                { type: this.type },
                { technology: this.technology },
                { grade: this.grade },
                { name: this.search }
            )
        }
    },
    methods: {
        setCurTab: function (index) {
            this.cur_tab = index
        },
        getData(param) {
            requestTrainList(param).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.items = _data.resultData || []
                    this.$set(this.pageParam, 'totalNum', _data.totalNum)
                }
            })
        },
        searchParam(val) {
            this.search = val
        },
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            // this.jud()
        },
        changeCascade(data) {
            const cascadeCode = Array.from(data, x => x.id)
            this.$set(this.$data, 'type', cascadeCode.join('-'))
        },
        changeTechnology(data) {
            this.$set(this.$data, 'technology', data.id)
        },
        changeApplyScope(data) {
            this.$set(this.$data, 'grade', data.id)
        },
        // jud() {
        //     const module = [
        //         {},
        //         { recommend: 1 },
        //         { recommend: 1 }
        //     ][this.cur_tab]
        //     this.getData(Object.assign({}, this.params, module))
        // }
    },
    watch: {
        params: {
            handler: function (val) {
                // this.jud()
                this.getData(val)
            },
            deep: true,
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
#train {
    margin-top: 30px;
}
.tabs {
    margin-top: $box-margin;
}

.list-group__train {
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
            display: block;
            height: 196px;
        }
        .info {
            padding: 8px 15px 10px;
            border-bottom: 1px solid #f5f5f5;
            box-sizing: border-box;
            line-height: 2;
            .item-title {
                font-size: 14px;
                line-height: 2em;
                margin-bottom: 5px;
                .name {
                    width: 300px;
                }
                .score {
                    width: 40px;
                    text-align: right;
                    font-size: 20px;
                    color: #ffa900;
                }
                &:hover {
                    color: nth($default-color, 1);
                    cursor: pointer;
                }
            }
            .price {
                color: #5fb41b;
            }
            .other-info {
                font-size: 14px;
            }
        }
    }
}
</style>
