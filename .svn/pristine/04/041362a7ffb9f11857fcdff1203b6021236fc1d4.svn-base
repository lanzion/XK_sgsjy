<template>
    <div>
        <el-row :gutter="8" class="select-popover-search">
            <el-col :span="8">
                <xk-region-select :defaultItems.sync="defaultItems" @region="changeRegion" :isAdmin="isAdmin"></xk-region-select>
            </el-col>
            <el-col :span="10">
                <el-select v-model="form.schoolId" placeholder="请选择所在学校" style="width:100%" @change="changeSchool">
                    <el-option v-for="(item, index) in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="教师姓名" icon="search" v-model="form.name" :on-icon-click="getData"></el-input>
            </el-col>
        </el-row>
        <ul class="select-popover-itemList">
            <li class="el-select-dropdown__item" v-for="(item, index) in itemList" :key="item.id" v-if="form.name=='' || item.name.includes(form.name.trim())" @click="checkItem(item)">{{item.name}} ({{item.provinceName}}{{item.cityName}}{{item.areaName}} - {{item.schoolName}})</li>
            <p v-if="!itemList.length" class="el-select-dropdown__empty">无数据</p>
        </ul>
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>


<script>
    // import region from '@/components/common/select/region_select.vue'
    import { requestSchoolList } from '@/service/common.js'
    import { requestExpertTeacher } from '@/service/manage.js'
    import pagination from '@/components/common/pagination.vue'

    export default {
        name: 'expertTeacherSelect',
        components: {
            'v-pagination': pagination
        },
        data() {
            return {
                form: {
                    provinceId: null,
                    cityId: null,
                    areaId: null,
                    schoolId: '',
                    name: '',
                    isFileter: 'yes'
                },
                schoolList: [],
                itemList: [],
                pageParam: {
                    pageSize: 15,
                    pageNum: 1,
                    totalNum: 0
                }
            }
        },
        props: {
            isAdmin: {
                type: Boolean,
                default() {
                    return false
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
        mounted() {
        },
        watch: {
            defaultItems: {
                handler: function (val) {
                    if (val.length) {
                        const _val = val.map(x => Number(x))
                        this.changeRegion(_val)
                    }
                },
                deep: true
            },
        },
        methods: {
            // 改变分页
            changePage(val) {
                this.pageParam.pageNum = val
                this.getData()
            },
            // 地区改变至区县级请求学校列表
            changeRegion: function (item) {
                const [province, city, area] = item
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
                requestSchoolList(this.form).then((response) => {
                    this.schoolList = response.data.appendInfo.comboxList || []
                })
            },
            getData: function () {
                requestExpertTeacher(this.form, this.pageParam).then((response) => {
                    this.itemList = response.data.entity.resultData || []
                    this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum)
                })
            },
            checkItem: function (item) {
                this.$emit('checkedItem', item)
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