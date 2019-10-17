<template>
    <div class="backend-content__middle enroll">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.name" @keyup.native.enter="changePage(1)" placeholder="请输入申请编号/单位名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown = !screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="区域">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="单位类型">
                        <el-select v-model="search.type" placeholder="请选择单位类型" filterable clearable>
                            <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="级别" v-if="search.type == '2'">
                        <el-select v-model="search.eduType" placeholder="请选择教育局级别" filterable clearable>
                            <el-option v-for="item in eduTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="search.status" placeholder="请选择状态" filterable clearable>
                            <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <!-- 列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" v-loading="loading" element-loading-text="正在发送中...">
            <el-table-column prop="applyNo" label="申请编号" show-overflow-tooltip>
                <template scope="scope">
                    <router-link class="a_btn" :to="{ path: '/base/enroll/detail', query: { id: scope.row.id } }">{{scope.row.applyNo}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="单位类型" show-overflow-tooltip>
                <template scope="scope">
                    <span>{{type[scope.row.type]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="eduType" label="级别">
                <template scope="scope">
                    <span>{{eduType[scope.row.eduType]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="provinceName" label="区域" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="单位名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="linkName" label="联系人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="电子邮箱" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态">
                <template scope="scope">
                    <span>{{status[scope.row.status]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="94">
                <template scope="scope">
                    <router-link class="a_btn" :to="{ path: '/base/enroll/detail', query: { id: scope.row.id } }" v-if="scope.row.status == '1'">办理</router-link>
                    <a class="a_btn" href="javaScript:;" v-if="scope.row.status == '2'" @click="sendAccountPwd(scope.row.id)">发送账号</a>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestOrgApplyList, sendAccountPwd } from '@/service/admin_base.js'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import { mapState, mapActions } from 'Vuex'

    export default {
        name: 'claszManage',
        mixins: [subPermission, setPage],
        components: {
            'v-pagination': pagination,
            'v-region-select': region
        },
        data() {
            return {
                 // 高级筛选开关
                screeningDropdown: false,
                // 单位类型数据
                typeOptions: [
                    { name: '学校', id: '1' },
                    { name: '教育局', id: '2' }
                ],
                eduTypeOptions: [
                    { name: '省级', id: '1' },
                    { name: '市级', id: '2' },
                    { name: '区县级', id: '3' }
                ],
                statusOptions: [
                    { name: '办理中', id: '1' },
                    { name: '已开通', id: '2' },
                    { name: '已拒绝', id: '3' }
                ],
                type: {
                    1: '学校',
                    2: '教育局'
                },
                eduType: {
                    1: '省级',
                    2: '市级',
                    3: '区县级'
                },
                status: {
                    1: '办理中',
                    2: '已开通',
                    3: '已拒绝'
                },
                search: {
                    name: '',
                    status: '',
                    type: '',
                    eduType: ''
                },
                region: {},
                items: [],
                loading: false
            }
        },
        computed: {
            params: function() {
                return Object.assign( {}, this.search, this.region);
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            resetSearchForm() {
                this.search = Object.assign({}, { name: this.search.name })
                this.screeningDropdown = false
            },
            /*
             * 获取列表
             */
            getData() {
                requestOrgApplyList(this.params, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.$message.error({message: response.data.msg});
                    }
                })
            },
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items;

                _region.provinceId = _province;
                _region.cityId = _city;
                _region.areaId = _area;
                this.region = _region
            },
            // 分页改变
            changePage(val) {
                this.setPageNum(val)
                this.getData()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.getData()
            },
            // 发送账号密码
            sendAccountPwd(id) {
                this.$confirm('此操作将向该用户发送账号密码, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    sendAccountPwd({ id: id }).then((res) => {
                        if (res.data.code === 200) {
                            this.loading = false
                            this.$message({
                                type: 'success',
                                message: '账号密码已成功发送'
                            })
                        } else {
                            this.loading = false
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    }, (err) => {
                        this.loading = false
                        this.$message({
                            type: 'error',
                            message: '发送失败，请重试'
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发送'
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .enroll {
        .a_btn {
            color: #2797ed;
            cursor: pointer;
        }
    }
</style>
