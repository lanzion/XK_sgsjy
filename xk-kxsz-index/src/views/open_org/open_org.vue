<template>
	<div class="open_org container">
		<el-breadcrumb class="breadcrumbs" separator=">">
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
                $h: 54px;
            	cursor: pointer;
            	display: inline-block;
                width: 250px;
                height: $h;
                line-height: $h;
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
                        position: absolute;
                        content: '';
                        top: 100%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        margin-left: -10px;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 12px solid nth($default-color, 1);
                    }
                }
            }
        }
    }
</style>