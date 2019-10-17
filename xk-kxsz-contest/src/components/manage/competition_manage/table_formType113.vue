<template>
    <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="name" label="社团名称" show-overflow-tooltip>
            <template slot-scope="scope">
                <router-link class="a-btn" :to="{path: '/contest/manage/entry/matchDetail', query: Object.assign({}, $route.query, { worksId: scope.row.id }) }">{{scope.row.name}}</router-link>
                <!-- {{scope.row.name}} -->
            </template>
        </el-table-column>
        <el-table-column prop="declareName" label="申报组别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="schoolName" label="学校全称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="学校详细地址"></el-table-column>
        <el-table-column prop="adminName" label="团队负责人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="负责人联系电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phaseName" label="所处阶段" show-overflow-tooltip></el-table-column>
        <el-table-column prop="awardsName" label="奖项" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
                <a class="option-btn" @click="riseOperate({ item: scope.row })">晋级</a>
                <a class="option-btn" @click="openAwardDialog({ item: scope.row })" v-if="!Number(scope.row.isPrize)">评奖</a>
                <a class="option-btn" @click="awardOperate({ item: scope.row })" v-else>撤回评奖</a>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                checkedItems: []
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                sexDL(state) {
                    const dicList = (state.sexDicList || {}).dicList || []
                    return dicList
                }
            })
        },
        props: {
            items: {
                type: Array,
                default: () => []
            },
            openAwardDialog: {
                type: Function,
                default: () => {}
            },
            awardOperate: {
                type: Function,
                default: () => {}
            },
            riseOperate: {
                type: Function,
                default: () => {}
            }
        },
        methods: {
            changeSelection(checked) {
                this.checkedItems = checked
                this.$emit('checked', checked)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .option-btn {
        $h: 18px;
        display: inline-block;
        height: $h;
        line-height: $h;
        padding: 0 1em;
        border-radius: $h;
        background-color: $theme-color;
        color: #fff;
    }
</style>