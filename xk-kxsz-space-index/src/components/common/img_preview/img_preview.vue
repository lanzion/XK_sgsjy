<template>
	<div class="view-box" v-if="visible.show" @click="closeView">
        <span class="icon-btn-close2 close" title="关闭"></span>
		<el-carousel :height="`${fullHeight}px`" :interval="5000" ref="img" indicator-position="none" :autoplay="false" v-if="ifCarousel">
            <el-carousel-item v-for='(item, index) in imgs' :key="index">
                <img :src="getFileUrl(item.resourceId) || listDefault" class="imgs" title="点击返回">
            </el-carousel-item>
        </el-carousel>
        <img v-else :src="getFileUrl(imgUrl) || listDefault" class="imgs" title="点击返回">
	</div>
</template>

<script>
    export default {
        name: 'img_preview',
        data() {
            return {
                fullHeight: document.documentElement.clientHeight,
                curIndex: 0
            }
        },
        props: {
            visible: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            },
            imgs: { // 查看轮播图时要传
                type: Array,
                default() {
                    return []
                }
            },
            initIndex: { // 当前查看的轮播图的索引，查看轮播图时要传
                type: Number,
                default: 0
            },
            ifCarousel: { // 判断是不是查看轮播图，默认false, 查看轮播图要传true
                type: Boolean,
                default: false
            },
            imgUrl: {
                type: String, // 查看单张图片要传
                default: ''
            }
        },
        watch: {
            'visible.show': {
                handler: function (val) {
                    if (val) {
                        if (this.ifCarousel) {
                            const self = this
                            window.setTimeout(function () {
                                self.$refs.img.setActiveItem(self.initIndex)
                            }, 200)
                        }
                        const scroll = function (e) {
                            e.preventDefault()
                        }
                        document.body.style.overflow = 'hidden'
                        document.addEventListener('scroll', scroll, false)
                    } else {
                        const scroll = function (e) {
                            e.preventDefault()
                        }
                        document.body.style.overflow = ''
                        document.removeEventListener('scroll', scroll, false)
                    }
                },
                deep: true
            }
        },
        created() {
            document.addEventListener('resize', this.handleResize)
        },
        beforeDestroy() {
            document.removeEventListener('resize', this.handleResize)
        },
        methods: {
            closeView() {
                this.visible.show = false
            },
            handleResize() {
                this.fullHeight = document.documentElement.clientHeight
            }
        }
    }
</script>

<style lang="scss">
	.view-box {
		.el-carousel__item {
			text-align: center;
			overflow: auto;
		}
	}
</style>

<style lang="scss" scoped>
	.view-box {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: auto;
		background-color: rgba(0,0,0,0.65);
		z-index: 2001;
        .close{
            position: absolute;
            top: 25px;
            right: 25px;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            z-index: 2002;
            &:hover {
                color: #23b8ff;
            }
        }
		.imgs {
			// position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
            // -ms-transform: translate(-50%, -50%); /* IE 9 */
            // -webkit-transform: translate(-50%, -50%); /* Safari and Chrome */
            // -o-transform: translate(-50%, -50%); /* Opera */
            // -moz-transform: translate(-50%, -50%); /* Firefox */
            // max-width: 90%;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            max-width: 92%;
            max-height: 92%;
		}
	}
</style>