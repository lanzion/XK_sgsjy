<template>
    <nav id="tabs" class="tabs-bar-header clearfix" :class="{'single-tab':tabs.length==1, 'highlight':router!==undefined}">
        <h6 v-if="title!==undefined" class="el-tabs__item tabs-title fl">详细数据</h6>
        <el-tabs v-model="activeName" @tab-click="switchTab" v-if="router!==undefined">
            <el-tab-pane v-for="(item, index) in tabs" :label="item.name" :key="index" :name="item.name"></el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName" @tab-click="listenCurTab" v-else-if="tabs.length > 0">
            <el-tab-pane v-for="(item, index) in tabs" :label="item.name" :key="index" :name="item.name"></el-tab-pane>
        </el-tabs>
<!--         <ul class="tabs-bar-item clearfix">
            <li class="tabs-bar-title" v-for="(item, index) in tabs" v-text="item.name" :class="{active:index==cur_tab}" @click="listenCurTab(index)"></li>
        </ul> -->
        <div class="tabs-right clearfix">
            <p v-if="count!=undefined" class="fl tabs-count">总计<span :class="['tabs-count-num-'+count.color]" v-text="total?total:0"></span>个{{count.name}}</p>
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
export default {
    name: 'tabs',
    data() {
        return {
            activeName: this.tabs ? (this.tabs[0] || {}).name : ''
        }
    },
    props: [
        'tabs',
        'cur_tab',
        'title',
        'more',
        'count',
        'router',
        'btns',
        'total'
    ],
    mounted() {
        this.initTab()
    },
    methods: {
        initTab() { // 初始化
            if (this.cur_tab !== undefined) {
                this.activeName = this.tabs[this.cur_tab].name
            }
            if (this.router !== undefined && this.router.path !== undefined && this.$route.path.indexOf(this.router.path + '/') >= 0) {
                const _model = this.$route.path.substring(this.router.path.length + 1)
                let _flag = true
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].type === _model || _model.startsWith(this.tabs[i].type)) {
                        this.activeName = this.tabs[i].name
                        this.listenCurTab('cur_tab', i)
                        _flag = false
                        break
                    }
                }
                if (_flag) { // 刷新页面如果没有找到对应的TAB，则跳转到上一级路由
                    this.$router.replace(this.router)
                }
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
                _route.query = {
                    [this.more.query]: this.tabs[_curTab].type,
                    id: this.$route.query.id
                }
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
