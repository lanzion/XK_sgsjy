<template>
    <div class="region_select">
        <el-cascader
            :options="datas"
            placeholder="请选择区域"
            :change-on-select="true"
            :disabled="disabled"
            v-model="checkedItems"
            @change="changeRegion"
            style="width: 100%;"
            :props="{value:'code', label: 'name', children: 'children', 'before-filter': changeRegion}">
        </el-cascader>
    </div>
</template>

<script>
import { requestRegion } from '@/service/common.js'

export default {
    name: 'regionPubSelect',
    data() {
        return {
            datas: [],
            checkedItems: [],
            checkedItemsFull: [null, null, null]
        }
    },
    props: {
        defaultItems: {
            type: Array,
            default() {
                return []
            }
        },
        rangeItems: {
            type: String,
            default() {
                return ''
            }
        },
        disabled: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    mounted() {
        if (this.rangeItems.length) {
            this.getData({ params: { code: this.rangeItems } })
        } else {
            this.getData()
        }
    },
    watch: {
        defaultItems: {
            handler: function (val) {
                if (val.length) {
                    this.getDefaultData(val).then((list) => {
                        list.unshift(this.datas)
                        for (let i = val.length - 1; i > 0; i--) {
                            const _index = list[i - 1].findIndex((data) => {
                                return data.code.toString() === val[i - 1].toString()
                            })
                            if (_index >= 0 && i > 0) {
                                list[i - 1][_index].children = list[i]
                            }
                        }
                        this.datas = list[0]
                        this.$set(this.$data, 'checkedItems', val)
                        this.changeRegion(val)
                    })
                }
            },
            deep: true
        }
    },
    methods: {
        getData({ params = { code: 'all' }, datas } = {}) {
            requestRegion(params).then((repsonse) => {
                const _data = repsonse.data.entity
                const _checkedItem = this.checkedItemsFull.filter(x => x)
                if (_checkedItem.length < 2 && _data) {
                    _data.forEach((x) => {
                        if (x.children === undefined) {
                            x.children = []
                        }
                    })
                }
                if (!arguments.length) {
                    this.datas = _data
                } else if (_checkedItem.length < 3) {
                    datas.children = _data
                }
            })
        },
        changeRegion(val) {
            let datas = this.datas

            this.checkedItemsFull = [null, null, null]
            for (let i = 0; i < val.length; i++) {
                const itemIndex = datas.findIndex((data) => {
                    return data.code.toString() === val[i].toString()
                })
                this.$set(this.$data.checkedItemsFull, i, val[i])

                if (i < 2 &&
                    (datas[itemIndex].children ? !datas[itemIndex].children.length : true)) {
                    this.getData({ params: { code: val[i] }, datas: datas[itemIndex] })
                } else {
                    datas = datas[itemIndex].children
                }
            }
            this.$emit('region', this.checkedItemsFull)
        },
        async getDefaultData(codes) {
            const arr = []
            for (let i = 0; i < codes.length; i++) {
                arr[i] = await requestRegion({ code: codes[i] }).then((repsonse) => {
                    const _data = repsonse.data.entity
                    return _data
                })
            }
            return arr.filter(x => x)
        }
    }
}
</script>
