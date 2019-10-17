<template>
    <div class="sort_bar-box">
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
            curItem: 0,     // 当前选中排序选项
            desc: -1        // 排序  1: 升序, 0: 降序, -1: 不排序
        }
    },
    props: {
        /*
         * { name: '综合', model: 'composite', default: true},        - default 默认，不排序
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
            } else if (this.curItem === index) {
                // 排序选项未选中默认顺序，否则反向排序
                this.desc = this.desc === 1 ? 0 : 1
            } else {
                this.desc = 0
            }
            this.curItem = index
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
.sort_bar-box {
    width: 100%;
}
.sort-bar {
    $sort-item-border: 1px solid #dfdfdf;
    width: 100%;
    height: 46px;
    line-height: 46px;
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    .sort-bar-item {
        float: left;
        width: 78px;
        height: 100%;
        margin-left: -1px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
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
            color: nth($default-color, 1);
            background-color: #fff;
            border-left: $sort-item-border;
            border-right: $sort-item-border;
        }
    }
    .icon-btn-i-sort {
        &.asc .path2::before,
        &.desc .path1::before {
            color: nth($default-color, 1);
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