<template>
	<div class="stat_awards">
		<section class="options-box">
			<div class="btn-box">
				<button class="export-btn" v-if="items.length > 0" @click="exportList">导出</button>
                <button class="export-btn" v-else @click="exportNoDatas">导出</button>
			</div>
			<div class="select-box">
				<el-form :inline="true" :model="search" label-width="70px">
					<el-form-item label="统计分类" v-if="['6', '7', '10'].includes(identity)">
                        <el-select v-model="search.ctType" placeholder="请选择统计分类" filterable clearable>
                            <el-option v-for="item in ctTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域" v-if="['6', '10'].includes(identity)">
                        <el-select v-model="areaIds" placeholder="请选择区域" multiple filterable clearable>
                            <el-option v-for="item in areaOptions" :key="item.code" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
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
                    <el-form-item label="参赛形式">
                        <el-select v-model="search.actorWay" placeholder="请选择参赛形式" filterable clearable>
                            <el-option v-for="item in actorWayDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="参赛分组">
                        <el-select v-model="search.actorGroup" placeholder="请选择参赛分组" filterable clearable>
                            <el-option v-for="item in actorGroupDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="获奖级别">
                        <el-select v-model="search.winLevel" placeholder="请选择获奖级别" filterable>
                            <el-option v-for="item in awardLevelDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
			</div>
		</section>
		<!-- 列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column prop="name" :label="label" show-overflow-tooltip></el-table-column>
            <el-table-column v-for="(col, index) in columns" :label="col.name" :key="col.id" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="checkAwards(scope.row.list, col.name)">
                        <i v-for="(item, index) in scope.row.list" v-if="item.awardsName === col.name">{{item.counts}}</i>
                    </span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
        </el-table>
	</div>
</template>

