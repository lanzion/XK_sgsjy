<template>
    <div id="resourceDetail" class="clearfix" v-bind:class="{'backend-content__middle': !isFront,'container': isFront }">
        <!-- 面包屑 -->
        <nav class="navigation container"><router-link :to="{path: `${pages.detail.studio.path}/resource`, query: {id: $route.query.id}}"> 创客资源 </router-link> > {{detailsData.name}}</nav>
        <div class="content-left fl" v-bind:class="{'width100':!isFront}">
            <!-- 预览 -->
            <div class="preview-box bgw">
                <doc-reader v-if="detailsData.documentId" v-bind="{docId: detailsData.documentId, width: 883}"></doc-reader>
                <div v-else class="preview-img" title="点击查看原图" @click="visible.show = true" :style="{backgroundImage: `url(${getFileUrl(detailsData.resourceId) || listDefault})`}"></div>
            </div>
            <!-- 资源信息 -->
            <section class="resource-msg bgw">
                <com-panel-event module="resource" class="operate-group" :title.sync="detailsData.name"></com-panel-event>
                <h5 class="resource-title">{{detailsData.name}}</h5>
                <div class="intro-box">资源简介：{{detailsData.introduction | handleDesc(500)}}</div>
                <div class="msg-box clearfix">
                    <p class="w308 fl">
                        <i class="icon-input-user"></i>上传人：{{detailsData.createName || '暂无'}}
                    </p>
                    <p class="w308 fl">
                        <i class="icon-btn-browse"></i>浏览：{{detailsData.browseNum || 0}}
                    </p>
                </div>
                <div class="msg-box clearfix">
                    <p class="w308 fl">
                        <i class="icon-file-empty"></i>文件大小：{{detailsData.fileSize ? (detailsData.fileSize / 1024).toFixed(1) : 0}}kb
                    </p>
                    <p class="w308 fl">
                        <i class="icon-i-time"></i>上传时间：{{detailsData.createDate | dateFormat('yyyy-MM-dd')}}
                    </p>
                </div>
                <a class="dl-btn" :href="downloadUrl(detailsData.resourceId, detailsData.name)" :download="detailsData.name" @click="downloadAdd">下载</a>
            </section>
            <!-- 评价部分 -->
            <evaluate-details :evaluateData="evaluateData" class="bgw" style="padding:15px;"></evaluate-details>
        </div>
<!--         <div class="content-right bgw fr" v-if="isFront">
            <h4 class="clearfix">
                <span class="title fl">相关资源</span>
                <router-link :to="{path:morePath,query:{id:$route.query.id}}" class="btn-more fr">更多>></router-link>
            </h4>
            <v-list :items="items" :listData="listData">
                <template slot-scope="props">
                    <div class="list-item-img__box">
                        <img v-if="Number(props.item.resourceType) == 4" @click.stop="toDetail(props.item.id)" :src="getFileUrl(props.item.resourceId) || listDefault">
                        <i v-else @click.stop="toDetail(props.item.id)" :class="{'icon-file-text': props.item.resourceType == 1, 'icon-file-video': props.item.resourceType == 2, 'icon-file-music': props.item.resourceType == 3, 'icon-file-empty': props.item.resourceType == 5 || props.item.resourceType == null}"></i>
                    </div>
                    <div class="list-item-title">
                        <p class="list-title" :title="props.item.name" @click.stop="toDetail(props.item.id)">{{ props.item.name | textOverflow(18) }}</p>
                        <p class="msg">
                            <span><i class="icon-btn-i-collection2"></i>{{props.item.collectNum || 0}}</span>
                            <span><i class="icon-btn-i-reply"></i>{{props.item.commentCount || 0}}</span>
                            <span><i class="icon-i-browse"></i>{{props.item.browseNum || 0}}</span>
                        </p>
                    </div>
                </template>
            </v-list>
        </div> -->
        <img-preview :visible.sync="visible" :imgUrl="detailsData.resourceId"></img-preview>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
// import dataTranslation from '@/js/dataTranslation.js'
// import { loginInfo } from '@/js/getUserInfo.js'
import { fileBaseUrl } from '@/js/common-config.js'
import { downloadAdd } from '@/service/resource.js'
import { requestResShareDetail, requestResShareList } from '@/service/studio.js'
import evaluateDetails from 'Common/evaluation/detailEvaluation.vue'
import breadcrumb from 'Common/breadcrumb.vue'
import comPanelEvent from 'Common/button/com_panel_event.vue'
import list from 'Common/list/graphic/list.vue'
import imgPreview from '@/components/common/img_preview/img_preview.vue'
import docReader from 'components/resource/doc_reader.vue'

// const color = {
//     red: ['#f85959', '#fee0e0'],
//     grassGreen: ['#2cbb61', '#e2fbde']
// }

