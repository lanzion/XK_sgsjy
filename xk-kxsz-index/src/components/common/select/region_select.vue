<template>
    <div class="region_select">
        <el-cascader
            :options="datas"
            placeholder="请选择区域"
            :change-on-select="true"
            v-model="checkedItems"
            style="width: 100%;"
            :props="{value:'code', label: 'name', children: 'children', 'before-filter': changeRegion}" :clearable="clearable">
        </el-cascader>
    </div>
</template>

<script>
import { requestLimitRegion, requestLimitRegionByIdentity } from '@/service/common.js'

const REGIONLEVEL = localStorage.getItem('XK-MAKER__REGIONLEVEL')
const maxLevel = {
    0: 4,
    1: 3,
    2: 2,
    3: 2
}[REGIONLEVEL] || 4

export default {
    name: 'regionSelect',
    data() {
        return {
            datas: [],
            checkedItems: [],
            checkedItemsFull: [null, null, null]
        }
    },
    computed: {
        handler: function () {
            return this.isAdmin ? requestLimitRegionByIdentity : requestLimitRegion
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
                return '-1'
            }
        },
        isAdmin: {
            type: Boolean,
            default() {
                return false
            }
        },
        clearable: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    mounted() {
        this.getData()
    },
    watch: {
        defaultItems: {
            handler: function (val) {
                if (val.length) {
                    // let _datas = this.datas
                    // let index = -1
                    // let isValid = false
                    // const arr = []
                    // for (let i = 0; i < val.length; i++) {
                    //     const x = val[i] || ''
                    //     if (!isValid) {
                    //         index = _datas.findIndex(d => x.toString() === d.code.toString())
                    //     }
                    //     arr.push(index >= 0 ? Number(x) : null)
                    //     if (index >= 0 && !isValid) {
                    //         _datas = _datas[index].children
                    //     } else {
                    //         isValid = true
                    //     }
                    // }
                    val = val.map((x) => {
                        return Number(x)
                    })
                    this.$set(this.$data, 'checkedItems', val)
                    // this.changeRegion(val)
                }
            },
            deep: true
        },
        checkedItems: {
            handler: function (val) {
                this.changeRegion(val)
            },
            deep: true
        }
    },
    methods: {
        saveData(result, datas) {
            if (result) {
                let _data = result.list || null
                if (_data === null || !_data.length) {
                    _data = result.area
                    this.checkedItems = [_data.code]
                    this.checkedItemsFull = [null, null, _data.code]
                    _data = [Object.assign({ level: maxLevel }, _data)]
                    this.$emit('region', this.checkedItemsFull)
                }
                if (_data !== null || _data.length) {
                    if (_data[0].level < maxLevel) {
                        _data.forEach((x) => {
                            if (x.children === undefined) {
                                x.children = []
                            }
                        })
                    }
                    if (this.checkedItems.length && datas) {
                        datas.children = _data
                    } else {
                        this.datas = _data
                    }
                }
            }
        },
        async getData({ params = { pcode: this.rangeItems }, datas } = {}) {
            return this.handler(params).then((response) => {
                if (response.data.code === 200) {
                    const result = response.data.appendInfo
                    this.saveData(result, datas)
                    return result
                }
            })
        },
        async changeRegion(val) {
            let datas = this.datas

            this.checkedItemsFull = [null, null, null]
            for (let i = 0; i < val.length; i++) {
                if (val[i] == null || val[i] === '') {
                    continue
                }
                const itemIndex = datas.findIndex((data) => {
                    return data.code === val[i]
                })
                const pos = datas[itemIndex].level + 2 - maxLevel
                this.$set(this.checkedItemsFull, pos, val[i])

                if (datas[itemIndex].level < maxLevel && datas[itemIndex].children === undefined || (datas[itemIndex].children && !datas[itemIndex].children.length)) {
                    const result = await this.getData({ params: { pcode: val[i] }, datas: datas[itemIndex] })
                    datas = result.list || result.area
                } else {
                    datas = datas[itemIndex].children
                }
            }
            this.$emit('region', this.checkedItemsFull)
        }
    }
}
</script>