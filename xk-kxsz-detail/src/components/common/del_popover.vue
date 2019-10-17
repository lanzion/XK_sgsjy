<template>
    <section id="delPopover">
        <el-popover
        	ref="popover"
        	placement="top"
        	trigger="hover"
        	v-model="visible">
        	<p>确定要删除这个{{delData.name}}吗？</p>
        	<div style="text-align: right; margin: 10px;">
        		<el-button size="mini" type="text" @click="visible = false">取消</el-button>
        		<el-button type="primary" size="mini" @click="visible = false;delItem()">确定</el-button>
        	</div>
        </el-popover>
        <a v-popover:popover class="delete-btn" :class="{'i-button': !isIcon}"><i class="icon-btn-delete"></i><span v-if="!isIcon">删除</span></a>
    </section>
</template>

<script>
    export default {
        name: 'delPopover',
        data() {
            return {
                visible: false
            }
        },
        props: {
            delData: {
                type: Object
            },
            isIcon: {
                type: Boolean,
                default() {
                    return true
                }
            }
        },
        methods: {
            delItem() {
                // const url = this.delData.dataUrl
                this.$http.post(this.delData.url, this.delData.params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '删除成功')
                        this.$emit('callback')
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                }, () => {
                    this.showMessage('error', '删除失败')
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    #delPopover {
        display: inline-block;
      }
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        #delPopover{
            vertical-align: top;
            .delete-btn{
                font-size: 14px;
                margin:0px 5px;
                cursor: pointer;
                margin:0;
                vertical-align: top;
                &.i-button {
                    font-size: 14px;
                    color: #999;

                    &:hover {
                        [class^="icon-"],
                        [class*=" icon-"]{
                            color: $color-value;
                        }
                    }
                }
                &:hover {
                    color: $color-value;
                }
            }

            [class^="icon-"],
            [class*=" icon-"]{
                margin-right: 4px;
                vertical-align: baseline;
                &:hover {
                    color: $color-value;
                }
            }
        }
    }
}
</style>

<style lang="scss">
#delPopover {
    .el-button--text{
        color: #d00!important;
    }
    .el-button--mini{
        width: 40px!important;
    }
}
</style>