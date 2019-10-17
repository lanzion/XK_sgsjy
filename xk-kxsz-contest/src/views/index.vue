<template>
    <div class="contest">
        <v-banner :banners="banners" class="banner" :height="400"></v-banner>
        <div class="container">
            <section class="optionBox">
                <v-classificationDictionary model="contestLevel" :changeDataDic="changeMatchGrade"></v-classificationDictionary>
                <div class="optionBox_region clearfix">
                    <div class="optionBox_region_title fl">竞赛区域：</div>
                    <xk-region-select class="optionBox_region_select fl" @region="changeRegion" :clearable="true"></xk-region-select>
                </div>
                <v-classificationDictionary model="contestStatus" :changeDataDic="changeMatchStatus"></v-classificationDictionary>
                <v-classificationDictionary model="signupStatus" :changeDataDic="changeEnrollStatus"></v-classificationDictionary>
            </section>
            <div class="search clearfix">
                <v-search class="fr" @search="changeSearch"></v-search>
                <p class="totalNum fr">共计<span style="color: #00a0e9;">{{ pageParam.totalNum ? pageParam.totalNum : 0 }}</span>个竞赛</p>
            </div>
            <ul class="list" v-if="listData.length > 0">
                <li v-for="(item, index) in listData" class="list_li">
                    <div class="img-box">
                        <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                        <!-- <img :src="getFileUrl(item.cover)" width="290" height="180" /> -->
                        <div class="status-label">
                            <p :class="`state-${ item.enrollStatus }`"> {{ item.enrollStatus | translate(signupStatusOptions) }}</p>
                        </div>
                    </div>
                    <div class="msg-box">
                        <router-link class="joinContest" :to="{path: '/contest/detail', query:{ id: item.id } }" v-if="nowTime > item.enrollStartDate && nowTime < item.enrollEndDate">前往参加</router-link>
                        <div  class="message_title">
                            <router-link :to="{path: '/contest/detail', query:{ id: item.id } }" :title="item.title" class="message_title_a">
                                {{item.title | handleWorksDesc(20)}}
                            </router-link>
                            <span class="message_title_span fr">{{item.matchStatus | translate(contestStatusOptions)}}</span>
                        </div>
                        <el-row class="mb18">
                            <el-col :span="8">
                                <i class="icon-i-activeTime"></i>
                                竞赛时间：{{ item.matchStartDate | dateFormat('yyyy.MM.dd') }} -- {{item.matchEndDate | dateFormat('yyyy.MM.dd') }}
                            </el-col>
                            <el-col :span="8">
                                <i class="icon-i-time2"></i>
                                报名时间：{{ item.enrollStartDate | dateFormat('yyyy.MM.dd') }} -- {{item.enrollEndDate | dateFormat('yyyy.MM.dd') }}
                            </el-col>
                        </el-row>
                        <el-row class="mb18">
                            <el-col :span="8">
                                <i class="icon-i-classify"></i>
                                级别: {{ item.matchGrade | translate(contestLevelOptions) }}
                            </el-col>
                            <el-col :span="8">
                                <i class="icon-admin-i-classify"></i>
                                竞赛项目:  {{ item.projectListString }}
                            </el-col>
                            <el-col :span="8">
                                <i class="icon-i-member"></i>
                                参赛人群: {{ item.actorType | translate(actorTypeOption, { key: 'id' }) }}
                            </el-col>
                        </el-row>
                        <el-row class="mb18">
                            <el-col :span="8">
                                <i class="icon-i-creator"></i>
                                举办者：{{item.createName}}
                            </el-col>
                            <el-col :span="8">
                                <i class="icon-i-statis-article"></i>
                                参赛形式：{{item.actorWay | translate(actorWayOption, { key: 'id' }) }}
                            </el-col>
                            <el-col :span="8">
                                <i class="icon-btn-i-scope" style="cursor: default;color: #999;"></i>
                                区域：{{ item.provinceName }}{{ item.cityName }}{{ item.areaName }}
                            </el-col>
                        </el-row>
  <!--                       <div class="message mb18">
                            <p class="message_item" :title="item.matchGrade">
                                <i class="icon-i-classify"></i>
                                级别：{{ item.matchGrade | translate(contestLevelOptions) }}
                            </p>
                            <p class="message_item">
                                <i class="icon-admin-i-classify"></i>
                                竞赛项目：{{ item.projectListString }}
                            </p>
                        </div>
                        <div class="message mb18">
                            <p class="message_item" :title="item.activityTypeName">
                                <i class="icon-i-activeTime"></i>
                                竞赛时间：{{ item.matchStartDate | dateFormat('yyyy.MM.dd') }} -- {{item.matchEndDate | dateFormat('yyyy.MM.dd') }}
                            </p>
                            <p class="message_item">
                                <i class="icon-i-time2"></i>
                                报名时间：{{ item.enrollStartDate | dateFormat('yyyy.MM.dd') }} -- {{item.enrollEndDate | dateFormat('yyyy.MM.dd') }}
                            </p>
                        </div>
                        <div class="message">
                            <p class="message_item" :title="item.activityTypeName">
                                <i class="icon-i-creator"></i>
                                举办者：{{item.createName}}
                            </p>
                            <p class="message_item">
                                <i class="icon-btn-i-scope" style="cursor: default;color: #999;"></i>
                                区域：{{ item.provinceName }}{{ item.cityName }}{{ item.areaName }}
                            </p>
                        </div> -->
                    </div>
                </li>
            </ul>
            <div class="empty-block" v-else>暂无数据</div>
            <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import classificationDictionary from '@/components/common/classificationDictionary.vue'
