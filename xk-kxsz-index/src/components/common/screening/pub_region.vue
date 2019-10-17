<template>
    <!-- 省市区模块 -->
    <dl class="region-box category-box" v-for="(title, index) in regionTitle" v-if="regions[index].length">
        <div v-if="index==0" class="more" @click="showMore">更多&gt;</div>
        <dd class="category-title">{{ title }}：</dd>
        <dt class="category-list clearfix">
            <li v-if="isAll" class="category-list-item" :class="{active: regionParams[index]==''}" @click="active(index, '')">全部</li>
            <li class="category-list-item" v-for="(item, r) in regions[index]" :key="item.code" :class="{active: regionParams[index]==item.code}" @click="getSubData(index, item.code);active(index, item.code)">{{item.name}}</li>
        </dt>
    </dl>
</template>

<script>
import { requestRegion } from '@/service/common.js'
export default {
    name: 'region',
    data() {
        return {
            regions: [ [], [], [] ],
            regionTitle: ['省级', '地市', '区县']
        }
    },
    computed: {
        regionsLength: function () {
            return this.regionTitle.length;
        }
    },
    props: {
        'regionParams': {
            type: Array,
            default() {
                return ['', '', ''];
            }
        },
        'isAll': {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    methods: {
        /*
         * 获取省市县接口
         * 参数：{code: region.code}
         */
        getData: function (option) {
            option == undefined ? {} : option;
            return requestRegion(option).then(response => {
                if(response.data.code === 200){
                    return response.data.entity
                }
            })
        },
        /*
         * 获取子级省市县数据
         */
        getSubData: function(index, code) {
            if (index + 1 == this.regionsLength) return;
            this.getData({code: code}).then( response => {
                // 替换当前子级数据并修改该级下一级数据为空
                this.regions.splice(index + 1, this.regionsLength - index, response);
                this.regions.push([], []);
                this.regions.splice(this.regionsLength);
            });
        },
        active : function (index, val) {
            // 修改选中的地区数据
            this.regionParams.splice(index, this.regionsLength - index, val);
            this.regionParams.push('', '');
            this.regionParams.splice(this.regionsLength);
            // 清除子级的数据
            this.regionParams.forEach( (x, index) => {
                if (x === '' && index < this.regionsLength - 1) {
                    this.regions.splice(index + 1, 1, []);
                }
            });
            this.$emit('region', this.regionParams);
        },
        showMore: function () {
            var target = window.event.srcElement || window.event.target,
                targetParent = target.parentNode || target.parentElement
            if (target.innerHTML == "更多&gt;") {
                target.innerHTML = "&lt;收回"
                targetParent.setAttribute('style', 'height: auto')
            } else {
                target.innerHTML = "更多&gt;"
                targetParent.setAttribute('style', '')
            }
        }
    },
    created() {
        this.getData().then( response => {
            this.regions.splice(0, 1, response);
        });
        for (let i = 0; i < this.regionsLength - 1; i++) {
            let option = {};
            if (this.regionParams[i] != '') {
                option.code = this.regionParams[i];
                this.getData(option).then( response => {
                    this.regions.splice(i + 1, 1, response);
                });
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import './../../../asset/scss/cascader.scss';
@import './../../../asset/scss/vars.scss';
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
