<template>
    <div>
        <h4 class="head-tit">奖项设定</h4>
        <el-form class="content-box" ref="form" :model="$data">
            <el-row class="awards-title">
                <el-col :span="16">奖项</el-col>
                <el-col :span="8">操作</el-col>
            </el-row>
            <!-- 竞赛奖项 -->
            <template v-if="awardsList.length">
                <el-form-item v-for="(item, index) in awardsList" :key="index" :prop="`awardsList.${index}.name`" class="awards-list" :rules="{
                    required: true, message: '奖项名称不能为空', trigger: 'blur'
                }">
                    <el-row>
                        <el-col class="awards-input-box" :span="16">
                            <el-input v-show="item.editing" v-model.trim="item.name" placeholder="奖项名称" ref="input" @keyup.native.enter="onSubmit(item)"></el-input>
                            <span v-show="!item.editing">{{item.name}}</span>
                        </el-col>
                        <el-col :span="8">
                            <button type="button" class="btn-primary" v-if="item.editing" @click.prevent="onSubmit(item)">保存</button>
                            <button type="button" class="btn-primary" v-else @click.prevent="editAwardsItem(index)">编辑</button>
                            <button type="button" class="btn-primary is-plain" @click.prevent="deleteAwardsItem(index)">删除</button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </template>
            <el-form-item>
                <button type="button" class="awards-add i-form-button other-c" @click="appendAwardsItem">
                    <i class="icon-btn-add"></i>添加奖项
                </button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import { loginInfo } from '@/assets/js/getUserInfo.js'
import { requestOfflineAwardsList, addOfflineAwards, modifyOfflineAwards, delOfflineAwards } from '@/service/manage.js'

export default {
    name: 'evaluateSettingOffline',
    data() {
        return {
            // 奖项列表
            awardsList: [],
            // 表单数据
            formTmpl: {
                matchId: this.$route.query.id,
                sort: 0,
                name: '',
                editing: true
            },
            // 表单校验提示
            rules: {
                name: [
                    { required: true, message: '请输入奖项名称', trigger: 'blur' },
                ]
            }
        }
    },
    mounted() {
        this.awardsList.push(Object.assign({}, this.formTmpl))
        this.getData()
    },
    methods: {
        // 获取奖项列表
        getData() {
            requestOfflineAwardsList({ matchId: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || []
                    if (_data.length) {
                        this.awardsList = _data
                    }
                }
            })
        },
        // 提交表单
        onSubmit(item) {
            this.$refs.form.validate((valid) => {
                const handler = item.id ? modifyOfflineAwards : addOfflineAwards
                const txt = item.id ? '修改' : '添加'
                if (valid) {
                    const params = Object.assign({}, item)
                    delete params.editing
                    handler(params).then((response) => {
                        if (response.data.code === 200) {
                            this.$message({
                                message: `${txt}成功`,
                                type: 'success'
                            })
                            item.id = item.id || response.data.entity
                            item.editing = !item.editing
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                } else {
                    // console.log('error submit!!')
                    return false
                }
            })
        },
        appendAwardsItem() {
            const index = this.awardsList.findIndex(x => x.id === undefined && x.name === '')
            if (index < 0) {
                this.awardsList.push(Object.assign({}, this.formTmpl, { sort: this.awardsList[this.awardsList.length - 1].sort + 1 }))
            } else {
                this.$refs.input[index].$refs.input.focus()
            }
        },
        editAwardsItem(index) {
            this.$set(this.awardsList[index], 'editing', true)
        },
        deleteAwardsItem(index) {
            const curItem = this.awardsList[index]
            const tip = curItem.id ? '此操作将删除该奖项，是否继续？' : '该奖项尚未保存，是否继续删除？'
            this.$confirm(tip, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: '__custom-msg-box'
            }).then(() => {
                if (curItem.id) {
                    delOfflineAwards({ id: curItem.id }).then((res) => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.awardsList.splice(index, 1)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                } else {
                    this.awardsList.splice(index, 1)
                }
            }).catch(() => {})
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    .content-box {
        padding: 20px 15px 20px;
        font-size: 14px;
    }
    .icon-btn-add {
        margin-right: 4px;
    }
    .center {
        text-align: center;
    }
    .awards-title {
        margin-bottom: 1em;
        border-bottom: 1px solid #ccc;
        line-height: 3;
        font-weight: 600;
        text-align: center;
    }
    .awards-list {
        margin: 10px 0 24px;
        text-align: center;

        .awards-input-box {
            padding-right: 10px;
        }

        .btn-primary {
            $h: 24px;
            height: $h;
            padding: 0 1em;
            border: 0;
            border-radius: 10px;
            line-height: $h;
            background-color: nth($default-color, 1);
            color: #fff;
            &.is-plain {
                background-color: #ccc;
            }
        }
    }
    .awards-add {
        display: block;
        height: 36px;
        line-height: 36px;
        padding: 0 2em;
        margin: 0 auto;
        /* margin-top: 20px; */
        border: 1px dashed #dfdfdf;
        border-radius: 10px;
        background-color: #fff !important;
        color: #ccc !important;

        .icon-btn-add {
            color: nth($default-color, 1);
            vertical-align: baseline;
        }
    }
</style>