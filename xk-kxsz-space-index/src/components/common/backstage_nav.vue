<template>
	<nav id="nav" class="nav-list-box fl">
		<ul class="nav-group" v-for="(navItem, i) in navGroupList">
			<router-link class="nav-group-item" v-for="(item, j) in navItem" tag="li" :to="{ path: item.url }" :key="i">
				<i :class="['icon-admin-i-' + item.menuId]"></i>
				<span>{{item.name}}</span>
			</router-link>
		</ul>
		<ul class="nav-group" v-if="otherStage">
			<li class="nav-group-item" v-for="(item, key) in otherStage" v-if="key !== currentStage" @click="switchNav(key)">
				<i class="icon-admin-i-backstage"></i>
				<span>{{item.name}}</span>
			</li>
			<li class="nav-group-item" v-if="currentStage !== identity" @click="switchNav(identity)">
				<i class="icon-admin-i-backstage"></i>
				<span>个人空间</span>
			</li>
		</ul>
	</nav>
</template>

<script>
	import { loginInfo, userIdentity, permission } from '@/js/getUserInfo.js'
	export default {
		name: 'backstageNav',
		props: [],
		data () {
			return {
				navGroupList: [],
				navList: [],
				otherStage: {},
				currentStage: '',
				identity: ''
			}
		},
		created() {
			this.getUserPermissions()
			this.changeRoute()
		},
		watch: {
			'$route': 'changeRoute'
		},
		methods: {
			/*
			 * 后台菜单权限列表
			 * student: 学生, teacher: 教师, school: 学校, education: 教育局
			 */
			getUserPermissions() {
				// 未登录时
				if (loginInfo === null || permission === null) {
					return;
				}
				// 当前个人空间后台为该角色后台
				this.identity = userIdentity;
				this.currentStage = userIdentity;

				let permissions = permission[userIdentity];
				let permissionGroups = Object.values(permissions);

				this.navGroupList = permissionGroups;

				let navList = []
				permissionGroups.forEach(x => {
					navList = navList.concat(x)
				})
				this.navList = navList
			},
			switchNav(identity) {
				this.currentStage = identity;
				this.navGroupList = Object.values(permission[identity]);
			},
			/*
			 * 检测访问的路由是否在个人后台权限中
			 */
			changeRoute() {
				let _router = this.$route.path
				if (_router) {
					let _index = this.navList.findIndex(x => _router.includes(x.url))
					if (_index < 0) {
						this.$router.replace({path: this.navList[0].url})
					}
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
$padding-size: 20px;
.nav-list-box{
	width: 200px;
	margin-right: $padding-size;
	font-size: 14px;
	overflow: hidden;

	.nav-group {
		margin-bottom: $padding-size;
		background-color: #fff;

		.nav-group-item {
			line-height: 40px;
			text-indent: 25px;
			cursor: pointer;

			&:hover,
			&.active {
				background-color: $nav-bgc;
			}
			&.active {
				&,
				[class*="icon-admin-i-"],
				[class*=" icon-admin-i-"] {
					color: $default-color;
				}
			}

			[class*="icon-admin-i-"],
			[class*=" icon-admin-i-"] {
				font-size: 20px;
			    margin-right: 10px;
			}
		}
	}
}
</style>