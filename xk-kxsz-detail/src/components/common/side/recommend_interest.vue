<template>
    <div class="recommend-interest">
        <h4 class="head">推荐兴趣组</h4>
        <ul class="list-box" v-if="listData.length">
            <li class="list-item .table-layout" v-for="(item, index) in listData">
                <div class="img-box table-cell">
                    <a
                    @click="toDetail(item)"
                    :style='{backgroundImage: "url(" + (getFileUrl(item.interestCover) || getFileUrl(item.cover) || faceDefault) + ")"}'
                    class="face-box circle">
                        <span class="join-in">+加入</span>
                    </a>
                </div>
                <article class="content-box table-cell">
                    <div class="title-box clearfix">
                        <a class="fl w50" :title="item.interestName" @click="toDetail(item)">{{item.interestName}}</a>
                        <span class="classify w50 fl" :title="item.interestTypeName">{{item.interestTypeName}}</span>
                    </div>
                    <div class="cols-list b-gray">
                        <dl class="cols-item">
                               <dt class="cols-item-title">成员</dt>
                               <dd class="cols-item-result">{{item.memberNum || item.memberNum || 0}}</dd>
                        </dl>
                        <dl class="cols-item">
                              <dt class="cols-item-title">话题</dt>
                              <dd class="cols-item-result">{{item.commentNum || item.commentNum || 0}}</dd>
                        </dl>
                        <dl class="cols-item">
                              <dt class="cols-item-title">文章</dt>
                              <dd class="cols-item-result">{{item.articleNum || item.articleNum || 0}}</dd>
                        </dl>
                        <dl class="cols-item">
                              <dt class="cols-item-title">资源</dt>
                              <dd class="cols-item-result">{{item.resourceNum || item.resourceNum || 0}}</dd>
                        </dl>
                     </div>
                </article>
            </li>
        </ul>
        <div v-else class="empty-block">暂无推荐兴趣组</div>
    </div>
</template>

<script>
    import { interestsPager } from '@/service/homePage.js'
    // import { judgeMember } from '@/service/interest.js'

    export default {
        name: 'recommend_interest',
        data() {
            return {
                listData: []
            }
        },
        mounted() {
            this.getListDate()
        },
        methods: {
            getListDate() {
                interestsPager({ orgId: this.$route.query.id }, { pageSize: 5, pageNum: 1 }).then((res) => {
                    if (res.data.code === 200) {
                        this.listData = res.data.entity.resultData
                    }
                })
            },
            // 点击去兴趣组主页前的判断(/interestsSpace/homePage)
            toDetail(item) {
                this.redirect(this.pages.detail.interest, { query: { id: item.interestId } })
                // if (item.property === 'private') {
                //     if (this.hadLogin) {
                //         judgeMember({ interestId: item.interestId, userId: this.userId, timeStamp: new Date().getTime() }).then((res) => {
                //             const isMember = res.data.entity
                //             if (isMember) {
                //                 this.redirect(this.pages.detail.interest, { query: { id: item.interestId } })
                //             } else {
                //                 this.$message({
                //                     message: '私密兴趣组，非本兴趣组成员不能访问'
                //                 })
                //             }
                //         })
                //     } else {
                //         this.$message({
                //             message: '私密兴趣组，不允许访问'
                //         })
                //     }
                // } else {
                //     this.redirect(this.pages.detail.interest, { query: { id: item.interestId } })
                // }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/cols.scss';
    .recommend-interest{
        .head{
            padding: 13px;
            border-bottom: 1px solid #ddd;
            font-size: 16px;
            color: #333;
        }
        .list-box{
            padding: 15px 15px 7px;
            .list-item{
                margin-bottom: 18px;
                &:last-child{
                    margin-bottom: 0px;
                }
                .face-box{
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    margin-right: 10px;
                    position: relative;
                    .join-in{
                        display: none;
                        width: 100%;
                        background-color: rgba(0,0,0,0.5);
                        color: #fff;
                        line-height: 1.5em;
                        text-align: center;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                    }
                    &:hover{
                        .join-in{
                            display: block;
                        }
                    }
                }
                .title-box{
                    height: 14px;
                    font-size: 14px;
                    color: #3e3e3e;
                    margin-bottom: 10px;
                    .w50{
                        width: 50%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .classify{
                        box-sizing: border-box;
                        cursor: default;
                        padding-left: 5px;
                        margin-top: 2px;
                        font-size: 12px;
                    }
                }
                .cols-item{
                    color: #999;
                    line-height: 1.2em;
                }
            }
        }
    }
</style>