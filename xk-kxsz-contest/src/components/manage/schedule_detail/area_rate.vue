<template>
	<el-dialog title="评审进度" :visible.sync="phasePopop.show" size="small" @close="close" class="audit_rate">
        <div class="content-box">
            <section class="option-box clearfix">
                <v-search class="fl" :tips="tips" @search="setPhaseSearch"></v-search>
                <xk-region-select class="fl" style="margin-left: 10px;" @region="changeRegion" ref="region" :ifClear="ifClear" :isAdmin="true" :clearable="true"></xk-region-select>
            </section>
            <!-- 评审进度列表 -->
            <div class="planByWorks">
                <el-table class="data-table back-stage-table" border :data="planByWorksList" style="width: 100%" height="300">
                    <el-table-column prop="orgName" :label="label" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="provinceName" label="所属区域" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="评审进度" width="190">
                        <template slot-scope="scope">
                            <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt((scope.row.reviewNum/scope.row.worksNum) * 100)" style="margin: 0px 15px;"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <a class="view-rate" @click.stop="viewRate(scope.row.orgId)">查看</a>
                        </template>
                    </el-table-column>
                </el-table>
                <v-pagination :param="planByWorksPageParam" @callback="setPlanByWorksPageParam"></v-pagination>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    // import { mapState } from 'vuex'
    import search from '@/components/common/search.vue'
    import pagination from '@/components/common/pagination.vue'  // 分页组件
    // import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import { requestRecordRate } from '@/service/manage.js'

    export default {
        name: 'audit_rate',
        components: {
            'v-pagination': pagination,
            // 'v-region-select': region,
            'v-search': search,
        },
        data() {
            return {
                tips: '请输入区县名称',
                // 请求表单参数
                phaseForm: {
                    worksName: '',
                    projectId: '',
                    actorGroup: '',
                    actorWay: '',
                    schoolId: ''
                },
                // 按作品查询
                planByWorksList: [],
                // 作品查询分页
                planByWorksPageParam: {
                    pageNum: 1,
                    pageSize: 5,
                    totalNum: 1
                },
                // 区域
                region: {
                    provinceId: null,
                    cityId: null,
                    areaId: null,
                },
                label: '区域',
                ifClear: false
            }
        },
        props: {
            phasePopop: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            },
            currentRow: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            // ...mapState({
            //     detail: state => state.matchDetail.detail,
            // })
        },
        watch: {
            phasePopop: {
                handler: function (val) {
                    if (val.show) {
                        this.ifClear = false
                        this.getMatchRecordRate()
                    }
                },
                deep: true
            },
            'currentRow.identity': {
                handler: function (val) {
                    switch (val) {
                        case '7':
                            this.label = '区域'
                            this.tips = '请输入区县名称'
                            break
                        case '6':
                            this.label = '区域'
                            this.tips = '请输入城市名称'
                            break
                        case '9':
                            this.label = '学校'
                            this.tips = '请输入学校名称'
                            break
                        default:
                            break
                    }
                },
                deep: true
            }
        },
        methods: {
            // 设置关键字搜索
            setPhaseSearch(val) {
                this.phaseForm.worksName = val
                this.getMatchRecordRate()
            },
            // 设置作品查看翻页
            setPlanByWorksPageParam(val) {
                this.$set(this.planByWorksPageParam, 'pageNum', val)
                this.getMatchRecordRate()
            },
            // 进度列表
            getMatchRecordRate() {
                if (Object.keys(this.currentRow).length > 0) {
                    const param = Object.assign({}, this.region, { id: this.currentRow.id })
                    requestRecordRate(param, this.planByWorksPageParam).then((res) => {
                        if (res.data.code === 200) {
                            const _data = res.data.entity || {}
                            this.planByWorksList = _data.resultData || {}
                            this.$set(this.planByWorksPageParam, 'totalNum', _data.totalNum)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }
            },
            // 地区改变
            changeRegion(items) {
                // console.log(items)
                const _region = {}
                const [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.region = _region
                this.getMatchRecordRate()
            },
            viewRate(orgId) {
                this.$emit('callback', { flag: true, orgId: orgId })
            },
            close() {
                this.ifClear = true
                this.region = {
                    provinceId: null,
                    cityId: null,
                    areaId: null
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .audit_rate {
        .tab {
            display: flex;
            width: 200px;
            height: 30px;
            border: 1px solid $theme-color;
            box-sizing: border-box;
            .tab_btn {
                width: 50%;
                line-height: 30px;
                padding: 0;
                border: none;
                color: $theme-color;
                &.active {
                    background-color: $theme-color;
                    color: #fff;
                }
            }
        }
    }
</style>