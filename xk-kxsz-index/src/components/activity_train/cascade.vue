<template>
    <div id="cascade">
        <dl class="category-box clearfix" v-if="periodList !== undefined && periodList.length">
            <dd class="category-title">
                <span class="cate-tit">学段</span>:
            </dd>
            <dt class="category-list clearfix">
                <li class="category-list-item" v-for="(item, index) in periodList" :class="{'active':index == curIndex}" @click="setCurPeriod(item, index);changeCascade(curItems)">{{item.name}}</li>
            </dt>
        </dl>
        <template>
            <dl class="category-box clearfix" v-if="curIndex">
                <dd class="category-title">
                    <span class="cate-tit">学科</span>:
                </dd>
                <dt class="category-list clearfix">
                    <li class="category-list-item" v-for="(item, index) in periodList[curIndex].children" :class="{'active':index == subjectIndex}" @click="setCurSubject(item, index);changeCascade(curItems)">{{item.name}}</li>
                </dt>
            </dl>
        </template>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { requestTrainPeriodList, requestSubjectByPeriodId } from '@/service/study.js'

export default {
    name: 'cascade',
    data() {
        return {
            datas: [],
            curIndex: 0,  // 当前选中项Index
            curItems: [],   // 当前选中项对象数据
            periodList: [],
            subjectList: [],
            subjectIndex: 0
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
    mounted() {
        this.getTrainPeriod()
    },
    methods: {
        // 获取学段数据
        getTrainPeriod() {
            requestTrainPeriodList({}).then((res) => {
                if (res.data.code === 200) {
                    const _date = res.data.appendInfo.result
                    this.periodList = _date.map((x) => {
                        this.$set(x, 'children', [])
                        return x
                    })
                    this.periodList = [{ name: '全部', id: '' }].concat(this.periodList)
                }
            })
        },
        setCurPeriod(item, index) {
            this.curIndex = index
            this.subjectIndex = 0
            this.curItems = [item, { id: '' }]
            if (this.curIndex && !this.periodList[index].children.length) { // 根据学段获取学科数据
                requestSubjectByPeriodId({ studySectionId: item.id }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.appendInfo.result
                        this.periodList[index].children = [{ name: '全部', id: '' }].concat(_data)
                    }
                })
            }
        },
        setCurSubject(item, index) {
            this.curItems[1] = item
            this.subjectIndex = index
        }
    },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/cascader.scss';
.category-box {
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
