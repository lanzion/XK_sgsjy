<template>
    <div>
        <el-popover popper-class="select-popover" ref="popoverSelect" :visible-arrow="false" v-if="!disabled" v-model="spVisible" placement="bottom-start" :width="popperWidth>400?popperWidth:400" trigger="click">
            <el-row :gutter="10" class="select-popover-search">
                <el-col :span="16">
                    <v-region-select :defaultItems="defaultItems" @region="changeRegion" :isAdmin="isAdmin"></v-region-select>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="关键字" icon="search" v-model="schoolForm.schoolName" :on-icon-click="searchSchool"></el-input>
                </el-col>
            </el-row>
            <ul class="select-popover-itemList">
                <li class="el-select-dropdown__item" v-for="(item, index) in itemList" :key="item.id || item.schoolId" v-if="schoolForm.schoolName=='' || item.schoolName.includes(schoolForm.schoolName.trim())" @click="checkItem(item);">{{ item.schoolName }}</li>
                <p v-if="!itemList.length" class="el-select-dropdown__empty">无数据</p>
            </ul>
        </el-popover>
        <el-select v-popover:popoverSelect v-model="checkedItem" placeholder="请选择所在区域所在学校" popper-class="select-isPopover" style="width:100%" :disabled="disabled">
            <el-option v-for="(item, index) in itemList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
        </el-select>
    </div>
</template>

<script>
    import region from '@/components/common/select/region_select.vue'
    import { requestSchoolList } from '@/service/common.js'

    export default {
        name: 'regionSchoolSelect',
        components: {
            'v-region-select': region
        },
        data() {
            return {
                popperWidth: 400,
                schoolForm: {
                    provinceId: null,
                    cityId: null,
                    areaId: null,
                    schoolName: ''
                },
                itemList: [],
                spVisible: false
            }
        },
        props: {
            isAdmin: {
                type: Boolean,
                default() {
                    return false
                }
            },
            defaultList: {
                type: Array,
                default() {
                    return []
                }
            },
            defaultItems: {
                type: Array,
                default() {
                    return []
                }
            },
            checkedItem: {
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
        watch: {
            defaultList: {
                handler: function (val) {
                    if (val.length) {
                        this.itemList = this.defaultList
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.popperWidth = this.$el.offsetWidth
            this.itemList = this.defaultList
        },
        methods: {
            // 地区改变至区县级请求学校列表
            changeRegion: function (item) {
                if (item.length === 3) {
                    const [province, city, area] = item
                    this.$set(this.$data.schoolForm, 'provinceId', province)
                    this.$set(this.$data.schoolForm, 'cityId', city)
                    this.$set(this.$data.schoolForm, 'areaId', area)
                    this.searchSchool()
                }
            },
            // 获取学校列表
            searchSchool: function () {
                requestSchoolList(this.schoolForm).then((response) => {
                    this.itemList = response.data.appendInfo.comboxList
                })
            },
            // 选中列表选项
            checkItem: function (item) {
                this.spVisible = false
                this.$emit('checkedItem', item)
            }
        }
    }
</script>
<style lang='scss'>
.select-popover {
    &.el-popover {
        box-sizing: border-box;

        &[x-placement^=bottom] {
            margin-top: 5px;
        }
    }
    .el-icon-search:before {
        color: #999;
    }
}
.select-isPopover.el-select-dropdown {
    display: none;
}
</style>
<style lang='scss' scoped>
.select-popover-search {
    padding: 10px 10px 0;
}
.select-popover-itemList {
    max-height: 180px;
    margin: 10px 0;
    cursor: pointer;
    overflow: auto;

    .el-select-dropdown__item {
        &:hover {
            background-color: #f3f3f3;
        }
    }
}
</style>
