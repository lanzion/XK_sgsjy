<template>
    <div class="education-wrapper">
        <el-popover v-model="menuIsVisible" ref="menuPop" trigger="hover" :visible-arrow="false" width="216"
                                popper-class="menu-edu__popover">
            <menu class="menu-edu">
                <ul v-for="(field, index) in fieldData" :key="index">
                    <li class="field-item">
                        <p class="title">
                            <a @click="linkTo({index: [index + 1], idArr: [field.id]})" class="field-link"
                                 href="javascript:;">{{field.name}}</a>
                        </p>
                        <ul>
                            <li v-for="(child, i) in field.children" :key="i" class="sub-field">
                                <a @click="linkTo({index: [index + 1, i + 1], idArr: [field.id, child.id]})" class="sub-field-link"
                                     href="javascript:;">{{child.name}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </menu>
        </el-popover>
        <nav class="nav-edu">
            <div class="container">
                <el-button v-popover:menuPop class="btn-whole pr">
                    <i class="icon-i-list pa"></i>
                    <a @click="linkTo()" href="javascript:;" style="color: #fff;">全部{{dynamicTxt}}</a>
                </el-button>
                <!-- <router-link v-for="(item, index) in navLink" :to="item.url" :key="index" class="nav-link">{{item.name}}
                </router-link> -->
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapMutations, mapActions, mapState } from 'vuex'
    import { getNavList } from '@/mixin/getNavList.js'

    export default {
        name: 'education', // 创客教育

        mixins: [getNavList],

        data () {
            return {
                menuIsVisible: false,
                module: '',
                navLink: [
                    {name: '项目学习', url: '/education/project'},
                    {name: '课程学习', url: '/education/course'},
                 {name: '网上实训室', url: '/education/train'},
                ],
            }
        },

        computed: {
            ...mapState('dataDictionary', {
                fieldData (state) {
                    return state[this.module]
                }
            }),

            dynamicTxt () {
                return this.module === 'project'
                    ? '项目'
                    : this.module === 'course'
                        ? '课程' : '实训'
            }
        },

        beforeRouteUpdate (to, from, next) {
            this.init(to.path)
            next()
        },

        created () {
            this.init(this.$route.path)
            this.getNavList('课程与学习')
        },

        methods: {
            ...mapActions('dataDictionary', {requestData: 'getData'}),

            ...mapMutations('edu', ['setSelectedField']),

            init (path) {
                const [, , module] = path.split('/')
                this.module = module
                this.requestData({model: this.module})
            },

            linkTo (options = {}) {
                const path = `/education/${this.module}/list`
                this.setSelectedField(options)
                this.$router.push(path)
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/asset/scss/vars.scss";

    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .education-wrapper {
                .nav-edu {
                }
                .btn-whole {
                }
                .nav-link.active {
                    /*color: $color-value;
                    border-bottom-color: $color-value;*/
                }
                .btn-refresh:hover {
                    color: $color-value;
                    .icon-btn-refresh {
                        color: $color-value;
                    }
                }
            }
        }
    }

    .menu-edu__popover.el-popover[x-placement^=bottom] {
        margin-top: 0;
        padding: 0;
        background: rgba(255, 255, 255, .8);
    }

    .education-wrapper .list-group {
        margin-top: 20px;
        &:first-child {
            margin-top: 30px;
        }
        .list-group__title {
            line-height: 36px;
            font-size: 14px;
            border-bottom: 1px solid #e0e0e0;
            .font-large {
                margin-right: 12px;
                font-size: 24px;
            }
            .btn-refresh {
                font-size: 16px;
            }
            .icon-btn-refresh {
                margin-right: 6px;
            }
        }
        #list {
            margin-top: 10px;
        }
        .list-item__box {
            &:hover {
                box-shadow: 0 5px 15px #d9d9d9;
            }
            .list-item-title {
                line-height: 1.5;
                margin: 6px 0;
                font-size: 12px;
            }
        }
    }
</style>
<style lang="scss" scoped>
    @import '~@/asset/scss/vars.scss';

    .menu-edu {
        .field-item {
            padding: 10px 20px;
            border-bottom: 1px solid #e6e6e6;
            &:hover {
                background-color: #fff;
            }
        }
        .title {
            font-size: 16px;
        }
        .sub-field {
            display: inline-block;
            margin-right: 20px;
            font-size: 12px;
        }
        .field-link:hover, .sub-field-link:hover {
            color: $default-color;
        }
    }

    .education-wrapper {
        .nav-edu {
            font-size: 0;
            background-color: $default-color;
        }
        .btn-whole {
            box-sizing: border-box;
            width: 216px;
            height: 100%;
            line-height: 48px;
            font-size: 18px;
            color: #fff;
            background-color: #0a70b0;
            padding: 0;
            .icon-i-list {
                top: 11px;
                left: 20px;
                &:before {
                    font-size: 26px;
                    color: #fff;
                }
            }
        }
        .nav-link {
            display: inline-block;
            font-size: 16px;
            padding: 16px 20px;
            color: #fff;
            &.active {
                background-color: $default-hl-color;
                color: #fff;
            }
        }
    }

    @each $color-key, $color-value in $color-data-set {
        .theme-#{$color-key} {
            .education-wrapper {
                .nav-edu {
                    background-color: nth($color-value, 1);
                }
                .nav-link {
                    &.active {
                        background-color: nth($color-value, 2);
                    }
                }
            }
        }
    }
</style>
