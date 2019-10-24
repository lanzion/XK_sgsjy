<template>
    <div id="mult_space">
        <ul class="list" v-if="datas.length > 0">
            <li v-for="(item,index) in datas" class="clearfix">
                <div class="img-box">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.face) || listDefault})` }"></div>
                    <!-- <img :src="getFileUrl(item.face) || listDefault" /> -->
                </div>
                <div class="msg-box verticle-middle">
                    <div class="story-name clearfix">
                        <router-link :to="{ path: `${host}/multSpace/detail`, query: { id: item.id } }" class="name fl">
                            {{item.name}}
                        </router-link>
                    </div>
                    <div class="story-content clearfix">
                        <p class="contents ">
                            {{item.introduction | textOverflow(50)}}
                        </p>
                    </div>
                    <div class="story-category clearfix mb10">
                        <p class="category fl">
                            成员：<span>{{item.memberCount}}</span>
                        </p>
                        <p class="category fl">
                            <span>发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                        </p>
                    </div>
                    <div class="address">地址：{{item.address || '暂无地址'}}</div>
                </div>
                <div class="option-box verticle-middle">
                    <!-- <a :href="downloadUrl(item.businessPlan, `${item.name}商业策划书`)" :download="`${item.name}商业策划书`">我的商业策划书</a> -->
                    <a href="javascript:;" @click="downloadUrl(item.businessPlan,  `${item.name}商业策划书`)">我的商业策划书</a>
                </div>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
    import pagination from 'Common/pagination.vue'
    import { requestEnterSpaceList } from '@/service/mult.js'

    export default {
        name: 'mult_space',
        components: {
            'v-pagination': pagination,
        },
        data() {
            return {
                datas: [],
                param: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                pageParam: {
                    pageSize: 5,
                    pageNum: 1
                }
            }
        },
        props: {
            search: {
                type: String,
                default: ''
            }
        },
        watch: {
            search: {
                handler: function () {
                    this.getSpaceList()
                },
                deep: true
            }
        },
        created() {
            this.getSpaceList()
        },
        methods: {
            // 获取入驻空间列表
            getSpaceList() {
                const data = {
                    userId: this.$ls.get('loginUId'),
                    multName: this.search
                }
                requestEnterSpaceList(data, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.param.totalNum = res.data.entity.totalNum
                        this.datas = res.data.entity.resultData
                        this.$emit('totalNum', res.data.entity.totalNum)
                    }
                })
            },
            // 切换页数
            changePage(val) {
                this.pageParam.pageNum = val
                this.getSpaceList()
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
*{
    box-sizing: border-box;
}
.mb10{
    margin-bottom: 10px;
}
.vertical-align-top{
    vertical-align: top;
}
#mult_space {
    padding: 10px 18px 20px;
    .list {
        li {
            width: 100%;
            height: 212px;
            padding: 20px 0;
            border-bottom: 1px dashed #ccc;
            position: relative;
            a{
                display: inline-block;
            }
            // 活动图片
            .img-box {
                $img-prev-height: 170px;
                position: relative;
                width: 265px;
                height: $img-prev-height;
                background-color: #e7edf2;
                text-align: center;
                img,
                .bg-img__wrap {
                    width: 100%;
                    height: 100%;
                }
                [class*="icon-file-"],
                [class*=" icon-file-"] {
                    line-height: $img-prev-height;
                    font-size: 80px;
                    color: #b3b3b3;
                }
            }
            // 活动信息
            .msg-box {
                padding-left: 290px;
                padding-right: 150px;
                font-size: 14px;
                width: 100%;
                .story-name{
                    margin-bottom: 15px;
                    height: 22px;
                    line-height: 22px;
                    .name{
                        font-size: 22px;
                    }
                    .evaluate{
                        font-size: 16px;
                        color: #fd8c88;
                        margin-left: 50px;
                    }
                }
                .story-name:hover{
                    .name{
                        color: $theme_color;
                    }
                }
                .story-content {
                    width: 100%;
                    font-size: 14px;
                    margin-bottom: 15px;
                    line-height: 22px;
                    .content-label{
                        display:inline-block;
                    }
                    .contents{
                        width: 100%;
                        word-wrap: break-word;
                        // padding-left: 72px;
                    }
                }
                .story-category{
                    .category{
                        line-height: 1.5em;
                        margin-right: 20px;
                    }
                }
                .story_msg{
                    color: #999;
                }
            }
            // 下载编辑分享删除
            .option-box{
                right: 0;
                width: 110px;
                a{
                    font-size: 14px;
                    margin: 0px 5px;
                    cursor: pointer;
                    &:hover{
                        color: $theme_color;
                    }
                }
            }
        }
    }
}

</style>
<style lang="scss">
    #mult_space{
        .el-dialog--small{
            width: 1080px!important;
        }
        .el-pagination{
            text-align: right;
            margin-top: 20px;
        }
        #delPopover{
            .delete-btn{
                font-size: 18px;
            }
        }
    }
</style>