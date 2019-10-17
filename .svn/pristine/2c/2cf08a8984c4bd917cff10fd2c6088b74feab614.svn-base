<template>
    <div class="back-stage__container">
        <!-- <v-tab :tabs.sync="tabs" :router="tabRouter" :cur_tab="curTab"></v-tab> -->
        <section class="backend-content__middle" v-for="(tab, index) in tabs" :key="index">
            <v-tab :tabs="[tab]"></v-tab>
            <ul class="backlog-wrap">
                <router-link tag="li" :to="item.url" class="backlog-box table-layout" v-for="(item, i) in typeHeadBtnGroup[index].children" :key="item.id">
                    <div class="backlog-item table-cell">
                        <i :class="[`icon-admin-i-${item.menuId}`, 'icons']"></i>
                        <span class="backlog-item-txt">{{item.name}}<el-badge class="mark" :value="backlog[item.menuId]" /></span>
                    </div>
                </router-link>
            </ul>
        </section>
    </div>
</template>

<script>
    import { requestBacklogModelNum } from '@/service/common.js'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import tabs from '@/components/common/tabs.vue'

    export default {
        name: 'indexView',
        mixins: [
            subPermission
        ],
        computed: {
            tabs: function() {
                let result = this.typeHeadBtnGroup.map(x => {
                    return {
                        name: x.name
                    }
                })
                return result
            }
        },
        components: {
            'v-tab': tabs
        },
        data() {
            return {
                count: {
                    project: 'projectNum',
                    course: 'courseNum',
                    activity: 'activityNum',
                    works: 'workNum',
                    resource: 'resourceNum',
                    story: 'storyNum',
                    demand: 'demandNum',
                    service: 'serveNum',
                    plan: 'businessPlanNum',
                    interest: 'interestNum',
                    studio: 'studioNum',
                    student: 'studentNum',
                    teacher: 'teacherNum',
                    enterprise: 'enterpriseNum',
                    investor: 'investorNum',
                    investOrg: 'investorgNum',
                    mult: 'multNum',
                    enroll: 'eduNum'
                },
                backlog: {}
            }
        },
        created() {
            this.requestBacklogModelNum()
        },
        methods: {
            requestBacklogModelNum() {
                requestBacklogModelNum().then(response => {
                    if (response.data.code === 200) {
                        let _data = response.data.appendInfo.item
                        for (let key in this.count) {
                            this.$set(this.backlog, key, _data[this.count[key]])
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .back-stage__container {
        min-width: 930px;
        margin: 0 16px;
    }
    .backlog-wrap {
        margin: 0 -7px;

        $height: 136px;
        .backlog-box {
            display: inline-block;
            width: 20%;
            height: $height;
            margin-bottom: 14px;
        }

        .backlog-item {
            display: block;
            height: 100%;
            margin: 0 7px;
            border: 1px solid #dfdfdf;
            border-radius: 4px;
            line-height: $height;
            font-size: 0;
            background-color: #eee;
            text-align: center;
            cursor: pointer;

            &:hover {
                &,
                .icons {
                    background-color: #ebf2f4;
                    color: #0895e8;
                }
            }

            .icons {
                display: inline-block;
                width: 35%;
                padding-right: 10px;
                line-height: $height;
                box-sizing: border-box;
                font-size: 40px;
                text-align: right;
                vertical-align: top;
            }

            .backlog-item-txt {
                display: inline-block;
                width: 65%;
                font-size: 18px;
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
            }

            .mark {
                top: 3px;
                vertical-align: top;
            }
        }
    }
</style>

<style lang='scss'>
@import '~@/assets/css/scss/table.scss';
@import '~@/assets/css/scss/admin_back-stage_content.scss';
</style>