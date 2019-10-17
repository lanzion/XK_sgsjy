<template>
    <div class="space_index">
		<div class="filter-tabs clearfix">
			<span class="fl tabs-tit">筛选：</span>
			<nav class="tabs-box">
				<ul class="tabs-group clearfix">
					<li class="tabs-item fl" v-for="(item, index) in nav" :key="index" :class="{active: activeNavIndex==index}"><a href="javaScript:;" :title="item.name" @click="toggleTabs(item, index)">{{item.name}}</a></li>
				</ul>
			</nav>
		</div>
		<component :is="nav[activeNavIndex].component" :class="{'border-box': nav.length>1}"></component>
	</div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import teacher from './children/teacher.vue'
    import student from './children/student.vue'
    import edu from './children/edu.vue'
    import school from './children/school.vue'
    import clazs from './children/clazs.vue'
    import interest from './children/interest.vue'
    import studio from './children/studio.vue'
    import model from './children/model.vue'

    export default {
        name: 'space_index',
        components: {
            'v-teacher': teacher,
            'v-student': student,
            'v-edu': edu,
            'v-school': school,
            'v-clazs': clazs,
            'v-interest': interest,
            'v-studio': studio,
            'v-model': model
        },
        data() {
            return {
                nav: [
                    { name: '教师', type: 'teacher', component: 'v-teacher' },
                    { name: '学生', type: 'student', component: 'v-student' },
                    { name: '教育局', type: 'edu', component: 'v-edu' },
                    { name: '学校', type: 'school', component: 'v-school' },
                    { name: '班级', type: 'clazs', component: 'v-clazs' },
                    { name: '兴趣组', type: 'interest', component: 'v-interest' },
                    // { name: '导师工作室', type: 'studio', component: 'v-studio' },
                    // { name: '示范校', type: 'model', component: 'v-model' }
                ],
                activeNavIndex: 0,
            }
        },
        computed: {
            ...mapState({
                spaceType: state => state.globalSearch.spaceType
            })
        },
        mounted() {
            if (!this.$ls.get('spaceType')) {
                this.setSpaceType(0)
            } else {
                this.setSpaceType(this.$ls.get('spaceType'))
            }
            this.activeNavIndex = Number(this.$ls.get('spaceType'))
        },
        methods: {
            ...mapActions('globalSearch', ['setSpaceType']),
            toggleTabs(item, index) {
                this.setSpaceType(index)
                this.activeNavIndex = index
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .space_index {
    	.filter-tabs {
    		height: 33px;
    		line-height: 33px;
    		font-size: 16px;
    		margin: 18px 0;
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