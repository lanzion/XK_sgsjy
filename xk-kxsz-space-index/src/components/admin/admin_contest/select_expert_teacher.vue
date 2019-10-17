<template>
    <div>
        <el-row :gutter="8" class="select-popover-search">
            <template v-if="identity=='education'">
                <el-col :span="8">
                    <v-region-select :defaultItems.sync="defaultItems" @region="changeRegion" :isAdmin="isAdmin"></v-region-select>
                </el-col>
                <el-col :span="10">
                    <el-select v-model="form.schoolId" placeholder="请选择所在学校" style="width:100%" @change="changeSchool">
                        <el-option v-for="(item, index) in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="教师姓名" icon="search" v-model="form.name" :on-icon-click="getData"></el-input>
                </el-col>
            </template>
            <template v-else>
                <el-input placeholder="教师姓名" icon="search" v-model="form.name" :on-icon-click="getData"></el-input>
            </template>
        </el-row>
        <ul class="select-popover-itemList">
            <li class="el-select-dropdown__item" v-for="(item, index) in itemList" :key="item.id" v-if="form.name=='' || item.name.includes(form.name.trim())" @click="checkItem(item)">{{item.name}} ({{item.provinceName}}{{item.cityName}}{{item.areaName}} - {{item.schoolName}})</li>
            <p v-if="!itemList.length" class="el-select-dropdown__empty">无数据</p>
        </ul>
    </div>
</template>


<script>
    import { userIdentity } from '@/js/getUserInfo.js'
    import region from '@/components/common/select/region_select.vue'
    import { requestSchoolList } from '@/service/common.js'
    import { requestContestTeacher } from '@/service/admin_contest.js'

    export default {
        name: 'expertTeacherSelect',
        components: {
            'v-region-select': region
        },
        data() {
            return {
                identity: userIdentity,
                form: {
                    provinceId: null,
                    cityId: null,
                    areaId: null,
                    schoolId: '',
                    name: '',
                    isFileter: 'yes'
                },
                schoolList: [],
                itemList: []
            }
        },
        props: {
            'isAdmin': {
                type: Boolean,
                default() {
                    return false
                }
            },
            'defaultItems': {
                type: Array,
                default() {
                    return []
                }
            },
            'checkedItem': {
                type: String,
                default() {
                    return ''
                }
            },
            'disabled': {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        mounted () {
            if (userIdentity !== 'education') {
                this.getData()
            }
        },
        watch: {
            defaultItems: {
                handler: function (val) {
                    if (val.length) {
                        val = val.map((x) => Number(x))
                        this.changeRegion(val)
                    }
                },
                deep: true
            },
        },
        methods: {
            // 地区改变至区县级请求学校列表
            changeRegion: function (region) {
                let [ province, city, area ] = region
                this.$set(this.form, 'provinceId', province || null)
                this.$set(this.form, 'cityId', city || null)
                this.$set(this.form, 'areaId', area || null)
                this.searchSchool()
                this.getData()
            },
            // 学校改变请求教师列表
            changeSchool: function (schoolId) {
                this.$set(this.form, 'schoolId', schoolId || null)
                this.getData()
            },
            // 获取学校列表
            searchSchool: function () {
                requestSchoolList(this.form).then(response => {
                    this.schoolList = response.data.appendInfo.comboxList || []
                })
            },
            getData: function() {
                requestContestTeacher(this.form).then(response => {
                    this.itemList = response.data.entity || []
                })
            },
            checkItem: function(item) {
                this.$emit('checkedItem', item);
            }
        }
    }
</script>
<style lang='scss' scoped>
.select-popover-itemList {
    height: 360px;
    margin: 10px 0;
    overflow: auto;

    .el-select-dropdown__item {
        cursor: pointer;

        &:hover {
            background-color: #f3f3f3;
        }
    }
}
</style>