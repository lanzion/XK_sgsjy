<template>
    <section class="banner">
        <el-carousel :height="`${height}px`" :class="{'is-single': banners.length==1}">
            <el-carousel-item v-for='(item, index) in banners' :key="index">
                <div class='banner-img' :style='{"background-image": "url(" + (isStatic ? item : getFileUrl(item)) + ")"}'></div>
            </el-carousel-item>
        </el-carousel>
    </section>
</template>

<script>
    export default {
        name: 'banner',

        data() {
            return {
                curIndex: 0,
            }
        },

        props: {
            banners: {
                type: Array,
                default() {
                    return []
                }
            },
            isStatic: {
                type: Boolean,
                default() {
                    return false
                }
            },
            height: {
                type: Number,
                default() {
                    return 570
                }
            }
        },

        methods: {
            handleCarouselChange(idx) {
                this.curIndex = idx
            },
        },
    }
</script>

<style lang="scss">
    .el-carousel__item .banner-img {
        height: 100%;
        background-position: center;
        background-size: cover;
    }
</style>
