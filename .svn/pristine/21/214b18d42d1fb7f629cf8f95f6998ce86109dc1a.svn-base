<template>
	<div class="open_org container">
		<el-breadcrumb separator=">">
  			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  			<el-breadcrumb-item>开通学校/教育局</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="open-wrap bgw">
			<nav class="top-nav">
                <ul class="nav-box clearfix">
                   <router-link tag="li" :to="item.path" v-for="(item, i) in tabs" :key="i" class="nav-item">
                    {{item.label}}
                    </router-link>
                </ul>
            </nav>
            <router-view></router-view>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'open_org',
        data() {
            return {
                tabs: [
                    { label: '申请开通', path: '/open/apply' },
                    { label: '进度查询', path: '/open/rate' },
                ]
            }
        }
    }
</script>

<style lang="scss">
	.open_org {
		.el-breadcrumb {
			padding: 25px 0;
		}
	}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
	.open-wrap {
		padding: 50px 30px;
	}
    .top-nav {
        .nav-box {
            margin-bottom: 30px;
            text-align: center;
            .nav-item {
            	cursor: pointer;
            	display: inline;
                padding: 15px 86px;
                line-height: 54px;
                font-size: 18px;
                color: #333;
                border-radius: 5px;
                background-color: #dfdfdf;
                &:first-child {
                	border-top-right-radius: 0;
                	border-bottom-right-radius: 0;
                }
                &:last-child {
                	border-top-left-radius: 0;
                	border-bottom-left-radius: 0;
                }
                &.active {
                    background-color: nth($default-color, 1);
                    color: #fff;
                    position: relative;
                    &:after {
                    	content: '';
                    	display: inline-block;
                        width: 15px;
                        height: 15px;
                        background-color: nth($default-color, 1);
                        position: absolute;
                        bottom: -8px;
                        left: 46%;
                        transform: rotate(45deg);
						-ms-transform: rotate(45deg);		/* IE 9 */
						-webkit-transform: rotate(45deg);	/* Safari and Chrome */
						-o-transform: rotate(45deg);		/* Opera */
						-moz-transform: rotate(45deg);		/* Firefox */
                    }
                }
            }
        }
    }
</style>