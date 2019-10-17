<!-- 网上实训室 -->
<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.name" placeholder="请输入实训室名称" @keyup.native.enter="changePage(1)"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="dataParams" class="bs-screening_box">
                    <el-form-item label="分类">
                        <v-multiSelect :selectData.sync='trainType' :ifAll="false" :clearable="true" :model="'train'"></v-multiSelect>
                    </el-form-item>
                    <el-form-item label="相关技术">
                        <el-select v-model="dataParams.technology" placeholder="请选择" style="width:100%;" filterable clearable>
                            <el-option
                                v-for="(item,index) in technologyOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="级别">
                          <el-select v-model="dataParams.grade" placeholder="选择级别" clearable style="width:100%;">
                            <el-option v-for="item in subjectLevelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="适合阶段">
                        <el-select v-model="dataParams.fit" placeholder="选择适合阶段" clearable style="width:100%;">
                            <el-option v-for="item in applyScopeIdOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="dataParams.status" placeholder="请选择状态" filterable clearable>
                            <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推荐">
                        <el-select v-model="dataParams.recommend" placeholder="请选择是否推荐" filterable clearable>
                            <el-option v-for="item in recommendOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            add: doAdd,
        }"></v-admin-operate>
        <!-- 列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="名称" width="100" show-overflow-tooltip prop="name"></el-table-column>
            <el-table-column prop="typeName" label="分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="technologyName" label="相关技术" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="grade" label="级别" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{ scope.row.grade | translate(subjectLevelOptions, {key: 'id'} )}}
                </template>
            </el-table-column>
            <el-table-column prop="fit" label="适合阶段" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{ scope.row.fit | translate(applyScopeIdOptions, {key: 'id'} ) }}
                </template>
            </el-table-column>
