<template>
	<header class="list-head">
		<h4 class="title">{{title}}</h4>
		<sub class="subTitle" v-if="subTitle != ''">{{subTitle}}</sub>
	</header>
</template>

<script>
    export default {
        name: 'list_head',
        data() {
            return {}
        },
        props: {
            title: {
                type: String,
                default: '无标题'
            },
            subTitle: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
	.list-head {
		margin: 20px 0px;
		text-align: center;
		.title {
			font-size: 28px;
			color: #3e3e3e;
			margin-bottom: 2px;
		}
		.subTitle {
			font-size: 20px;
			color: #999;
			position: relative;
			&:before {
				content: "";
				width: 90px;
				height: 1px;
				background-color: #999;
				position: absolute;
				top: 50%;
				left: -100px;
			}
			&:after {
				content: "";
				width: 90px;
				height: 1px;
				background-color: #999;
				position: absolute;
				top: 50%;
				right: -100px;
			}
		}
	}
</style>