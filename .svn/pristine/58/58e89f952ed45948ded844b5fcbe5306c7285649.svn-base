<template>
    <section class="com-panel-group">
        <el-dialog :title="title" v-model="dialogVisible" class="share-modal">
            <el-checkbox-group v-model="checkedShareGroup" class="head-checked">
                <el-checkbox v-for="group in shareGroup" :label="group.id" :key="group.id" class="checked-group">
                    <figure class="share-head">
                        <img :src="group.img" alt="" class="circle">
                    </figure>
                    <span>{{group.name}}</span>
                </el-checkbox>
            </el-checkbox-group>
            <p class="content-tip">还能输入<em v-text="remainingWordCount" :class="{warning: remainingWordCount<0}"></em>字</p>
            <el-input type="textarea" :rows="4" placeholder="请输入分享内容" v-model="shareContent"></el-input>
            <section class="share-content">
                <p class="share-content-title">{{ title }}</p>
                <p class="share-content-link" :title="shareItemLink" v-text="shareItemLink"></p>
            </section>
            <div class="btn-group">
                <button type="button" class="i-form-button" @click="shareItem">分享</button>
            </div>
        </el-dialog>

        <button class="icon-button" @click="handleSend()">{{ title }}</span>
    </section>
</template>

<script>
import { loginInfo } from '@/js/getUserInfo.js'
import activity1 from './../../../asset/img/moment/activity1.png'
import activity2 from './../../../asset/img/moment/activity2.png'
import activity3 from './../../../asset/img/moment/activity3.png'
export default {
    name : 'comPanelEvent',
    data() {
        return{
            loginInfo: loginInfo,
            id: this.$route.query.projectId,
            close: false,
            activeShare: '',
            dialogVisible: false
        }
    },
    props: [
        'title'
    ],
    computed: {
    },
    created() {
    },
    mounted() {
        console.log(this.loginInfo)
    },
    methods: {
        handleSend() {
            this.dialogVisible = !this.dialogVisible;
        }
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
        }
    }
}
</script>
<style lang='scss'>
@import './../../../asset/scss/vars.scss';
.share-dialog.el-popover[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #f6f6f6;
}
.head-checked {
    .el-checkbox__input {
        display: none;
        position: absolute;
        right: 8px;
        top: 28px;
        &.is-checked {
            display: block;
            .el-checkbox__inner {
                border-radius: 50%;
                background-color: #59d380 !important;
                &::after {
                    border-color: #fff;
                }
            }
        }
    }
    .el-checkbox__label {
        padding: 0;
    }
}
.share-modal {
    .el-dialog {
        width: 476px;
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.head-checked {
    $head-size: 40px;

    .checked-group {
        position: relative;
        width: 5em;
        line-height: 1.5;
        text-align: center;
    }
    .share-head {
        display: block;
        margin: 0 auto;
        width: $head-size;
        height: $head-size;

        img {
            width: inherit;
            height: inherit;
        }
    }
}
.share-list-title {
    display: block;
    text-indent: 10px;
    line-height: 3;
    background-color: #f6f6f6;
}
.share-list {
    padding: 6px 4px;
    overflow: hidden;

    .share-items {
        padding: 0 1.5em;
        line-height: 2.5;
        cursor: pointer;

        &:hover {
            background-color: #f3f3f3;
        }

        [class^="icon-"],
        [class*=" icon-"] {
            margin-right: .5em;
            font-size: 16px;
        }
    }
}
.com-panel-group {
    .icon-button {
        margin-left: 10px;
        color: #999;
        font-size: 16px;
    }

    [class^="icon-"],
    [class*=" icon-"] {
        color: #818181;
    }
}
.share-modal {
    .content-tip {
        color: #999;
        text-align: right;
        line-height: 2;
        em {
            font-size: 16px;
            &.warning {
                color: $theme_color;
            }
        }
    }
    .share-content {
        margin-top: 20px;
        line-height: 1.5;

        .share-content-link {
            font-size: 12px;
            color: #00a0e9;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .btn-group {
        margin-top: 20px;
        text-align: right;

        button {
            padding: .5em 2em;
            font-size: 14px;
            margin-left: 10px;
        }
    }
}
</style>