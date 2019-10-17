<template>
    <section class="evaluation">
        <article class="rate-header">
            <header class="evaluation-title">
                <h6 class="rate-title" v-if="evaluateData.name != ''">{{evaluateData.name}}评价 <span class="eval-num"> ({{evaluationDatas.totalEvalu}})</span></h6>
            </header>
            <div class="rate-header-content table-layout">
                <section class="rate-score table-cell">
                    <span class="rate-score-num"><em v-text="evaluationDatas.avgEvalu?evaluationDatas.avgEvalu:0"></em>分</span>
                    <el-rate v-model="evaluationDatas.avgEvalu" disabled :colors="rate_color"></el-rate>
                    <p class="rate-score-total">共<em>{{evaluationDatas.totalEvalu}}</em>人评价</p>
                </section>
                <section class="rate-graph table-cell">
                    <ul class="rate-graph-level">
                        <li class="rate-graph-item" v-for="(sCount, cIndex) in evaluationDatas.scoreCount" :key="cIndex">
                            <dd class="rate-item-title">{{sCount.name}}（{{sCount.ct || 0}}）</dd>
                            <dt class="rate-item-chart">
                                <div class="rate-chart-bg">
                                    <div class="rate-chart-bar" :style="{width: (sCount.ct/evaluationDatas.totalEvalu*100).toFixed(2) + '%'}"></div>
                                </div>
                            </dt>
                        </li>
                    </ul>
                </section>
                <ul class="rate-tag table-cell">
                    <li class="rate-tag-item" v-for="(tags, index) in dicTags" v-bind:class="{'active': curTagId === tags.id}" @click="changeTag(tags.id)" :key="index">{{tags.name}}<span v-for="(optionCount, cIndex) in evaluationDatas.optionCount" v-if="optionCount.labelId == tags.id" :key="cIndex">（{{optionCount.evalNum}}）</span></li>
                </ul>
            </div>
        </article>
        <article class="evaluation-form">
            <form>
                <!-- <el-form-item label="我的评分是：" prop="rate">
                    <el-rate :colors="rate_color" v-model="addEvaluateForm.rate"></el-rate>
                </el-form-item>
                <el-form-item label="" prop="evalType" class="el-form-tags">
                    <el-checkbox-group v-model="addEvaluateForm.evalType">
                        <el-checkbox v-for="tags in dicTags" :label="tags.code" :key="tags">
                            <el-tag>{{tags.name}}</el-tag>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="" prop="content">
                    <el-input type="textarea" v-model="addEvaluateForm.content" placeholder="评论内容不超过100字" :rows="3"></el-input>
                </el-form-item> -->
                <p>我的评分是：<el-rate :colors="rate_color" v-model="addEvaluateForm.rate"></el-rate></p>
                <div class="el-form-tags">
                    <el-checkbox-group v-model="addEvaluateForm.evalType">
                        <el-checkbox v-for="(tags, k) in dicTags" :label="tags.id" :key="k">
                            <el-tag>{{tags.name}}</el-tag>
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
                <el-input type="textarea" v-model="addEvaluateForm.content" placeholder="评论内容不超过100字" :rows="3"></el-input>
                <div class="btn-group">
                    <button type="reset" class="i-form-button is-plain" @click="resetEvaluate">取消</button>
                    <button type="button" class="i-form-button" @click="addEvaluate">发表</button>
                </div>
            </form>
        </article>
        <article class="evaluation-content">
            <header class="evaluation-title">
                <el-radio-group v-model="curStar" @change="evaluateListPageNum = 1; getEvaluateList()">
                    <el-radio v-for="(choiceStar, index) in choiceStars" :key="index" :label="choiceStar.orders">{{choiceStar.name}}（{{choiceStar.ct}}）</el-radio>
                </el-radio-group>
            </header>
            <div class="isNull-list" v-if="evaluationList.length==0">暂无评价</div>
            <ul class="evaluation-list" v-else>
                <li class="evaluation-item clearfix" v-for="(list, lIndex) in evaluationList" :key="lIndex">
                    <a class="evaluation-item-people" :title="list.userName">
                        <img :src="getFileUrl(list.face || list.url) || faceDefault" alt="" class="evaluation-item-head circle">
                        <label class="evaluation-item-name">{{list.userName || '暂无'}}</label>
                    </a>
                    <div class="btn-group" v-if="list.createId != userId">
                        <v-report :report-data="{'url': 'maker/onlineTrainRoomEvaluateReport/add', params: {'trainId': list.id }}"></v-report>
                    </div>
                    <section class="evaluation-item-details">
                        <el-rate v-model="list.score" disabled :colors="rate_color"></el-rate>
                        <p class="evaluation-item-content">{{list.content}}</p>
                        <ul class="evaluation-item-tags">
                            <li v-for="(tags, index) in dicTags" :key="index"><el-tag v-for="(et, eIndex) in list.evalType" :key="eIndex" v-if="et == tags.id">{{tags.name}}</el-tag></li>
                        </ul>
                        <time class="pulish-time">{{list.createTime | dateFormat('yyyy.MM.dd')}}</time>
                    </section>
                </li>
            </ul>
            <div class="load-more" v-if="curTotalEvalu > evaluationList.length" @click="evaluateListPageNum++; getEvaluateList()"><i class="icon-btn-i-more"></i>加载更多</div>
        </article>
    </section>
