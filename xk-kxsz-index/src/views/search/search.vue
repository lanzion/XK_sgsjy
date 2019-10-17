<template>
    <div class="wrap">
        <section class="search-wrap">
            <div class="container search-box" v-loading="loading" element-loading-text="正在搜索...">
                <div class="search-input-box">
                    <input class="search-input" type="text" name="search" v-model="search" @keyup.enter="changeSearch"/><button class="search-button" type="button"><i class="el-icon-search" @click="changeSearch"></i></button>
                </div>
                <div class="search-result-box pr">
                    <p class="txt pa" v-if="keyWords">共找到 <span class="total">{{totalNum || 0}}</span> 条<span class="keyword">“{{keyWords}}”</span>相关{{searchType}}</p>
                    <ul class="search-type-box">
                        <li class="search-type-item" v-for="(item, index) in nav" :key="index" :class="{active: activeNavIndex==index}" @click="toggleTabs(item, index)">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
        </section>
        <div class="container">
            <component :is="nav[activeNavIndex].component" :class="{'border-box': nav.length>1}"></component>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import works from '@/views/search/works.vue'
import activity from '@/views/search/activity/activity_index.vue'
import course from '@/views/search/course.vue'
import project from '@/views/search/project.vue'
import train from '@/views/search/train.vue'
import space from '@/views/search/space/space_index.vue'

export default {
    name: 'index',
    components: {
        'v-works': works,
        'v-activity': activity,
        'v-course': course,
        'v-project': project,
        'v-train': train,
        'v-space': space
    },
    data() {
        return {
            nav: [
                { name: '作品', type: 'work', component: 'v-works' },
                { name: '活动', type: 'activity', component: 'v-activity' },
                { name: '课程', type: 'course', component: 'v-course' },
                { name: '项目', type: 'project', component: 'v-project' },
                { name: '实训', type: 'train', component: 'v-train' },
                { name: '空间', type: 'space', component: 'v-space' }
            ],
            activeNavIndex: 0,
            search: '',
            searchType: '作品'
        }
    },
    computed: {
        ...mapState({
            totalNum: state => state.globalSearch.totalNum,
            keyWords: state => state.globalSearch.keyWords,
            typeIndex: state => state.globalSearch.typeIndex,
            activityType: state => state.globalSearch.activityType,
            spaceType: state => state.globalSearch.spaceType
        }),
    },
    created() {
        this.changeKeyWords(this.$route.query.keyWords)
    },
    mounted() {
        this.search = this.keyWords || localStorage.getItem('keyWords')
        this.activeNavIndex = this.typeIndex || localStorage.getItem('typeIndex') || 0
        this.changeSearchType()
    },
    watch: {
        keyWords: {
            handler: function (val) {
                this.search = val
            },
            deep: true
        },
        typeIndex: {
            handler: function (val) {
                this.activeNavIndex = val
                this.changeSearchType()
            },
            deep: true
        },
        activityType: {
            handler: function () {
                this.changeSearchType()
            },
            deep: true
        },
        spaceType: {
            handler: function () {
                this.changeSearchType()
            },
            deep: true
        }
    },
    beforeRouteLeave(to, from, next) {
        this.setTypeIndex(0)
        this.changeKeyWords('')
        next()
    },
    methods: {
        ...mapActions('globalSearch', ['changeKeyWords', 'setTypeIndex', 'setSpaceType', 'setActivityType']),
        toggleTabs(item, index) {
            this.activeNavIndex = index
            this.setTypeIndex(index)
        },
        changeSearch() {
            if (this.search) {
                this.changeKeyWords(this.search)
            } else {
                this.$message({
                    type: 'info',
                    message: '请输入关键词，再进行搜索'
                })
            }
        },
        changeSearchType() {
            const searchType = {
                0: '作品',
                1: '活动',
                2: '课程',
                3: '项目',
                4: '实训',
                5: '空间'
            }
            const activityType = { 0: '竞赛', 1: '活动' }
            const spaceType = {
                0: '教师',
                1: '学生',
                2: '教育局',
                3: '学校',
                4: '班级',
                5: '兴趣组',
                6: '导师工作室',
                7: '示范校'
            }
            if (Number(this.typeIndex, 10) === 1) {
                this.searchType = activityType[Number(this.activityType)]
            } else if (Number(this.typeIndex, 10) === 5) {
                this.searchType = spaceType[Number(this.spaceType)]
            } else {
                this.searchType = searchType[Number(this.activeNavIndex)]
            }
        }
    }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$face-size: 24px;
$box-border: 1px solid #f5f5f5;
.wrap {
    padding-bottom: 100px;
}

.search-wrap {
    background: -moz-linear-gradient(top, #60b2de 0%, #e5f6ff 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #60b2de 0%, #e5f6ff 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #60b2de 0%, #e5f6ff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#60b2de', endColorstr='#e5f6ff', GradientType=0 ); /* IE6-9 */

    .search-box {
        text-align: center;

        .search-input-box {
            $h: 38px;
            display: inline-block;
            height: $h;
            margin: 48px 0;
            border-radius: $box-radiu;
            box-shadow: 0px 0px 5px #999;
            overflow: hidden;

            .search-input,
            .search-button {
                height: 100%;
                border: none;
                line-height: $h;
                vertical-align: top;
                &:hover {
                    i {
                        color: #ccc;
                    }
                }
            }

            .search-input {
                width: 440px;
                text-indent: 1em;
            }

            .search-button {
                width: 80px;
                font-size: 18px;
                color: #273d48;
                background-color: nth($default-color, 1);
            }
        }

        .search-result-box {
            $nav-fs: 16px;
            $nav-lh: 2.5;
            .txt {
                left: 0;
                font-size: 14px;
                line-height: $nav-fs * $nav-lh;
                color: #999;

                .total {
                    color: #d00;
                }

                .keyword {
                    font-size: 18px;
                    vertical-align: bottom;
                }
            }
            .search-type-item {
                display: inline-block;
                padding: 0 1.5em;
                border-bottom: 2px solid transparent;
                font-size: $nav-fs;
                line-height: $nav-lh;
                cursor: pointer;
                font-weight: bold;

                &.active {
                    color: nth($default-color, 1);
                    border-color: nth($default-color, 1);
                }
            }
        }
    }
}

.face {
    display: inline-block;
    width: $face-size;
    height: $face-size;
    margin-right: 10px;
    border-radius: 50%;
}

.list-group__link {
    margin-top: $box-margin;
}

.list-group {
    margin-top: 32px;

    .list-group__header {
        margin-bottom: $box-margin;
        border-bottom: 1px solid #dfdfdf;
        line-height: 40px;

        .title {
            font-size: 24px;
        }
        .more {
            font-size: 14px;
            color: #999;
            &:hover {
                color: nth($default-color, 1);
            }
        }
    }

    .list-group__main {
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
                &:hover {
                    color: nth($default-color, 1);
                    cursor: pointer;
                }
            }
        }
        .pic {
            display: block;
        }
    }
}

