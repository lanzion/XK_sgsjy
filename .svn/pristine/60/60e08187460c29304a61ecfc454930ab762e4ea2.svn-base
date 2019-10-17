<template>
	<div class="add-train backend-content__middle">
		<el-form :model="form" ref="form" :rules="rules" label-width="100px">
			<el-form-item label="培训主题" prop="theme">
				<el-col :span="10">
					<el-input v-model="form.theme" placeholder="请输入培训主题"></el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="报名类别" prop="select">
				<el-col :span="10">
					<!-- <el-cascader
					  style="width:100%;"
					  v-model="form.select"
					  :options="periodList"
					  @active-item-change="handleItemChange"
					  :clearable="true"
					  :props="props"
					></el-cascader> -->
                    <el-select v-model="form.select" placeholder="请选择学段学科" style="width:100%;" filterable clearable>
                        <el-option
                            v-for="(item,index) in periodList"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
				</el-col>
			</el-form-item>

			<!-- <el-form-item label="报名项目" prop="classifyId">
				<el-col :span="10">
					<el-select v-model="form.classifyId" placeholder="请选择类别" style="width:100%;" filterable clearable>
                        <el-option
                            v-for="(item,index) in classifyList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
				</el-col>
			</el-form-item> -->

            <el-form-item label="身份类型" prop="actorType">
                <el-col :span="7">
                    <el-radio-group v-model="form.actorType">
                        <el-radio label="1">学生</el-radio>
                        <el-radio label="2">教师</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>

			<el-form-item label="报名时间" prop="date">
				<el-col :span="10">
                    <el-date-picker v-model="form.date" type="datetimerange" placeholder="请选择培训时间范围" style="width:100%;" :picker-options="dateOptions"></el-date-picker>
                </el-col>
			</el-form-item>

			<el-form-item label="培训地点" prop="place">
				<el-col :span="10">
					<el-input v-model="form.place" placeholder="请输入培训地点"></el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="培训内容" prop='contentText' style="position:relative;">
                <el-col :span="23">
                    <el-input v-model="form.contentText" v-show="false"></el-input>
                    <div id="editor-trigger" style="height: 300px"></div>
                </el-col>
                <div style="position:absolute;font-size:12px;bottom:-27px;color:#23b8ff;" v-if="isToMuch">
                      输入内容过多
                </div>
            </el-form-item>

            <el-form-item>
            	<div class="btn-box">
            		<button class="btn save-btn" type="button" @click.prevent="onSubmit">保存</button>
            		<button class="btn cancel-btn" type="button" @click.prevent="$router.go(-1)">取消</button>
            	</div>
            </el-form-item>

		</el-form>
	</div>
</template>