<script>
    // import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import { requestSchoolList, requestLimitRegionByIdentity } from '@/service/common.js'
    import { requestAwardStatList } from '@/service/manage.js'
    import { projectList } from '@/mixin/projectList.js'
    import { exportDatas } from '@/mixin/exportDatas.js'
    import { setWinLevel } from '@/mixin/setWinLevel.js'
    import { mapState } from 'vuex'

    export default {
        name: 'stat_awards',
        mixins: [projectList, exportDatas, setWinLevel],
        // components: {
        //     'v-region-select': region
        // },
        data() {
            return {
                items: [], // 获奖统计数据
                search: {
                    ctType: 9,
                    projectId: '', // 参赛分类
                    actorWay: '', // 参赛形式
                    actorGroup: '', // 参赛分组
                    winLevel: 10, // 获奖级别
                },
                schoolIds: [],
                areaIds: [],
                areaParam: '',
                schoolParam: '',
                cityParam: '',
                projectOptions: [], // 参赛分类数据
                schoolOptions: [], // 学校数据
                areaOptions: [], // 区域数据
                awardLevelDL: [], // 获奖级别
                ctTypeOptions: [
                    { id: 6, name: '市级' },
                    { id: 7, name: '区县' },
                    { id: 9, name: '学校' }
                ],
                region: {},
                identity: '', // 登录用户身份类型
                label: '区域', // 区域或学校
                columns: [
                    { name: '一等奖', id: '1' },
                    { name: '二等奖', id: '2' },
                    { name: '三等奖', id: '3' }
                ],
                token: '',
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
            }),
            ...mapState('matchDetail', {
                detail(state) {
                    const details = state.detail || {}
                    return details
                }
            }),
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                if(this.$ls.get('loginInfo').userInfo.identity.indexOf('_')>0) this.identity = this.$ls.get('loginInfo').userInfo.identity.split('_')[0]
                else  this.identity = this.$ls.get('loginInfo').userInfo.identity
                this.search.winLevel = this.identity
                this.token = this.$ls.get('loginInfo').token
                switch (this.identity) {
                    case '6':
                        this.label = '区域'
                        this.ctTypeOptions = [
                            { id: 7, name: '区县' },
                            { id: 9, name: '学校' }
                        ]
                        this.search.ctType = 7
                        break
                    case '7':
                        this.label = '学校'
                        this.ctTypeOptions = [
                            { id: 9, name: '学校' }
                        ]
                        this.search.ctType = 9
                        break
                    case '10':
                        this.label = '区域'
                        this.ctTypeOptions = [
                            { id: 6, name: '市级' },
                            { id: 7, name: '区县' },
                            { id: 9, name: '学校' }
                        ]
                        break
                    case '9':
                        this.label = '学校'
                        this.ctTypeOptions = []
                        break
                    default:
                        break
                }
            }
        },
        mounted() {
            if (this.identity === '7') {
                this.getSchoolList()
            } else if (['6', '10'].includes(this.identity)) {
                this.getAreaList()
            }
            // if (this.identity !== '7') {
            //     this.getAwardsStatList()
            // }
            // this.getAwardsStatList()
            if (Object.keys(this.detail).length) {
                this.awardLevelDL = this.setLevel(this.detail, this.identity)
            }
        },
        watch: {
            search: {
                handler: function () {
                    switch (this.identity) {
                        case '6':
                            this.getAwardsStatList({ areaIds: this.areaIds })
                            break
                        case '7':
                            this.getAwardsStatList({ schoolIds: this.schoolIds })
                            break
                        case '10':
                            this.getAwardsStatList({ cityIds: this.areaIds })
                            break
                        default:
                            this.getAwardsStatList()
                            break
                    }
                },
                deep: true
            },
            schoolIds: {
                handler: function (val) {
                    if (val.length) {
                        this.schoolParam = JSON.stringify(val)
                        this.getAwardsStatList({ schoolIds: val })
                    }
                },
                deep: true
            },
            areaIds: {
                handler: function (val) {
                    switch (this.identity) {
                        case '6':
                            this.areaParam = JSON.stringify(val)
                            this.getAwardsStatList({ areaIds: val })
                            break
                        case '10':
                            this.cityParam = JSON.stringify(val)
                            this.getAwardsStatList({ cityIds: val })
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
            },
            detail: {
                handler: function (val) {
                    if (Object.keys(val).length) {
                        this.awardLevelDL = this.setLevel(val, this.identity)
                    }
                },
                deep: true
            }
        },
        methods: {
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
            // 获取获奖名单
            getAwardsStatList(area = {}) {
                const params = Object.assign({}, { matchId: this.$route.query.id }, this.search, area)
                requestAwardStatList(params).then((res) => {
                    if (res.data.code === 200) {
                        this.columns = res.data.appendInfo.awardsList
                        const datas = res.data.appendInfo.list
                        if (datas.length) {
                            const arr = [{ name: datas[0].orgName, list: [] }]
                            for (let i = 1; i < datas.length; i++) {
                                if (datas[i].orgName !== datas[i - 1].orgName) {
                                    arr.push({ name: datas[i].orgName, list: [] })
                                }
                            }
                            for (let i = 0; i < datas.length; i++) {
                                for (let j = 0; j < arr.length; j++) {
                                    if (datas[i].orgName === arr[j].name) {
                                        arr[j].list.push(datas[i])
                                    }
                                }
                            }
                            console.log(arr)
                            this.items = arr
                        } else {
                            this.items = []
                        }
                    } else {
                        this.showMessage('info', res.data.msg, 2000)
                    }
                })
            },
            checkAwards(arr, name) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].awardsName === name) {
                        return true
                    }
                }
                return false
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

                const input6 = $('<input>')
                input6.attr('type', 'hidden')
                input6.attr('name', 'winLevel')
                input6.attr('value', this.search.winLevel)

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

                const inputs = [input1, input2, input3, input4, input5, input6, input7, input8, input9, input10]
                const url = '/kxsz/maker/matchResult/selectVictoryCountExport'
                this.exportCommon(url, inputs)
            }
        }
    }
</script>

<style lang="scss">
	.stat_awards {
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
	.stat_awards {
		.options-box {
			margin-bottom: 5px;
			.select-box {
				margin-top: 15px;
			}
		}
	}
</style>