.list-group__works {
    .list-group__item {
        .pic {
            height: 196px;
        }
        .info {
            height: 100px;
            padding: 1em;
            border-bottom: $box-border;
            box-sizing: border-box;
            .item-title {
                font-size: 14px;
                line-height: 2;
            }
            .org,
            .statis {
                color: #bbb;
            }
            .statis {
                line-height: 4;
                .icon {
                    &:before {
                        margin-right: 5px;
                        vertical-align: middle;
                    }
                    & + .icon {
                        margin-left: 10px;
                    }
                }
            }
        }
        .author-info {
            padding: 1em;
            box-sizing: border-box;
            line-height: $face-size;
            .time {
                color: #bbb;
            }
        }
    }
}

.list-group__contest {
    .list-group__item {
        .pic {
            height: 300px;
        }
        .info {
            position: relative;
            padding: 1em;
            border-bottom: $box-border;
            box-sizing: border-box;
            .item-title {
                margin: 0 5em 10px 0;
                font-size: 18px;
                line-height: 2;
            }
            .time {
                font-size: 14px;
                color: #999;
            }
            .status {
                $h: 36px;
                position: absolute;
                display: inline-block;
                top: 20px;
                right: 0;
                height: $h;
                line-height: $h;
                padding-right: 20px;
                font-size: 14px;
                text-align: right;
                background-color: nth($default-color, 1);
                color: #fff;
                &:before {
                    content: '';
                    position: absolute;
                    transform: translateX(-100%);
                    border: 18px solid nth($default-color, 1);
                    border-width: 18px 10px;
                    border-left-color: transparent !important;
                }
                $status-data: (1: #ffba00, 2: nth($default-color, 1), 3: #999);
                @each $status-key, $status-value in $status-data {
                    &.status_#{$status-key} {
                        background-color: $status-value;
                        &:before {
                            border-color: $status-value;
                        }
                    }
                }
            }
        }
        .author-info {
            padding: 1em;
            box-sizing: border-box;
            line-height: $face-size;
        }
    }
}

