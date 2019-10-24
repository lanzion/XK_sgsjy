<template>
    <section class="home clearfix">
        <section class="content_l fl">
            <div class="clearfix">
                <div class="article bgc_w fl">
                    <h3 class="title">创客研究 <router-link :to="{path: 'article', query: {id: $route.query.id}}" class="more fr">更多></router-link></h3>
                    <ul class="list_ul p20">
                        <li class="list_li" v-for="(i, k) in article">
                            <router-link class="list_li_title" :to="{path: `${pages.detail.studio.path}/articleDetail/1`, query: { id: i.id, orgId: $route.query.id } }"> {{ i.title | handleWorksDesc(20) }} </router-link>
                            <time class="list_li_time fr"> {{ i.createDate | dateFormat('yyyy-MM-dd') }} </time>
                        </li>
                    </ul>
                </div>
                <div class="result bgc_w fr">
                    <h3 class="title">创客成果 <router-link :to="{path: 'result', query: {id: $route.query.id} }" class="more fr">更多></router-link></h3>
                    <ul class="list_ul p20">
                        <li class="list_li" v-for="(i, k) in result">
                            <router-link class="list_li_title" :to="{path: `${pages.detail.studio.path}/articleDetail/2`, query: { id: i.id, orgId: $route.query.id } }"> {{ i.title | handleWorksDesc(20) }} </router-link>
                            <time class="list_li_time fr"> {{ i.createDate | dateFormat('yyyy-MM-dd') }} </time>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="resources bgc_w mt20">
                <h3 class="title">创客资源 <router-link :to="{path: 'resource', query: {id: $route.query.id} }" class="more fr">更多></router-link></h3>
                <ul class="list_ul p20">
                    <li class="list_li" v-for="(i, k) in resource">
                        <i class="icon" :class="['icon-file-c-' + judgeFileType(i.name)]">
                            <i v-for="i in 6" :class="['path' + i]"></i>
                        </i>
                        <router-link class="list_li_title" :to="{path: `${pages.detail.studio.path}/resource/detail`, query: {id: $route.query.id, resId: i.id } }">
                            {{ i.name | handleWorksDesc(20) }}
                        </router-link>
                        <time class="list_li_time fr">
                            <!-- <a :href="downloadUrl( i.resourceId, i.name )" :download="i.name" @click="downloadAdd(i.resourceTabId,k)" title="下载"> <i class="icon-btn-download"></i> </a> &nbsp;&nbsp; -->
                            <a href="javascript:;" :download="i.name" @click="downloadAdd(i.resourceId,i.name,i.resourceTabId,k)" title="下载"> <i class="icon-btn-download"></i> </a> &nbsp;&nbsp;
                            {{ i.userName }} &nbsp;&nbsp; {{ i.createDate | dateFormat('yyyy-MM-dd') }} &nbsp;&nbsp;
                            已下载{{ i.downNum || 0 }}次
                        </time>
                    </li>
                </ul>
            </div>
            <div class="resources bgc_w mt20">
                <h3 class="title"> 微课    <router-link :to="{path: 'microClass', query: {id: $route.query.id} }" class="more fr">更多></router-link></h3>
                <v-list class="p20" :items="courses" :listData="{ col: 3, pathUrl: `${pages.detail.studio.path}/microClass/detail`, params: { names: 'id', val: 'id' } } ">
                    <template slot-scope="props">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                        </div>
                        <h6 class="list-item-title clearfix">
                            <span class="item-title ellipsis fl" :title="props.item.name">{{ props.item.name | textOverflow(14) }}</span>
                            <span class="item-name ellipsis fr">{{props.item.createName || '暂无名字'}}</span>
                        </h6>
                    </template>
                </v-list>
            </div>
            <div class="topic bgc_w mt20">
                <h3 class="title"> 创客讨论 <router-link :to="{path: 'topic', query: {id: $route.query.id} }" class="more fr">更多></router-link></h3>
                <ul class="list_ul p20">
                    <li class="list_li" v-for="(i, k) in topic">
                        <i :class="`hot-${k + 1}`" class="hot"> {{ k + 1 }} </i>
                        <router-link class="list_li_title" :to="{path: `${pages.detail.studio.path}/topic/detail`, query: {id: $route.query.id, topicId: i.id } }">
                            {{ i.title | handleWorksDesc(20) }}
                        </router-link>
                        <time class="list_li_time fr">
                            {{ i.userName }} &nbsp;&nbsp; {{ i.createDate | dateFormat('yyyy-MM-dd') }}
                        </time>
                    </li>
                </ul>
            </div>
        </section>
        <aside class="content_r fr">
            <div class="introduction bgc_w">
                <h3 class="title mb10">工作室简介</h3>
                <div>
                    <div class="clearfix">
                        <img :src="getFileUrl(detail.face) || faceDefault" width='122' height="122" class="introduction_img fl p15">
                        <div class="introduction_name fl">
                            <router-link class="msg_name" :title="detail.createName" :to="{path: '/space/teacher/dynamic', query: {uid: detail.createId, id: detail.id}}" tag="p"> {{ detail.createName }} </router-link>
                            <p class="msg_type" :title="detail.studioTypeName"> {{ detail.studioTypeName }}</p>
                        </div>
                    </div>
                    <ul class="maker_li_countsUl table-layout">
                        <li class="maker_li_countsLi table-cell">
                            <p class="maker_li_countsLi_num"> 成员 </p>
                            <p class="maker_li_countsLi_name">{{ detail.num || 0 }}</p>
                        </li>
                        <li class="maker_li_countsLi table-cell">
                            <p class="maker_li_countsLi_num">资源</p>
                            <p class="maker_li_countsLi_name">{{ detail.resourceNum || 0 }}</p>
                        </li>
                        <li class="maker_li_countsLi table-cell">
                            <p class="maker_li_countsLi_num">文章</p>
                            <p class="maker_li_countsLi_name">{{ detail.articleNum || 0 }}</p>
                        </li>
                        <li class="maker_li_countsLi table-cell">
                            <p class="maker_li_countsLi_num">微课</p>
                            <p class="maker_li_countsLi_name">{{ detail.courseNum || 0 }}</p>
                        </li>
                        <li class="maker_li_countsLi table-cell">
                            <p class="maker_li_countsLi_num">话题</p>
                            <p class="maker_li_countsLi_name">{{ detail.topicNum || 0 }}</p>
                        </li>
                        <li class="maker_li_countsLi table-cell">
                            <p class="maker_li_countsLi_num">访客</p>
                            <p class="maker_li_countsLi_name">{{ detail.browseNum || 0 }}</p>
                        </li>
                    </ul>
                    <p class="msg_int"> {{ detail.introduction }}  </p>
                </div>
            </div>
            <div class="member bgc_w mt20 ">
                <h3 class="title mb10">工作室成员</h3>
                <ul class="member_ul clearfix p20" v-if="member.length">
                    <li class="member_li fl" v-for="(i, k) in member">
                        <router-link class="member_a" :to="{ path: `${pages.detail.teacher.path}`, query: { id: i.orgId, uid: i.userId } }">
                            <img :src="getFileUrl(i.headImageUrl) || faceDefault" class="member_face">
                            <p class="member_name"> {{ i.createName }} </p>
                        </router-link>
                    </li>
                </ul>
                <div v-else class="empty-block"></div>
            </div>
            <bulletinBoard class="mt20 bgc_w" :datas="notice" style="padding:0;"></bulletinBoard>
        </aside>
    </section>
