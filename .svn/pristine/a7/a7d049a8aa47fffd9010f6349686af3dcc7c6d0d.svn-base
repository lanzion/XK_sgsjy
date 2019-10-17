<template>
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="type">
            <h4>问题类别：</h4>
            <el-checkbox-group v-model="form.type">
                <el-checkbox v-for="(item, index) in reportTypes" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="content">
            <h4>举报说明：</h4>
            <el-input type="textarea" :rows="3" placeholder="请输入问题描述" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
            <h4>问题截图：</h4>
            <ul>
                <li v-for="(item, index) in cfrpList"></li>
            </ul>
        </el-form-item>
        <el-form-item class="btn-group">
            <button type="button" class="i-form-button is-plain" @click="close">取消</button>
            <button type="button" class="i-form-button" @click="submit">提交</button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapActions } from 'Vuex'
import { addFailureReport } from '@/service/course.js'

export default {
    name : 'report',
    data() {
        return{
            reportTypes: [],
            form: {
                courseId: this.$route.query.courseId,
                sectionId: this.$route.query.sectionId,
                type: [],
                content: '',
                cfrpList: []
            },
            rules: {
                type: { required: true, message: '请选择问题类别', trigger: 'change', type: 'array' },
                content: { required: true, message: '请输入问题描述', trigger: 'blur' }
            }
        }
    },
    mounted(){
        this.getDictComb('questionType').then((res) => {
            this.reportTypes = res.dicList
        })
    },
    methods: {
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        close: function () {
            this.$store.commit('close', false)
        },
        submit: function () {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let params = Object.assign({}, this.form)
                    params.type = this.form.type.join(',')
                    addFailureReport(params).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: '已经上报了故障，感谢您的反馈！',
                                type: 'success'
                            })
                            this.close()
                        } else {
                            this.$message.error(res.data.msg || '举报失败,请重试')
                        }
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang='scss'>
@import '~@/asset/scss/form.scss';
</style>
<style lang='scss' scoped>
.btn-group {
    text-align: right;
    .i-form-button {
        width: 62px;
        height: 28px;
        box-sizing: border-box;
    }
}
</style>
