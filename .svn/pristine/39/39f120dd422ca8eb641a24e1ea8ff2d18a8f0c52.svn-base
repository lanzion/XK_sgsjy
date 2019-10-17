<template>
    <div id="screeningTabs">
        <div class="tab bgw">
            <h3 class="tab_title" v-text="datas.tab_title"></h3>
            <ul class="clearfix">
                <li class="tab_list" v-for="(item, index) in tabsData" v-text="item.name" :class="{active:index == curId}" @click="listenCurTab(index, item.id)" :key="index">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { requestBackendSubjectList } from '@/service/subject.js'

export default {
    name: 'screeningTabs',
    data() {
        return {
            curId: 0,
            tabsData: [],
            datas: {}
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            subjectLevelDicList: 'subjectLevelDicList',
            resultTypeDicList: 'resultTypeDicList'
        })
    },
    created() {
        const strNum = this.$route.path.lastIndexOf('/')
        const _route = this.$route.path.substring(strNum)

        switch (_route) {
            case '/guide':
                this.datas = { tab_title: '课题级别', tabType: 'guide' }
                break
            case '/research':
                this.datas = { tab_title: '当前阶段', tabType: 'research' }
                break
            case '/activity':
                this.datas = { tab_title: '所属课题', tabType: 'activity' }
                break
            case '/results':
                this.datas = { tab_title: '成果类型', tabType: 'results' }
                break
            case '/resource':
                this.datas = { tab_title: '资源类型', tabType: 'resource' }
                break
            default:
                this.datas = {}
                break
        }
        this.getTabs(this.datas.tabType)
    },
    mounted() {
        this.listenCurTab(0, '')
    },
    methods: {
        ...mapActions('subject', ['setTabsId']),
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        listenCurTab: function (index, paramsVal) {
            this.curId = index
            this.setTabsId(paramsVal)
        },
        getTabs(flag) {
            if (flag === 'guide') {
                this.tabsData = [{ id: '', name: '全部级别' }].concat(this.subjectLevelDicList.dicList)
            } else if (flag === 'resource') {
                // 资源类型 (1.课题申报指南附件, 2.课题申报指南资源, 3.课题申报附件, 4.阶段成果, 5.课题成果, 6课题任务)
                this.tabsData = [
                    { id: '', name: '全部资源' },
                    { id: 1, name: '课题申报指南附件' },
                    { id: 2, name: '课题申报指南资源' },
                    { id: 3, name: '课题申报附件' },
                    { id: 4, name: '阶段成果' },
                    { id: 5, name: '课题成果' },
                    { id: 6, name: '课题任务' }
                ]
            } else if (flag === 'activity') {
                requestBackendSubjectList({ orgId: this.$route.query.id }, { pageSize: 10, pageNum: 1 }).then((res) => {
                    const result = res.data.entity.resultData
                    for (const i in result) {
                        const obj = {}
                        obj.name = result[i].name
                        obj.id = result[i].id
                        this.tabsData.push(obj)
                    }
                    this.tabsData.unshift({ id: '', name: '全部活动' })
                })
            } else if (flag === 'research') {
                this.tabsData = [
                    { id: '', name: '全部状态' },
                    { id: '1', name: '立项' },
                    { id: '2', name: '开题' },
                    { id: '3', name: '中期评估' },
                    { id: '4', name: '结题验收' },
                    { id: '5', name: '已结束' }
                ]
            } else {
                this.tabsData = [{ id: '', name: '全部类型' }].concat(this.resultTypeDicList.dicList)
            }
        }
    }
}

</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$tab-width: 200px;
#information {
    position: relative;
    width: 100%;
}
.tab {
    position: absolute;
    top: 0;
    left: 0;
    width: $tab-width;
    // border: 1px solid #CFCFCF;
    .tab_title {
        height: 42px;
        line-height: 42px;
        // background-color: #F6F6F6;
        font-size: 18px;
        text-indent: 14px;
        border-bottom: 1px solid #E5E5E5;
    }
    .tab_list {
        height: 42px;
        line-height: 42px;
        text-indent: 40px;
        overflow: hidden;
        font-size: 14px;
        cursor: pointer;
        box-sizing: border-box;
        border-left: 2px solid transparent;
        &.active {
            color: nth($default-color, 1);
            border-color: nth($default-color, 1);
            background-color: nth($default-color, 3);
        }
    }
}
</style>
