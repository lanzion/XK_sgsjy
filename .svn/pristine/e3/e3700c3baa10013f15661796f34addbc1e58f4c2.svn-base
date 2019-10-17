<template>
  <div class="submit-form backend-content__middle">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-row>
        <el-form-item label="评价标签" prop="name">
          <el-col :span="8">
            <el-input v-model="form.name" placeholder="请输入评价标签，不超过8字" :maxlength="8"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="评价分类" prop="labelType">
          <el-col :span="8">
            <el-select v-model="form.labelType" placeholder="请选择">
              <el-option v-for="item in labelTypes" :label="item.name" :value="item.val" :key="item.val"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-row>
      <el-form-item>
        <button class="bs-search-button i-form-button" type="button" @click="submit">保存</button>
        <button class="bs-search-button i-form-button is-plain" @click="$router.go(-1)">取消</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {requestTagList, addTag, editTag} from '@/service/admin_system.js'

  export default {
    name: 'addTag', // 后台系统管理-标签管理-新增、修改
    data() {
      return {
        form: {
          labelType: '',
          name: ''
        },
        labelTypes: [
          {name: '课程评价', val: '1'},
          {name: '项目评价', val: '2'},
          {name: '实训评价', val: '3'},
          {name: '资源评价', val: '4'},
          {name: '微课评价', val: '5'}
        ],
        rules: {
          name: [
            {required: true, message: '请输入评价标签', trigger: 'blur change'}
          ],
          labelType: [
            {required: true, message: '请选择评价分类', trigger: 'change'}
          ],
        }
      }
    },
    created () {
      this.id = this.$route.query.id
      this.id && this.requestList()
    },
    methods: {
      async requestList () { // 获取标签列表
        let res = await requestTagList({id: this.id})
        if (res.status === 200 && res.data.code === 200) {
          let _entity = res.data.entity || {}
          let [{name = '', labelType = '1'}] = _entity.resultData || [{}]
          this.form.name = name
          this.form.labelType = labelType
        }
      },
      submit () { // 保存新增的标签
        this.$refs.form.validate((valid) => {
          if (valid) {
            let component = this
            let handler = this.id && editTag || addTag
            let label = this.id && '修改' || '添加'

            handler({...this.form, id: this.id}).then((res) => {
              if (res.status === 200 && res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: `成功${label}标签`,
                  duration: 1000,
                  onClose () {
                    component.$router.push('/system/tag')
                  }
                })
                return
              }
              this.$message.error(res.data.msg || `${label}标签失败，请重试`)
            }, () => {
              this.$message.error(`${label}标签失败，请重试`)
            })
          }
        })
      }
    }
  }
</script>
<style lang='scss'>
  @import '~@/asset/scss/form.scss';
</style>