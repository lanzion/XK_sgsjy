<template>
    <div :class="{'is-student': isStudent}" class="study">
        <template v-if="isStudent">
            <div class="sub-nav">
                <span class="total">学习总量：<i
                    class="num blue">{{(relatedData.coursesNum || 0) + (relatedData.projectsNum || 0) + (relatedData.no || 0)}}</i></span>
                <el-radio-group v-model="selected.studyType">
                    <el-radio label="1">课程学习（{{relatedData.coursesNum || 0}}）</el-radio>
                    <el-radio label="2">项目学习（{{relatedData.projectsNum || 0}}）</el-radio>
                    <el-radio label="3">网上实训室学习（{{relatedData.no || 0}}）</el-radio>
                </el-radio-group>
            </div>
            <!--<div class="options-and-search clearfix">
                <div class="options fl">
                    <multi-select :selectData="category" model="project" :ifAll='true' style="width:130px;display:inline-block;"></multi-select>
                    <single-select :selected.sync="selected.technologyId" :single-select-data="{groupCode: 'technicalClassification', 'ifAll': true, placeholder: '选择技术'}" style="width:130px;"></single-select>
                    <single-select :selected.sync="selected.grade" :single-select-data="{groupCode: 'courseGrade', 'ifAll': true, placeholder: '选择级别'}" style="width:130px;"></single-select>
                </div>
                <div class="sum fr">总计：<span class="red">21563</span></div>
            </div>-->
        </template>
        <!--<div v-else class="sum fr">学习总量：<span class="red">{{pageParam.totalNum}}</span></div>-->
        <div class="list-wrapper">
            <ul class="clearfix" v-if="lists.length">
                <list-row v-for="(item, index) in lists" :item="item" :item-height="isStudent ? 150 : 118" :key="index">
                    <div slot="content" class="content table-cell">
                        <figure :style="{'width': coverSize.width + 'px', 'height': coverSize.height + 'px'}" class="pic table-cell pr">
                            <img :src="getFileUrl(item.cover) || listDefault" :width="coverSize.width" :height="coverSize.height" alt="">
                        </figure>
                        <div class="main table-cell">
                            <p>
                                学习{{dynamicLinks.name}}：
                                <a @click="redirect(pages.detail[dynamicLinks.link], { query: { id: item.busId } })" :title="item.busName"
                                                         class="blue">{{item.busName}}
                                </a>
                            </p>
                            <p>学习时长（天）：{{item.studyLength || 0}}</p>
                            <template v-if="isStudent">
                                <p>自评等级：<span class="red">{{item.evaluationGrade}}</span></p>
                                <p>自评语：{{item.remark | textOverflow(30, '......')}}</p>
                            </template>
                            <p v-if="item.studyResultList && item.studyResultList.length">学习成果：
                                <a v-for="(result, i) in item.studyResultList" :key="i" :title="result.worksName" @click="redirect(pages.detail.works, { query: {id: result.worksId} })" class="achievement-item blue">
                                    {{result.worksName}}
                                </a>
                            </p>
                            <p v-else>
                                学习成果：暂无学习成果
                            </p>
                            <div v-if="isStudent" slot="operate" class="operate pa">
                                <a v-if="!!item.isEvalua" @click="goToEvaluate(item)" class="btn" href="javascript:;">去评价</a>
                            </div>
                        </div>
                    </div>
                </list-row>
            </ul>
            <div v-else class="no-data">暂无数据</div>
            <pagination :param="pageParam" @callback="changePage"></pagination>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { requestStudyList } from '@/service/my.js'
    import pagination from 'components/common/pagination.vue'
    import listRow from 'Common/list/list_row.vue'
    import multiSelect from '@/components/common/select/multi_select.vue'
    import singleSelect from '@/components/common/select/single_select.vue'

    export default {
        name: 'personStudy', // 教师/学生空间-学习

        data() {
            return {
                category: [], // 分类
                isStudent: false,
                lists: [], // 列表
                pageParam: { // 分页数据
                    pageSize: 5,
                    pageNum: 1,
                    totalNum: 0
                },
                selected: { // 接口所需数据
                    orgId: this.$route.query.id || '',
                    studyType: '1',
                }
            }
        },
        computed: {
            ...mapState('teacherAndStudent', ['relatedData']),

            dynamicLinks() {
                const source = {
                    1: { name: '课程', link: 'course' },
                    2: { name: '项目', link: 'project' },
                    3: { name: '实训', link: 'train' }
                }

                return source[this.selected.studyType]
            },

            coverSize() {
                const width = this.isStudent && 168 || 120
                const height = this.isStudent && 118 || 86
                return { width, height }
            }
        },

        created() {
            this.isStudent = this.$route.path.includes('student')
            this.requestList()
        },

        components: {
            pagination,
            listRow,
            multiSelect,
            singleSelect
        },

        methods: {
            async requestList() { // 获取列表数据
                const res = await requestStudyList({
                    ...this.pageParam,
                    ...this.selected,
                    identity: this.isStudent && '0' || '1'
                })

                if (res.status === 200 && res.data.code === 200) {
                    const { resultData, totalNum } = res.data.entity || {}
                    this.lists = resultData || []
                    this.pageParam.totalNum = totalNum || 0
                }
            },

            goToEvaluate({ busName, id, studyResultList }) { // 进入空间评价系统
                const _resultList = (studyResultList || []).map(list => ({ worksId: list.worksId, worksName: list.worksName }))
                // const _path = '/space/student/study/eval'
                const { query } = this.$route

                const options = {
                    beCommentedId: query.uid || '',
                    busId: id,
                    busName,
                    resultList: _resultList,
                    target: this.selected.studyType
                }
                this.$ls.set('curEvaluatingItem', options)
                // this.$router.push({path: _path, query})
                this.redirect(this.pages.detail.studyEval, { query: query })
            },

            changePage(val) {
                this.pageParam.pageNum = val
                this.requestList()
            }
        },

        watch: {
            selected: {
                handler() {
                    if (this.pageParam.pageNum !== 1) {
                        this.pageParam.pageNum = 1
                        return false
                    }

                    this.requestList()
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss">
  @import '~@/assets/css/scss/form.scss';
</style>

<style lang="scss" scoped>
    .sub-nav {
        margin-bottom: 16px;
    }

    .is-student {
        .sum {
            line-height: 34px;
            margin-top: 0;
        }
        .list-wrapper {
            /*margin-top: 10px;
            border-top: 1px solid #c9c9c9;*/
        }
    }

    .sum {
        font-size: 14px;
        line-height: 34px;
        margin-top: -50px;
        .red {
            color: #d00;
        }
    }

    .list-wrapper .list-item {
        box-sizing: border-box;
        height: 108px;
        font-size: 14px;
        p {
            line-height: 1.8;
        }
        .red {
            color: #d00;
        }
    }

    .achievement-item {
        margin-right: 10px;
    }

    .study:not(.is-student) {
        padding-top: 0;
        .list-item {
            /*float: left;
            width: 50%;
            border-bottom: 0;
            .content {
                padding-right: 15px;
            }*/
            .pic {
                padding-right: 15px;
            }
        }
    }
</style>