<script>
    import { editor } from '@/mixin/wangEditor.js'
    import { addTrain, trainDetail, modifyTrain, requestSubjectByPeriodId, requestTrainClassify, requestTrainPeriod } from '@/service/admin_space.js'

    export default {
        mixins: [editor],
        data() {
        	const validContent = (rule, value, callback) => {
                if (value <= 0) {
                    callback(new Error('请输入培训内容'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    theme: '',
                    studySectionId: '',
                    classifyId: '',
                    subject: '',
                    place: '',
                    content: '',
                    date: [],
                    contentText: '',
                    select: '',
                    // select: [],
                    actorType: ''
                },
                rules: {
                    theme: [
                        { required: true, message: '请输入培训主题' }
                    ],
                    select: [
                        // { required: true, message: '请选择学段学科', type: 'array', trigger: 'change' }
                        { required: true, message: '请选择学段学科',  trigger: 'change' }
                    ],
                    classifyId: [
                        { required: true, message: '请选择类别', trigger: 'change' }
                    ],
                    place: [
                        { required: true, message: '请输入培训地点' }
                    ],
                    contentText: [
                        { validator: validContent, trigger: 'change', required: true },
                    ],
                    date: [
                        { required: true, message: '请选择报名时间', type: 'array' }
                    ],
                    actorType: [
                        { required: true, message: '请选择身份类型', trigger: 'change' }
                    ]
                },
                classifyList: [],
                periodList: [],
                subjectList: [],
                dateOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                isToMuch: false,
                pageParam: {
                    pageSize: 999,
                    pageNum: 1
                },
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'children'
                },
                id: ''
            }
        },
        mounted() {
            const self = this
            this.initEditor()
            if (this.isPreview) {
                this.editor.disable()
            }
            this.editor.onchange = function () {
                self.form.contentText = this.$txt.text().trim().length || this.$txt.find('img').length
                self.form.content = this.$txt.html()
            }

            this.getTrainPeriod()
            this.getClassify()

            if (this.$route.query.id !== undefined) {
                this.id = this.$route.query.id
                this.getTrainDetail()
            }
        },
        watch: {
            'form.content': {
                handler: function (val) {
                    if (val.length > 6000) {
                        this.isToMuch = true
                    } else {
                        this.isToMuch = false
                    }
                },
                deep: true
            }
        },
        methods: {
            // 获取详情
            getTrainDetail() {
                trainDetail({ id: this.id }).then((res) => {
                    if (res.data.code === 200) {
                        const _detail = res.data.entity
                        this.form.theme = _detail.theme
                        this.form.actorType = _detail.actorType
                        this.form.classifyId = _detail.classifyId
                        this.form.place = _detail.place
                        this.form.content = _detail.content
                        this.editor.$txt.html(_detail.content)
                        this.form.contentText = this.editor.$txt.text().trim().length || this.editor.$txt.find('img').length
                        this.form.date = [new Date(_detail.startTime), new Date(_detail.endTime)]
                        // this.form.select = [_detail.studySectionId, _detail.subject]
                        this.form.select = _detail.studySectionId
                        // this.handleItemChange([_detail.studySectionId])
                    } else {
                        this.$message({ type: 'error', message: res.data.msg })
                    }
                })
            },
            // 获取学段数据
            getTrainPeriod() {
                requestTrainPeriod({}, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        const _date = res.data.appendInfo.result
                        this.periodList = _date;
                        console.log(this.periodList)
                        // this.periodList = _date.map((x) => {
                        //     this.$set(x, 'children', [])
                        //     return x
                        // })
                    }
                })
            },
            // 根据学段改变获取学科数据
            handleItemChange(val) {
                const id = val[0]
                const index = this.periodList.findIndex(x => x.id === id)
                if (!this.periodList[index].children.length) {
                    requestSubjectByPeriodId({ studySectionId: id }).then((res) => {
                        if (res.data.code === 200) {
                            const _data = res.data.appendInfo.result
                            this.periodList[index].children = _data
                        }
                    })
                }
            },
            // 获取分类数据
            getClassify() {
                requestTrainClassify({}).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.appendInfo.result
                        this.classifyList = _data
                    }
                })
            },
            // 提交表单
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const params = Object.assign({}, this.form)
                        // params.studySectionId = params.select[0]
                        params.studySectionId = params.select
                        params.subject = params.select[1]
                        params.startTime = params.date[0].getTime()
                        params.endTime = params.date[1].getTime()
                        delete params.select
                        delete params.date
                        delete params.contentText

                        if (this.id) {
                            params.id = this.id
                            modifyTrain(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.$message({ type: 'success', message: '修改成功' })
                                    this.$router.go(-1)
                                } else {
                                	this.$message({ type: 'error', message: res.data.msg })
                                }
                            })
                        } else {
                            addTrain(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.$message({ type: 'success', message: '保存成功' })
                                    this.$router.go(-1)
                                } else {
                                	this.$message({ type: 'error', message: res.data.msg })
                                }
                            })
                        }
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
	.add-train {
		.el-input__inner {
			height: 40px;
		}
	}
</style>

<style lang="scss" scoped>
	.add-train {
		.btn-box {
			.btn {
				width: 100px;
				height: 44px;
				border-radius: 10px;
				font-size: 18px;
				color: #fff;
				margin-right: 15px;
				&:hover {
					opacity: 0.75;
				}
			}
			.save-btn {
				background-color: #0594e8;
			}
			.cancel-btn {
				background-color: #ccc;
			}
		}
	}
</style>