.list-group__course {
    .w-p-20 {
        width: 20%;
    }
    .list-group__item {
        .pic {
            height: 124px;
        }
        .info {
            padding: 0 1em;
            border-bottom: $box-border;
            box-sizing: border-box;
            line-height: 2;
            .item-title {
                font-size: 14px;
            }
            .price {
                color: #5fb41b;
            }
            .other-info {
                font-size: 12px;
                color: #999;
            }
        }
    }
}

.list-group__space {
    .list-group__header {
        .tab-group {
            $c: #999;
            margin-left: 30px;
            font-size: 14px;
            color: $c;

            .tab-group__item {
                display: inline-block;
                cursor: pointer;

                &.active {
                    color: nth($default-color, 1);
                }

                & + .tab-group__item {
                    &:before {
                        content: '/';
                        padding: 0 1em;
                        color: $c;
                        cursor: default;
                    }
                }
            }
        }
    }
    .list-group__item {
        $fs: 14px;
        $lh: 1.5;
        padding: 1em;
        font-size: 14px;
        line-height: $lh;
        .author-info {
            .face-box {
                $size: 75px;
                width: $size;
                height: $size;
                padding: 0 1em;

                .face {
                    width: $size;
                    height: $size;
                }
            }
            .item-title {
                font-size: 18px;
            }
            .item-belong {
                color: #bbb;
            }
        }
        .sign {
            width: 100%;
            height: $fs * $lh * 2;
        }
        .statis {
            margin: 1em 0 2em;
            line-height: 1;
            text-align: center;

            .statis-item {
                display: inline-block;
                width: 5em;

                .txt {
                    margin-top: 1em;
                    font-size: 12px;
                    color: #bbb;
                }

                & + .statis-item {
                    border-left: 1px solid #ddd;
                }
            }
        }
        .btn-group {
            margin: 1em 0 .5em;
            text-align: center;
            .i-form-button {
                $button-heigth: 34px;
                width: 90px;
                height: $button-heigth;
                line-height: $button-heigth - 2;
                border: 1px solid #dfdfdf;
                border-radius: $box-radiu;
                color: #666;
                background-color: #fff;

                &:hover {
                    border-color: nth($default-color, 1);
                    color: nth($default-color, 1);
                }

                &.is-plain {
                    border-color: nth($default-color, 1);
                    background-color: nth($default-color, 1);
                    color: #fff;

                    &:hover {
                        background-color: nth($default-color, 2);
                    }
                }

                & + .i-form-button {
                    margin-left: 30px;
                }
            }
        }
    }
}

.list-group__info {
    .list-group__main {
        padding: 15px;
        border-radius: $box-radiu;
        background-color: #fff;
        .banner {
            height: 318px;
            cursor: pointer;
        }
        .info-list {
            font-size: 14px;
            line-height: 2;
            list-style-type: disc;

            .info-list__item {
                list-style: inside disc;

                .item-title {
                    display: inline;
                    cursor: pointer;
                }
                .item-content {
                    display: none;
                    padding: .5em 0;
                    color: #999;
                    text-align: justify;
                    white-space: normal;
                }

                &.active {
                    $mar: .5em;
                    padding: 0 1em;
                    margin: $mar 0;
                    border-radius: 8px;
                    background-color: #f4f4f4;
                    list-style-type: none;

                    &:first-child {
                        margin: 0 0 #{$mar * 2};
                    }
                    &:last-child {
                        margin: #{$mar * 2} 0 0;
                    }

                    .item-title {
                        font-size: 20px;
                        &:hover {
                            color: nth($default-color, 1);
                        }
                    }
                    .item-content {
                        display: block;
                    }
                }
            }
        }
    }
}
</style>
<style lang='scss'>
    .banner-trigger__circle {
        .el-carousel__button {
            $circle-size: 12px;
            width: $circle-size;
            height: $circle-size;
            border-radius: 50%;
        }
    }
</style>