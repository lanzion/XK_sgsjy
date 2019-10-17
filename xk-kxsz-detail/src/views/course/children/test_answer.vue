<template>
    <div class="result-wrapper test-wrapper">
            <ul class="questions">
                <li v-for="(question, index) in results" :key="index" class="question-item">
                    <h4 class="question">
                        【{{handleBankType(question.questBank.bankType)}}】{{question.questBank.name}} （{{question.score}}分）</h4>
                    <p class="answer pr">
                        <i :class="[question.isRight === '1' ? 'icon-form-correct' : 'icon-form-error']"
                             class="pa icon-result"></i>
                        <el-radio-group v-if="question.questBank.bankType === 1" v-model="question.myOptions">
                            <el-radio v-for="(answer, i) in question.questBank.options" :label="answer.name" :key="i">
                                {{answer.content}}
                            </el-radio>
                        </el-radio-group>
                        <el-checkbox-group v-else-if="question.questBank.bankType === 2" v-model="question.myOptions">
                            <el-checkbox v-for="(answer, i) in question.questBank.options" :label="answer.name" :key="i">
                                {{answer.content}}
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-radio-group v-if="question.questBank.bankType === 3" v-model="question.myOptions">
                            <el-radio v-for="(answer, i) in options" :label="answer.val" :key="i">{{answer.name}}</el-radio>
                        </el-radio-group>
                    </p>
                    <p class="result" v-if="question.isRight === '1'">正确答案：<span class="right-answer">{{handleRightAnswer(question.rights)}}</span></p>
                    <p class="result" v-else>答案错误</p>
                </li>
                <li v-if="results.length === 0" class="no-data">暂无数据</li>
            </ul>
            <div class="btn-row__result">
                <router-link :to="{path: 'q', query: $route.query}" class="btn">再次练习</router-link>
                <router-link :to="{path: `${pages.detail.course.path}/outline`, query: {id: $route.query.id}}" class="btn">继续练习</router-link>
            </div>
        </div>
</template>

<script>
    import { queryLastTestResult } from '@/service/course.js'

    export default {
        name: 'courseTestAnswer', // 课程考试--答案页面
        data() {
            return {
                options: [
                    { name: '对', val: '1' },
                    { name: '错', val: '0' }
                ],
                results: [],
                sectionId: this.$route.query.sectionId
            }
        },
        computed: {},
        created() {
            this.queryLastTestResult()
        },
        methods: {
            async queryLastTestResult() { // 获取上次考试结果列表
                const res = await queryLastTestResult({ sectionId: this.sectionId })
                if (res.data.code === 200) {
                    const _entity = res.data.entity || {}
                    const _list = _entity.examinationPaperList || []
                    _list.forEach((item) => {
                        item.questBank === null && (item.questBank = {})
                        item.questBank.bankType === 2 && (item.myOptions = item.myOptions.split(',')) // 多选
                    })
                    this.results = _list
                }
            },
            handleBankType(i) { // 处理考题类型
                const source = { 1: '单选', 2: '多选', 3: '判断' }
                return source[i]
            },
            handleRightAnswer(answer) { // 处理正确答案
                if (answer === '1' || answer === '0') {
                    const source = { 1: '对', 0: '错' }
                    return source[answer]
                }
                return answer
            }
        }
    }
</script>

<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
    .test-wrapper .el-radio-group .el-radio {
        min-width: 125px;
        font-size: 12px;
        .el-radio__label {
            font-size: 12px;
        }
        .el-radio__input.is-checked .el-radio__inner {
            border-color: $theme-color;
            background: $theme-color;
        }
    }

    .test-wrapper .el-checkbox-group .el-checkbox {
        min-width: 125px;
        font-size: 12px;
        .el-checkbox__input.is-checked .el-checkbox__inner {
            border-color: #c9c9c9;
            &:after {
                transform: translate(-50%, -50%) scale(1) rotate(0);
            }
        }
        .el-checkbox__inner {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            &:after {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                content: "";
                border: 0;
                background-color: $theme-color;
                transform: translate(-50%, -50%) scale(0) rotate(0);
                transition: transform .15s cubic-bezier(.71, -.46, .88, .6);
            }
        }
        .el-checkbox__label {
            font-size: 12px;
        }
    }
</style>
<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
    .test-wrapper {
        box-sizing: border-box;
        padding: 10px 42px 77px;
        .questions {
            box-sizing: border-box;
            counter-reset: question;
            margin-top: 26px;
            padding: 30px 20px 20px 40px;
            border: 1px solid #c9c9c9;
            .question-item {
                width: 100%;
                font-size: 12px;
            }
            .question {
                line-height: 1.3;
                font-weight: bold;
                &:before {
                    counter-increment: question;
                    content: '（' counter(question) '）';
                    margin-right: 8px;
                }
            }
            .answer {
                box-sizing: border-box;
                height: 50px;
                counter-reset: answer;
                padding: 15px 50px;
                .icon-result {
                    left: 7px;
                    top: 16px;
                    font-size: 18px;
                }
                .el-radio__label {
                    font-size: 12px;
                    &:before {
                        counter-increment: answer;
                        content: counter(answer, upper-alpha) '. ';
                    }
                }
                .el-checkbox__label:before {
                    counter-increment: answer;
                    content: counter(answer, upper-alpha) '. ';
                }
            }
            .result {
                height: 30px;
                line-height: 30px;
                margin-bottom: 20px;
                font-size: 14px;
                background-color: #f0f0f0;
                padding-left: 12px;
                .right-answer {
                    color: #00a0e9;
                }
            }
            .no-data {
                line-height: 4;
                text-align: center;
                font-size: 14px;
            }
        }
        .btn-row {
            margin-top: 40px;
            .btn-submit {
                display: block;
                width: 160px;
                height: 46px;
                line-height: 46px;
                margin: 0 auto;
                padding: 0;
                color: #fff;
                font-size: 16px;
                background: #1a9937;
                background: linear-gradient(to top, #148d2d 0%, #21a742 100%);
            }
        }
        .result-wrapper .questions {
            padding-bottom: 90px;
        }
        .result-wrapper .btn-row__result {
            margin-top: -75px;
            text-align: left;
            padding-left: 40px;
            font-size: 0;
            .btn {
                box-sizing: border-box;
                display: inline-block;
                width: 92px;
                height: 40px;
                line-height: 40px;
                margin-right: 10px;
                text-align: center;
                font-size: 16px;
                border-radius: $button-radiu;
                color: $theme-color;
                border: 1px solid $theme-color;
                &:hover {
                    color: #fff;
                    background-color: $theme-color;
                }
            }
        }
    }

    #courseTest .test-header {
        text-align: center;
        .title {
            font-size: 24px;
        }
        .tip {
            margin-top: 6px;
            font-size: 12px;
            color: #999;
        }
        .countdown {
            margin-top: 22px;
            font-size: 14px;
        }
    }
</style>
