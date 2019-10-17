<template>
    <el-select v-model="technologyType.value" :placeholder="singleSelectData.placeholder" :clearable="clearable" @change="filter"
                         :multiple="singleSelectData.multiple">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        name: 'singleSelect',
        data() {
            return {
                technologyType: {
                    value: '',
                    options: []
                },
            }
        },
        /*
         *props 接收父组件参数：object类型{ groupCode：groupCode参数, ifALl：是否显示全部 }
         */
        props: {
            clearable: {
                type: Boolean,
                default() {
                    return true
                }
            },
            singleSelectData: {
                type: Object,
                default() {
                    return { groupCode: '', ifAll: true, name: '', multiple: false, placeholder: '请选择' }
                }
            },
            selected: [Array, String] // 同步父组件的v-model
        },
        created() {
            this.getSelect(this.singleSelectData.groupCode)
            this.technologyType.value = this.selected // 设置v-model的初始值
        },
        computed: {
            ...mapState('dictionaryCommon', {
                options(state) {
                    const dicList = (state[this.singleSelectData.groupCode + 'DicList'] || {}).dicList || []
                    if (dicList.length === 0) return []
                    return this.singleSelectData.ifAll ? [{ id: '', name: '全部' + (this.singleSelectData.name || '') }].concat(dicList) : dicList
                }
            })
        },
        watch: {
            selected: {
                handler: function (val) {
                    this.technologyType.value = val
                },
                deep: true
            }
        },
        methods: {
            ...mapActions('dictionaryCommon', { getSelect: 'getDictComb' }),
            // 获取select的options，技术分类
            /* getSelect () {
                let data = {groupCode: this.singleSelectData.groupCode};
                requestDictComb(data).then((res) => {
                    // console.log(res)
                    this.technologyType.options = res.data.entity.dicList;
                    if (this.singleSelectData.ifAll) {
                        this.technologyType.options.unshift({id: '', name: '全部' + (this.singleSelectData.name || '')});
                    }
                })
            }, */
            // 筛选时改变监听值
            filter(val) {
                this.$emit('callback', val)
                // this.selected = this.technologyType.value;
                this.$emit('update:selected', val) // 同步父组件的v-model
            }
        }
    }
</script>

<style lang="scss" scoped></style>
