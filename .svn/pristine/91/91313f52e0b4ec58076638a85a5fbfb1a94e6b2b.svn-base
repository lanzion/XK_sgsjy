<template>
    <div id="cascade">
        <dl class="category-box clearfix" v-if="datas !== undefined && datas.length">
            <dd class="category-title">
                <span class="cate-tit">{{datas[0].level}}</span>:
            </dd>
            <dt class="category-list clearfix">
                <li class="category-list-item" v-for="(item, index) in datas" :class="{'active':index == (curIndex[0]==undefined?0:curIndex[0])}" @click="setCurItems(item, 0, index);changeCascade(curItems)">{{item.name}}</li>
            </dt>
        </dl>
        <template v-for="(curItem, c) in curItems">
            <dl class="category-box clearfix" v-if="curItem.children !== undefined && curItem.children.length">
                <dd class="category-title">
                    <span class="cate-tit">{{curItem.children[0].level}}</span>:
                </dd>
                <dt class="category-list clearfix">
                    <li class="category-list-item" v-for="(item, index) in curItem.children" :class="{'active':index == (curIndex[c+1]==undefined?0:curIndex[c+1])}" @click="setCurItems(item, c+1, index);changeCascade(curItems)">{{item.name}}</li>
                </dt>
            </dl>
        </template>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'cascade',
    data() {
        return {
            datas: [],
            curIndex: [0],  // 当前选中项Index
            curItems: [],   // 当前选中项对象数据
        }
    },
    props: {
        model: String,
        isAll: {
            type: Boolean,
            default() {
                return true
            }
        },
        changeCascade: {
            type: Function,
            default() {
                return function () {}
            }
        }
    },
    methods: {
        ...mapMutations('dataDictionary', ['saveData']),
        ...mapActions('dataDictionary', ['getData']),
        // 设置选中的选项为空则清除，否则替换
        setCurItems(item, level, index) {
            if (item.id === '') {
                this.curIndex.splice(level)
                this.curItems.splice(level)
            } else {
                this.$set(this.$data.curIndex, level, index)
                this.curIndex.splice(level + 1)

                this.$set(this.$data.curItems, level, item)
                this.curItems.splice(level + 1)
            }
        },
        // 递归加入"全部"选项
        setDataHaveAll(items, appendItem) {
            if (items instanceof Array && items.length) {
                const _appendItem = Object.assign({}, appendItem)
                _appendItem.level = items[0].level
                items.unshift(_appendItem)

                items.forEach((item) => {
                    if (item.children !== undefined && item.children.length) {
                        this.setDataHaveAll(item.children, appendItem)
                    }
                })
            }
        }
    },
    mounted() {
        // 创客教育，课程项目首页跳转列表页面，需要设置初始选中的领域
        // const { index: indexArr } = this.$store.state.edu.fieldSelected || {}
        // indexArr.length && (this.curIndex = indexArr)

        this.getData({ model: this.model }).then((res) => {
            this.datas = JSON.parse(JSON.stringify(res))
            if (this.datas.length && this.isAll) {
                const allItem = { name: '全部', id: '' }
                this.setDataHaveAll(this.datas, allItem)

            //     if (indexArr.length) {
            //         const [pIndex, cIndex] = this.curIndex
            //         const parent = this.datas[pIndex] || []
            //         const child = parent[cIndex] || []
            //         this.curItems = [parent, child]
            //     }
            }
        })
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/cascader.scss';
.category-box {
    width: 100%;
    margin-bottom: $category-item-margin;
    font-size: 14px;
    line-height: 2;

    .category-list-item {
        &:hover {
            color: $default-color;
        }
        &.active {
            background-color: $default-color;
        }
    }
}
</style>
