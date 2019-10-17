<template>
	<div class="stat_compete">
		<section class="options-box">
			<div class="btn-box">
                <button class="export-btn" v-if="items.length > 0" @click="exportList">导出</button>
                <button class="export-btn" v-else @click="exportNoDatas">导出</button>
            </div>
			<div class="select-box">
                <el-form :inline="true" :model="search" label-width="70px">
                    <!-- <el-form-item label="统计分类" v-if="['6', '10'].includes(identity)">
                        <el-select v-model="search.ctType" placeholder="请选择统计分类" filterable clearable>
                            <el-option v-for="item in ctTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域" v-if="['6', '10'].includes(identity)">
                        <el-select v-model="areaIds" placeholder="请选择区域" multiple filterable clearable>
                            <el-option v-for="item in areaOptions" :key="item.code" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="学校" v-if="identity === '7'">
                        <el-select v-model="schoolIds" placeholder="请选择学校" multiple filterable clearable>
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="参赛分类">
                        <el-select v-model="search.projectId" placeholder="请选择参赛分类" filterable clearable>
                            <el-option v-for="item in projectOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="参赛形式">
                        <el-select v-model="search.actorWay" placeholder="请选择参赛形式" filterable clearable>
                            <el-option v-for="item in actorWayDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <!-- <el-form-item label="参赛分组">
                        <el-select v-model="search.actorGroup" placeholder="请选择参赛分组" filterable clearable>
                            <el-option v-for="item in actorGroupDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <!-- <el-form-item label="参赛组别">
                        <el-select v-model="search.groupDisDetailId" placeholder="请选择参赛分组" filterable clearable>
                            <el-option v-for="(item, index) in zbList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="学科">
                        <el-select v-model="search.subjectDisDetailId" placeholder="请选择学科" filterable clearable>
                            <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
		</section>
		<!-- 列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <!-- <el-table-column prop="projectName" label="参赛分类" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="orgName" :label="label" show-overflow-tooltip></el-table-column>
            <el-table-column prop="counts" label="参赛人数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="wkCount" label="参赛作品数"></el-table-column>
        </el-table>
	</div>
</template>

