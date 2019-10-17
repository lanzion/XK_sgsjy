<template>
    <div id="studioMember" class="studioMember">
        <nav class="nav container" v-if="$ls.get('userIdentity') === 'teacher' && !isExist">
            <router-link class="apply" :to="{path: 'studioMember/apply'}">申请成立工作室</router-link>
        </nav>
        <banner></banner>
        <div class="container listBox">
            <div class="screeningBox bgc_w">
                <v-cascade :changeCascade="changeCascade" model="studio"></v-cascade>
                <!-- <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary> -->
            </div>
            <v-sort-bar class="sort-bar-box" :sortBarData="sortBarData" :changeSort="changeSort"></v-sort-bar>
            <div class="key-search clearfix">
                <v-search @search="getKeyWord" :tips="tips" class="fr"></v-search>
                <div class="total-num fr">共有 <span class="num">{{pageParam.totalNum}}</span> 个符合条件的工作室</div>
            </div>
            <v-list :items="items" :listData="listData">
                <template scope="props">
                    <div class="list-item-img__box">
                        <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                        <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
              <!--           <div class="btn-box clearfix">
                            <button @click.stop="handleFollow(props.item.userId, !!props.item.isAttention)" class="fl">
                                <strong>{{props.item.isAttention ? '-' : '+'}}</strong> 关注
                            </button>
                            <button @click.stop="showPrivateLetterDialog(props.item.userId)" class="fr">私信</button>
                        </div> -->
                    </div>
                    <h6 class="list-item-title clearfix">
                        <span class="name ellipsis fl" :title="props.item.name">{{props.item.name}}</span>
                        <span class="school ellipsis fr" :title="props.item.schoolName">{{props.item.schoolName}}</span>
                    </h6>
                    <ul class="cols-list list-item-count">
                        <li class="cols-item">成员: {{props.item.num ? props.item.num : 0}}</li>
                        <li class="cols-item">资源: {{props.item.resourceNum ? props.item.resourceNum : 0}}</li>
                        <li class="cols-item">文章: {{props.item.articleNum ? props.item.articleNum : 0}}</li><br>
                        <li class="cols-item">微课: {{props.item.courseNum ? props.item.courseNum : 0}}</li>
                        <li class="cols-item">话题: {{props.item.topicNum ? props.item.topicNum : 0}}</li>
                        <li class="cols-item">访客: {{props.item.browseNum ? props.item.browseNum : 0}}</li>
                    </ul>
                </template>
            </v-list>
            <v-pagination :param.sync='pageParam' :change-page="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import cascade from 'Common/screening/cascade.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import pagination from 'Common/pagination.vue'
import sortBar from '@/components/common/sortBar.vue'
import { requestFrontList, judgeIsExist } from '@/service/studio.js'
import search from 'Common/search.vue'
  export default {
    name: 'studioMember', // 创客街区
    components: {
        banner,
        // "v-classificationDictionary": classificationDictionary,
        "v-cascade": cascade,
        'v-list': list,
        'v-pagination': pagination,
        'v-sort-bar': sortBar,
        'v-search':search
    },
    data () {
        return {
            tips:'请输入工作室名称',
            field: '',
            technology: '',
            applyScope: '',
            search: '',             //搜索关键词
            sortBarData: [
                {
                    name: '默认',
                    model: 'composite',
                    default: true
                }, {
                    name: '成员',
                    model: 'num'
                }, {
                    name: '资源',
                    model: 'resourceNum'
                }, {
                    name: '文章',
                    model: 'articleNum'
                }, {
                    name: '微课',
                    model: 'courseNum'
                }, {
                    name: '话题',
                    model: 'topicNum'
                }, {
                    name: '访客',
                    model: 'browseNum'
                }
            ],
            listData: {
                col: 5,
                pathUrl: '/studioMemberDetail',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            items: [],
            order: {
              composite: 0    // 排序 0-不排序, 1-要排序
            },
            pageParam: {
                totalNum:0,
                pageNum: 1,
                pageSize: 20
            },
            isExist: false // 判断登录用户是否已经创建过工作室
        }
    },
    mounted () {
        this.getList()
        if (this.$ls.get('loginUId')) {
            const userId = this.$ls.get('loginUId')
            this.judgeExist(userId)
        }
    },
    methods: {
        // 判断登录用户是否已经创建过工作室
        judgeExist(userId) {
            judgeIsExist({ userId: userId }).then((res) => {
                if (res.data.code === 200) {
                    this.isExist = res.data.appendInfo.exist
                }
            })
        },
        //关键词搜索
        getKeyWord(val){
            this.search = val
        },
        getList() {
            requestFrontList (this.params, this.pageParam).then(res => {
                if(res.data.code === 200 && res.data.entity) {
                    this.items = res.data.entity.resultData;
                    this.pageParam.totalNum = res.data.entity.totalNum;
                }
            })
        },
        changeCascade (data) {
            let cascadeCode = Array.from(data, x => x.id)
            this.$set(this.$data, 'field', cascadeCode.join('-'))
        },
        changeTechnology(data) {
            this.$set(this.$data, 'technology', data.id)
        },
        // 排序改变
        changeSort(order, index) {
            let _order = {};

            if (order === -1) {
                _order.composite = 0;
            } else {
                _order.composite = 1;
                _order[this.sortBarData[index].model] = order;
            }
            this.$set(this.$data, 'order', _order);
        },
        // 分页改变
        changePage(pageNum) {
            this.$set(this.$data.pagParam, 'pageNum', pageNum);
        },
    },
    computed: {
        params: function () {
            return Object.assign({},
                { studioType: this.field },
                { technologyId: this.technology },
                { name: this.search },
                this.order
            );
        }
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
              this.getList();
            },
            deep: true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/cols.scss';
$orange: #ff7200;
.studioMember {
    font-size: 14px;
    .nav {
        height: 54px;
        text-align: right;
        line-height: 54px;
        .apply {
            border: none;
            background-color: $orange;
            color: #fff;
            padding: 10px 22px;
            border-radius: .2em;
        }
    }
    #list {
        .cols-list .cols-item {
            margin-bottom: 4px;
        }
        .list-item-img__box{
            text-align: center;
            img {
                height: 190px;
            }
        }
        .list-item-title,
        .cols-list {
            text-align: center;
        }
        .list-item-title {
            .name {
                width: 60%;
                display: inline-block;
                text-align: left;
            }
            .school {
                width: 40%;
                display: inline-block;
                text-align: right;
            }
        }
    }
    .category-input-box {
        .category-title {
            line-height: 34px;
        }
    }
    // 关键字搜索部分
    .key-search{
        padding: 10px 0;
        border-bottom: 1px solid #cacaca;
        margin-bottom: 10px;
        .total-num{
            line-height: 34px;
            margin-right: 10px;
            .num{
                color: #00a0e9;
            }
        }
    }
}
</style>
