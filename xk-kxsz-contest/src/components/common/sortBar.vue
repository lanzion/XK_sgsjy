<template>
	<div id="sort_bar">
		<ul class="sort-bar clearfix">
			<li class="sort-bar-item unSelectable" v-for="(item, index) in sortBarData" @click="changeSortType(index); changeSort(desc, index)" :class="{active: curItem==index}">
				{{ item.name }}
				<span class="icon-btn-i-sort" v-if="!item.default" :class="{'desc': curItem==index && desc==0, 'asc': curItem==index && desc==1}">
	            	<span class="path1"></span><span class="path2"></span>
	            </span>
			</li>
		</ul>
	</div>
</template>

<script>
    export default {
        name: 'sort_bar',
        data() {
            return {
                curItem: 0,  // 当前选中排序选项
                desc: -1    // 排序  1: 升序, 0: 降序, -1: 不排序
            }
        },
        props: {
            /*
            * { name: '综合', model: 'composite', default: true},- default 默认，不排序
            * { name: '学习', model: 'study'}
            */
            sortBarData: {
                type: Array,
                default: []
            },
            changeSort: Function
        },
        methods: {
            changeSortType(index) {
                if (this.sortBarData[index].default) {
                    // 默认选项则不排序
                    this.desc = -1
                } else {
                    // 排序选项未选中默认顺序，否则反向排序
                    if (this.curItem === index) {
                        this.desc = this.desc === 1 ? 0 : 1
                        return
                    }
                    this.desc = 0
                }
                this.curItem = index
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
* {
	box-sizing: border-box;
}
#sort_bar {
	width: 100%;
}
.sort-bar {
	$sort-item-border: 1px solid #dfdfdf;
	width: 100%;
	height: 40px;
	line-height: 40px;
	background-color: #f6f6f6;
	border: $sort-item-border;
	.sort-bar-item {
		float: left;
		width: 78px;
		height: 100%;
		margin-left: -1px;
		font-size: 14px;
		text-align: center;
		cursor: pointer;
		.icon-btn-i-sort {
			.path1:before{
				color: #999;
			}
			.path2:before{
				color: #999;
			}
		}
		&:hover,
		&.active {
			color: $theme-color;
			background-color: #fff;
			border-left: $sort-item-border;
			border-right: $sort-item-border;
		}
	}
	.icon-btn-i-sort {
		&.asc .path2::before,
		&.desc .path1::before {
			color: $theme-color;
		}
	}
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .sort-bar {
            .sort-bar-item {
            	&:hover,
            	&.active {
            		color: $color-value;
            	}
            }
            .icon-btn-i-sort {
				&.asc .path2::before,
				&.desc .path1::before {
					color: $color-value;
				}
            }
        }
    }
}
</style>