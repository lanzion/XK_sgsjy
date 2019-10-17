<template>
    <!-- 省市区模块 -->
    <div id="region">
        <dl class="region-box category-box" v-for="(title, index) in regionTitle" v-show="regions[index].length" :class="{show}">
            <div v-if="index==0" class="more" @click="showMore" v-html='moreString'></div>
            <dd class="category-title">{{ title }}：</dd>
            <dt class="category-list clearfix">
                <li v-if="isAll" class="category-list-item" :class='{active: regionParams[index]=="" || regionParams[index]==undefined}' @click="active(index, '')">全部</li>
                <li class="category-list-item" v-for="(item, r) in regions[index]" :key="item.code" :class="{active: regionParams[index]==item.code}" @click="getSubData(index, item.code);active(index, item)">{{item.name}}</li>
            </dt>
        </dl>
    </div>
</template>

<script>
import { requestLimitRegion } from '@/service/common.js'

export default {
    name: 'region',
    data() {
        return {
            regions: [[], [], []],
            regionTitle: ['省级', '地市', '区县'],
            show: false,
            moreString: '更多&gt;'
        }
    },
    computed: {
        regionsLength: function () {
            return this.regionTitle.length
        }
    },
    props: {
        regionParams: {
            type: Array,
            default() {
                return ['', '', '']
            }
        },
        isAll: {
            type: Boolean,
            default() {
                return true
            }
        }
    },
    methods: {
        /*
         * 获取省市县接口
         * 参数：{code: region.code}
         */
        getData: function (param) {
            return requestLimitRegion(param).then((response) => {
                if (response.data.code === 200) {
                    return response.data.appendInfo.list || []
                }
            })
        },
        /*
         * 获取子级省市县数据
         */
        getSubData: function (index, code) {
            if (index + 1 === this.regionsLength) return
            this.getData({ pcode: code }).then((response) => {
                // 替换当前子级数据并修改该级下一级数据为空
                this.regions.splice(index + 1, this.regionsLength - index, response)
                for (let i = 0; i < index; i++) {
                    this.regions.push([])
                }
                this.regions.push([], [])
                this.regions.splice(this.regionsLength)
            })
        },
        active: function (index, item) {
            // 修改选中的地区数据
            this.regionParams.splice(index, this.regionsLength - index, item.code)
            for (let i = 0; i < index; i++) {
                this.regionParams.push('')
            }
            this.regionParams.push('', '')
            this.regionParams.splice(this.regionsLength)

            // 清除子级的数据
            const level = item.level ? item.level - 3 : -1
            if (level < index) {
                this.regionParams.forEach((x, i) => {
                    if (x === undefined && i < this.regionsLength - 1) {
                        this.regions.splice(i + 1, 2, [])
                        this.regions.push([], [])
                        this.regions.splice(this.regionsLength)
                    }
                })
            }
            this.$emit('region', this.regionParams)
        },
        showMore: function () {
            this.show = !this.show
            this.moreString = this.show ? '&lt;收回' : '更多&gt;'
        }
    },
    created() {
        this.getData({ pcode: -1 }).then((response) => {
            this.regions.splice(this.$ls.get('XK-MAKER__REGIONLEVEL'), 1, response)
        })
        for (let i = 0; i < this.regionsLength - 1; i++) {
            const option = {}
            if (this.regionParams[i] !== '') {
                option.code = this.regionParams[i]
                this.getData(option).then((response) => {
                    this.regions.splice(i + 1, 1, response)
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/cascader.scss';
@import '~@/assets/css/scss/vars.scss';
.region-box {
    height: 2em;
    white-space: nowrap;
    overflow: hidden;

    .category-list {
        margin-right: 3em;

        .category-list-item {
            margin-bottom: 8px;
        }
    }

    .more {
        float: right;
        color: $default-color;
        cursor: pointer;
    }
}

.show {
    height: auto;
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .region-box {
            .more {
                color: $color-value;
            }
        }
    }
}
</style>
