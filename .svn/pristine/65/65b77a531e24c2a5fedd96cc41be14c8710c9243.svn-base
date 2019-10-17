<template>
    <dl id="classificationDictionary" class="category-box clearfix">
        <dd class="category-title"><span class="cate-tit">培训分类</span>:</dd>
        <dt class="category-list clearfix">
            <li class="category-list-item" v-for="(item, index) in dicObj.result" v-text="item.name" :class="{'active': curItem == index}" @click="curItem=index; changeDataDic(item)"></li>
        </dt>
    </dl>
</template>

<script>
import { requestTrainClassifyList } from '@/service/study.js'

export default {
    name: 'classificationDictionary',
    data() {
        return {
            dicObj: {},
            curItem: 0
        }
    },
    props: {
        isAll: {
            type: Boolean,
            default() {
                return true
            }
        },
        changeDataDic: Function,
    },
    mounted() {
        requestTrainClassifyList({}, { pageSize: 999, pageNum: 1 }).then((res) => {
            if (res.data.code === 200) {
                this.dicObj = Object.assign({}, res.data.appendInfo)
                if (this.isAll) {
                    this.dicObj.result = [{ name: '全部', code: '', id: '' }].concat(this.dicObj.result)
                }
            }
        })
    },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/cascader.scss';
</style>