</template>

<script>
let color = {
    red: ['#f85959', '#fee0e0'],
    grassGreen: ['#2cbb61', '#e2fbde']
};
import report from 'Common/report.vue'
import {requestEvalLabelList} from '@/service/common.js'

export default {
    name : 'detailEvaluation',
    components:{
        'v-report': report
    },
    data() {
        return {
            rate_color: [],             // 星级颜色
            dicStar: [],                // 统计区域星级字典
            choiceStars: [],            // 评价列表选择星级
            dicTags: [],                // 标签字典
            evaluationDatas: {},        // 评价统计数据
            evaluationList: [],         // 评价列表数据
            curStar: null,              // 评价列表当前选择星级
            addEvaluateForm: {
                rate: 5,                // 发布评价选择星级
                content: null,          // 发布评价内容
                evalType: [],           // 发布评价选择标签
            },
            addEvaluateRules: {
                rate: [
                    { required: true, message: '请选择星级评价', trigger: 'change' },
                    { min: 1, max: 5, message: '请选择 1 到 5 级的星级评价', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请输入评价内容', trigger: 'change' }
                ]
            },
            defaultAddEvaluateForm: {}, // 发布评价默认值备份
            evaluateListPageNum: 1,     // 评价当前页码
            score: 3,
            userId:'',                   //当前登录用户id
            evaluateData:{
                name:'实训',  //类型名称
                dataUrl:{
                    evaluateCount:'maker/onlineTrainRoomEvaluate/selectEvaluateCount',   //评论统计的url
                    evaluateList:'maker/onlineTrainRoomEvaluate/selectPager',    //评论列表url
                    evaluationAdd:'maker/onlineTrainRoomEvaluate/add',   //发表评论url
                },
                params:'trainId',    //字段名
                id: this.$route.query.id,
                labelType: '3'
            },
            curTagId: '' // 当前选中的标签id
        }
    },
    /*
    接收父组件参数
    evaluateData:{
        name:'',  //类型名称，可以为空
        dataUrl:{
            evaluateCount:'',   //评论统计的url 必传
            evaluateList:'',    //评论列表url 必传
            evaluationAdd:'',   //发表评论url 必传
        },
        params:'',    //字段名 必传
        id:''  //请求id 必传
    }
     */
    // props: {
    //     evaluateData:{ type: Object }
    // },
    created() {
        if(this.$ls.get('loginUId')){
            this.userId = this.$ls.get('loginUId')
        }
        // 需要在获取到评价星级字典数据之后，再请求评价统计，不然报错
        /*this.getEvaluateCount()*/
        this.defaultAddEvaluateForm = Object.assign({}, this.addEvaluateForm)
        this.getDataDictionary('evaluationOfStar', 'dicStar')
//        this.getDataDictionary('videoEvaluate', 'dicTags')
        this.requestEvalLabelList()
        this.getEvaluateList()
    },
    watch: {
        addEvaluateForm: {
            handler: function (val, oldVal) {},
            deep: true
        },
        rate_color: {
            handler: function (val, oldVal) {},
            deep: true
        },
        evaluationDatas: {
            handler: function (val,oldVal) {
                let _scoreCount = this.evaluationDatas.scoreCount;
                this.$set(this.choiceStars[0], 'ct', this.evaluationDatas.totalEvalu)
                return _scoreCount.filter( (item, index) => {
                    if (item.ct == undefined) {
                        item.ct = 0;
                    }
                    this.$set(item, 'name', this.dicStar[index].name)
                    this.$set(this.choiceStars[_scoreCount.length - index], 'ct', item.ct)
                    return item
                })
            },
            deep: true
        },
        '$route.query.id' () {
            this.getEvaluateCount()
            this.getEvaluateList()
            this.requestEvalLabelList()
        },
        '$route.query.resId' (){
            this.getEvaluateCount()
            this.getEvaluateList()
            this.requestEvalLabelList()
        }
    },
    computed: {
        // 当前星级评价列表总数
        curTotalEvalu: function () {
            let _item = this.choiceStars.concat().filter( item => item.code == this.curStar)[0]
            if (_item != undefined) {
                return _item.ct
            }
        }
    },
    methods: {
      async requestEvalLabelList () { // 获取评价标签列表
        const {labelType = '1'} = this.evaluateData
        const res = await requestEvalLabelList({labelType, pageNum: 1, pageSize: 999})

        if (res.status === 200 && res.data.code === 200) {
          const entity = res.data.entity || {}
          this.dicTags = entity.resultData || []
        }
      },
        /*
         * 获取数据字典
         * code: 请求参数groupCode的值(数据字典代码编号)
         * dicName: Vue中Data的参数
         */
        getDataDictionary (code, dicName) {
            this.$http.post('common/getDictComb',
                { groupCode : code }
            ).then(response => {
                this.getEvaluateCount()
                this[dicName] = Object.assign({}, response.data.entity.dicList);
                if (code == 'evaluationOfStar') {
                    this.choiceStars = response.data.entity.dicList.reverse();
                    this.choiceStars.unshift({code: null, name:"全部评价"})
                }
            })
        },
        /*
         * 获取项目评价统计
         * projectId: 请求参数项目ID
         */
        getEvaluateCount () {
            let url = this.evaluateData.dataUrl.evaluateCount;
            let postData = { [this.evaluateData.params]: this.evaluateData.id }
            this.$http.post(url,postData).then(response => {
                let appendInfo = response.data.appendInfo || {}
                appendInfo.avgEvalu = Number(appendInfo.avgEvalu)
                this.evaluationDatas = appendInfo
            })
        },
        /*
         * 获取项目评价列表
         * projectId: 请求参数项目ID
         */
        getEvaluateList () {
            let url = this.evaluateData.dataUrl.evaluateList + '?pageSize=10&pageNum=' + this.evaluateListPageNum;
            let postData = { [this.evaluateData.params]: this.evaluateData.id, score: this.curStar, labelId: this.curTagId }
            this.$http.post(url,postData).then(response => {
                let entity = response.data.entity || {}
                if (this.evaluateListPageNum == 1) {
                    this.evaluationList = entity.resultData || [];
                } else {
                    this.evaluationList.push(...(entity.resultData || []));
                }
            })
        },
        /*
         * 重置发布评价表单
         */
        resetEvaluate () {
            this.addEvaluateForm = Object.assign({}, this.defaultAddEvaluateForm);
        },
        /*
         * 添加项目评价
         * projectId: 项目ID
         * score: 评价星级
         * content: 评价内容
         * evalType: 评价标签
         */
        addEvaluate (formName) {
            if (this.$ls.get('loginInfo')) {
                let id = this.evaluateData.id;
                let message = '';
                let params = {
                    score: this.addEvaluateForm.rate,
                    evalType: [...new Set(this.addEvaluateForm.evalType)],
                    content: this.addEvaluateForm.content == null ? '' : this.addEvaluateForm.content.trim()
                }
                let flag = this.vaildAddForm(params);
                if (flag !== true) {
                    this.showMessage(flag);
                    return;
                }

                this.$http.post(this.evaluateData.dataUrl.evaluationAdd,
                    { [this.evaluateData.params] : id, score: params.score, content: params.content, evalType: params.evalType }
                ).then(response => {
                    // 更新评价统计数据
                    // for (let j = 0; j < params.evalType.length; j++) {
                    //     let isNull = true;
                    //     for (let i = 0; i < this.evaluationDatas.optionCount.length; i++) {
                    //         if (this.evaluationDatas.optionCount[i].evaltp == params.evalType[j]) {
                    //             isNull = false;
                    //             this.evaluationDatas.optionCount[i].ct ++
                    //             break;
                    //         }
                    //     }
                    //     if (isNull) {
                    //         this.evaluationDatas.optionCount.push({evaltp: params.evalType[j], ct: 1})
                    //     }
                    // }
                    // this.evaluationDatas.totalEvalu++;
                    // this.evaluationDatas.scoreCount[params.score - 1].ct++;
                    // // 更新评价列表
                    // if (params.score == this.curStar || this.curStar == null) {
                    //     params.createTime = (new Date()).getTime();
                    //     // params.id = response.data.appendInfo.id;
                    //     this.evaluationList.unshift(params);
                    // }
                    // 还原发布评价表单
                    if (response.data.code == 200) {
                        this.getEvaluateCount();
                        this.getEvaluateList();
                        this.resetEvaluate();

                        this.showMessage('评论成功', 'success');
                    } else {
                        this.showMessage(response.data.msg);
                    }
                })
            } else {
                this.$store.commit('toggleLoginModal',true)
            }
        },
        /*
         * 验证添加评价
         */
        vaildAddForm (params) {
            let message = '';
            if (![1, 2, 3, 4, 5].includes(params.score)) {
                message = '请选择 1 到 5 级的星级评价'
                return message;
            }
            if (params.content.length == 0) {
                message = '评价内容不能为空'
                return message;
            }
            if (params.content.length > 100) {
                message = '评价内容不得超过100字'
                return message;
            }
            return true;
        },
        /*
         * 错误提示信息
         */
        showMessage (msg, type) {
            type = type == undefined ? 'error' : type;
            this.$message({
                showClose: true,
                message: msg,
                type: type
            });
        },
        /*改变标签筛选*/
        changeTag(labelId) {
            if (this.curTagId === labelId) {
                this.curTagId = ''
            } else {
                this.curTagId = labelId
            }
            this.getEvaluateList()
        }
    }
}
</script>
<style lang='scss'>
@import './../../../asset/scss/form.scss';
.rate-header {
    .el-rate {
        margin-bottom: 8px;
    }
    .el-rate__icon {
        font-size: 11px;
    }
}
.evaluation-form,
.evaluation-list {
    .el-rate__icon {
        font-size: 13px;
    }
}
</style>
<style lang='scss' scoped>
.evaluation {
    padding: 0 15px 15px;
}
.evaluation-title {
    font-size: 14px;
    line-height: 3;
    text-indent: 1em;
    background-color: #f0f0f0;
}
.rate-title {

}

.rate-header-content {
    $rate-score-width: 174px;
    $rate-graph-width: 220px;

    position: relative;
    min-height: 100px;
    padding: 2em 40px 2em 0;
    line-height: 1.5;
    text-align: center;

    .rate-score {
        width: $rate-score-width;

        .rate-score-num {
            em {
                font: 30px normal bold;
                color: #fd8c88;
            }
        }
        .rate-score-total {
            em {
                font-size: 14px;
                font-style: normal;
                margin: 0 4px;
            }
        }
    }
    .rate-graph {
        width: $rate-graph-width;
        margin-right: -1px;
        border-right: 1px solid #eee;

        .rate-item-title,
        .rate-item-chart {
            display: inline-block;
            width: 6em;
            text-align: left;
            vertical-align: middle;
            white-space: nowrap;
        }

        .rate-item-chart {
            width: 100px;
            height: 1em;

            .rate-chart-bg {
                width: 100%;
                height: 100%;
            }

            .rate-chart-bar {
                width: 0;
                height: 100%;
            }
        }
    }
    .rate-tag {
        padding-left: 44px;
        margin-left: $rate-score-width + $rate-graph-width;
        text-align: left;

        .rate-tag-item {
            display: inline-block;
            padding: 0 4px;
            margin: 5px 1.2em 5px 0;
            background-color: #eee;
            line-height: 2;
            cursor: pointer;
            &:hover {
                background-color: #c9c9c9;
            }
            &.active {
                background-color: #c9c9c9;
            }
        }
    }
}

.evaluation-form {
    padding: 12px 0 36px;
    border-top: 1px solid #c9c9c9;
    font-size: 14px;
    line-height: 2;

    .el-rate {
        display: inline-block;
        font-size: 13px;
        vertical-align: middle;
    }

    .el-tag {
        margin-right: 10px;
        cursor: pointer;
    }

    .el-textarea {
        margin-top: 1em;
    }

    .btn-group {
        margin-top: 1em;
        text-align: right;

        button {
            padding: 0em 1.3em;
            height: 34px;
            line-height: 34px;
            border-radius: 3px;
            font-size: 14px;
            margin-left: 10px;
        }
    }
}

.evaluation-item {
    $head-size: 40px;
    padding: 1em 0;

    & + .evaluation-item {
        border-top: 1px dashed #c9c9c9;
    }

    .evaluation-item-people {
        float: left;
        display: inline-block;
        width: 4em;

        .evaluation-item-head {
            display: block;
            width: $head-size;
            height: $head-size;
            margin: 0 auto;
        }

        .evaluation-item-name {
            display: block;
            width: 100%;
            line-height: 2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
        }
    }

    .evaluation-item-details {
        margin: 0 $head-size * 3 0 $head-size + 20px;

        .evaluation-item-content {
            font-size: 14px;
            line-height: 1.5;
        }

        .evaluation-item-content,
        .evaluation-item-tags,
        .pulish-time {
            display: block;
            margin-top: .5em;
        }

        .evaluation-item-tags {
            li {
                display: inline-block;
            }
        }

        .pulish-time {
            color: #999;
        }

        .el-tag {
            margin: 0 10px 4px 0;
        }
    }

    &:hover {
        .btn-group {
            display: block;
        }
    }
    .btn-group {
        display: none;
        float: right;
        button {
            color: #999;
        }
    }
}

$color-data: (
    grassGreen: #2bbb61 #e2fbde,
    red: #f85959 #fee0e0,
    orange: #ff7200 #fdf2e1
);
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .rate-score-total {
            em {
                color: nth($color-value, 1);
            }
        }
        .rate-title{
            .eval-num{
                color: nth($color-value, 1);
            }
        }
        .rate-header-content {
            .rate-graph .rate-item-chart {
                .rate-chart-bg {
                    background-color: nth($color-value, 2);
                }
                .rate-chart-bar {
                    background-color: nth($color-value, 1);
                }
            }
            /*.rate-tag {
                .rate-tag-item {
                    background-color: nth($color-value, 2);
                }
            }*/
        }
    }
}
</style>
