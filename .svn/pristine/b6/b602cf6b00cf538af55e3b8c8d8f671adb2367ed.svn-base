<template>
    <nav id="tabs" class="tabs-bar-header clearfix" :class="{'single-tab':tabs.length==1, 'highlight':router!==undefined}">
        <h6 v-if="title!==undefined" class="el-tabs__item tabs-title fl">详细数据</h6>
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane v-for="(item, index) in tabs" :key="index" :name="item.name">
                <span slot="label">
                    <el-badge v-if="item.badge" class="mark" :value="item.badge">{{item.name}}</el-badge>
                    <span v-else>{{item.name}}</span>
                </span>
            </el-tab-pane>
        </el-tabs>
<!--         <ul class="tabs-bar-item clearfix">
            <li class="tabs-bar-title" v-for="(item, index) in tabs" v-text="item.name" :class="{active:index==cur_tab}" @click="listenCurTab(index)"></li>
        </ul> -->
        <div class="tabs-right clearfix">
            <p v-if="count!=undefined" class="fl tabs-count">总计<span :class="['tabs-count-num-'+numColor]" v-text="total?total:0"></span>个{{count.name}}</p>
            <v-search v-if="is_search" class="fl tab-search"  @search="searchParam"></v-search>
            <slot name="tab-btns">
              <div class="tab-btns fl" v-if="btns != undefined">
                <router-link v-for="(btn,index) in btns" :to="btn.url" :key="index">{{btn.name}}</router-link>
              </div>
            </slot>
            <!--<div class="tab-btns fl" v-if="btns != undefined">-->
                <!--<router-link v-for="(btn,index) in btns" :to="btn.url" :key="index">{{btn.name}}</router-link>-->
            <!--</div>-->
            <a v-if="more!=undefined" class="fl tabs-btn-more" @click="linkTo">更多&gt;&gt; </a>
        </div>
    </nav>
</template>

<script>
import search from '@/components/common/search.vue'

export default {
    name: 'tabs',
    data() {
        return {
            activeName: this.tabs ? (this.tabs[0] || {}).name : '',
            search: '',
            numColor: 'lightBlue'
        }
    },
    props: [
        'tabs',
        'cur_tab',
        'title',
        'more',
        'count',
        'is_search',
        'router',
        'btns',
        'total'
    ],
    components: {
        'v-search': search
    },
    mounted() {
        if (this.count !== undefined && this.count.color !== undefined) {
            this.numColor = this.count.color
        }
        this.initTab()
    },
    methods: {
        initTab() { // 初始化
            if (this.cur_tab !== undefined) {
                this.activeName = this.tabs[this.cur_tab].name
            }
            if (this.router !== undefined && this.router.path !== undefined && this.$route.path.indexOf(this.router.path + '/') >= 0) {
                const _model = this.$route.path.substring(this.router.path.length + 1)
                // const _flag = true
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].type === _model || _model.startsWith(this.tabs[i].type)) {
                        this.activeName = this.tabs[i].name
                        this.listenCurTab('cur_tab', i)
                        // _flag = false
                        break
                    }
                }
                // if (_flag) { // 刷新页面如果没有找到对应的TAB，则跳转到上一级路由
                //     this.$router.replace(this.router)
                // }
            }
        },
        searchParam(val) {
            this.search = val
            this.$emit('searchVal', this.search)
        },
        tabClick(tab, event) {
            if (this.router !== undefined) {
                this.switchTab(tab, event)
            } else {
                this.listenCurTab(tab, event)
            }
        },
        listenCurTab(tab) {
            this.$emit('cur_tab', tab.index)
        },
        switchTab(tab, event) {
            const _route = Object.assign({}, this.router)
            _route.path = this.router.path + '/' + this.tabs[tab.index].type
            this.$router.push(_route)
            this.listenCurTab(tab, event)
        },
        linkTo() {
            const _route = Object.assign({}, this.more)
            const _curTab = this.cur_tab === undefined ? 0 : this.cur_tab
            if (this.more.path.includes(':')) {
                const _params = _route.path.match(/:\w+/)[0]
                if (this.more.params !== undefined) {
                    _route.params = { [this.more.params]: this.tabs[_curTab].type }
                    if ((':' + this.more.params) === _params) {
                        _route.path = _route.path.replace(_params, this.tabs[_curTab].type)
                    }
                }
                _route.query = { id: this.$route.query.id }
            }
            if (this.more.query !== undefined) {
                _route.query = { [this.more.query]: this.tabs[_curTab].type, id: this.$route.query.id }
            }
            this.$router.push(_route)
        }
    },
    watch: {
        tabs: { // 需要动态增加TAB
            handler() {
                this.initTab()
            },
            deep: true
        },
        '$route.path'(to) {
            if (to === `${this.router.path}/${this.tabs[0].type}`) {
                this.initTab()
            }
        }
    }
}
</script>

<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
.tabs-bar-header {
    background-color: #fff;
    &.single-tab .el-tabs__item.is-active {
        cursor: default;
    }
    .el-tabs__header {
        // height: 42px;
        border-bottom: 1px solid #c9c9c9;
        margin: 0 0 12px;
    }
    .el-tabs__active-bar {
        height: 2px;
    }
    .el-tabs__item {
        color: #999;
        font-size: 16px;

        &:hover {
            color: inherit;
        }
    }
    .mark {
        .el-badge__content.is-fixed {
            transform: scale(0.8) translate(150%, 0);
        }
    }
}
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .tabs-bar-header {
            .el-tabs__active-bar {
                background-color: $color-value;
            }
            .el-tabs__item.is-active {
                color: $color-value;
            }
            &.highlight {
                .el-tabs__item{
                    color: #3e3e3e;

                    &.is-active {
                        color: $color-value;
                    }
                }
            }
            .tab-btns {
                    a {
                        background-color: $color-value;
                        &:hover {
                            opacity: 0.75;
                        }
                    }
                }
        }
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/tabs.scss';
@import '~@/assets/css/scss/cols.scss';
</style>
