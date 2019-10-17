<template>
    <div class="container listBox">
        <el-row class="list-group__project" :gutter="20" v-if="items.length">
            <el-col :span="6" v-for="(item, index) in items" :key="item.id">
                <div class="list-group__item" @click="redirect(pages.detail.project, { query: { id: item.id }, target: '_blank' })">
                    <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.imgUrl)})` }"></a>
                    <div class="info">
                        <h6 class="item-title c_333 ellipsis" v-html="filterKeyWords(item.name, keyWords)"></h6>
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
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import list from '@/components/common/list.vue'
import pagination from '@/components/common/pagination.vue'
import { requestProjectList } from '@/service/study.js'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'project',
    components: {
        'v-list': list,
        'v-pagination': pagination
    },
    data() {
        return {
            items: [],
            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0
            }
        }
    },
    mounted() {
        this.getData()
    },
    computed: {
        ...mapState({
            keyWords: state => state.globalSearch.keyWords
        })
    },
    methods: {
        ...mapActions('globalSearch', ['setTotalNum']),
        getData() {
            requestProjectList(Object.assign({}, { name: this.keyWords }, this.pageParam)).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.items = _data.resultData || []
                    this.setTotalNum(_data.totalNum)
                    this.$set(this.pageParam, 'totalNum', _data.totalNum || 0)
                }
            })
        },
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getData()
        }
    },
    watch: {
        keyWords: {
            handler: function () {
                this.getData()
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
