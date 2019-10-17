<template>
    <el-dialog :visible.sync="dialog.isVisible" :title="title" class="add-doc-chapter dialog-wrapper">
        <div class="dialog-content">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item :label="type === '1' && '目录名称' || '章节名称'" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name" placeholder="请输入标题，最多20字" :maxlength="20"/>
                    </el-col>
                </el-form-item>
                <el-form-item :label="type === '1' && '上级目录' || '所属目录'" prop="parentId">
                    <el-col :span="20">
                        <el-cascader v-model="form.parentId" :options="directoryList" :props="defaultProps" placeholder="请选择目录" class="select" :change-on-select="true">
                        </el-cascader>
                    </el-col>
                </el-form-item>
                <el-form-item :label="type === '1' && '概述' || '内容'" prop="content">
                    <el-col :span="22">
                        <el-input v-model="form.content" v-show="false"></el-input>
                        <div id="editorTrigger" style="height: 220px"></div>
                    </el-col>
                </el-form-item>
            </el-form>

            <div class="btn-row">
                <a @click="dialog.isVisible = false" href="javascript:;" class="btn btn-cancel">取消</a>
                <a @click="submit" href="javascript:;" class="btn btn-ok">确定</a>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import { addDoc, editDoc } from '@/service/admin_configure.js'

    export default {
        name: 'achievementDialog', // 建设成果弹窗

        data () {
            return {
                curEditingId: '',

                defaultProps: { // 默认属性
                    children: 'child',
                    label: 'name',
                    value: 'id',
                },

                isEditing: false,

                form: {
                    content: '',
                    name: '',
                    parentId: [],
                },

                title: '',

                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'change'}
                    ],

                    parentId: [
                        {type: 'array', required: this.type !== '1', message: '请选择所属目录', trigger: 'change'}
                    ],

                    content: [
                        {required: this.type !== '1', message: '请输入内容', trigger: 'change'}
                    ],
                },
            }
        },

        props: {
            curEditingItem: {
                type: Object,
                default: () => {}
            },

            dialog: {
                type: Object,
                default: () => {}
            },

            directoryList: {
                type: Array,
                default: () => []
            },

            handleRequest: Function,

            type: {
                type: String,
                default: '1'
            },
        },

        created () {
            this.initData()
            this.$nextTick(this.initEditor)
        },

        watch: {
            'form.parentId': {
                handler: function (val) {
                    let index = val.findIndex(x => x == this.curEditingId)
                    if (index >= 0) {
                        this.$message.error('不能选择他自身及其子级作为上级目录');
                        return val.splice(index)
                    }
                },
                deep: true
            }
        },

        methods: {
            // 获取对应章节所属目录
            findParentDirIdArr(source = [], id = '') {
                let flag = false
                let idArr = []
                const defaultId = '-1'
                const findDir = (source, id) => {
                    if (id === defaultId) return false

                    source.find(item => {
                        if (flag) return true

                        if (item.id === id) {
                            idArr = item._ids
                            flag = true
                            return true
                        }

                        if (Array.isArray(item.child) && item.child.length > 0) {
                            findDir(item.child, id)
                        }
                    })
                }

                findDir(source, id)
                return idArr
            },
            // 初始弹窗数据
            initData () {
                const directoryType = '1'
                const {action, id, content, name = '', parentId} = this.curEditingItem
                const moduleName = this.type === directoryType && '目录' || '章节'

                this.title = `新增${moduleName}`

                // 编辑
                if (action === 'edit') {
                    const idArr = this.findParentDirIdArr(this.directoryList, parentId)
                    this.form = {content, name, parentId: idArr}
                    this.isEditing = true
                    this.curEditingId = id
                    this.title = `修改${moduleName}`
                }
            },

            initEditor() {
                const editor = new wangEditor('editorTrigger')
                const {form: {content}, isEditing} = this

                editor.config.menus = [
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    'eraser',
                    'forecolor',
                    'bgcolor',
                    'quote',
                    'fontfamily',
                    'fontsize',
                    'head',
                    'unorderlist',
                    'orderlist',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    'link',
                    'unlink',
                    'table',
                    'img',
                    'undo',
                    'redo'
                ]

                editor.create()
                isEditing && editor.$txt.html(content)
                editor.onchange = () => {
                    this.form.content = editor.$txt.html()
                }
            },

            // 添加/修改
            submit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        const {title, isEditing, curEditingId, form, type} = this
                        const handler = isEditing && editDoc || addDoc
                        const id = isEditing ? curEditingId : undefined
                        const errMsg = `${title}失败，请稍后重试`
                        const maxContentLen = 1000
                        const directoryId = form.parentId[form.parentId.length - 1] || '-1'

                        if (this.form.content.length >= maxContentLen) {
                            this.$message('内容过多，请调整后再提交。。')
                            return false
                        }

                        handler({
                            id,
                            type,
                            ...form,
                            parentId: directoryId
                        }).then(res => {
                            if (res.status === 200 && res.data.code === 200) {
                                this.$message({type: 'success', message: `成功${title}`, duration: 1000})
                                this.handleRequest({action: 'edit'})
                                this.dialog.isVisible = false
                                return
                            }

                            this.$message.error(res.data.msg || errMsg)
                        }).catch(() => {
                            this.$message.error(errMsg)
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .add-doc-chapter .el-dialog {
        box-sizing: border-box;
        width: 660px;
        height: 500px;
        .el-dialog__body {
            padding: 0;
        }
        .el-input__inner {
            width: 330px;
        }
    }
</style>
<style lang="scss" scoped>
    @import "~@/asset/scss/vars.scss";

    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .dialog-wrapper .btn-row {
                .btn-ok {
                    background-color: $color-value;
                }
                .btn-cancel {
                    border: 1px solid $color-value;
                    color: $color-value;
                }
            }
        }
    }

    .dialog-wrapper {
        .dialog-content {
            padding-top: 20px;
        }
        .btn-row {
            position: absolute;
            right: 20px;
            bottom: 20px;
            margin-bottom: 0;
            text-align: right;
            font-size: 0;
            .btn {
                display: inline-block;
                box-sizing: border-box;
                width: 62px;
                height: 28px;
                line-height: 26px;
                vertical-align: top;
                text-align: center;
                font-size: 12px;
            }
            .btn-cancel {
                margin-right: 10px;
            }
            .btn-ok {
                color: #fff;
            }
        }
    }
</style>

