<template>
    <div id="serviceList">
        <ul class="list" v-if="listData.length > 0">
            <li v-for="(item, index) in listData" class="clearfix">
                <div class="img-box fl">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                    <!-- <img :src="getFileUrl(item.cover)" v-if="item.cover">
                    <img :src="bgc" v-else> -->
                    <div class="status-label tap" v-if="auditStatus == 1">
                        <p class="doing" v-if="item.status == 1 || item.status == 0">进行中</p>
                        <p class="end" v-if="item.status == 2">已结束</p>
                    </div>
                    <div class="status-label tap" v-else>
                        <p class="submit" v-if="item.auditStatus == -1">待提交</p>
                        <p class="pending" v-if="item.auditStatus == 0">待审核</p>
                        <p class="no-pass" v-if="item.auditStatus == 2">不通过</p>
                        <p class="audit" v-if="item.auditStatus == 3">审核中</p>
                    </div>
                </div>
                <div class="msg-box fl">
                    <h4 class="name">
                        <router-link :to=" { path: '/street/lagou/detail/1', query: { id: item.id } } " v-if="auditStatus == 1"> {{ item.name | handleWorksDesc(10) }} </router-link>
                        <router-link :to=" { path: 'publish', query: { id: item.id } } " v-else> {{ item.name | handleWorksDesc(10) }} </router-link>
                    </h4>
                    <div class="content">
                        <p class="introduction"> {{ item.content | handleWorksDesc(100) }} </p>
                    </div>
                    <div class="classify">
                        <p>
                            类目：{{ item.category | translate(serveCategoryOptions, {key: 'id'}) }} &nbsp;&nbsp;
                            发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}} &nbsp;&nbsp;
                            有效期：{{item.validDate | dateFormat('yyyy-MM-dd')}}
                        </p>
                    </div>
                    <p class="msg">
                        <span class="icon-btn-browse" title="浏览"> {{item.browseNum ? item.browseNum : 0}}</span>
                        <span class="icon-btn-i-collection" title="收藏"> {{item.collectNum ? item.collectNum : 0}}</span>
                        <span class="icon-i-reply" title="评论"> {{item.commentNum ? item.commentNum : 0}}</span>
                        <span class="icon-btn-i-share" title="分享"> {{item.shareNum ? item.shareNum : 0}}</span>
                        <span class="icon-admin-i-seduce" title="勾搭"> {{item.seduceNum ? item.seduceNum : 0}}</span>
                    </p>
                </div>
                <div class="option-box fr">
                    <operate @on-delete="del(item.id)" @on-edit="edit(item.id)" @on-submit="submit(item.id)"
                   :icon-group="generateIconGroup(item.auditStatus)" label="项目" v-if="auditStatus === 0"></operate>
                </div>
                <button @click="showRecordDialog(item.id)" class="btn-verify-record pa" v-if="auditStatus == 0 || item.auditStatus == 2">审核记录</button>
                <button @click="showhookupWithDialog(item.id)" class="btn-verify-record pa" v-if="auditStatus == 1">勾搭列表</button>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <v-pagination :param="param" :changePage="changePage" v-bind="{curRecordId}"></v-pagination>
        <verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'workId'}" />
        <v-hookUpWithList v-bind="{ hookUpWithPopup, curHookId, type: '1' }"></v-hookUpWithList>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import pagination from 'Common/pagination.vue'
    // import bgc from 'res/images/info.png'
    import { serviceAuditList, serviceModify, serviceDel } from '@/service/service.js'
    import operate from 'components/common/operate.vue'
    import verifyRecordDialog from 'components/dialog/verify_record_dialog.vue'
    import hookUpWith from 'components/hookupWith/hook_up_list.vue'

    export default {
        name: 'serviceList',
        props: ['selected', 'search'],
        components: {
            'v-pagination': pagination,
            operate,
            verifyRecordDialog,
            'v-hookUpWithList': hookUpWith
        },
        data() {
            return {
                hookUpWithPopup: { isVisible: false },
                api: '/maker/serveAudit/selectList',
                dialog: { isVisible: false },
                curRecordId: '', // 当前审核记录ID
                curHookId: '', // 当前勾搭记录ID
                // bgc: bgc,
                param: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                listData: [],
                // 是否审核， 已审1， 待审0
                auditStatus: 0
            }
        },
        created() {
            this.routeChange()
        },
        mounted() {
            // this.getListData()
        },
        methods: {
            // 显示勾搭列表弹窗
            showhookupWithDialog(id) {
                this.curHookId = id
                this.hookUpWithPopup.isVisible = true
            },
            // 显示审核记录弹窗
            showRecordDialog(id) {
                this.curRecordId = id
                this.dialog.isVisible = true
            },
            // 删除
            del(id) {
                serviceDel({ id }).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getListData()
                        return
                    }
                    this.$message.error('删除失败，请重试')
                }, () => {
                    this.$message.error('删除失败，请重试')
                })
            },
            // 编辑
            edit(id) {
                this.$router.push({ path: 'publish', query: { id } })
            },
            // 提交审核
            submit(id) {
                serviceModify({ id, isSubmit: 1 }).then((res) => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({
                          message: '成功提交审核',
                          type: 'success',
                          duration: 1500
                        })
                        this.getListData()
                        return
                    }
                    this.$message.error(res.data.msg || '提交审核失败，请重试')
                }).catch(() => {
                    this.$message.error('提交审核失败，请重试')
                })
            },
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb'
            }),
            // 请求列表数据
            getListData() {
                serviceAuditList({ name: this.search, category: this.selected, auditStatus: this.auditStatus, createId: this.$ls.get('loginUId') }, this.param).then((res) => {
                    if (res.data.code === 200 && res.data.entity) {
                        this.listData = res.data.entity.resultData
                        this.$set(this.param, 'totalNum', res.data.entity.totalNum)
                        this.$emit('totalNum', res.data.entity.totalNum)
                    }
                })
            },
            // 切换页数
            changePage(val) {
                this.$set(this.param, 'pageNum', val)
                this.getListData()
            },
            // 路由判断是已审/待审
            routeChange() {
                const strNum = this.$route.path.lastIndexOf('/')
                const _route = this.$route.path.substring(strNum)
                if (_route === '/audited') {
                    this.auditStatus = 1
                } else {
                    this.auditStatus = 0
                }
                this.listData.splice(0, this.listData.length)
                this.getListData()
            },
            // 按钮组状态
            generateIconGroup(status) {
                const edit = status === -1 || status === 2 ? 'edit' : ''
                const submit = status === -1 && 'submit' || ''
                const del = edit ? 'delete' : ''
                return [edit, submit, del]
            },
        },
        filters: {
            handleWorksDesc(txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
                const reg = new RegExp('(.{' + len + '}).+')
                return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
            }
        },
        watch: {
            '$route.path': 'routeChange',
            params: {
                handler: function () {
                    this.getListData()
                },
                deep: true
            },
        },
        computed: {
            ...mapState('dictionaryCommon', {
                serveCategoryOptions(state) {
                    const dicList = (state.serveCategoryDicList || {}).dicList || []
                    return dicList
                }
            }),
            params: function () {
                return Object.assign({}, { selected: this.selected }, { search: this.search })
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .buttonGroup {
            .reply_btn1 {
                background-color: $color-value;
            }
            .reply_btn2 {
                border: 1px solid $color-value;
                color: $color-value;
            }
        }
    }
}
#serviceList {
    padding: 0px 15px 15px;
    .list {
        li {
            position: relative;
            /* height: 264px; */
            padding: 20px 0;
            border-bottom: 1px dashed #ccc;
            font-size: 14px;
            .img-box {
                position: relative;
                width: 264px;
                height: 172px;
                img,
                .bg-img__wrap {
                    width: 100%;
                    height: 100%;
                }
            }
            .msg-box {
                width: 60%;
                overflow: hidden;
                padding-left: 1em;
                .name, .content, .classify, .msg {
                    line-height: 2em;
                }
                .name{
                    font-size: 1.57em;
                    a:hover {
                        color: $theme_color;
                    }
                }
                .content {
                    min-height: 5em;
                    .introduction{
                        word-wrap: break-word;
                    }
                }
                .classify, .msg{
                    font-size: 1.1em;
                    color: #999;
                    span {
                        line-height: 1;
                        margin-left: 5px;
                        &:hover {
                            color: #999;
                            cursor: default;
                        }
                    }
                }
            }
        }
    }
}
div.tap {
    width: 6em;
    height: 6em;
    p {
        width: 8em;
        height: 47px;
        position: absolute;
        top: -1em;
        left: -3em;
        line-height: 47px;
        font-size: 12px;
    }
}
</style>

