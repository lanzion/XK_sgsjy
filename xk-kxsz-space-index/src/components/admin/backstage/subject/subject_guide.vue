<template>
    <!-- 申报指南 -->
    <section id="subject_guide" class="subject_guide">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.name" placeholder="请输入课题名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="getData">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{}"></v-admin-operate>
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="subjectName" label="标题" show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/space/subject/detail', query: {id: scope.row.id} }">{{scope.row.subjectName}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="课题级别" sortable prop="subjectLevel"></el-table-column>
            <el-table-column prop="userName" label="发布单位"></el-table-column>
            <el-table-column prop="endDate" label="申报截止时间"></el-table-column>
            <el-table-column prop="auditStatus" label="申报状态" width="100" sortable></el-table-column>
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { queryKey: 'id', queryVal: 'id' },
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
    </section>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import delPopover from '@/components/common/del_popover.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestSubjectAuditList } from '@/service/admin_space.js'
    import dataTranslation from '@/js/dataTranslation.js'
    export default {
        name: 'subject_guide',
        mixins: [subPermission],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'del-popover': delPopover
        },
        data() {
            return {
                checkedItems: [],// 选中项
                search: {
                    name: ''
                },
                pagParam: {
                    pageNum: 1,
                    pageSize: 20
                },
                region: {},
                page: {},
                items: []
            }
        },
        computed: {
            params: function() {
                return Object.assign( {}, this.search, this.region, this.pagParam );
            }
        },
        mounted() {
            this.page = Object.assign({}, this.pagParam);
            this.getData();
        },
        watch: {
            params: {
                handler: function (val, oldVal) {
                    this.getData();
                },
                deep: true
            }
        },
        methods: {
            /*
             * 获取课题列表
             */
            getData() {
                requestSubjectAuditList(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity.resultData;
                        if (_data.length) {
                            _data.forEach(item => {
                                dataTranslation(item.subjectLevel, 'subjectLevel' ).then(res => {
                                    item.subjectLevel = res;
                                })
                                if(item.auditStatus) {
                                    dataTranslation(item.auditStatus.toString(), 'auditStatus').then(res => {
                                        item.auditStatus = res;
                                    })
                                }
                            })
                        }
                        this.items = _data;
                        this.$set(this.page, 'totalNum', response.data.entity.totalNum);
                    }
                })
            },
            // 改变分页
            changePage(pageNum) {
                this.$set(this.pagParam, 'pageNum', pageNum);
            },
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
        }
    }
</script>

<style lang="scss">
@import '~@/asset/scss/table.scss';
@import '~@/asset/scss/admin_back-stage_content.scss';
</style>