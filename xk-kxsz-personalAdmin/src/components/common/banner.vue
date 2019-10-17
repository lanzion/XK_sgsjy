<template>
    <section class="banner">
        <el-carousel :height="`${height}px`" :arrow="arrow" :class="{'is-single': banners.length==1}">
            <el-carousel-item v-for='(item, index) in banners' :key="index">
                <template v-if="isStatic">
                    <div class='banner-img' :style='{"background-image": "url(" + item + ")"}'</div>
                </template>
                <template v-else>
                    <a class='banner-img' :href="item.url" :style='{"background-image": "url(" + getFileUrl(item.imageUrl) + ")"}'></a>
                </template>
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
            },
            arrow: {
                type: String,
                default() {
                    return 'never'
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
        display: block;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
    }
</style>
<style lang="scss" scoped>
    .banner {
        width: 100%;
    }
</style>
