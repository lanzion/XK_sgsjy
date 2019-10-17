<template>
    <nav class="nav fl">
        <router-link v-for="(item, index) in navLink" :to="item.path" :key="index" class="nav-link">
            {{item.name}}
            <ul v-if="index === navLink.length - 1" class="context-menu-list pa">
                <router-link tag="li" :to="sub.path" v-for="(sub, i) in item.subs" :key="i" class="context-menu-item">
                    {{sub.label}}
                </router-link>
            </ul>
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: 'banner',

        data() {
            return {
                navLink: [
                    { name: '首页', path: '/index' },
                    { name: '产品中心', path: '/product' },
                    { name: '解决方案', path: '/solution' },
                    // { name: '新闻动态', path: '/news' },
                    {
                        name: '关于我们',
                        path: '/about',
                        subs: [
                            {
                                label: '关于我们',
                                path: '/about/us',
                            },
                            {
                                label: '公司产品',
                                path: '/about/ours',
                            },
                        ]
                    },
                ],
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .nav
        width: 600px
        height: 65px
        margin-left: 64px
        font-size: 0
        .nav-link
            display: inline-block
            padding: 25px 16px 15px 16px
            font-size: 16px
            color: #fefefe
            border-bottom: 2px solid transparent
            &.router-link-active
            &:hover
                border-bottom-color: @color
            & + .nav-link
                margin-left: 32px
            &:last-child
                position: relative
                $red=#f13a3a
                .context-menu-list
                    display: none
                    top: 100%
                    left: 7%
                    z-index: 99
                    padding-top: 14px
                    &:before
                        position: absolute
                        left: 46%
                        top: 12%
                        content: " "
                        transform: rotate(45deg)
                        border: 4px solid $red
                        border-right-color: t=transparent
                        border-bottom-color: t
                    .context-menu-item
                        box-sizing: border-box
                        width: 84px
                        height: 40px
                        line-height: @height
                        cursor: pointer
                        background-color: $red
                        font-size: 14px
                        color: #fff
                        text-align: center
                        &.router-link-active
                        &:hover
                            border-bottom: 1px solid #fff
                &:hover
                    .context-menu-list
                        display: block
</style>
