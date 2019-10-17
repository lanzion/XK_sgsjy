<template>
  <div class="introduction backend-content__middle">
    <el-form v-if="isEditing" ref="form" :model="form" :rules="rules">
      <el-form-item prop="content">
        <el-col :span="24">
          <textarea v-model.trim="form.content" ref="textArea" class="el-textarea__inner" placeholder="请输入班级简介，不超过300字"
                    :maxlength="300" v-autofocus></textarea>
        </el-col>
      </el-form-item>
    </el-form>
    <div v-else class="is-text">{{form.content}}</div>
    <div class="btn-row">
      <button v-if="isEditing" @click.prevent="handleSave" class="bs-search-button i-form-button">保存</button>
      <button v-else @click.prevent="handleEdit" class="bs-search-button i-form-button">修改</button>
    </div>
  </div>
</template>

<script>
  import {
    queryModelSchoolDetail,
    editDetail,
  } from '@/service/model_school.js'

  export default {
    name: 'modelIntro', // 示范校-简介

    data () {
      return {
        form: { // 需要提交的数据
          content: ''
        },

        isEditing: false,

        rules: {
          content: [
            {required: true, message: '请输入班级简介', trigger: 'change blur'}
          ]
        },

        schoolId: '',
      }
    },

    created () {
      this.queryDetail()
    },

    directives: {
      autofocus: {
        inserted (el) {
          el.focus()
        }
      }
    },

    methods: {
      async queryDetail () {
        const loginInfo = this.$ls.get('loginInfo')
        const schoolId = loginInfo && loginInfo.userInfo.baseId || ''
        const res = await queryModelSchoolDetail({schoolId})
        this.schoolId = schoolId

        if (res.status === 200 && res.data.code === 200) {
          const {introduction} = res.data.entity || {}
          this.isEditing = !introduction
          this.form.content = introduction
        }
      },

      handleEdit() {
        this.isEditing = true
      },

      handleSave () {
        this.$refs.form.validate(valid => {
          if (valid) { // 验证通过
            const {schoolId, form: {content}} = this
            const errMsg = '修改学校简介失败，请稍后重试'

            editDetail({
              schoolId,
              introduction: content,
            }).then(res => {
              if (res.status === 200 && res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '成功保存学校简介',
                  duration: 1000,
                })

                this.isEditing = false
                return
              }

              this.$message.error(res.data.msg || errMsg)
            }).catch(() => {
              this.$message.error(errMsg)
            })
          }
        })
      }
    },
  }
</script>
<style lang="scss">
  .introduction {
    .el-textarea__inner {
      width: 85%;
      height: 200px;
    }
    .is-text {
      box-sizing: border-box;
      width: 85%;
      min-height: 200px;
      line-height: 1.5;
      font-size: 14px;
      padding: 5px 7px;
      border: 1px solid #dfdfdf;
    }
    .btn-row {
      margin-top: 30px;
    }
  }
</style>
