<template>
    <div id="microClass_list" class="container clearfix">
        <div class="content-left bgw fl">
            <side-tabs :typeNum="typeNum" @callback="changeType"></side-tabs>
        </div>
        <div class="content-right bgw fr">
            <div class="search-box clearfix">
                <a href="javaScript:;" class="publish-res fr" @click="visible.show = true" v-if="isMember">发布微课</a>
                <v-search :tips="tips" @search="getSearch" class="fr"></v-search>
            </div>
            <el-row class="list-box list" :gutter="20">
                <el-col :span="8" v-for="(item, index) in items" :key="item.id">
                <!-- <v-list :items="items" :listData="listData"> -->
                    <div class="list-item__box list-item__shadow" @click="redirect(pages.detail.studio, { path: '/microClass/detail', query: { id: item.id } })">
                    <!-- <template slot-scope="props"> -->
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                        </div>
                        <h6 class="list-item-title clearfix">
                            <span class="item-title fl" :title="item.name">{{ item.name | textOverflow(14) }}</span>
                            <span class="item-name fr">{{item.createName || '暂无名字'}}</span>
                        </h6>
                        <h6 class="list-item-operate" v-if="isAdmin">
                            <button href="javaScript:;" title="编辑" @click.stop="openDialog(item.id)">编辑</button>
                            <button href="javaScript:;" title="删除" @click.stop="delMicroClass(item.id)">删除</button>
                        </h6>
                    </div>
                    <!-- </template> -->
                <!-- </v-list> -->
                </el-col>
            </el-row>
            <v-pagination :param="pageParams" @callback="changePage"></v-pagination>
            <publish-class :visible="visible" :id="id" @resetId="resetId" @callback="getMicroClassList"></publish-class>
        </div>
    </div>
</template>

<script>
    import sideTabs from 'components/studio/sideTabs.vue'
    import publishClass from 'components/studio/publish_microCourse.vue'
    import vSearch from 'Common/search.vue'
    import vPagination from 'Common/pagination.vue'
    import list from 'Common/list/graphic/list.vue'
    import { requestMicroClassList, deleteMicroClass } from '@/service/studio.js'

    export default {
        name: 'microClass_list',
        components: {
            sideTabs,
            vSearch,
            vPagination,
            'v-list': list,
            publishClass
        },
        data() {
            return {
                visible: {
                    show: false
                },
                typeNum: 4,
                tips: '请输入微课名称',
                items: [],
                search: {
                    name: '',
                    type: ''
                },
                pageParams: {
                    pageSize: 10,
                    pageNum: 1,
                    totalNum: 0
                },
                listData: {
                    col: 3,
                    pathUrl: `${this.pages.detail.studio.path}/microClass/detail`,
                    params: {
                        names: 'id',
                        val: 'id'
                    }
                },
                id: ''                // 微课id,传给发布弹窗组件
            }
        },
        props: ['isMember', 'isAdmin'],
        mounted() {
            this.getMicroClassList()
        },
        watch: {
            search: {
                handler: function () {
                    this.getMicroClassList()
                },
                deep: true
            }
        },
        methods: {
            getSearch(val) {
                this.search.name = val
            },
            changeType(val) {
                this.search.type = val
            },
            changePage(val) {
                this.pageParams.pageNum = val
                this.getMicroClassList()
            },
            // 获取微课列表
            getMicroClassList() {
                const params = {
                    name: this.search.name,
                    type: this.search.type,
                    studioId: this.$route.query.id
                }
                requestMicroClassList(params, this.pageParams).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.pageParams.totalNum = res.data.entity.totalNum
                    }
                })
            },
            // 微课删除
            delMicroClass(id) {
                this.$confirm('此操作将删除该微课堂，是否继续？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    deleteMicroClass([{ id: id }]).then((res) => {
                        if (res.data.code === 200) {
                            this.showMessage('success', '删除成功')
                            this.getMicroClassList()
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                }).catch(() => {
                    this.showMessage('info', '已取消删除')
                })
            },
            // 发来发布弹窗
            openDialog(id) {
                console.log(id)
                this.$set(this.$data, 'id', id)
                this.visible.show = true
                const e = window.event || event
                e.stopPropagation()
                return
            },
            // 重置id
            resetId() {
                this.$set(this.$data, 'id', '')
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/index_list.scss';
    * {
        box-sizing: border-box;
    }
    #microClass_list{
        margin-top: 30px;
        .content-left{
            width: 201px;
            min-height: 600px;
        }
        .content-right{
            width: 980px;
            .search-box{
                padding: 10px 15px;
                border-bottom: 1px solid #c9c9c9;
                .publish-res{
                    display: inline-block;
                    height: 34px;
                    line-height: 34px;
                    text-align: center;
                    width: 96px;
                    background-color: nth($default-color, 1);
                    color: #fff;
                    border-radius: $button-radiu;
                    margin-left: 10px;
                    &:hover{
                        opacity: 0.75;
                    }
                }
            }
            .list-box{
                margin-top: 15px;
                padding: 0 15px;
                .list-item-operate{
                    button{
                        border:none;
                        margin-right: 15px;
                        font-size: 14px;
                        line-height: 2;
                        &:hover{
                            color: nth($default-color, 1);
                        }
                    }
                }
            }
        }
    }
</style>