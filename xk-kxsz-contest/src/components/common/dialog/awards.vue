<template>
    <el-dialog title="评奖" :visible.sync="awardVisi.show" @close="close">
        <div class="awards">
            <div class="radio-box">
                <el-radio-group v-model="awardId" v-if="awardsList.length">
                    <el-radio v-for="(item, index) in awardsList" :label="item.id" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
                <div v-else class="empty-block">暂无奖项</div>
            </div>
            <div class="btn-box">
                <button type="button" class="comfire-btn" @click="awardsAdd">确定</button>
                <button type="button" class="cancel-btn" @click="close">取消</button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import { requestAwardsByPhase, addAwards, requestOfflineAwardsList, doAwardsOpus } from '@/service/manage.js'

    export default {
        data() {
            return {
                type: Number(this.$route.query.type),
                awardId: null,
                awardsList: []
            }
        },
        props: {
            awardVisi: {
                type: Object,
                default() {
                    return { show: false }
                }
            },
            param: {
                type: Object,
                default() {
                    return {}
                }
            },
            params: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        watch: {
            awardVisi: {
                handler: function (val) {
                    if (val.show === true) {
                        this.getAwardsList()
                    }
                },
                deep: true
            }
        },
        mounted() {
        },
        methods: {
            close() {
                this.awardVisi.show = false
                this.awardId = null
            },
            // 获取奖项数据
            getAwardsList() {
                let handler
                const params = { matchId: this.$route.query.id }
                switch (this.type) {
                    case 2:
                        handler = requestOfflineAwardsList
                        break
                    default:
                        handler = requestAwardsByPhase
                        Object.assign(params, { phaseId: this.param.phaseId })
                        break
                }
                handler(params).then((res) => {
                    if (res.data.code === 200) {
                        this.awardsList = res.data.entity || res.data.appendInfo.awardsList
                    }
                })
            },
            awardsAdd() {
                if (this.awardId != null) {
                    switch (this.type) {
                        case 2:
                            this.addAwardsOffline()
                            break
                        default:
                            this.addAwardsOnline()
                            break
                    }
                } else {
                    this.showMessage('info', '请选择奖项')
                }
            },
            addAwardsOnline() {
                let awardsName
                for (let i = 0; i < this.awardsList.length; i++) {
                    if (this.awardId === this.awardsList[i].id) {
                        awardsName = this.awardsList[i].name
                        break
                    }
                }
                const params = {
                    matchId: this.$route.query.id,
                    phaseId: this.param.phaseId,
                    phaseName: this.param.phaseName,
                    worksId: this.param.worksId,
                    authorId: this.param.authorId,
                    awardsId: this.awardId,
                    awardsName: awardsName
                }
                addAwards(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '评奖成功')
                        this.awardVisi.show = false
                        this.$emit('callback')
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            },
            addAwardsOffline() {
                const _params = []
                this.params.forEach((x) => {
                    _params.push({
                        opusId: x.id,
                        awards: {
                            id: this.awardId
                        }
                    })
                })
                doAwardsOpus(_params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '评奖成功')
                        this.awardVisi.show = false
                        this.$emit('callback')
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .awards {
        .radio-box {
            .el-radio-group {
                display: block;
                .el-radio {
                    display: block;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .el-radio + .el-radio {
                    margin-left: 0px;
                }
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .awards {
        padding: 10px 0px;
    }
    .btn-box {
        text-align: right;
        margin-top: 20px;
        button {
            width: 63px;
            height: 30px;
            box-sizing: border-box;
            border: none;
            border-radius: 3px;
            margin-left: 10px;
        }
    }
    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .btn-box {
                .comfire-btn {
                    background-color: $color-value;
                    color: #fff;
                    &:hover {
                        opacity: 0.75;
                    }
                }
                .cancel-btn {
                    border: 1px solid $color-value;
                    color: $color-value;
                    &:hover {
                        color: #fff;
                        background-color: $color-value;
                    }
                }
            }
        }
    }
</style>