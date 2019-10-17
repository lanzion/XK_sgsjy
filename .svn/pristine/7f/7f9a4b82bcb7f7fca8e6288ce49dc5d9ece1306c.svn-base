<template>
    <div class="wrap">
        <v-banner :banners="banners" :height="400"></v-banner>
        <section class="list-group__statis_yanshi">
            <ul class="container">
                <li v-for="(item, key) in statisTypeYanshi" :key="key" class="list-group-main__item">
                    <div class="item-content pr">
                        <i :class="['icons', item.icon]"></i>
                        <p class="title">{{ statis[`${key}Num`] ? String(statis[`${key}Num`]).replace(/(\d)(?=(\d{3})+$)/g, '$1,') : 0 }}</p>
                        <p class="desc">{{item.title}}数量</p>
                    </div>
                </li>
            </ul>
        </section>
        <!-- <section class="list-group__statis">
            <ul class="container clearfix">
                <li v-for="(item, key) in statisType" :key="key" class="list-group-main__item fl">
                    <a :href="item.url" class="list-group-main">
                        <div class="item-content pr">
                            <img :src="item.pic" alt="">
                            <div class="txt">
                                <p class="title">{{ statis[`${key}Num`] ? String(statis[`${key}Num`]).replace(/(\d)(?=(\d{3})+$)/g, '$1,') : 0 }}</p>
                                <p class="desc">{{item.title}}</p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </section> -->
        <section class="container list-group__info">
            <!-- <h2 class="list-group-title">资讯</h2> -->
            <h2 class="list-group-title">教育资讯 / 通知公告</h2>
            <ul class="list-group-main">
                <li class="list-group-main__item table-layout" v-for="(item, idx) in infos" :key="item.id">
                    <router-link tag="a" :to="{ name: 'newsDetail', params: { type: noticeType }, query: { id: item.id } }">
                        <figure class="table-cell">
                            <div :style="{'background-image': `url(${getFileUrl(item.pic)})`}" class="pic bg-img__wrap"></div>
                        </figure>
                        <article class="table-cell item-detail pr">
                            <h5 class="item-title">{{item.title}}</h5>
                            <p class="item-content">{{item.content | handleHtmlDesc}}</p>
                            <time class="item-time pa">{{item.publishDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
                        </article>
                    </router-link>
                </li>
            </ul>
            <div class="btn-group">
                <!-- <router-link :to="{path: '/news/list'}" tag="a" class="more">查看更多资讯</router-link> -->
                <router-link :to="{path: '/news/list'}" tag="a" class="more">查看更多资讯 / 公告</router-link>
            </div>
        </section>
    </div>
</template>

<script>
import picSpace from 'Asset/img/index/zone.png'
import picResource from 'Asset/img/index/resource.png'
import picActivity from 'Asset/img/index/activity.png'
import picProduction from 'Asset/img/index/production.png'
import banner from '@/components/common/banner.vue'
import { requestBanner, requestStatis, requestInfo } from '@/service/common.js'
import { pages } from 'Asset/js/common-config.js'

export default {
    name: 'index',
    components: {
        'v-banner': banner
    },
    data() {
        return {
            pages: pages,
            banners: [],
            statis: {},
            statisType: {
                space: {
                    title: '创客空间',
                    pic: picSpace,
                    url: `${pages.space}space`
                },
                resouce: {
                    title: '创客资源',
                    pic: picResource,
                    url: `${pages.space}education`
                },
                activity: {
                    title: '创客活动',
                    pic: picActivity,
                    url: `${pages.space}street/activity`
                },
                production: {
                    title: '创客作品',
                    pic: picProduction,
                    url: `${pages.space}street/excellent`
                }
            },
            statisTypeYanshi: {
                production: {
                    title: '作品',
                    icon: 'icon-model-works'
                },
                activity: {
                    title: '活动',
                    icon: 'icon-model-activity'
                },
                courses: {
                    title: '课程',
                    icon: 'icon-model-course'
                },
                project: {
                    title: '项目',
                    icon: 'icon-model-project'
                },
                practice: {
                    title: '实训',
                    icon: 'icon-model-practice'
                },
                resouce: {
                    title: '资源',
                    icon: 'icon-model-resource'
                },
                subject: {
                    title: '课题',
                    icon: 'icon-model-subject'
                },
                space: {
                    title: '空间',
                    icon: 'icon-model-space'
                },
                interest: {
                    title: '兴趣组',
                    icon: 'icon-model-interest'
                },
            },
            noticeType: 38,
            infos: [],
            infosPage: {
                pageSize: 5,
                pageNum: 1
            }
        }
    },
    created() {
        this.getBanners()
        this.getStatis()
        this.getList()
    },
    methods: {
        getBanners() {
            requestBanner({ bannerType: 1 }).then((res) => {
                if (res.data.code === 200) {
                    this.banners = res.data.appendInfo.list
                }
            })
        },
        getStatis() {
            requestStatis().then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    const _result = {}
                    for (const key in _data) {
                        if (_data[key] && !Number.isNaN(_data[key] - 0)) {
                            _result[key] = _data[key]
                        }
                    }
                    this.statis = _result
                }
            })
        },
        getList() {
            requestInfo(Object.assign({ noticeTypeId: this.noticeType, orgId: 5 }, this.infosPage)).then((res) => {
                if (res.status === 200) {
                    const _data = res.data.entity || {}
                    this.infos = _data.resultData || []
                }
            })
        }
    },
    filters: {
        handleHtmlDesc(txt = '', len = 200, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>
<style lang='scss' scoped>
.wrap {
    .nav-list {
        line-height: 58px;
        font-size: 16px;

        .nav-item {
            display: inline-block;
            height: 58px;
            padding: 0 1em;
            border-bottom: 2px solid transparent;
            box-sizing: border-box;
            cursor: pointer;

            &.active,
            &:hover {
                border-bottom-color: #2797ed;
                .nav-item-txt {
                    display: block;
                    color: #2797ed;
                }
            }
        }
    }
}

.list-group__statis_yanshi {
    padding: 30px 0;
    background-color: #fcfcfc;
    text-align: center;
    .list-group-main__item {
        display: inline-block;
        width: 130px;
        margin: 20px 50px;
        text-align: center;
        &:hover {
            .item-content {
                transform: scale(1.17);
                z-index: 6;
            }
            .ani {
                animation: rotate .5s cubic-bezier(.215, .61, .355, 1);
                &:before {
                    animation: circleFadeOut 1s .6s ease-out;
                }
            }
        }
        .item-content {
            padding: 10px 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            transition: transform .5s;
            .icons {
                font-size: 50px;
            }
            .title {
                font-size: 20px;
                margin: 6px 0;
            }
            .desc {
                font-size: 16px;
            }
        }
    }
}

.list-group__statis {
    background-color: #edf6ff;
    margin-top: 30px;
    .list-group-main__item {
        width: 282px;
        margin: 20px 0;
        & + .list-group-main__item {
            margin-left: 24px;
        }
        &:hover {
            .item-content {
                transform: scale(1.17);
                z-index: 6;
                box-shadow: 0 0 13px rgba(35, 24, 21, .2);
            }
            .ani {
                animation: rotate .5s cubic-bezier(.215, .61, .355, 1);
                &:before {
                    animation: circleFadeOut 1s .6s ease-out;
                }
            }
        }
        .item-content {
            background: #fff;
            transition: transform .5s;
        }
        .txt {
            height: 70px;
            margin-top: -30px;
            box-sizing: border-box;
            text-align: center;
            overflow: hidden;
            .title {
                font-size: 24px;
                margin-bottom: 8px;
            }
            .desc {
                font-size: 18px;
                color: #626262;
            }
        }
    }
}

.list-group__info {
    padding: 60px 0;
    .list-group-title {
        display: block;
        margin-bottom: 30px;
        font-size: 36px;
        text-align: center;
    }
    .list-group-main__item {
        padding: 15px 0;
        border-bottom: 1px solid #dfdfdf;
        &:hover {
            .item-title {
                color: #2797ed;
            }
        }
    }
    .pic {
        width: 360px;
        height: 230px;
    }
    .item-detail {
        padding-left: 18px;
        vertical-align: top;
        font-size: 14px;
        line-height: 1.5;
    }
    .item-title {
        font-size: 21px;
        line-height: 3;
    }
    .item-content {
        text-align: justify;
    }
    .item-time {
        display: block;
        bottom: 1em;
        color: #999;
        white-space: nowrap;
    }
    .btn-group {
        text-align: center;
        .more {
            display: inline-block;
            padding: .8em 1em;
            margin-top: 20px;
            border: 1px solid #ddd;
            font-size: 21px;
            color: #2797ed;
            &:hover {
                background-color:  #2797ed;
                color: #fff;
            }
        }
    }
}

</style>
