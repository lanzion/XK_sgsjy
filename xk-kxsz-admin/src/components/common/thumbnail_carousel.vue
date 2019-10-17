<template>
	<div class="thu_carsou">
		<el-carousel height='313px' :autoplay="false" @change="changeBanner" ref="banner">
            <el-carousel-item v-for='(item, index) in imgs' :key="index">
                <div class='banner-img' title="点击查看原图" @click="visible.show = true" :style='{"background-image": "url(" +getFileUrl(item)+ ")"}'></div>
            </el-carousel-item>
        </el-carousel>
        <div class="thu-pic-box clearfix">
        	<div class="pre fl" @click="changePre"><i class="el-icon-arrow-left"></i></div>
        	<div class="fl pic-box clearfix">
        		<div class="img-box fl" v-for='(item, index) in imgs' :key="index">
        			<div class='thu-img' v-bind:class="{active: index === activeIndex}" :style='{"background-image": "url(" +getFileUrl(item)+ ")"}' @click="setActiveBanner(index)"></div>
        		</div>
        	</div>
        	<div class="next fr" @click="changeNext"><i class="el-icon-arrow-right"></i></div>
        </div>
        <img-preview :visible.sync="visible" :imgs="imgs" :initIndex="activeIndex" :ifCarousel="true"></img-preview>
	</div>
</template>

<script>
    import imgPreview from '@/components/common/img_preview/img_preview.vue'

    export default {
        data() {
            return {
                activeIndex: 0,
                visible: { // 查看大图的控制
                    show: false
                }
            }
        },
        components: {
            'img-preview': imgPreview
        },
        props: {
            imgs: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            changeBanner(index) {
                this.activeIndex = index
            },
            setActiveBanner(index) {
                this.activeIndex = index
                this.$refs.banner.setActiveItem(index)
            },
            changePre() {
                if (this.activeIndex === 0) {
                    this.activeIndex = this.imgs.length - 1
                } else {
                    this.activeIndex--
                }
                this.$refs.banner.setActiveItem(this.activeIndex)
            },
            changeNext() {
                if (this.activeIndex === this.imgs.length - 1) {
                    this.activeIndex = 0
                } else {
                    this.activeIndex++
                }
                this.$refs.banner.setActiveItem(this.activeIndex)
            }
        }
    }
</script>

<style lang="scss" scoped>
	.thu_carsou {
		width: 82%;
		margin: 0 auto;
		.el-carousel__item .banner-img {
	        height: 100%;
	    	background-position: center;
	    	background-size: cover;
	    }
		.thu-pic-box {
			margin-top: 10px;
			height: 58px;
			width: 100%;
			.pre,.next {
				height: 58px;
				line-height: 58px;
				text-align: center;
				width: 16px;
				background-color: #dfdfdf;
				cursor: pointer;
				&:hover {
					color: #2797ed;
					opacity: 0.75;
				}
			}
			.pre {
				margin-right: 10px;
			}
			.next {
				margin-left: 10px;
			}
			.pic-box {
				width: 93%;
				height: 58px;
				margin-right: -5px;
				margin-left: -5px;
				.img-box {
					width: 20%;
					padding: 0 5px;
					height: 100%;
					box-sizing: border-box;
					.thu-img {
						width: 100%;
						height: 100%;
						background-position: center;
		    			background-size: cover;
		    			opacity: 0.5;
		    			&.active {
		    				opacity: 1;
		    			}
		    			&:hover {
		    				opacity: 1;
		    			}
					}
				}
			}
		}
	}
</style>