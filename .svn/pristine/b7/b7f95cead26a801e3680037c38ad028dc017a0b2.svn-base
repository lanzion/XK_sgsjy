<template>
    <div id="side_tools">
        <aside id="tools-bar">
            <ul>
                <li class="tool-bar-item">
                    <a class="side-btn icon-btn-top" href="javascript:;" @click="scrollToTop"></a>
                </li>
                <!-- <li class="tool-bar-item">
                    <a class="side-btn icon-btn-qrcode pr" href="javascript:;">
                        <div class="qr-code pa">
                            <img src="~@/assets/img/common/download_qr_code.png">
                            <p>习课科技公众号</p>
                        </div>
                    </a>
                </li> -->
                <li class="tool-bar-item">
                    <a class="side-btn icon-btn-feedback" href="javascript:;" @click="openDialog"></a>
                </li>
                <!-- <li class="tool-bar-item">
                    <a class="side-btn icon-btn-QQ pr" href="javascript:;">
                        <div class="qq-info pa">
                            <p>3453814364</p>
                        </div>
                    </a>
                </li> -->
            </ul>
        </aside>
        <add-feedback :visible="visible"></add-feedback>
    </div>
</template>

<script>
import addFeedback from './../feedback/main.vue'

export default {
    name: 'xk-sidetools',
    components: {
        addFeedback
    },
    data() {
        return {
            visible: {
                show: false
            }
        }
    },
    methods: {
        scrollToTop() {
            $('html, body').animate({ scrollTop: '0px' }, 300)
        },
        openDialog() {
            this.visible.show = true
            // if (this.$ls.get('loginInfo')) {
            //     this.visible.show = true
            // } else {
            //     this.$store.commit('toggleLoginModal', true)
            // }
        }
    }
}
</script>

<style lang="scss">
    #side_tools{
        .el-dialog{
            width: 580px;
        }
    }
</style>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    /*侧边工具条*/
    #tools-bar{
        position: fixed;
        right: 30px;
        bottom: 17%;
        z-index: 2000;
        transform: translateZ(0);

        $size: 40px;
        $hover-fs: 12px;
        .tool-bar-item{
            margin-bottom: 10px;
            [class^="icon-btn-"],
            [class*=" icon-btn-"] {
                display: block;
                width: $size;
                height: $size;
                background-color: #ccc;
                color: #fff;
                font-size: 24px;
                line-height: $size;
                text-align: center;
                &:hover{
                    background-color: nth($default-color, 1);
                    line-height: 12px;
                    &::before {
                        font-size: 14px;
                    }
                }
            }
            .side-btn:hover {
                &::before {
                    font-size: $hover-fs;
                }
            }
            .icon-btn-top:hover{
                &::before {
                    content: "返回\A顶部";
                }
            }
            .icon-btn-qrcode{
                font-size: 26px;
                .qr-code{
                    display: none;
                    top: $size / 2;
                    right: $size + 10;
                    width: 160px;
                    padding: 10px 10px 0;
                    transform: translateY(-50%);
                    border: 1px solid #dfdfdf;
                    background-color: #fff;
                    color: #333;
                    font-size: 14px;
                    line-height: 2;
                    text-align: center;
                    img {
                        display: block;
                        width: 100%;
                    }
                    &::after {
                        content: '';
                        position: absolute;
                        top: 3px;
                        right: -1px;
                        width: 10px;
                        height: 10px;
                        border-top: 1px solid #dfdfdf;
                        border-right: 1px solid #dfdfdf;
                        margin-top: 50%;
                        transform: translateX(50%) rotate(45deg);
                        background-color: #fff;
                    }
                }
                &:hover{
                    &::before {
                        content: "关注\A公众号";
                    }
                    .qr-code{
                        display: block;
                    }
                }
            }
            .icon-btn-feedback:hover{
                &::before {
                    content: "意见\A反馈";
                }
            }
            .icon-btn-QQ {
                .qq-info {
                    display: none;
                    top: $size / 2;
                    right: $size + 10;
                    height: 42px;
                    padding: 0 10px;
                    transform: translateY(-50%);
                    border: 1px solid #dfdfdf;
                    border-radius: 4px;
                    background-color: #fff;
                    color: #333;
                    font-size: 14px;
                    line-height: 3;
                    text-align: center;
                    &::after {
                        content: '';
                        position: absolute;
                        top: 14px;
                        right: -1px;
                        width: 10px;
                        height: 10px;
                        border-top: 1px solid #dfdfdf;
                        border-right: 1px solid #dfdfdf;
                        transform: translateX(50%) rotate(45deg);
                        background-color: #fff;
                    }
                }
                &:hover{
                    &::before {
                        content: "联系\A客服";
                    }
                    .qq-info{
                        display: block;
                    }
                }
            }
        }
    }
</style>