<!--             <el-table-column prop="nature" label="性质" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{ scope.row.nature | translate(natureOptions, {key: 'val'} ) }}
                </template>
            </el-table-column> -->
            <el-table-column label="版权所有" show-overflow-tooltip prop="copyright"></el-table-column>
            <el-table-column prop="url" label="链接地址" show-overflow-tooltip></el-table-column>
            <el-table-column label="状态" width="100" show-overflow-tooltip>
                <template scope="scope">
                    <el-switch v-model="scope.row.status" on-text="上架" off-text="下架" :on-value="1" :off-value="2" @change="statusChange(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="stopDate" label="推荐" width="130" show-overflow-tooltip>
                <template scope="scope">
                    <el-switch v-model="scope.row.recommend" on-text="是" off-text="否" on-value="1" off-value="0" @change="recommendChange(scope.row)"></el-switch>
                </template>

            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: edit,
                        del: del
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <!-- 新增、修改 -->
        <el-dialog title="实训" :visible="visible"  size="small" :before-close="closeClear">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="名称:" prop="name">
                    <el-col :span="12">
                        <el-input v-model="ruleForm.name" placeholder="请输入名称" :maxlength="30"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="分类:" prop="type">
                    <el-col :span="12">
                        <v-multiSelect :selectData.sync='ruleForm.type' :ifAll="false" :clearable="false" :model="'train'" ref="formType"></v-multiSelect>
                    </el-col>
                </el-form-item>
                <el-form-item label="相关技术:" prop="technology">
                    <el-col :span="12">
                        <el-select v-model="ruleForm.technology" multiple placeholder="请选择" style="width:100%;" filterable clearable>
                            <el-option
                                v-for="(item,index) in technologyOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="级别:" prop="grade">
                    <el-col :span="12">
                        <el-select v-model="ruleForm.grade" placeholder="选择级别" clearable style="width:100%;">
                            <el-option v-for="item in subjectLevelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="适合阶段:" prop="fitArr">
                    <el-col :span="12">
                        <el-checkbox-group v-model="ruleForm.fitArr" :min="1">
                            <el-checkbox v-for="item in applyScopeIdOptions" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="版权所有:" prop="copyright">
                    <el-col :span="12">
                        <el-input v-model="ruleForm.copyright" placeholder="请输入版权所有者或机构" :maxlength="100"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="链接地址:" prop="url">
                    <el-col :span="12">
                        <el-input v-model="ruleForm.url" placeholder="请输入链接地址"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="实训封面:" prop="cover">
                    <el-col :span="12">
                        <el-input v-model="ruleForm.cover" v-show="false"></el-input>
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadFile">
                            <img v-if=" ruleForm.cover && ruleForm.cover != '' " :src="getFileUrl(ruleForm.cover)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                </el-form-item>
                <el-form-item label="简介:" prop="introduction">
                    <el-col :span="18">
                        <el-input v-model="ruleForm.introduction" placeholder="请输入简介" type="textarea" :rows="3" :maxlength="500" resize="none"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <button class="bs-form-button i-form-button" type="button" @click="onSubmit">确定</button>
                    <button class="bs-form-button i-form-button is-plain" type="button" @click="closeClear">取消</button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import multi_select from 'Common/select/multi_select.vue'  // 分类下拉
    import { subPermission } from '@/mixin/getAdminMenu.js'  // 配置信息混入
    import { setPage } from '@/mixin/adminPagination.js'
    import pagination from '@/components/common/admin_pagination.vue'  // 分页组件
    import { addTrain, modifyTrain, delTrain, detailTrain, listTrain  } from '@/service/admin_configure.js'  // 列表数据接口
    import adminOperate from '@/components/common/admin_operate.vue'  // 配置按钮组件
    export default {
        components: {
            'v-multiSelect': multi_select,
            'v-pagination': pagination,
            'v-admin-operate': adminOperate,
        },
        mixins: [subPermission, uploadFileSize, setPage],
        data() {
            return {
                // 弹窗开关
                visible: false,
                // 表单参数
                ruleForm: {
                    name: '',
                    type: [],
                    copyright: '',
                    url: '',
                    cover: '',
                    introduction: '',
                    technology: [],
                    grade: '',
                    fitArr: [],
                    fit: '',
                    nature: "2"
                },
                rules: {
                    name: [
                        { required: true, message: '请输入实训室名称', trigger: 'change' },
                        { max: 29, message: '不超过30个字', trigger: 'change' }
                    ],
                    type: { required: true, message: '请选择分类', trigger: 'change', type: 'array' },
                    copyright: [
                        { required: true, message: '请输入版权所有者或机构', trigger: 'change' },
                        { max: 99, message: '不超过100个字', trigger: 'change' }
                    ],
                    url: { required: true, message: '请输入链接地址', trigger: 'change' },
                    cover: { required: true, message: '请选择封面图片', trigger: 'change' },
                    introduction: [
                        { required: true, message: '请输入简介', trigger: 'change' },
                        { max: 499, message: '不超过500个字', trigger: 'change' }
                    ],
                    technology: [
                        { required: true, message: '请选择相关技术', trigger: 'change', type: 'array' }
                    ],
                    grade: [
                        { required: true, message: '请选择级别', trigger: 'change', type: 'string' }
                    ],
                    fitArr: [
                        { required: true, message: '请选择适合阶段', trigger: 'change', type: 'array' }
                    ],
                    nature: [
                        { required: true, message: '请选择性质', trigger: 'change' }
                    ]
                },
                // 实训室分类
                trainType: [],
                dataParams: {
                    name: '',
                    type: [],
                    status: '',
                    recommend: '',
                    technology: [],
                    grade:'',
                    fit: ''
                },
                // 状态
                statusOptions: [
                    { id: '1', name: '上架' },
                    { id: '2', name: '下架' }
                ],
                // 推荐
                recommendOptions: [
                    { id: '1', name: '是' },
                    { id: '0', name: '否' }
                ],
                auditStatusStyle: {
                    '-1': 'pending',
                    '0': 'submit',
                    '1': 'success',
                    '2': 'fail',
                    '3': 'auditing'
                },
                // 高级筛选开关
                screeningDropdown: false,
                // 列表数据
                items: [],
                // 选中
                checkedItems: [],
                natureOptions: [
                    { name: '收费', val: '1' },
                    { name: '免费', val: '2' }
                ]
            }
        },
        mounted() {
            this.getData()
            // 请求技术数据
            this.getDictComb("technicalClassification")
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            del (val) {
                delTrain({ id: val.data.id }).then(res => {
                    if(res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.items.splice(val.index, 1)
                    }else {
                        this.$message({ message: res.msg })
                    }
                })
            },
            edit (val) {
                detailTrain({id: val.data.id}).then(res => {
                    res = res.data.entity
                    this.ruleForm.id = res.id
                    this.ruleForm.name = res.name
                    this.ruleForm.type = res.type.split('-')
                    this.ruleForm.copyright = res.copyright
                    this.ruleForm.url = res.url
                    this.ruleForm.cover = res.cover
                    this.ruleForm.introduction = res.introduction
                    this.ruleForm.technology = res.technologyRelationList.map( i =>  i.technologyId  )
                    this.ruleForm.grade = res.grade
                    this.ruleForm.fitArr = res.fit.split(',')
                    this.ruleForm.nature = res.nature.toString()
                    setTimeout(() => {
                        this.$refs['formType'].select = res.type.split('-')
                    }, 0)
                    this.visible = true
                })
            },
            statusChange (val) {
                const params = {
                    id: val.id,
                    status: val.status === 1 ? 1 : 2
                }
                modifyTrain(params).then(res => {})
            },
            recommendChange (val) {
                const params = {
                    id: val.id,
                    recommend: val.recommend === '0' ? '0' : '1'
                }
                modifyTrain(params).then(res => {})
            },
            resetSearchForm() {
                this.trainType = []
                this.dataParams = Object.assign({}, this._dataParams, {name: this.dataParams.name})
                this.screeningDropdown = false
            },
            closeClear () {
                this.visible = false
                // this.ruleForm = {}
                this.$refs['formType'].select = []
                this.$refs.ruleForm.resetFields()
            },
            onSubmit () {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let data = Object.assign({}, this.ruleForm)
                        data.type = data.type.join('-')
                        data.fit = data.fitArr.join(',')
                        data.technologyRelationList = Array.from(data.technology, val => ({
                            technologyId: val
                        }) )
                        delete data.technology
                        delete data.fitArr
                        if(this.ruleForm.id) {
                            modifyTrain (data).then (res => {
                                if(res.data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    })
                                    this.getData()
                                }else {
                                    this.$message({ message: res.data.message })
                                }
                            })
                        }else {
                            addTrain(data).then(res => {
                                if(res.data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功'
                                    })
                                    this.getData()
                                }else {
                                    this.$message({ message: res.data.message })
                                }
                            })
                        }
                        this.closeClear()
                    } else {
                        return false;
                    }
                });
            },
            doAdd () {
                this.visible = true
            },
            UploadFile (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                            if (res.code === 200) {
                                _this.ruleForm.cover = res.appendInfo.resourceId
                            }
                        })
                        uploader.off('uploadError').on('uploadError', function (file, reason) {
                            _this.$message({ message: reason.msg })
                        })
                }else {
                    if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    _this.ruleForm.cover = null
                    uploader.cancelFile(file)
                }
            },
            /*
             * 列表数据
             */
            getData() {
                let dataParams = Object.assign({}, this.dataParams)
                dataParams.type = this.trainType.join('-')
                listTrain(dataParams, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity.resultData;
                        this.items = _data;
                        this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum);
                    }
                })
            },
            // 改变分页
            changePage(val) {
                this.setPageNum(val)
                this.getData()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.getData()
            }
        },
        computed: {
            // 学段数据
            ...mapState('dictionaryCommon', {
                subjectLevelOptions (state) {
                    let dicList = (state['courseGradeDicList'] || {}).dicList || []
                    return dicList
                },
                technologyOptions (state) {
                    let dicList = (state['technicalClassificationDicList'] || {}).dicList || []
                    return dicList
                },
                applyScopeIdOptions (state) {
                    let dicList = (state['periodKeyDicList'] || {}).dicList || []
                    return dicList
                }
            })
        }
    }
</script>