// import region from '@/components/common/select/region_select.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import { requestBanner } from '@/service/common.js'
import { requestList } from '@/service/index.js'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            banners: [],
            // 地址
            region: {
                provinceId: null,
                cityId: null,
                areaId: null
            },
            // 搜索条件
            options: {
                title: '',
                matchGrade: null,
                matchStatus: null,
                enrollStatus: null
            },
            count: {
                name: '竞赛',
                color: 'lightBlue'
            },
            // 列表数据
            listData: [],
            // 分页
            pageParam: {
                totalNum: 0,
                pageSize: 5,
                pageNum: 1
            },
            // 搜索
            search: '',
            nowTime: new Date().getTime(),
            actorTypeOption: [
                { id: '1', name: '学生' },
                { id: '2', name: '教师' }
            ],
            actorWayOption: [
                { id: '1', name: '个人' },
                { id: '2', name: '团体' }
            ]
        }
    },
    components: {
        'v-banner': banner,
        'v-classificationDictionary': classificationDictionary,
        // 'v-region-select': region,
        'v-search': search,
        'v-pagination': pagination,
    },
    methods: {
        getBanners() {
            requestBanner({ bannerType: 22 }).then((res) => {
                if (res.data.code === 200) {
                    this.banners = res.data.appendInfo.list
                }
            })
        },
        // 列表数据
        getList() {
            requestList(this.param, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    const entity = res.data.entity
                    this.listData = entity.resultData
                    this.$set(this.pageParam, 'totalNum', entity.totalNum)
                }
            })
        },
        // 设置级别
        changeMatchGrade(item) {
            this.$set(this.options, 'matchGrade', item.id)
        },
        // 设置竞赛状态
        changeMatchStatus(item) {
            this.$set(this.options, 'matchStatus', Number(item.id))
        },
        // 设置报名状态
        changeEnrollStatus(item) {
            this.$set(this.options, 'enrollStatus', Number(item.id))
        },
        // 设置搜索
        changeSearch(item) {
            this.$set(this.options, 'title', item)
        },
        // 设置地址
        changeRegion(items) {
            const _region = {}
            const [provinceId, cityId, areaId] = items
            _region.provinceId = provinceId || null
            _region.cityId = cityId || null
            _region.areaId = areaId || null
            this.$set(this.$data, 'region', _region)
        },
        // 翻页
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getList()
        }
    },
    computed: {
        param: function () {
            return Object.assign({}, this.options, this.region)
        },
        ...mapState('dictionaryCommon', {
            contestLevelOptions(state) {
                const dicList = (state.contestLevelDicList || {}).dicList || []
                return dicList
            },
            signupStatusOptions(state) {
                const dicList = (state.signupStatusDicList || {}).dicList || []
                return dicList
            },
            contestStatusOptions(state) {
                const dicList = (state.contestStatusDicList || {}).dicList || []
                return dicList
            },
        })
    },
    watch: {
        param: {
            handler: function () {
                this.getList()
            }
        },
        deep: true
    },
    mounted() {
        this.getList()
        this.getBanners()
    },
    filters: {
        handleWorksDesc(txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.mb10{
    margin-bottom: 10px;
}
.mb18{
    margin-bottom: 18px;
}
.w240{
    width: 240px;
}
.w470{
    width: 470px;
}
.w150{
    width: 150px;
}
.contest {
    .banner {
        margin-bottom: 30px;
    }
    .optionBox {
        .optionBox_region {
            width: 350px;
            padding-bottom: 12px;
            box-sizing: border-box;
            font-size: 14px;
            .optionBox_region_title {
                width: 77px;
                height: 28px;
                line-height: 28px;
                font-weight: 600;
            }
            .optionBox_region_select {
                width: 70%;
            }
        }
    }
    .search {
        padding: 8px 0;
        border-bottom: 1px solid #ddd;
        .totalNum {
            height: 34px;
            line-height: 34px;
            margin-right: 10px;
            font-size: 14px;
        }
    }
}
.focus{
    border-color: $theme-color!important;
}
.list {
    width: 100%;
    overflow: hidden;
    .list_li {
        display: flex;
        padding: 15px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        .img-box {
            position: relative;
            width: 290px;
            height: 180px;
            .bg-img__wrap {
                width: 100%;
                height: 100%;
            }
        }
        .msg-box {
            position: relative;
            flex: 1;
            font-size: 14px;
            padding-left: 20px;
            padding-top: 15px;
            font-weight: lighter;
            .joinContest {
                position: absolute;
                top: 40%;
                right: 0;
                width: 94px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                color: $theme-color;
                border: 1px solid $theme-color;
                border-radius: 5px;
                z-index: 998;
                &:hover {
                    background-color: $theme-color;
                    color: #fff;
                }
            }
            .message_title {
                display: block;
                padding-bottom: 40px;
                .message_title_a {
                    font-size: 22px;
                    color: #333;
                    &:hover {
                        color: $theme-color;
                    }
                }
                .message_title_span {
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 22px;
                    color: $theme-color;
                }
            }
            .message {
                display: table;
                width: 100%;
                .message_item {
                    display: table-cell;
                    width: 50%;
                    color: #626262;
                }
            }
        }
    }
}
.status-box{
    width: 96px;
    margin-top: 74px;
    .stop{
        height: 32px;
        width: 96px;
        border-radius: 3px;
        text-align: center;
        line-height: 32px;
        border: 1px solid $theme-color;
        color: $theme-color;
        font-size: 14px;
    }
    .join-in{
        right: 0px;
        .join-now{
            color: $theme-color !important;
            border:1px solid $theme-color;
            height: 32px;
            width: 96px;
            border-radius: 3px;
            text-align: center;
            line-height: 32px;
            padding:0;
            .btn{
                background-color: $theme-color !important;
            }
        }
        .dialog-box{
            border-top: 2px solid $theme-color!important;
            .tips{
                text-align: right;
                width: 100%;
                line-height: 15px;
                font-size: 12px;
                margin-bottom: 5px;
            }
        }
    }
    .join-in:hover{
        color: #fff;
        .join-now {
            background-color: $theme-color;
            color: #fff!important;
        }
    }
}
</style>