<script>
    // import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import { requestSchoolList, requestLimitRegionByIdentity, requestDictComb } from '@/service/common.js'
    import { projectList } from '@/mixin/projectList.js'
    import { exportDatas } from '@/mixin/exportDatas.js'
    import { requestCompeteStat } from '@/service/manage.js'
    import { mapState } from 'vuex'

    export default {
        name: 'stat_compete',
        mixins: [projectList, exportDatas],
        // components: {
        //     'v-region-select': region
        // },
        data() {
            return {
                items: [],
                search: {
                    ctType: 9,
                    projectId: '', // 参赛分类
                    actorWay: '', // 参赛形式
                    actorGroup: '', // 参赛分组
                    groupDisDetailId: '',
                    subjectDisDetailId: ''
                },
                schoolIds: [],
                areaIds: [],
                cityParam: '',
                areaParam: '',
                schoolParam: '',
                projectOptions: [], // 参赛分类数据
                schoolOptions: [], // 学校数据
                areaOptions: [], // 区域数据
                ctTypeOptions: [],
                region: {},
                identity: '', // 登录用户身份类型
                token: '',
                label: '区域', // 区域或学校
                subjectList: [],
                zbList: []
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                actorGroupDL(state) {
                    const dicList = (state.periodKeyDicList || {}).dicList || []
                    return dicList
                },
                actorWayDL(state) {
                    const dicList = (state.actorWayDicList || {}).dicList || []
                    return dicList
                }
            })
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.identity = this.$ls.get('loginInfo').userInfo.identity.indexOf('_')>0?this.$ls.get('loginInfo').userInfo.identity.split('_')[0]:this.$ls.get('loginInfo').userInfo.identity
                this.token = this.$ls.get('loginInfo').token
                switch (this.identity) {
                    case '6':
                        this.ctTypeOptions = [
                            { id: 7, name: '区县' },
                            { id: 9, name: '学校' }
                        ]
                        this.search.ctType = 7
                        break
                    case '7':
                        this.label = '学校'
                        this.search.ctType = 9
                        this.ctTypeOptions = [
                            { id: 9, name: '学校' }
                        ]
                        break
                    case '9':
                        this.label = '学校'
                        break
                    case '10':
                        this.ctTypeOptions = [
                            { id: 6, name: '市级' },
                            { id: 7, name: '区县' },
                            { id: 9, name: '学校' }
                        ]
                        break
                    default:
                        break
                }
            }
            this.getCompeteStatList()
        },
        mounted() {
            this.dictComb()
            if (this.identity === '7') {
                this.getSchoolList()
            } else if (['6', '10'].includes(this.identity)) {
                this.getAreaList()
            }
        },
        watch: {
            search: {
                handler: function () {
                    switch (this.identity) {
                        case '6':
                            this.getCompeteStatList({ areaIds: this.areaIds })
                            break
                        case '7':
                            this.getCompeteStatList({ schoolIds: this.schoolIds })
                            break
                        case '10':
                            this.getCompeteStatList({ cityIds: this.areaIds })
                            break
                        default:
                            this.getCompeteStatList()
                            break
                    }
                },
                deep: true
            },
            schoolIds: {
                handler: function (val) {
                    if (val.length) {
                        this.schoolParam = JSON.stringify(val)
                        this.getCompeteStatList({ schoolIds: val })
                    }
                },
                deep: true
            },
            areaIds: {
                handler: function (val) {
                    switch (this.identity) {
                        case '6':
                            this.areaParam = JSON.stringify(val)
                            this.getCompeteStatList({ areaIds: val })
                            break
                        case '10':
                            this.cityParam = JSON.stringify(val)
                            this.getCompeteStatList({ cityIds: val })
                            break
                        default:
                            break
                    }
                },
                deep: true
            },
            'search.ctType': {
                handler: function (val) {
                    this.label = val === 9 ? '学校' : '区域'
                }
            }
        },
        methods: {
            dictComb() {
                requestDictComb({
                    groupCode: 'zb'
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.zbList = res.data.entity.dicList
                    }
                })
                requestDictComb({
                    groupCode: 'subjects'
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.subjectList = res.data.entity.dicList
                    }
                })
            },
            // 地区改变
            changeRegion(items) {
                const _region = {}
                const [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.region = _region
            },
            // 获取学校数据
            getSchoolList() {
                requestSchoolList({ areaId: this.$ls.get('baseInfo').baseInfo.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.schoolOptions = res.data.appendInfo.comboxList
                    }
                })
            },
            // 获取市或区县数据
            getAreaList() {
                requestLimitRegionByIdentity({ pcode: this.$ls.get('baseInfo').baseInfo.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.areaOptions = res.data.appendInfo.list
                    }
                })
            },
            // 获取参赛统计数据
            getCompeteStatList(area = {}) {
                const params = Object.assign({}, { matchId: this.$route.query.id }, this.search, area)
                requestCompeteStat(params).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.appendInfo.list
                    } else {
                        this.showMessage('info', res.data.msg)
                    }
                })
            },
            exportList() {
                // 创建input节点，存放导出参数
                const input1 = $('<input>')
                input1.attr('type', 'hidden')
                input1.attr('name', 'matchId')
                input1.attr('value', this.$route.query.id)

                const input2 = $('<input>')
                input2.attr('type', 'hidden')
                input2.attr('name', 'projectId')
                input2.attr('value', this.search.projectId)

                const input3 = $('<input>')
                input3.attr('type', 'hidden')
                input3.attr('name', 'token')
                input3.attr('value', this.token)

                const input4 = $('<input>')
                input4.attr('type', 'hidden')
                input4.attr('name', 'actorGroup')
                input4.attr('value', this.search.actorGroup)

                const input5 = $('<input>')
                input5.attr('type', 'hidden')
                input5.attr('name', 'actorWay')
                input5.attr('value', this.search.actorWay)

                const input7 = $('<input>')
                input7.attr('type', 'hidden')
                input7.attr('name', 'areaIds')
                input7.attr('value', this.areaParam)

                const input8 = $('<input>')
                input8.attr('type', 'hidden')
                input8.attr('name', 'schoolIds')
                input8.attr('value', this.schoolParam)

                const input9 = $('<input>')
                input9.attr('type', 'hidden')
                input9.attr('name', 'cityIds')
                input9.attr('value', this.cityParam)

                const input10 = $('<input>')
                input10.attr('type', 'hidden')
                input10.attr('name', 'ctType')
                input10.attr('value', this.search.ctType)

                const inputs = [input1, input2, input3, input4, input5, input7, input8, input9, input10]
                const url = '/kxsz/maker/matchResult/selectParticipCountExport'
                // const url = '/kxsz/maker/matchWorks/workExport'
                this.exportCommon(url, inputs)
            }
        }
    }
</script>

<style lang="scss">
    .stat_compete {
        .options-box {
            .select-box {
                .el-form--inline {
                    .el-form-item {
                        margin-right: 50px;
                    }
                }
                .el-input__inner {
                    border-radius: 3px;
                    width: 300px;
                }
            }
        }
    }
</style>

<style lang="scss" scoped>
	.stat_compete {
        .options-box {
            margin-bottom: 5px;
            .select-box {
                margin-top: 15px;
            }
        }
	}
</style>