export default {
    name: 'resourceDetail',
    components: {
        'evaluate-details': evaluateDetails,
        'bread-crumb': breadcrumb,
        'com-panel-event': comPanelEvent,
        docReader,
        'v-list': list,
        'img-preview': imgPreview
    },
    data() {
        return {
            fileBaseUrl,
            evaluateData: {
                name: '资源',  // 类型名称
                reportApi: 'maker/evaluate/addReport', // 举报api
                dataUrl: {
                    evaluateCount: 'maker/evaluate/selectEvaluateCount',   // 评论统计的url
                    evaluateList: 'maker/evaluate/getList',    // 评论列表url
                    evaluationAdd: 'maker/evaluate/add',   // 发表评论url
                },
                params: 'busId',    // 字段名
                id: '',
                labelType: '4'
            },
            detailsData: '',
            isFront: '', // 根据路由判断是否是后台，控制面包屑的显示。
            isPraise: false,
            items: [],
            listData: {
                col: 1,
                pathUrl: '',
                params: {
                    names: 'resId',
                    val: 'id'
                }
            },
            morePath: `${this.pages.detail.studio.path}/resource/detail`,
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        this.evaluateData.id = this.$route.query.resId
        // this.checkStatistics();
        // 设置返回的路由
        this.isFront = !this.$route.path.includes('admin')
    },
    watch: {
        '$route.query.resId'() {
            this.evaluateData.id = this.$route.query.resId
            this.getRelatedResource()
            this.getResourceDetails()
        }
    },
    computed: {
    },
    mounted() {
        this.getResourceDetails()
        this.getRelatedResource()
    },
    filters: {
        handleDesc(txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        /*
         * 获取资源详情
         * id: 资源id
         */
        getResourceDetails() {
            const data = {
                id: this.evaluateData.id
            }
            requestResShareDetail(data).then((res) => {
                const _data = res.data.entity
                this.detailsData = _data
            })
        },
        /*
         * 下载次数加1
         */
        downloadAdd() {
            downloadAdd({ id: this.$route.query.resId }).then((res) => {
                if (res.data.code === 200) {
                    this.detailsData.downNum ++
                }
            })
        },
        // 获取相关资源列表
        async getRelatedResource() {
            const res = await requestResShareList({ studioId: this.$route.query.id, resourceId: this.$route.query.resId }, { pageSize: 5, pageNum: 1 })
            if (res.data.code === 200) {
                this.items = res.data.entity.resultData
            }
        },
        // 点相关资源跳到详情
        toDetail(resId) {
            this.$router.push({ path: '/studioMemberDetail/resource/detail', query: { id: this.$route.query.id, resId: resId } })
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.w308{
    width: 308px;
}
#resourceDetail{
	overflow: hidden;
	margin: 0 auto;
    margin-top: -10px;
    /* 面包屑 */
    .navigation {
        // height: 50px;
        // line-height: 50px;
        color: #999999;
    }
    /* 左边部分 */
    .content-left{
        width: 100%;
        /* 预览图 */
        .preview-box{
            padding: 15px;
            margin-bottom: 20px;
            .preview-img{
                width: 100%;
                height: 369px;
                background-position: center;
                background-size: cover;
            }
        }
        .resource-msg{
            width: 100%;
            box-sizing: border-box;
            padding: 15px;
            margin-bottom: 20px;
            position: relative;
            .operate-group{
                position: absolute;
                top: 15px;
                right: 15px;
            }
            .dl-btn{
                position: absolute;
                bottom: 15px;
                right: 15px;
                display: inline-block;
                width: 96px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                background-color: nth($default-color, 1);
                border-radius: 3px;
                &:hover{
                    opacity: 0.75;
                }
            }
            .resource-title{
                height: 40px;
                line-height: 40px;
                font-size: 22px;
                margin-bottom: 10px;
                color: #333;
            }
            .intro-box{
                font-size: 14px;
                color: #333;
                line-height: 1.8em;
                margin-bottom: 20px;
            }
            .msg-box{
                width: 780px;
                font-size: 14px;
                color: #626262;
                font-weight: lighter;
                line-height: 2.2em;
                &:last-child{
                }
                i{
                    margin-right:10px;
                }
            }
        }
    }
    // 右边部分
    .content-right{
        width: 274px;
        min-height: 400px;
        h4{
            font-size: 16px;
            padding: 15px;
            .btn-more{
                cursor: pointer;
                color: #999;
                &:hover{
                    color: nth($default-color, 1);
                }
            }
        }
        .list-item-title{
            margin-top: 5px;
            .msg{
                color: #999;
                font-size: 12px;
                span{
                    margin-right: 20px;
                }
                i{
                    margin-right: 10px;
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
}
#resourceDetail{
    #list{
        margin: 0;
        .list{
            .list-item__box{
                margin-bottom: 0px;
                .list-item-img__box{
                    background-color: #e7edf2;
                    text-align: center;
                    img{
                        height: 163px;
                    }

                    [class*="icon-file-"],
                    [class*=" icon-file-"] {
                        line-height: 163px;
                        font-size: 80px;
                        color: #b3b3b3;
                    }
                }
            }
        }
    }
}
.width100 {
    width: 100% !important;
}
</style>

