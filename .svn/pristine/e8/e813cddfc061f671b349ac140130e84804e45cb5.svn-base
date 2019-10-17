<template>
    <section class="member-list">
        <el-checkbox-group class="member-item table-layout" v-model="checkedPerson" v-for="item in reviewing_person" :key="item">
            <el-checkbox class="checked-item table-cell" :label="item.id">{{null}}</el-checkbox>
            <a class="head-item table-cell">
                <img :src="item.headImageUrl" alt="" class="member-item-head circle">
            </a>
            <p class="table-cell">
                <p class="member-item-info">{{item.createName}}<span class="member-item-ascription">（{{item.schoolName}}）</span></p>
                <p class="member-item-applying">{{item.auditOpinion}}</p>
                <time class="applying-time">{{item.createTime | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
            </p>
            <section class="btn-group table-cell">
                <button class="i-button">不通过</button>
                <button class="i-button">通过</button>
            </section>
        </el-checkbox-group>
    </section>
</template>

<script>
export default {
    name : 'reviewingMemberList',
    data() {
        return {
            checkedPerson: [],
            projectId: 'fd9cb78793484d2091ad3b60c483a8c7',
            rate_color: [],             // 星级颜色
            dicStar: [],                // 统计区域星级字典
            choiceStars: [],            // 评价列表选择星级
            dicTags: [],                // 标签字典
            evaluationDatas: {},        // 评价统计数据
            evaluationList: [],         // 评价列表数据
            curStar: null,              // 评价列表当前选择星级
            evaluateListPageNum: 1,     // 评价当前页码
            score: 3
        }
    },
    props: [
        'reviewing_person'
    ],
    created() {
    },
    watch: {
    },
    computed: {
    },
    methods: {
    }
}
</script>
<style lang='scss' scoped>
@import './../../../../../asset/scss/vars.scss';
$head-face-size: 72px;
.member-list {
    padding: 0 20px;
    border: 1px solid #c9c9c9;

    .member-item {
        padding: 20px 0;
        margin-bottom: -1px;
        border-bottom: 1px dashed #c9c9c9;

        .checked-item {
            width: 14px;
        }
        .head-item {
            width: $head-face-size + 40;
            text-align: center;
        }
        .btn-group {
            width: 14em;
            text-align: right;
            .i-button {
                border: 0;
            }
        }

        .member-item-head {
            width: $head-face-size;
            height: $head-face-size;
        }
        .member-item-info {
            font-size: 18px;
            line-height: 2;
            .member-item-ascription {
                font-size: 14px;
                color: #999;
            }
        }
        .member-item-applying {
            font-size: 14px;
        }
        .applying-time {
            color: #999;
            line-height: 2;
        }
    }
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .member-list {
            .btn-group {
                .i-button:hover {
                    color: $color-value;
                }
            }
        }
    }
}
</style>