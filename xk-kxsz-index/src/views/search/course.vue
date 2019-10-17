<template>
    <div class="container listBox">
        <el-row class="list-group__main" :gutter="20" v-if="items.length">
            <el-col class="w-p-20" v-for="(item, index) in items" :key="item.id">
                <div class="list-group__item" @click="redirect(pages.detail.course, { query: { id: item.id }, target: '_blank' })">
                    <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover)})` }"></a>
                    <div class="info">
                        <h6 class="item-title c_333 ellipsis" v-html="filterKeyWords(item.name, keyWords)"></h6>
                        <div class="other-info clearfix">
                            <span class="price">{{handleIsFree(item.isFree)}}</span>
                            <span class="fr c_bbb">{{ item.num || 0 }}人学习</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="empty-block" v-else>暂无数据</div>
        <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
    import { requestCourseList } from '@/service/study.js'
    import { mapState, mapActions } from 'vuex'
    import list from '@/components/common/list.vue'
    import pagination from '@/components/common/pagination.vue'

    export default {
        name: 'course',

        data() {
            return {
                items: [],
                pageParam: {
                    pageNum: 1,
                    pageSize: 20,
                    totalNum: 0
                }
            }
        },
        computed: {
            ...mapState({
                keyWords: state => state.globalSearch.keyWords
            })
        },

        mounted() {
            this.requestCourseList()
        },

        components: {
            'v-list': list,
            'v-pagination': pagination
        },

        methods: {
            ...mapActions('globalSearch', ['setTotalNum']),
            async requestCourseList() { // 获取课程列表
                const res = await requestCourseList(Object.assign({ name: this.keyWords }, this.pageParam))
                if (res.status === 200) {
                    const _entity = res.data.entity || {}
                    this.items = _entity.resultData || []
                    this.setTotalNum(_entity.totalNum)
                    this.pageParam.totalNum = _entity.totalNum || 0
                }
            },
            handleIsFree(i) { // 处理费用类型
                const o = { 1: '免费', 0: '收费' }
                return o[i]
            },
            changePage(val) {
                this.$set(this.pageParam, 'pageNum', val)
            }
        },
        watch: {
            keyWords: {
                handler() {
                    this.requestCourseList()
                },
                deep: true,
            },
            pageParam: {
                handler() {
                    this.requestCourseList()
                },
                deep: true,
            },
        }
    }

</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/item_list.scss';
    @import '~@/assets/css/scss/vars.scss';
    $box-radiu: 5px;
    $face-size: 24px;
    .list-group__main {
        margin-top: 18px;
        .w-p-20 {
            width: 20%;
        }
        .list-group__item {
            margin-bottom: $box-item-margin;
            border-radius: $box-radiu;
            background-color: #fff;
            transition: box-shadow .2s;
            overflow: hidden;

            &:hover {
                box-shadow: $index-box-shadow;
            }

            .item-title {
                font-size: 14px;
                &:hover {
                    color: nth($default-color, 1);
                    cursor: pointer;
                }
            }
        }
        .pic {
            display: block;
            height: 124px;
        }
        .info {
            padding: 2px 15px;
            border-bottom: 1px solid #f5f5f5;
            box-sizing: border-box;
            line-height: 2;
            .price {
                color: #5fb41b;
            }
            .other-info {
                font-size: 12px;
            }
        }
    }
</style>

