<template>
    <dl id="classificationDictionary" class="category-box clearfix">
        <dd class="category-title">{{groupName || dicObj.groupName}}：</dd>
        <dt class="category-list clearfix">
            <li class="category-list-item" v-for="(item, index) in dicObj.dicList" v-text="item.name" :class="{'active': curItem==index}" @click="curItem=index; changeDataDic(item)"></li>
        </dt>
    </dl>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'classificationDictionary',
    data() {
        return {
            dicObj: {},
            curItem: 0
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
        changeDataDic: Function,
        groupName: {
            type: String,
            default() {
                return null
            }
        }
    },
    mounted() {
        this.getDictComb(this.model).then((res) => {
            this.dicObj = Object.assign({}, res)
            if (this.isAll) {
                this.dicObj.dicList = [{ name: '全部', code: '', id: '' }].concat(this.dicObj.dicList)
            }
        })
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        })
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/cascader.scss';
</style>
