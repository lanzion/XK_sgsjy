<template>
	<el-dialog :visible.sync="transferVisible.show" lock-scroll class="transfer-school">
		<header class="dialog-head">转校</header>

		<el-form ref="form" class="register-form-box" label-position="right" label-width="100px" :model="form"
                             :rules="rules">
            <el-form-item label="转入学校" prop="newSchoolId">
                <xk-region-school-select @checkedItem="changeSchool" :defaultItems.sync="defaultItems" :checkedItem="form.newSchoolId" ref="studentRegion"></xk-region-school-select>
            </el-form-item>
            <el-form-item label="转入班级" prop="classId" v-if="identity === 'student'">
                <el-select v-model="checkClasz" filterable placeholder="请选择班级" style="width:100%" @change="changeClasz">
                    <el-option v-for="(item, index) in claszList" :key="item.id" :label="`${translateFun(item.gradeId, gradeList, {key: 'id'})} - ${item.className}`" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="转校说明" prop="remark">
                <el-input v-model="form.remark" type="textarea" placeholder="请输入转校说明"></el-input>
            </el-form-item>
        </el-form>

        <div class="btn-box">
            <button class="btn cancel-btn" type="button" @click.prevent="transferVisible.show = false">取消</button>
            <button class="btn submit-btn" type="button" @click.prevent="transferSubmit">确定</button>
        </div>
	</el-dialog>
</template>

<script>
    // import regionSchool from '@/components/common/select/region-school_select.vue'
    import { requestClaszList, transferSchoolAdd } from '@/service/common.js'
    import { mapActions } from 'vuex'

    export default {
        // components: {
        //     'v-region-school-select': regionSchool
        // },
        data() {
            return {
                gradeList: [],
                form: {
                    remark: '',
                    newSchoolId: '',
                    gradeId: '',
                    classId: '',
                },
                checkClasz: null,
                identity: this.$ls.get('userIdentity'), // 用户身份
                claszList: [],
                rules: {
                    newSchoolId: [
                        { required: true, message: '请选择学校', trigger: 'change' }
                    ],
                    classId: [
                        { message: '请选择班级', trigger: 'change' }
                    ],
                    remark: [
                        { required: true, message: '请输入转校说明', trigger: 'blur' }
                    ]
                },
                defaultItems: []
            }
        },
        props: {
            transferVisible: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            },
        },
        mounted() {
            this.getDictComb('primarySchool, middleSchool, highSchool').then((res) => {
                this.gradeList = res.dicList
            })
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb',
            }),
            // 选择学校
            changeSchool(item) {
                this.$set(this.$data.form, 'newSchoolId', item.id)
                if (this.identity === 'student') {
                    this.checkClasz = ''
                    this.getClasz()
                }
            },
            // 选择班级
            changeClasz(id) {
                if (this.claszList.length) {
                    const _item = this.claszList.find((x) => { return x.id === id })
                    this.$set(this.$data.form, 'classId', _item.id)
                    this.$set(this.$data.form, 'gradeId', _item.gradeId)
                }
            },
            // 获取班级列表
            getClasz() {
                requestClaszList({ schoolId: this.form.newSchoolId }).then((response) => {
                    if (response.data.code === 200) {
                        this.claszList = response.data.entity
                    }
                })
            },
            // 转校提交
            transferSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const params = Object.assign({}, this.form)
                        params.oldSchoolId = this.$ls.get('baseInfo').baseInfo.schoolId
                        if (this.identity === 'teacher') {
                            delete params.classId
                            delete params.gradeId
                        }
                        transferSchoolAdd(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({ message: '转校申请已提交，请等待审核', type: 'success' })
                                this.transferVisible.show = false
                                this.$emit('callback')
                            } else {
                                this.$message({ message: res.data.msg, type: 'error' })
                            }
                        })
                    } else {
                        this.$message({ message: '请填写完整的表单信息', type: 'info' })
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
	.transfer-school {
		.el-dialog {
			width: 760px;
			border-radius: 10px;
    		overflow: hidden;
			.el-dialog__header {
				background-color: #fff;
				border-bottom: none;
				height: 44px;
			}
			.el-dialog__body {
				padding: 0 85px 40px;
			}
		}
		.el-input__inner {
			height: 50px;
			border-radius: 10px;
		}
        .el-textarea__inner {
            height: 180px;
        }
	}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
.dialog-head {
	text-align: center;
	font-size: 30px;
	color: $theme-color;
	margin-bottom: 44px;
}
.btn-box {
    text-align: center;
	margin-top: 34px;
	.btn {
		width: 135px;
		height: 48px;
		line-height: 48px;
		font-size: 22px;
		color: #fff;
		border: none;
		border-radius: 15px;
        margin: 0 8px;
	}
    .submit-btn {
        background-color: $theme-color;
        &:hover {
            opacity: 0.75;
        }
    }
    .cancel-btn {
        background-color: #ccc;
        &:hover {
            opacity: 0.75;
        }
    }
}
</style>