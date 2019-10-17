<template>
    <section class="dynamic-item-reply clearfix">
        <el-input :rows="2" type="textarea" v-model="content" resize="none" class="dynamic-item-reply-input"></el-input>
        <button class="i-form-button fr" @click="addReply">发表</button>
    </section>
</template>

<script>
export default {
    name: 'sendReply',
    data() {
        return {
            content: ''
        }
    },
    props: [
        'size',
        'index',
        'params',
        'isFocus'
    ],
    watch: {
        isFocus: 'focusInput'
    },
    methods: {
        addReply: function () {
            this.$set(this.params, 'content', this.content)
            this.$emit('submitForm', this.params, this.index)
        },
        focusInput: function (val) {
            if (val) {
                this.$el.querySelectorAll('.el-textarea__inner')[0].focus()
            }
        },
        hideInput: function () {
            if (this.content.trim() === '') {
                this.$emit('hideInput', this.index)
            }
        },
        resetForm: function () {
            this.content = ''
        }
    }
}
</script>

<style lang="scss">
    .dynamic-item-reply {
        .dynamic-item-reply-input {
            .el-textarea__inner {
                border-radius: 0;
                height: 100%;
            }
        }
    }
</style>
<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .dynamic-item-reply {
        position: relative;

        .dynamic-item-reply-input {
            position: absolute;
            right: 82px;
            left: 0;
            width: auto;
            height: 60px;
        }

        .i-form-button {
            width: 72px;
            height: 60px;
            font-size: 14px;
            line-height: 60px;
            border-radius: $button-radiu;
        }
    }
</style>