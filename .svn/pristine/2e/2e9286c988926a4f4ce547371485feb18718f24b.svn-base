<template>
    <div class="container listBox">
        <el-row class="list-group__train" :gutter="20" v-if="items.length">
            <el-col :span="8" v-for="(item, index) in items" :key="item.id">
                <div class="list-group__item" @click="redirect(pages.detail.train, { query: { id: item.id }, target: '_blank' })">
                    <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover)})` }"></a>
                    <div class="info">
                        <h6 class="item-title clearfix">
                            <p class="fl name c_333 ellipsis" v-html="filterKeyWords(item.name, keyWords)"></p>
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
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import pagination from '@/components/common/pagination.vue'
import { requestTrainList } from '@/service/study.js'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'train',
    components: {
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
            requestTrainList(Object.assign({}, { name: this.keyWords }, this.pageParam)).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.items = _data.resultData || []
                    this.setTotalNum(_data.totalNum)
                    this.$set(this.pageParam, 'totalNum', _data.totalNum)
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
