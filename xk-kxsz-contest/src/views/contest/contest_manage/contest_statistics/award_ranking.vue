<template>
	<div class="stat_ranking">
		<section class="options-box">
			<div class="btn-box">
                <button class="export-btn" v-if="items.length > 0" @click="exportList">导出</button>
                <button class="export-btn" v-else @click="exportNoDatas">导出</button>
            </div>
			<div class="select-box">
                <el-form :inline="true" :model="search" label-width="70px">
                    <el-form-item label="统计分类" v-if="['6', '10'].includes(identity)">
                        <el-select v-model="search.ctType" placeholder="请选择统计分类" filterable clearable>
                            <el-option v-for="item in ctTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="获奖级别">
                        <el-select v-model="search.winLevel" placeholder="请选择获奖级别" filterable>
                            <el-option v-for="item in awardLevelDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="60px" v-if="awardsList.length">
                    <el-form-item v-for="(item, index) in awardsList" :label="item.name" :key="item.id">
                        <el-input-number v-model="item.score" placeholder="分值" :min="0" :max="10" style="width: 150px;"/>
                    </el-form-item>
                    <el-form-item>
                        <a class="search-btn" href="javaScript:;" @click="getAwardRankList">查询</a>
                    </el-form-item>
                </el-form>
            </div>
		</section>
		<!-- 列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column prop="sort" label="排名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="orgName" :label="label" show-overflow-tooltip></el-table-column>
            <el-table-column prop="score" label="分值"></el-table-column>
        </el-table>
	</div>
</template>

<script>
    import { requestAwardRankList, requestAwards } from '@/service/manage.js'
    import { exportDatas } from '@/mixin/exportDatas.js'
    import { setWinLevel } from '@/mixin/setWinLevel.js'
    import { mapState } from 'vuex'

    export default {
        name: 'stat_ranking',
        components: {},
        mixins: [exportDatas, setWinLevel],
        data() {
            return {
                items: [],
                winLevel: '',
                search: {
                    ctType: 9,
                    winLevel: '', // 获奖级别
                },
                score: {
                    first: '',
                    second: '',
                    third: '',
                    excellent: ''
                },
                identity: '', // 登录用户身份类型
                token: '',
                awardsList: [],
                awardsListParams: '',
                awardLevelDL: [], // 获奖级别数据
                label: '区域' // 区域或学校
            }
        },
        computed: {
            ...mapState('matchDetail', {
                detail(state) {
                    const details = state.detail || {}
                    return details
                }
            }),
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.identity = this.$ls.get('loginInfo').userInfo.identity.indexOf('_')>0?this.$ls.get('loginInfo').userInfo.identity.split('_')[0]:this.$ls.get('loginInfo').userInfo.identity
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
                        this.ctTypeOptions = []
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
                    default:
                        break
                }
            }
        },
        mounted() {
            // this.getAwards()
            if (Object.keys(this.detail).length) {
                this.awardLevelDL = this.setLevel(this.detail, this.identity)
            }
        },
        watch: {
            'search.winLevel': {
                handler: function () {
                    this.getAwards()
                },
                deep: true
            },
            'search.ctType': {
                handler: function (val) {
                    this.label = val === 9 ? '学校' : '区域'
                },
                deep: true
            },
            awardsList: {
                handler: function (val) {
                    const arr = []
                    for (let i = 0; i < val.length; i++) {
                        arr.push({ id: val[i].id, score: val[i].score, index: i, startScale: val[i].startScale, endScale: val[i].endScale, name: val[i].name })
                    }
                    this.awardsListParams = JSON.stringify(arr)
                },
                deep: true
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
            // 获取奖项数据
            getAwards() {
                requestAwards({ matchId: this.$route.query.id, ctType: this.search.ctType, winLevel: this.search.winLevel }).then((res) => {
                    if (res.data.code === 200 && res.data.appendInfo != null) {
                        this.awardsList = res.data.appendInfo.awardsList
                        // this.getAwardRankList()
                    } else {
                        this.awardsList = []
                        this.items = []
                    }
                })
            },
            // 获取获奖排名数据
            getAwardRankList() {
                const awardsList = []
                for (let i = 0; i < this.awardsList.length; i++) {
                    awardsList.push({ id: this.awardsList[i].id, score: this.awardsList[i].score, index: i, startScale: this.awardsList[i].startScale, endScale: this.awardsList[i].endScale, name: this.awardsList[i].name })
                }
                const params = Object.assign({}, { matchId: this.$route.query.id }, this.search, { awardsList: awardsList })
                requestAwardRankList(params).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.appendInfo.list
                    } else {
                        this.showMessage('info', res.data.msg, 2000)
                    }
                })
            },
            // 导出数据
            exportList() {
                const input1 = $('<input>')
                input1.attr('type', 'hidden')
                input1.attr('name', 'matchId')
                input1.attr('value', this.$route.query.id)

                const input2 = $('<input>')
                input2.attr('type', 'hidden')
                input2.attr('name', 'ctType')
                input2.attr('value', this.search.ctType)

                const input3 = $('<input>')
                input3.attr('type', 'hidden')
                input3.attr('name', 'token')
                input3.attr('value', this.token)

                const input4 = $('<input>')
                input4.attr('type', 'hidden')
                input4.attr('name', 'winLevel')
                input4.attr('value', this.search.winLevel)

                const input5 = $('<input>')
                input5.attr('type', 'hidden')
                input5.attr('name', 'awardsList')
                input5.attr('value', this.awardsListParams)

                const inputs = [input1, input2, input3, input4, input5]
                const url = '/kxsz/maker/matchResult/selectVictoryTopExport'
                this.exportCommon(url, inputs)
            }
        }
    }
</script>

<style lang="scss">
    .stat_ranking {
        .options-box {
            .select-box {
                .el-radio-group {
                    margin-bottom: 12px;
                    .el-radio {
                        margin-right: 40px;
                    }
                }
            }
        }
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
	.stat_ranking {
        .options-box {
            margin-bottom: 5px;
            .select-box {
                margin-top: 15px;
            }
        }
        .search-btn {
            padding: 6px 13px;
            border-radius: 3px;
            background-color: $theme-color;
            color: #fff;
            &:hover {
                opacity: 0.75;
            }
        }
	}
</style>
