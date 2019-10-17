<template>
    <div class="help-wrapper">
        <banner :banners="banners" :isStatic="true" :height="320"></banner>
        <h2 class="head-title">
            <span class="big">帮助中心</span>
            <small class="small">Help center</small>
        </h2>
        <section class="content container">
            <nav class="help-nav">
                <ul class="nav-box clearfix">
                   <router-link tag="li" :to="item.path" v-for="(item, i) in tabs" :key="i" class="nav-item fl">
                    {{item.label}}
                    </router-link>
                </ul>
            </nav>
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    import banner from '@/components/common/banner.vue'
    import banner01 from '@/assets/img/help/help_center.png'

    export default {
        name: 'helpCenter',

        data() {
            return {
                activeName: 0,
                banners: [banner01],
                tabs: [
                    { label: '常见问题', path: '/help/faq' },
                    { label: '帮助文档', path: '/help/doc' },
                    { label: '意见反馈', path: '/help/feedback' }
                ]
            }
        },

        created() {},

        components: {
            banner,
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';

.help-wrapper {
    margin-bottom: 40px;
    .head-title {
        text-align: center;
        margin: 60px 0 40px;
        .big {
            display: block;
            margin-bottom: 6px;
            font-size: 36px;
        }
        .small {
            font-size: 18px;
        }
    }
    .content {
        .nav-box {
            border-bottom: 1px solid #c9c9c9;
            .nav-item {
                padding: 0 20px 18px;
                font-size: 18px;
                color: #333;
                cursor: pointer;
                &.active {
                    border-bottom: 2px solid nth($default-color, 1);
                    margin-bottom: -1px;
                    color: nth($default-color, 1);
                }
                &:hover {
                    color: nth($default-color, 1);
                }
            }
        }
    }
}
</style>

