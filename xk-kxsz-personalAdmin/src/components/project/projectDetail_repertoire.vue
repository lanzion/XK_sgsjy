<template>
    <section id="repertoire" class="bgw">
        <div class="inventory-list">
            <el-row class="mb">
                <el-col :span="3">【项目目标】：</el-col>
                <el-col :span="20">{{ detail.goal }}</el-col>
            </el-row>
            <el-row class="mb">
                <el-col :span="3">【项目期限】：</el-col>
                <el-col :span="20">
                    {{ detail.startDate | dateFormat('yyyy-MM-dd') }} 至 {{ detail.endDate | dateFormat('yyyy-MM-dd') }}
                    <ul class="mt">
                        <li v-for="(item, index) in detail.projectPhaseList" class="mb">
                        {{ stage[index] }} :
                        {{ item.phaseStartTime | dateFormat('yyyy-MM-dd') }} 至 {{ item.phaseEndTime | dateFormat('yyyy-MM-dd') }}
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <el-row class="mb">
                <el-col :span="3">【报名时间】：</el-col>
                <el-col :span="20">
                    {{ detail.enrollStartDate | dateFormat('yyyy-MM-dd HH:mm:ss') }} 至 {{ detail.enrollEndDate | dateFormat('yyyy-MM-dd HH:mm:ss') }}
                </el-col>
            </el-row>
            <el-row class="mb">
                <el-col :span="3">【项目内容】：</el-col>
                <el-col :span="20" class="break-word">
                    {{ detail.content }}
                </el-col>
            </el-row>
            <el-row class="mb">
                <el-col :span="3">【<span class="w56 text-justify">发起人</span>】：</el-col>
                <el-col :span="20">
                    {{ detail.createName }}
                </el-col>
            </el-row>
            <el-row class="mb">
                <el-col :span="3">【项目分类】：</el-col>
                <el-col :span="20">
                    {{ detail.projectTypeName }}
                </el-col>
            </el-row>
            <el-row class="mb">
                <el-col :span="3">【项目人数】：</el-col>
                <el-col :span="20">
                    {{ detail.totalNum }}
                </el-col>
            </el-row>
            <el-row class="mb">
                <el-col :span="3">【适合学生】：</el-col>
                <el-col :span="20">
                    {{ detail.applyScopeId | translate(applyScopeDL, {key: 'id'}) }}
                </el-col>
            </el-row>
            <el-row class="mb">
                <el-col :span="3">【材料清单】：</el-col>
                <el-col :span="20" class="break-word">
                    {{ detail.materialList }}
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
// import tabs from 'Common/classificationList/classification/tabs.vue'
import { detailProject } from '@/service/project.js'
// import dataTranslation from 'Asset/js/dataTranslation.js'

export default {
    name: 'projectDetailRepertoire',
    data() {
        return {
            items: {},
            applyScopeId: '',
            // projectDetail: '',
            stage: [
                '项目发起',
                '项目准备',
                '项目设计',
                '原型制作',
                '测试迭代',
                '项目评价'
            ],
            detail: {
                applyScopeId: ''
            }
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            applyScopeDL(state) {
                const dicList = (state.periodKeyDicList || {}).dicList || []
                return dicList
            }
        })
    },
    mounted() {
        this.begin()
    },
    props: {
        projectDetail: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        begin() {
            if (Object.keys(this.projectDetail).length === 0) {
                detailProject({ id: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        this.detail = _data
                    }
                })
            } else {
                this.detail = this.projectDetail
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.w56 {
    width: 56px;
    display: inline-block;
}
.inventory-list {
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    .mb {
        margin-bottom: 15px;
    }
    .mt {
        margin-top: 15px;
    }
}
</style>
