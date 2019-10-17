<template>
    <div class="statistics">
        <dl class="backend-content__middle backend-content__module">
            <dt class="el-form-item__label">截止日期</dt>
            <dd class="el-form-item__content">
                <el-date-picker type="date" placeholder="截止日期" v-model="params.endDate"></el-date-picker>
            </dd>
        </dl>
        <v-bar-chart :datas="typeDatas" title="兴趣组分类" class="backend-content__middle backend-content__module echarts"></v-bar-chart>
        <div class="backend-content__middle">
            <h6 class="backend-module__title">详细数据</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="兴趣组" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createName" label="创建人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="memberCount" label="成员数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="topicCount" label="话题数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="articleCount" label="文章数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="resourceCount" label="资源数" show-overflow-tooltip></el-table-column>
            </el-table>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
    import barChart from '@/components/common/statis/bar_chart.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestInterestType, requestInterestDetail } from '@/service/statis_school.js'
    export default {
        name: 'statisticsInterestSchool', // 兴趣组统计
        components: {
            'v-bar-chart': barChart,
            'v-pagination': pagination
        },
        data () {
            return {
                typeDatas: {},
                items: [],
                params: {
                    endDate: ''
                },
                pageParam: {
                    pageNum: 1,
                    pageSize: 5
                },
                page: {}
            }
        },
        props: [
            'orgInfo'
        ],
        computed: {
            typeParams: function() {
                return Object.assign( {}, this.params )
            },
            detailParams: function() {
                return Object.assign( {}, this.params, this.pageParam )
            }
        },
        watch: {
            typeParams: {
                handler: function (val, oldVal) {
                    this.getTypeData()
                },
                deep: true
            },
            detailParams: {
                handler: function (val, oldVal) {
                    this.getDetailData()
                },
                deep: true
            }
        },
        mounted () {
            this.page = Object.assign({}, this.pageParam)
            this.$set(this.params, 'orgId', this.orgInfo.orgId)
        },
        methods: {
            // 获取兴趣组分类统计数据
            getTypeData() {
                requestInterestType(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _result = {
                            subtext: `兴趣组分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，兴趣组: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.typeDatas = _result
                    }
                })
            },
            // 获取兴趣组详细数据
            getDetailData() {
                requestInterestDetail(this.detailParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.page, 'totalNum', _data.totalNum || 0)
                    }
                })
            },
            // 改变分页
            changePage(pageNum) {
                this.$set(this.pageParam, 'pageNum', pageNum);
            }
        }
    }
</script>

<style lang="scss" scoped>
.back-stage__container {
    .echarts {
        box-sizing: border-box;
        width: 100%;
        height: 350px;
    }
}
</style>
