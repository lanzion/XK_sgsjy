<template>
	<div class="find_pwd" style="padding-top: 0px!important">
		<!-- 头部面包屑 -->
		<div class="head-break">
			<el-breadcrumb separator=">">
			  	<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  	<el-breadcrumb-item>找回密码</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 找回步骤 -->
		<section class="step-box">
			<el-steps :space="150" :active="curStep">
  				<el-step title="选择找回方式"></el-step>
  				<el-step title="验证账号"></el-step>
 				<el-step title="设置新密码"></el-step>
 				<el-step title="完成"></el-step>
			</el-steps>
		</section>
		<!-- 主题内容 -->
		<section class="find-way" id="find-way" v-if="curStep === 1">
	        <nav class="sub-nav">
	            <a class="sub-nav-item" v-for="(item, index) in tabs" :class="{'is-active': curTabs == index}" @click="toggleTabs(item, index)">{{item.title}}</a>
	        </nav>
	        <component :is="tabs[curTabs].component" @setStep="setStep" class="border-box"></component>
	    </section>
        <!-- 验证账号 -->
	    <section class="find-way" id="find-way" v-if="curStep === 2">
	        <nav class="sub-nav">
	            <a class="sub-nav-item is-active">{{title}}</a>
	        </nav>
	        <component is="verify-account" :findWay="curTabs" @setStep="setStep" class="border-box"></component>
	    </section>
        <!-- 设置新密码 -->
        <section class="find-way" id="find-way" v-if="curStep === 3">
            <nav class="sub-nav">
                <a class="sub-nav-item is-active">{{title}}</a>
            </nav>
            <component is="set-pwd" @setStep="setStep" class="border-box"></component>
        </section>
        <!-- 完成 -->
        <section class="find-way" id="find-way" v-if="curStep === 4">
            <nav class="sub-nav">
                <a class="sub-nav-item is-active">{{title}}</a>
            </nav>
            <component is="set-complete" :findWay="curTabs" class="border-box"></component>
        </section>
	</div>
</template>

<script>
    import vByEmail from '@/components/find_pwd/find_by_email.vue'
    import vByPhone from '@/components/find_pwd/find_by_phone.vue'
    import verifyAccount from '@/components/find_pwd/verify_account.vue'
    import setPwd from '@/components/find_pwd/setNewPwd.vue'
    import setComplete from '@/components/find_pwd/set_complete.vue'

    export default {
        name: 'find_pwd',
        components: {
            'v-by-email': vByEmail,
            'v-by-phone': vByPhone,
            'verify-account': verifyAccount,
            'set-pwd': setPwd,
            'set-complete': setComplete
        },
        data() {
            return {
                tabs: [
                    {
                        title: '通过邮箱找回密码',
                        component: 'v-by-email',
                    },
                    {
                        title: '手机验证码找回',
                        component: 'v-by-phone',
                    }
                ],
                curTabs: 0,
                curStep: 1,
                title: '通过邮箱找回密码'
            }
        },
        methods: {
            // 切换邮箱手机验证
            toggleTabs(item, index) {
                const titleType = {
                    0: '通过邮箱找回密码',
                    1: '手机验证码找回'
                }
                this.curTabs = index
                this.title = titleType[this.curTabs]
            },
            setStep(steps) {
                this.curStep = steps
            }
        }
    }
</script>

<style lang="scss">
    .find_pwd {
		.head-break {
			.el-breadcrumb {
				line-height: 52px;
				padding-left: 32px;
				font-size: 16px;
			}
		}
		.step-box {
			.el-steps {
				margin: 60px auto;
    			width: 441px;
                .el-step:nth-child(1) {
                    .el-step__main {
                        margin-left: -26px!important;
                    }
                }
                .el-step:nth-child(2) {
                    .el-step__main {
                        margin-left: -12px!important;
                    }
                }
                .el-step:nth-child(3) {
                    .el-step__main {
                        margin-left: -18px!important;
                    }
                }
                .el-step:nth-child(4) {
                    .el-step__main {
                        margin-left: 2px!important;
                    }
                }
			}
		}
	}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';

	.find_pwd {
		width: 1198px;
		height: 1058px;
		margin: 0 auto;
		margin-top: 94px;
		margin-bottom: 40px;
		padding-top: 0px !important;
		border: 1px solid #c9c9c9;
		.head-break {
			width: 100%;
			height: 52px;
			border-bottom: 1px solid #c9c9c9;
			background-color: #e0f2fc;
		}
	}


.find-way{
    padding: 5px 110px 15px;
}
.sub-nav {
    background-color: #f6f6f6;
    font-size: 14px;
    border: 1px solid #c9c9c9;
    margin-bottom: -1px;

    .sub-nav-item {
        display: inline-block;
        line-height: 40px;
        padding: 0 1em;
        margin: 0 -1px -1px;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;

        &.is-active {
            border-color: #c9c9c9;
            background-color: #fff;
        }
    }
}
.border-box {
    border: 1px solid #c9c9c9;
}
.btn {
    margin-right: 20px;
    line-height: 40px;
    font-size: 14px;
}
.btn:hover{
    color: $default-color;
}
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .sub-nav {
            .sub-nav-item {
                &.is-active {
                    color: $color-value;
                }
            }
        }
    }
}
</style>