</template>

<script>
import { studioArticleList, requestResShareList, requestMicroClassList, studioTopicList, requestAuditedMemberList } from '@/service/studio.js'
import { downloadAdd } from '@/service/resource.js'
import { fileType } from '@/mixin/fileType.js'
import { requestNoticeList } from '@/service/space_clasz.js'
import list from 'Common/list/graphic/list.vue'
import bulletinBoard from 'Common/bulletinBoard.vue'
import { fileBaseUrl } from '@/js/common-config.js'

export default {
    mixins: [fileType],
    data() {
        return {
            studioId: this.$route.query.id,
            article: [],
            result: [],
            resource: [],
            courses: [],
            topic: [],
            member: [],
            notice: []
        }
    },
    components: {
        'v-list': list,
        bulletinBoard
    },
    methods: {
        /*
         * 下载次数加1
         */
        downloadAdd(resourceId, fileName,id, index) {
            const link = document.createElement("a");
                link.style.display = "none";
                link.href = fileBaseUrl+resourceId;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
            downloadAdd({ id: id }).then((res) => {
                if (res.data.code === 200) {
                    this.resource[index].downNum ++
                }
            })
        }
    },
    mounted() {
        studioArticleList({ studioId: this.studioId, studioType: 1 }, { pageNum: 1, pageSize: 6 }).then((res) => {
            if (res.data.code === 200) {
                this.article = res.data.entity.resultData
            }
        })
        studioArticleList({ studioId: this.studioId, studioType: 2 }, { pageNum: 1, pageSize: 6 }).then((res) => {
            if (res.data.code === 200) {
                this.result = res.data.entity.resultData
            }
        })
        requestResShareList({ studioId: this.studioId }, { pageNum: 1, pageSize: 6 }).then((res) => {
            if (res.data.code === 200) {
                this.resource = res.data.entity.resultData
            }
        })
        requestMicroClassList({ studioId: this.studioId }, { pageNum: 1, pageSize: 6 }).then((res) => {
            if (res.data.code === 200) {
                this.courses = res.data.entity.resultData
            }
        })
        studioTopicList({ busId: this.studioId, topicType: 3, isHot: 0 }, { pageNum: 1, pageSize: 6 }).then((res) => {
            if (res.data.code === 200) {
                res.data.entity.resultData.sort(function (obj1, obj2) {
                    const val1 = obj1.replyTotal
                    const val2 = obj2.replyTotal
                    return val2 - val1
                })
                this.topic = res.data.entity.resultData
            }
        })
        requestAuditedMemberList({ studioId: this.studioId }, { pageNum: 1, pageSize: 12 }).then((res) => {
            if (res.data.code === 200) {
                this.member = res.data.entity.resultData
            }
        })
        requestNoticeList({ noticeType: 3, title: '', busId: this.studioId }, { pageNum: 1, pageSize: 5 }).then((res) => {
            if (res.data.code === 200) {
                this.notice = res.data.entity.resultData
            }
        })
    },
    filters: {
        handleWorksDesc(txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    },
    props: ['detail']
}
</script>


<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
.home {
    aside.content_r {
        .bulletinBoard  {
            .title {
                font-size: 16px;
                font-weight: 400;
                padding: 15px 0;
                box-sizing: border-box;
                text-indent: 15px;
                border-bottom: 1px solid #c9c9c9;
                color: #3e3e3e;
            }
            .bulletin_ul {
                padding: 0 15px;
            }
        }
    }
}
</style>


<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/item_list.scss';
.p15 {
    padding: 5px 15px;
}
.p20 {
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
}
.mt20 {
    margin-top: 20px;
}
.mb10 {
    margin-bottom: 10px;
}
.home {
    .title {
        font-size: 16px;
        font-weight: 400;
        padding: 15px 0;
        box-sizing: border-box;
        text-indent: 15px;
        border-bottom: 1px solid #c9c9c9;
        color: #3E3E3E;
        .more {
            font-size: 14px;
            color: #3E3E3E;
            margin-right: 15px;
            &:hover {
                color: $theme-color;
            }
        }
    }
    .content_l {
        width: 906px;
        .article, .result {
            width: 49%;
        }
        .article, .result, .resources, .topic {
            min-height: 270px;
            .list_ul {
                .list_li {
                    padding: 10px 0;
                    box-sizing: border-box;
                    border-bottom: 1px dashed #c9c9c9;
                    .list_li_title {
                        font-size: 14px;
                        color: #2698ee;
                        &:hover {
                            color: nth($default-color, 1);
                        }
                    }
                    .list_li_time {
                        font-size: 14px;
                        color: #999;
                    }
                    .icon-btn-download:hover {
                        color: nth($default-color, 1);
                    }
                }
            }
        }
    }
    .resources {
        .list_li {
            .icon {
                font-size: 16px;
            }
        }
    }
    .topic {
        .list_li {
            .hot {
                padding: 2px;
                padding-left: 4px;
                font-size: 12px;
                font-weight: 400;
                color: #fff;
                background-color: #bbb;
                text-align: center;
                margin-right: 10px;
            }
            i.hot-1 {
                background-color: #D00;
            }
            i.hot-2 {
                background-color: #ff7200;
            }
            i.hot-3 {
                background-color: #ff9d00;
            }
        }
    }
    .content_r {
        width: 275px;
        .introduction {
            &:hover .msg_name {
                color: nth($default-color, 1);
            }
            .introduction_img {
                border-radius: 50%;
            }
            .introduction_name {
                .msg_name {
                    padding: 25px 0 10px;
                    font-size: 24px;
                    cursor: pointer;
                }
                .msg_type {
                    font-size: 14px;
                    color: #3e3e3e;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    line-height: 1.8;
                }
            }
            .msg_int {
                padding: 15px;
                text-indent: 2em;
                line-height: 1.5;
                word-wrap: break-word;
                word-break: break-all;
                text-align: justify;
            }
            .maker_li_countsUl {
                height: 40px;
                .maker_li_countsLi {
                    text-align: center;
                    .maker_li_countsLi_num {
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    .maker_li_countsLi_name {
                        font-size: 12px;
                        color: #bbb;
                    }
                    & + .maker_li_countsLi {
                        height: 40px;
                        border-left: 1px solid #dfdfdf;
                    }
                }
            }
        }
        .member {
            .member_ul {
                .member_li {
                    width: 25%;
                    height: 80px;
                    padding: 10px 7px;
                    box-sizing: border-box;
                    .member_a {
                        &:hover {
                            color: nth($default-color, 1);
                        }
                        .member_face {
                            width: 100%;
                            height: 75%;
                            border-radius: 50%;
                        }
                        .member_name {
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
.list-item-title{
    .item-title{
        max-width: 150px;
    }
    .item-name{
        max-width: 100px;
    }
}
</style>
