<template>
    <div class="back-stage__container">
        <!-- <v-tab :tabs.sync="tabs" :router="tabRouter" :cur_tab="curTab"></v-tab> -->
        <section class="backend-content__middle" v-for="(tab, index) in tabs" :key="index">
            <v-tab :tabs="[tab]"></v-tab>
            <ul class="backlog-wrap">
                <router-link tag="li" :to="item.url" class="backlog-box table-layout" v-for="(item, i) in typeHeadBtnGroup[index].children" :key="item.id">
                    <div class="backlog-item table-cell">
                        <i :class="[`icon-admin-i-${item.menuId}`]"></i>
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
    // import { setTabs } from '@/mixin/setTabs.js'
    import tabs from 'Common/classificationList/classification/tabs.vue'
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
                    studio: 'studioNum'
                },
                backlog: {}
            }
        },
        created() {
            this.requestBacklogModelNum()
        },
        methods: {
            routeChange() {
            },
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
        },
        watch: {
            "$route": 'routeChange'
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
                [class^="icon-admin-i-"],
                [class*=" icon-admin-i-"] {
                    background-color: #ebf2f4;
                    color: #0895e8;
                }
            }

            [class^="icon-admin-i-"],
            [class*=" icon-admin-i-"] {
                display: inline-block;
                width: 40%;
                padding-right: 10px;
                line-height: $height;
                box-sizing: border-box;
                font-size: 40px;
                text-align: right;
                vertical-align: top;
            }

            .backlog-item-txt {
                display: inline-block;
                width: 60%;
                font-size: 18px;
                text-align: left;
            }

            .mark {
                top: 3px;
            }
        }
    }
</style>

<style lang='scss'>
@import '~@/asset/scss/table.scss';
@import '~@/asset/scss/admin_back-stage_content.scss';
</style>