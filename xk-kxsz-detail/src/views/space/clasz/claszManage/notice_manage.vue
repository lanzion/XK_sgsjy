<template>
    <section id="notice_manage" class="bgw">
        <header class="head-tip bgw clearfix">
            <span class="tip-text">公告管理</span>
            <publish-notice :visible="visible" @callback="getNoticeList"></publish-notice>
            <button class="publish-notice" @click="visible.show = true">发公告</button>
        </header>
        <div class="notice-list bgw">
            <ul v-if="noticeList.length > 0">
                <li class="notice-item" v-for="(item,index) in noticeList" :key="index">
                    <div class="notice-msg">
                        <p class="title">
                            <el-input v-model="item.title" placeholder="请输入内容" v-if='modifyIndex == index' style="width:400px;margin-bottom: 10px;"></el-input>
                            <span v-else>{{item.title}}</span>
                        </p>
                        <p class="content">
                            <el-input v-model="item.content" placeholder="请输入内容" type="textarea" autosize v-if='modifyIndex == index' style="width:400px;"></el-input>
                            <span v-else>{{item.content}}</span>
                        </p>
                    </div>
                    <div class="option-box">
                        <div class="btn-box" v-if="modifyIndex == index">
                            <a href="javaScript:;" class="comfirm-btn" @click="modifyConfirm(item.id,item.title,item.content)">确定</a>
                            <a href="javaScript:;" class="cancel-btn" @click="cancelModify(index)">取消</a>
                        </div>
                        <div class="" v-else>
                            <span title="修改" class="icon-btn-edit2 edit" @click="modify( index, item.title, item.content )"></span>
                            <del-popover title="删除" class="delete" :delData="{ url:'maker/notice/del', params:{id:item.id}, name:'公告' }" @callback="getNoticeList"></del-popover>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="empty-block" v-else>暂无公告</div>
            <v-pagination :param="param" @callback="changePage" class="pagination-box"></v-pagination>
        </div>
    </section>
</template>

<script>
    import publishNotice from 'components/clasz/claszManage/publish_notice.vue'
    import delPopover from 'Common/del_popover.vue'
    import { requestNoticeList, modifyNotice } from '@/service/space_clasz.js'
    // import { judgeAdmin } from '@/service/interest.js'
    import pagination from 'Common/pagination.vue'

    export default{
        name: 'notice_manage',
        components: {
            'del-popover': delPopover,
            'publish-notice': publishNotice,
            'v-pagination': pagination
        },
        data() {
            return {
                busId: this.$route.query.id,
                param: {
                    totalNum: 0,
                    pageNum: 1,
                    pageSize: 10
                },
                visible: {
                    show: false
                },
                noticeList: [],
                noticeType: '1',
                modifyContent: null,
                modifyIndex: null,
                curTitle: '',
                curContent: '',
                userId: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.id : null
            }
        },
        mounted() {
            const type = this.$route.path.split('/')[2]
            switch (type) {
                case 'clasz':
                    this.noticeType = '1'
                    break
                case 'interest':
                    this.noticeType = '2'
                    break
                case 'studio':
                    this.noticeType = '3'
                    break
            }
            this.getNoticeList(1)
        },
        methods: {
            changePage(val) {
                this.getNoticeList(val)
            },
            /*
             * 获取公告列表
             * noticeType：公告类型1.班级公告,2:兴趣组公告
             * title:公告标题(模糊搜索)
             */
            getNoticeList(pageNum) {
                const params = {
                    noticeType: this.noticeType,
                    title: '',
                    busId: this.busId
                }
                requestNoticeList(params, { pageSize: 10, pageNum: pageNum }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity
                        this.noticeList = _data.resultData
                        this.param.totalNum = _data.totalNum
                    }
                })
            },
            // 切换修改状态
            modify(index, title, content) {
                this.modifyIndex = index
                this.isAdd = false
                this.curTitle = title
                this.curContent = content
            },
            cancelModify(index) {
                this.modifyIndex = null
                this.$set(this.$data.noticeList[index], 'title', this.curTitle)
                this.$set(this.$data.noticeList[index], 'content', this.curContent)
            },
            // 修改公告
            modifyConfirm(id, title, content) {
                this.modifyIndex = null
                this.modifyNotice(id, title, content)
            },
            modifyNotice(id, title, content) {
                const params = {
                    id: id,
                    noticeType: this.noticeType,
                    busId: this.busId,
                    title: title,
                    content: content
                }
                modifyNotice(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '修改成功')
                        this.getNoticeList()
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
#notice_manage{
    padding-bottom: 20px;
    .head-tip{
        border-bottom: 1px solid #ddd;
        font-size: 16px;
        position: relative;
        .tip-text{
            display: inline-block;
            padding: 16px 15px 10px;
            color: nth($default-color, 1);
            border-bottom: 2px solid nth($default-color, 1);
            margin-bottom: -1px;
        }
        .publish-notice{
            font-size: 14px;
            color: #fff;
            background-color: nth($default-color, 1);
            width: 96px;
            height: 32px;
            border-radius: $button-radiu;
            line-height: 29px;
            position: absolute;
            bottom: 5px;
            right: 15px;
        }
        .publish-notice:hover{
            opacity: 0.75;
        }
    }
    .notice-list{
        .pagination-box{
            box-sizing: border-box;
            padding: 0 15px;
        }
        ul{
            .notice-item{
                padding:15px;
                border-bottom: 1px dashed #c9c9c9;
                position: relative;
                .notice-msg{
                    display: inline-block;
                    width: 100%;
                    p{
                        font-size: 14px;
                        line-height: 1.5em;
                    }
                    .title{
                        margin-bottom: 10px;
                    }
                    .content {
                        width: 60%;
                        word-wrap: break-word;
                        color: #999;
                        span{
                            width: 100%;
                            word-wrap: break-word;
                            display: inline-block;
                            padding-right: 300px;
                        }
                    }
                }
                .option-box{
                    position: absolute;
                    top: 50%;
                    right: 15px;
                    transform: translate(0,-50%);
                    -ms-transform: translate(0,-50%);        /* IE 9 */
                    -webkit-transform: translate(0,-50%);    /* Safari and Chrome */
                    -o-transform: translate(0,-50%);        /* Opera */
                    -moz-transform: translate(0,-50%);        /* Firefox */
                    .edit{
                        margin-right: 10px;
                        font-size: 18px;
                        vertical-align: top;
                    }
                    .btn-box{
                        a{
                            display: inline-block;
                            box-sizing: border-box;
                            padding: 6px 15px;
                            border-radius: 3px;
                        }
                        .cancel-btn{
                            border: 1px solid nth($default-color, 1);
                            color: nth($default-color, 1);
                            &:hover{
                                color: #fff;
                                background-color: nth($default-color, 1);
                            }
                        }
                        .comfirm-btn{
                            background-color: nth($default-color, 1);
                            margin-right: 10px;
                            color: #fff;
                            &:hover{
                                opacity: 0.75;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

<style lang="scss">
    #notice_manage{
        #delPopover {
            .delete-btn{
                font-size: 16px;
            }
        }
    }
</style>