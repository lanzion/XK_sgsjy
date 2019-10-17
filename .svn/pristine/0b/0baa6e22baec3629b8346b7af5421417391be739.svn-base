<template>
    <div class="activity_index">
		<div class="filter-tabs clearfix">
			<span class="fl tabs-tit">筛选：</span>
			<nav class="tabs-box">
				<ul class="tabs-group clearfix">
					<li class="tabs-item fl" v-for="(item, index) in nav" :key="index" :class="{active: activeNavIndex===index}"><a href="javaScript:;" :title="item.name" @click="toggleTabs(item, index)">{{item.name}}</a></li>
				</ul>
			</nav>
		</div>
		<component :is="nav[activeNavIndex].component" :class="{'border-box': nav.length>1}"></component>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
    import activity from './activity.vue'
    import contest from './contest.vue'

    export default {
        name: 'activity_index',
        components: {
            'v-contest': contest,
            'v-activity': activity
        },
        data() {
            return {
                nav: [
                    { name: '竞赛', type: 'contest', component: 'v-contest' },
                    { name: '活动', type: 'activity', component: 'v-activity' },
                ],
                activeNavIndex: 0,
            }
        },
        mounted() {
            if (!this.$ls.get('activityType')) {
                this.setActivityType(0)
            } else {
                this.setActivityType(this.$ls.get('activityType'))
            }
            this.activeNavIndex = Number(this.$ls.get('activityType'))
        },
        methods: {
            ...mapActions('globalSearch', ['setActivityType']),
            toggleTabs(item, index) {
                this.setActivityType(index)
                this.activeNavIndex = index
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .activity_index {
    	.filter-tabs {
    		height: 33px;
    		line-height: 33px;
    		font-size: 16px;
    		margin-top: 18px;
    		.tabs-tit {
    			color: #999;
    		}
    		.tabs-box {
    			color: #333;
    			.tabs-item {
    				padding: 0px 18px;
    				margin: 0 10px;
    				&:hover {
    					a {
    						color: $theme-color;
    					}
    				}
    				&.active {
    					border-radius: $button-radiu;
    					background-color: $theme-color;
    					a {
    						color: #fff;
    					}
    				}
    			}
    		}
    	}
    }
</style>