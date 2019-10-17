<template>
    <div class="multi_select">
        <el-cascader
            :options="data"
            :placeholder="holder"
            v-model="select"
            change-on-select
            @change="selectedVal"
            style="width:100%;"
            :clearable="clearable"
            :disabled="disabled"
            :props="{value:'id', label: 'name', children: 'children'}">
        </el-cascader>
    </div>
</template>

<script>
// let model
    // 父组件data传入数组selectData.sync, 默认有全部，如果没有父组件传入ifAll=false
import { mapActions, mapMutations } from 'vuex'

export default {
    name: 'multi_select',
    data() {
        return {
            select: [],
            data: [],
            // model: {name:'project'}
        }
    },
    props: {
        selectData: {
            type: Array,
            default() {
                return []
            }
        },
        clearable: {
            type: Boolean,
            default() {
                return false
            }
        },
        model: String,
        ifAll: {
            type: Boolean,
            default() {
                return true
            }
        },
        holder: {
            type: String,
            default: '请选择分类'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.getData({ model: this.model }).then((res) => {
            this.data = Object.assign([], res)
            if (this.data.length && this.ifAll) {
                const allItem = { name: '全部分类', id: '' }
                this.data = [allItem].concat(this.data)
            }
        })
        // model = this.model
    },
    methods: {
        ...mapMutations('dataDictionary', ['saveData']),
        ...mapActions('dataDictionary', ['getData']),
        selectedVal() {
            this.selectData.splice(0, this.selectData.length, ...this.select)
        }
    },
    watch: {
        selectData: {
            handler(curVal) {
                if (curVal.length && curVal[0] === undefined) {
                    this.select = ['']
                } else {
                    this.select = curVal
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
