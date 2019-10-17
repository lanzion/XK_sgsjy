<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 专家 -->
            <el-row>
                <el-form-item label="专家" prop="name">
                    <el-col :span="8">
                        <el-input v-if="disabled" v-model="info.userName" placeholder="请输入姓名" :disabled="true"></el-input>
                        <el-select v-else v-model="info.userName" placeholder="请选择专家" @change="changeExpert" :disabled="isReadOnly">
                            <el-option v-for="item in expertList" :key="item.id" :label="userName" :value="item">{{item.unit}} - {{item.userName}}</el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 区域 -->
            <el-row>
                <el-form-item label="区域" prop="region">
                    <el-col :span="8">
                        <xk-region-pub-select :defaultItems.sync="region" class="select-region" :isAdmin="true" :disabled="true"></xk-region-pub-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="所在单位" prop="unit">
                    <el-col :span="8">
                        <el-input v-model="info.unit" placeholder="请输入所在单位" :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 手机 -->
            <el-row>
                <el-form-item label="手机" prop="mobile">
                    <el-col :span="8">
                        <el-input v-model="info.mobile" placeholder="请输入手机" :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 电子邮箱 -->
            <el-row>
                <el-form-item label="电子邮箱" prop="email">
                    <el-col :span="8">
                        <el-input v-model="info.email" placeholder="请输入电子邮箱" :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 联系地址 -->
            <el-row>
                <el-form-item label="联系地址" prop="address">
                    <el-col :span="8">
                        <el-input v-model="info.address" placeholder="请输入联系地址" :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 评审赛程 -->
            <!-- <el-row>
                <el-form-item label="评审赛程" prop="mpRelationList">
                    <el-col :span="8">
                        <el-checkbox-group v-model="form.mpRelationList">
                            <el-checkbox v-for="item in projectRelationList" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row> -->
            <!-- 评审项目 -->
            <el-row>
                <el-form-item label="评审项目" prop="mpRelationList">
                    <el-col :span="8">
                        <el-checkbox-group v-model="form.mpRelationList">
                            <el-checkbox v-for="item in projectRelationList" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item v-if="isReadOnly">
                <button class="bs-form-button i-form-button" type="button" @click="$router.go(-1)">返回</button>
            </el-form-item>
            <el-form-item v-else>
                <button class="bs-form-button i-form-button" type="button" @click="onSubmit('form')">保存</button>
                <button class="bs-form-button i-form-button is-plain" type="button" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { userIdentity } from '@/assets/js/getUserInfo.js'
import { requestExpertList, addExpert, requestExpertDetail, modifyExpert, requestMatchProjectList } from '@/service/manage.js'
// import region from '@/components/common/select/region_pub_select.vue'

// const phaseList = { // 阶段类型(身份: 类型) 1.校级评比2.区县评比3.市级评比4.省级评比5.国家级评比
//     5: 5,
//     10: 4,
//     6: 3,
//     7: 2,
//     9: 1
// }

export default {
    name: 'expertManageAdd',
    data() {
        return {
            identity: userIdentity,
            expertList: [],
            projectRelationList: [],
            mpRelationList: [],
            // 表单数据
            form: {
                matchId: this.$route.query.id,
                // phaseId: phaseList[loginInfo.userInfo.identity],
                expertId: null,
                mpRelationList: []
            },
            info: {
                provinceId: '',
                cityId: '',
                areaId: '',
                unit: '',           // 所在单位
                mobile: '',         // 联系电话
                email: '',          // 电子邮箱
                address: '',        // 地址
            },
            region: [],
            schoolList: [],         // 所属学校列表
            disabled: false,
            isReadOnly: false,
            // 表单校验提示
            rules: {
                // mpRelationList: [
                //     { required: true, message: '请输入联系地址', trigger: 'change' }
                // ]
            },
            userName: ''
        }
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        // 获取专家库列表
        getExpertList() {
            requestExpertList({ matchId: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.expertList = res.data.entity
                    this.userName = this.expertList[0].userName
                    console.log('专家列表', this.expertList)
                }
            })
        },
        // 获取项目列表
        getProjectList() {
            requestMatchProjectList({ id: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.projectRelationList = res.data.entity || []
                }
            })
        },
        // 获取专家详情
        getDetail() {
            console.log('909999,', this.$route.query.erId)
            requestExpertDetail({ id: this.$route.query.erId }).then((res) => {
                if (res.data.code === 200) {
                    const datas = res.data.entity
                    this.info = datas
                    this.region = [datas.provinceId, datas.cityId, datas.areaId]
                    this.$set(this.form, 'expertId', datas.userId)
                    this.$set(this.form, 'mpRelationList', datas.mpRelationList.map(x => x.projectId))
                }
            })
        },
        // 选择专家改变
        changeExpert(item) {
            // const _info = {}
            // _info.unit = item.unit
            // _info.mobile = item.mobile
            // _info.email = item.email
            // _info.address = item.address
            // this.info = _info
            this.userName = item.userName
            this.$set(this.form, 'expertId', item.id)
            this.region = [item.provinceId, item.cityId, item.areaId]
        },
        // 提交表单
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = Object.assign({}, this.form)
                    params.mpRelationList = this.form.mpRelationList.map(x => ({ projectId: x }))
                    if (this.$route.query.erId === undefined) {
                        addExpert(params).then((response) => {
                            if (response.data.code === 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                                this.$router.go(-1)
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    } else {
                        modifyExpert(params).then((response) => {
                            if (response.data.code === 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                                this.$router.go(-1)
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    }
                } else {
                    // console.log('error submit!!')
                    return false
                }
            })
        }
    },
    mounted() {
        this.getProjectList()

        if (this.$route.path.includes('detail')) {
            this.isReadOnly = true
        }

        if (this.$route.query.erId !== undefined) {
            this.disabled = true
            this.$set(this.form, 'id', this.$route.query.erId)
            this.getDetail()
        } else {
            this.getExpertList()
        }
    },
    // components: {
    //     'v-region-select': region
    // }
}
</script>

<style lang="scss" scoped>
    .select {
        margin-left: 10px;
    }
</style>
