<template>
  <div class="actiTrain-detail container">
    <el-breadcrumb class="breadcrumbs" separator=">">
      <el-breadcrumb-item @click.native="redirect(pages.index.url, { path: 'education' })">活动培训</el-breadcrumb-item>
      <el-breadcrumb-item
        @click.native="redirect({ url: `/#/education/actiTrain` }, { type: 6 })"
      >培训列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{detail.theme}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 培训详情 -->
    <section class="detail-box bgw">
      <h3 class="train-title">{{detail.theme}}</h3>
      <div class="detail-msg">
        <span class="msg-item">发起人：{{detail.createName}}</span>|
        <span
          class="msg-item"
        >培训时间：{{detail.startTime | dateFormat('yyyy-MM-dd HH:mm')}} - {{detail.startTime | dateFormat('yyyy-MM-dd HH:mm')}}</span>|
        <span class="msg-item">培训地点：{{detail.place}}</span>
      </div>
      <article class="detail-content" v-html="detail.content"></article>
    </section>
    <!-- 培训报名表单 -->
    <section class="form-box bgw" v-if="identity === 'teacher'">
      <!-- <section class="form-box bgw"> -->
      <h4 class="form-head">报名填报</h4>
      <!-- <el-form ref="form" :model="form" label-width="220px" :rules="rules"> -->

      <el-form ref="form" :rules="rules" :model="form" label-width="220px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名：" prop="name" v-if="detail.actorType == '2'">
              <el-col :span="24">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="姓名：" prop="name" v-else>
              <el-col :span="24">
                <el-input v-model="form.name" placeholder="请输入学生姓名"></el-input>
              </el-col>
              <!-- <el-col :span="24">
            <el-button type="primary" class="seachBtn" @click="searchStu" size="small">查询</el-button>
              </el-col>-->
            </el-form-item>
            <el-form-item label prop="sex" v-if="showList">
              <el-radio-group
                v-model="selectdName"
                class="seachUl"
                :class="{'sy': stuList.length > 10}"
              >
                <el-radio :label="i" v-for="(i, k) in stuList" :key="k" class="seachRadio">
                  <!-- <span class="name">{{i.name}}</span>{{i.certiNum}} -->
                  {{i.name}}
                </el-radio>
              </el-radio-group>
              <!-- <ul class="seachUl">
                        <li v-for="(i, index) in stuList" :key="index" class="lii" @click="selectd(i)">
                            <span class="name">{{i.name}}</span>{{i.certiNum}}
                        </li>
              </ul>-->
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <el-col :span="24">
                <el-radio-group v-model="form.sex">
                  <el-radio label="7">男</el-radio>
                  <el-radio label="8">女</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
            <el-form-item label="身份证：" prop="certiNum">
              <el-col :span="24">
                <el-input v-model="form.certiNum" placeholder="请输入身份证"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item :label="subjectLabel.title" prop="subject">
              <el-col :span="24">
                <el-input v-model="form.subject" :placeholder="subjectLabel.txt"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="联系电话：" prop="phone">
              <el-col :span="24">
                <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="所属区域：" prop="areaId">
              <el-col :span="24">
                <v-region-select @region="changeRegion" ref="region" :defaultItems="defaultRegion"></v-region-select>
              </el-col>
            </el-form-item>
            <el-form-item label="所属学校：" prop="schoolId">
          <el-col :span="24">
            <el-select v-model="form.schoolId" clearable filterable placeholder="请选择所属学校">
              <el-option
                v-for="(item, index) in schoolList"
                :key="index"
                :label="item.schoolName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
            </el-form-item>
            <!-- <el-form-item label="所属学校：" prop="schoolId">
              <el-col :span="24">
                <region-school-select
                  @checkedItem="changeSchool"
                  :checkedItem="form.schoolId"
                  :defaultList="schoolList"
                  ref="studentRegion"
                ></region-school-select>
              </el-col>
            </el-form-item> -->
            <el-form-item label="报名项目：" prop="projectDisDetailId" class="selct">
              <!-- <el-input class="selectinput" placeholder="请选择" v-model="projectsName"></el-input> -->
              <el-select v-model="form.projectDisDetailId" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in projectList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item :label="item.name" prop="item.name" v-for="(item, index) in projectList" :key="index">
                    <el-input v-model="form.subject" placeholder="请选择"></el-input>
            </el-form-item>-->
            <el-form-item label="参与形式：" prop="actorWay">
              <el-radio-group v-model="form.actorWay">
                <el-radio :label="i.val" v-for="(i, k) in actorWayOptions" :key="k">
                  {{ i.name }}
                  <span style="color:red" v-if="i.val==2">(不包括培训报名)</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label v-if="form.actorWay == 2" prop="listMembers">
              <!-- <div class="searchDiv">
                        <el-col :span="24">
                            <el-input v-model="teamName" placeholder="请输入参赛成员姓名"></el-input>
                        </el-col>
                        <el-col :span="24">
                            <el-button type="primary" class="seachBtn" @click="searchTeam" size="small">查询</el-button>
                        </el-col>
              </div>-->
              <!-- <div>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="form.listMembers" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(i, index) in teamList" :label="i" :key="index" :class="{'elCheckbox': detail.actorType == '1'}">{{i.name}}{{i.certiNum}}</el-checkbox>
                        </el-checkbox-group>
              </div>-->
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <el-col :span="16">
                    <el-input v-model="teamName" placeholder="请输入参赛成员姓名"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="primary" class="seachBtn" @click="searchTeam" size="small">查询</el-button>
                  </el-col>
                  <!-- <span style="line-height: 36px;">卡片名称</span>
                  <el-button style="float: right;" type="primary">操作按钮</el-button>-->
                </div>
                <el-tag
                  class="elTag"
                  :key="index"
                  v-for="(i, index) in selectdList"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClose(index)"
                >{{i.name}}{{i.certiNum? i.certiNum : ''}}</el-tag>
                <div v-if="teamList.length">
                  <div v-if="!selectdStatus">
                    <el-checkbox-group
                      v-model="form.listMembers"
                      @change="handleCheckedCitiesChange"
                    >
                      <div v-for="(i, index) in teamList" :key="index">
                        <el-checkbox
                          :label="i"
                          :disabled="i.name === form.name"
                          :class="{'elCheckbox': detail.actorType == '1'}"
                          v-if="i.status"
                        >
                          {{i.name}}
                          <!-- {{i.certiNum}} -->
                        </el-checkbox>
                      </div>
                    </el-checkbox-group>
                    <!-- <el-button style="float: left;margin-bottom: 20px;background-color: #fff;" type="primary" size="small" plain @click="lastPage">上一页</el-button> -->
                    <!-- <el-button style="float: left;margin-bottom: 20px;background-color: #fff;" type="primary" size="small" plain @click="nextPage">下一页</el-button> -->
                    <el-button
                      style="float: right;margin-bottom: 20px;"
                      type="primary"
                      size="small"
                      @click="doSelectd"
                    >确定</el-button>
                  </div>
                </div>
                <!-- <p v-else class="noData">暂无数据</p> -->
              </el-card>
              <!-- <el-transfer v-model="form.listMembers" :props="{ key: 'value', label: 'desc' }" :data="teamList" :button-texts="['删除', '添加']" :titles="['未选', '已选']" class="elTransfer"></el-transfer> -->
            </el-form-item>
            <el-form-item label="参与组别：" prop="groupDisDetailId">
              <el-radio-group v-model="form.groupDisDetailId">
                <el-radio :label="i.id" v-for="(i, k) in zbList" :key="k">{{ i.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否住宿：" prop="accommodate">
              <el-col :span="24">
                <el-radio-group v-model="form.accommodate">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
            <el-form-item label="是否就餐：" prop="meal">
              <el-col :span="24">
                <el-radio-group v-model="form.meal">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
            <el-form-item label="备注信息：" prop="remark">
              <el-col :span="24">
                <el-input v-model="form.remark" type="textarea" placeholder="请输入备注信息"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="附件：" prop="attachmentList" style="width: 790px;">
              <v-up-files
                :auto="false"
                :selectedList="attachmentList"
                :listLength="attachmentList.length"
                :ifStatus="ifStatus"
                @fileSuccess="fileSuccess"
                :defaultList="defaultList"
              ></v-up-files>
              <div class="fileTips">
                <p>注：名称长度在30字以内， 单个文件大小不超过100M，一次性最多可上传10个文件</p>
                <div class="types">
                  <p class="fl">文件类型：</p>
                  <p
                    class="fl typeList"
                    style="width: 75%;"
                  >doc、docx、ppt、pptx、xls、xlsx、vsd、pot、pps、rtf、wps、et、dps、pdf、txt、epub、mp4、png、jpeg、jpg、gif、exe、avi、rar、zip</p>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片：" prop="image">
              <!-- <el-upload
                class="avatar-uploader"
                action="http://192.168.2.44/file/auth/fileUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                accept=".jpg, .jpeg, .png, .gif"
              >
                <img v-if="form.image" :src="form.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>-->
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action
                :before-upload="UploadFile"
              >
                <img v-if="form.image != '' && form.image != null" :src="form.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btn-box">
          <button class="btn confirm-btn" type="button" @click.prevent="enrollSubmit">{{btnTxt}}</button>
          <button class="btn cancel-btn" type="button">取消</button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import {
  requestTrainDetail,
  trainEnroll,
  trainEnrollModify,
  judgeEnroll,
  trainEnrollDetail,
  searchStudent,
  selectTrainProjectList,
  getComboxByArea
} from "@/service/activity_train.js";
import { requestTeacherList } from "@/service/privateLetter";
import { requestDictComb } from "@/service/common";
import region from "@/components/common/select/region_select.vue"; // 省市区下拉
import regionSchool from "@/components/common/select/region-school_select.vue";
import upFiles from "@/components/common/upFiles";

export default {
  components: {
    "v-region-select": region,
    "region-school-select": regionSchool,
    "v-up-files": upFiles
  },
  data() {
    const validMobile = (rule, value, callback) => {
      const regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!regular.test(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    const validateIDCode = (rule, value, callback) => {
      const regular = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/;
      if (!regular.test(value)) {
        callback(new Error("您输入的身份证号格式不正确"));
        // this.$message({ type: 'error', message: '您输入的身份证号格式不正确' })
        // return true
      } else {
        const reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(value)) {
          // this.$message({ type: 'error', message: '您输入的身份证号格式不正确' })
          callback(new Error("您输入的身份证号格式不正确"));
          // return true
        }
      }
    };
    const validListMembers = (rule, value, callback) => {
      if (!this.selectdList.length) callback(new Error("请选择组员"));
    };
    return {
      checkAll: true,
      selectdList: [],
      isIndeterminate: true,
      showList: false,
      selectdStatus: false,
      selectdName: "",
      projectsName: "",
      teamName: "",
      stuList: [],
      teamList: [],
      detail: {},
      zbList: [],
      projectList: [],
      schoolList: [
        {
          id: "",
          name: ""
        }
      ],
      schoolIdFlag: true,
      defaultRegion: [],
      subjectLabel: {
        title: "指导教师：",
        txt: "请输入指导教师"
      },
      form: {
        certiNum: "",
        applyId: "",
        name: "",
        phone: "",
        subject: "",
        remark: "",
        school: "",
        accommodate: "",
        meal: "",
        actorWay: "",
        groupDisDetailId: "",
        projectDisDetailId: "",
        listMembers: [],
        provinceId: "",
        areaId: "",
        cityId: "",
        schoolId: "",
        attachmentList: [],
        image: "",
        sex: ""
      },
      img: null,
      // 参赛形式
      actorWayOptions: [{ name: "个人", val: "1" }, { name: "团体", val: "2" }],
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true, message: "请选择性别" }],
        // remark: [{ required: true, message: "请输入备注信息" }],
        phone: [{ required: true, validator: validMobile, trigger: "blur" }],
        subject: [{ required: true, message: "请输入任教学科" }],
        certiNum: [
          { required: true, message: "请填写身份证", trigger: "blur" }
        ],
        school: [{ required: true, message: "请输入所属学校" }],
        project: [{ required: true, message: "请选择参与项目" }],
        // listMembers: [{ required: true, validator: validListMembers,}],
        accommodate: [{ required: true, message: "请选择是否住宿" }],
        groupDisDetailId: [{ required: true, message: "请选择组别" }],
        actorWay: [{ required: true, message: "请选择参赛形式" }],
        meal: [{ required: true, message: "请选择是否就餐" }],
        schoolId: [{ required: true, message: "请选择所属学校" }],
        projectDisDetailId: [{ required: true, message: "请选择报名项目" }],
        areaId: [{ required: true, message: "请选择所属区域" }],
        image: [{ required: true, message: "请上传图片" }],
      },
      trainId: "",
      ifEnroll: "",
      btnTxt: "报名",
      identity: this.$ls.get("userIdentity") || "",
      pages: {
        pageSize: 10,
        pageNum: 1
      },
      // 附件
      attachmentList: [],
      defaultList: [],
      ifStatus: false,
      image: "",
      imgStandardFileSize: 5,
      ifSchoolId:true,
    };
  },
  watch: {
    // 'form.name': {
    //     handler: function (val) {
    //         if (val.length < 2) {
    //             console.log('名字', val.length)
    //         }
    //     }
    // },
    selectdName: {
      handler: function(val) {
        this.form.name = val.name;
        this.form.applyId = val.id;
        this.form.school = val.school;
        this.form.certiNum = val.certiNum;
        this.form.phone = val.phone;
        this.showList = false;
        trainEnrollDetail({
          trainId: this.$route.query.id,
          applyId: val.id
        }).then(response => {
          if (response.data.code === 200) {
            const _detail = response.data.entity;
            if (_detail) {
              this.form.groupDisDetailId = _detail.groupDisDetailId;
              this.form.phone = _detail.phone;
              this.form.school = _detail.school;
              this.form.subject = _detail.subject;
              this.form.accommodate = _detail.accommodate;
              this.form.meal = _detail.meal;
              this.form.actorWay = _detail.actorWay;
              this.form.projectDisDetailId = _detail.projectDisDetailId;
              this.selectdList = _detail.listMembers.map(i => ({
                name: i.userInfo,
                id: i.userId,
                status: false,
                certiNum: ""
              }));
              this.form.listMembers = _detail.listMembers;
              this.btnTxt = "修改报名";
              this.ifEnroll = true;
            } else {
              this.form.groupDisDetailId = "";
              this.form.subject = "";
              this.form.accommodate = "";
              this.form.meal = "";
              this.form.actorWay = "";
              this.form.projectDisDetailId = "";
              this.selectdList = [];
              this.form.listMembers = {};
              this.btnTxt = "报名";
              this.ifEnroll = false;
            }
          }
        });
      }
    }
    // 'form.listMembers'(data) {
    //     console.log('穿梭矿····', data)
    // },
    // teamName: {
    //     handler: function (val) {
    //        console.log('12')
    //     }
    // }
    // 'form.projectDisDetailId'(id){
    //     console.log(id)
    //     selectTrainProjectList({studySectionId:id})
    //      .then(res=>{
    //          let datas = res.data.entity;
    //          this.projectsName = '';
    //          if(datas.trainSubjectList.length){
    //              datas.trainSubjectList.forEach((v,i) => {
    //                  this.projectsName +=v.name;
    //                  if(i<datas.trainSubjectList.length-1) this.projectsName +='、'
    //              });
    //          }else{
    //             this.projectList.forEach((v,i) => {
    //                  if(v.id==id) this.projectsName =v.name;
    //              });
    //          }
    //      })
    // }
  },
  mounted() {
    this.trainId = this.$route.query.id;
    this.dictComb();
    this.getTrainDetail();
  },
  methods: {
    UploadFile(file) {
      const fileSize = file.size;
      const fileName = file.name;
      const expandName = fileName.substr(fileName.lastIndexOf(".") + 1);
      const _this = this;
      if (
        /(jpe?g|gif|png|bmp)$/i.test(expandName) &&
        fileSize < _this.imgStandardFileSize * 1024 * 1024
      ) {
        uploader.off("uploadSuccess").on("uploadSuccess", function(files, res) {
          if (res.code === 200) {
            _this.form.image =
              res.appendInfo.followServer + "/" + res.appendInfo.resourceId;
            _this.img = res.appendInfo.resourceId;
          }
        });
        uploader.off("uploadError").on("uploadError", function(files, reason) {
          _this.$message({ message: reason.msg });
        });
      } else {
        if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
          _this.$message({
            message: "请上传支持格式的图片"
          });
        } else {
          _this.$message({
            message: `文件大小不超过${_this.imgStandardFileSize}M`
          });
        }
        _this.form.image = null;
        _this.img = null;
        uploader.cancelFile(file);
      }
    },
    handleAvatarSuccess(res, file) {
      this.form.image = URL.createObjectURL(file.raw);
    },
    // 地区改变
    changeRegion(items) {
      let [_province, _city, _area] = items;
      this.form.provinceId = _province;
      this.form.cityId = _city;
      this.form.areaId = _area;
      if (this.form.areaId) {
        if(!this.ifSchoolId) this.form.schoolId = '';
        getComboxByArea({
          provinceId: this.form.provinceId,
          cityId: this.form.cityId,
          areaId: this.form.areaId
        }).then(res => {
          let datas = res.data;
          if (datas.code == 200) {
            this.schoolList = datas.appendInfo.comboxList;
            this.ifSchoolId = false;
            if(!this.schoolList.length) this.form.schoolId = '';
          }
        });
      }
    },
    dictComb() {
      requestDictComb({
        groupCode: "pxGroups"
      }).then(res => {
        if (res.data.code === 200) {
          this.zbList = res.data.entity.dicList;
        }
      });
      //   requestDictComb({
      //     groupCode: "cyProjects"
      //   }).then(res => {
      //     if (res.data.code === 200) {
      //       this.projectList = res.data.entity.dicList;
      //     }
      //   });
    },
    // 老师是否报名
    signUp() {
      if (this.$ls.get("baseInfo")) {
        judgeEnroll({ id: this.$route.query.id }).then(res => {
          if (res.data.code === 200) {
            const isSignUp = res.data.appendInfo.isSignUp;
            if (isSignUp === 0) {
              const _baseInfo = this.$ls.get("baseInfo").baseInfo;
              const _baseSchool = this.$ls.get("baseInfo").school;
              if (this.detail.actorType === "2") {
                this.form.name = _baseInfo.name;
                this.form.phone = _baseInfo.phone;
                this.form.school = _baseInfo.schoolName;
                this.form.certiNum = _baseInfo.certiNum;
                this.form.sex = _baseInfo.sex;
                // this.form.provinceId = _baseSchool.provinceId;
                // this.form.areaId = _baseSchool.areaId;
                // this.form.cityId = _baseSchool.cityId;
                // this.defaultRegion = [
                //   this.form.provinceId,
                //   this.form.cityId,
                //   this.form.areaId
                // ];
                // this.form.schoolId = _baseInfo.schoolId
                this.ifEnroll = false;
              }
            } else if (isSignUp === 1) {
              this.btnTxt = "修改报名";
              this.ifEnroll = true;
              this.getEnrollDetail();
            }
          } else {
            this.$message({ type: "error", message: res.data.msg });
          }
        });
      }
    },
    // 获取详情数据
    getTrainDetail() {
      requestTrainDetail({ id: this.trainId }).then(res => {
        if (res.data.code === 200) {
          this.detail = res.data.entity;
          selectTrainProjectList({
            studySectionId: this.detail.studySectionId
          }).then(item => {
            if (item.data.code === 200) {
              this.projectList = item.data.entity.trainSubjectList;
            }
          });
          // 1.学生,2.教师
          if (this.detail.actorType === "2") {
            this.subjectLabel.title = "任教学科：";
            this.subjectLabel.txt = "请输入任教学科";
            this.signUp();
          }
        } else {
          this.$message({ type: "error", message: res.data.msg });
        }
      });
    },
    // 获取报名详情
    getEnrollDetail() {
      const params = {
        trainId: this.$route.query.id,
        applyId: this.$ls.get("baseInfo").baseInfo.id
      };
      trainEnrollDetail(params).then(res => {
        if (res.data.code === 200) {
          const _detail = res.data.entity;
          if (_detail) {
            this.form.name = _detail.name;
            this.form.phone = _detail.phone;
            this.form.subject = _detail.subject;
            this.form.remark = _detail.remark;
            this.form.school = _detail.school;
            this.form.accommodate = _detail.accommodate;
            this.form.meal = _detail.meal;
            this.form.id = _detail.id;
            this.form.actorWay = _detail.actorWay;
            this.form.projectDisDetailId = _detail.projectDisDetailId;
            this.form.groupDisDetailId = _detail.groupDisDetailId;
            this.form.certiNum = _detail.certiNum;
            this.selectdList = _detail.listMembers.map(i => ({
              name: i.userInfo,
              id: i.userId,
              status: false,
              certiNum: ""
            }));
            this.form.listMembers = _detail.listMembers;
            this.form.provinceId = _detail.provinceId;
            this.form.cityId = _detail.cityId;
            this.form.areaId = _detail.areaId;
            this.form.schoolId = _detail.schoolId;
            this.form.sex = _detail.sex;
            this.form.image = _detail.image;
            this.attachmentList = _detail.attachmentList.map(x => ({
              name: x.name,
              urls: x.resourceId,
              resourceId: x.resourceId,
              businessId: x.businessId
            }));
            this.ifStatus = true;
            this.form.attachmentList = this.attachmentList;
            this.defaultRegion = [
              this.form.provinceId,
              this.form.cityId,
              this.form.areaId
            ];
            getComboxByArea({
          provinceId: this.form.provinceId,
          cityId: this.form.cityId,
          areaId: this.form.areaId
        }).then(res => {
          let datas = res.data;
          if (datas.code == 200) {
            this.schoolList = datas.appendInfo.comboxList;
            if(!this.schoolList.length) this.form.schoolId = '';
          }
        });
            console.log(this.form);
          }
        }
      });
    },
    // 报名
    enrollSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.form, {
            trainId: this.trainId
          });
          if (this.detail.actorType === "2") {
            if (this.validateIDCode(params.certiNum)) {
              return;
            }
          }
          const relationType = this.detail.actorType;
          if (this.detail.actorType === "2") {
            params.applyId = this.$ls.get("baseInfo").baseInfo.id;
          }
          this.teamName = "";
          if (params.actorWay === "1") {
            params.listMembers = [];
          } else {
            params.listMembers = this.selectdList.map(i => ({
              userId: i.id,
              relationType: relationType
            }));
          }
          params.attachmentList = this.attachmentList.map(i => ({
            name: i.name,
            resourceId: i.resourceId,
            urls: i.urls,
            uid: i.uid,
            size: i.size
          }));
          if (params.actorWay == 2) {
            if (!params.listMembers.length)
              return this.$message({ type: "error", message: "请选择队员" });
          }
          if (this.ifEnroll) {
            // 修改
            // if (params.actorWay === '1') {
            //     params.listMembers = []
            // } else {
            //     params.listMembers = this.selectdList.map(
            //         i => ({
            //             userId: i.id,
            //             relationType: relationType
            //         })
            //     )
            // }

            trainEnrollModify(params).then(res => {
              if (res.data.code === 200 || res.data.code === 202) {
                this.$message({ type: "success", message: "修改成功" });
                if (params.actorWay === "1") {
                  this.selectdList = [];
                }
              } else {
                this.$message({ type: "error", message: res.data.msg });
              }
            });
          } else {
            // params.listMembers = params.listMembers.map(
            //     i => ({
            //         userId: i.id,
            //         relationType: relationType
            //     })
            // )
            trainEnroll(params).then(res => {
              if (res.data.code === 200 || res.data.code === 202) {
                if (this.detail.actorType === "2") {
                  this.ifEnroll = true;
                  this.btnTxt = "修改报名";
                  trainEnrollDetail({
                    trainId: this.$route.query.id,
                    applyId: this.$ls.get("baseInfo").baseInfo.id
                  }).then(response => {
                    if (response.data.code === 200) {
                      const _detail = response.data.entity;
                      this.form.id = _detail.id;
                    }
                  });
                } else {
                  this.ifEnroll = false;
                  this.$refs.form.resetFields();
                }
                this.$message({ type: "success", message: "报名成功" });
                this.attachmentList = [];
                if(this.$ls.get('userIdentity')!='teacher') this.form.image = null;
              } else {
                this.$message({ type: "error", message: res.data.msg });
              }
            });
          }
        } else {
          this.$message({ type: "error", message: "请检查信息是否填写完整" });
          return false;
        }
      });
    },
    // 查询
    searchStu() {
      const name = this.form.name;
      if (name.length < 2) {
        this.$message({ type: "error", message: "最少输入两个字" });
        return;
      }
      searchStudent({ name: name }).then(res => {
        if (res.data.code === 200) {
          if (res.data.appendInfo.list.length) {
            this.stuList = res.data.appendInfo.list;
            this.showList = true;
          } else {
            this.$message({ type: "error", message: "暂无数据" });
          }
        } else {
          this.$message({ type: "error", message: res.data.msg });
        }
      });
    },
    // 团体查询
    searchTeam() {
      const that = this;
      const name = this.teamName;
      this.selectdStatus = false;
      this.form.listMembers = [];
      this.teamList = [];
      if (this.detail.actorType === "2") {
        requestTeacherList({ auditStatus: 1, name: name }).then(res => {
          if (res.data.code === 200) {
            if (res.data.entity.resultData.length) {
              const teamList = res.data.entity.resultData.map(i => ({
                name: i.name,
                certiNum: i.certiNum,
                id: i.id,
                status: true
              }));
              const selectdList = this.selectdList;
              for (let i = 0; i < teamList.length; i++) {
                for (let j = 0; j < selectdList.length; j++) {
                  if (teamList[i].id === selectdList[j].id) {
                    teamList[i].status = false;
                  }
                }
              }
              this.teamList = teamList;
            } else {
              this.$message({ type: "error", message: "暂无数据" });
            }
          }
        });
      } else {
        searchStudent({ name: name }).then(res => {
          if (res.data.code === 200) {
            if (res.data.appendInfo.list.length) {
              const teamList = res.data.appendInfo.list.map(i => ({
                name: i.name,
                certiNum: i.certiNum,
                id: i.id,
                status: true
              }));
              const selectdList = this.selectdList;
              let isShow = false;
              for (let i = 0; i < teamList.length; i++) {
                for (let j = 0; j < selectdList.length; j++) {
                  if (teamList[i].id === selectdList[j].id) {
                    teamList[i].status = false;
                  }
                  if (teamList.length < 2 && teamList[i].status === false) {
                    isShow = true;
                  }
                }
              }
              if (isShow) {
                this.teamList = [];
              } else {
                this.teamList = teamList;
              }
            } else {
              this.$message({ type: "error", message: "暂无数据" });
            }
          } else {
            this.$message({ type: "error", message: res.data.msg });
          }
        });
      }
    },
    lastPage() {
      this.pages.pageNum--;
      console.log(this.pages);
    },
    nextPage() {
      this.pages.pageNum++;
      console.log(this.pages);
    },
    validateIDCode(value) {
      const regular = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/;
      if (!regular.test(value)) {
        this.$message({ type: "error", message: "您输入的身份证号格式不正确" });
        return true;
      } else {
        const reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(value)) {
          this.$message({
            type: "error",
            message: "您输入的身份证号格式不正确"
          });
          return true;
        }
      }
    },
    handleCheckAllChange(event) {
      this.form.listMembers = event.target.checked ? this.teamList : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.teamList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.teamList.length;
    },
    handleClose(tag) {
      const _this = this;
      for (let i = 0; i < this.teamList.length; i++) {
        if (this.selectdList[tag].id === this.teamList[i].id) {
          this.teamList[i].status = true;
        }
      }
      this.selectdList.splice(this.selectdList.indexOf(tag), 1);
    },
    doSelectd() {
      this.selectdStatus = true;
      this.selectdList = this.selectdList.concat(this.form.listMembers);
    },
    changeSchool: function(item) {
      this.$set(this.form, "schoolId", item.id);
      this.$set(this.form, "school", item.schoolName);
    },
    fileSuccess(data) {
      this.attachmentList = data;
      this.ifStatus = false;
    }
  },
  created() {
    this.form.schoolId = this.schoolList[0].id;
  }
};
</script>

<style lang="scss">
@import "~@/assets/css/scss/form.scss";
.detail-content {
  p {
    font-size: 18px;
    line-height: 1.5;
    color: #333;
    text-indent: 2em;
    margin-bottom: 15px;
  }
}

.actiTrain-detail {
  .form-box {
    .el-form-item__label {
      font-size: 16px;
    }
    .el-input__inner {
      height: 34px;
      border-radius: 10px;
    }
    .el-textarea__inner {
      height: 158px;
      border-radius: 10px;
    }
  }
  .delBtn {
    color: red;
    &:hover {
      color: red;
    }
    &:focus {
      color: red;
    }
  }
  .teamInput {
    input {
      border: none;
      text-align: center;
    }
  }
  .el-table {
    tbody {
      tr > td {
        background-color: #fff;
      }
      tr:hover > td {
        background-color: #fff;
      }
    }
  }
  .elTransfer {
    .el-transfer-panel {
      width: 280px;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@/assets/css/scss/vars.scss";
.actiTrain-detail {
  .detail-box {
    padding: 30px 50px;
    margin-bottom: 20px;
    .train-title {
      text-align: center;
      font-size: 36px;
      color: #000;
      margin-bottom: 15px;
    }
    .detail-msg {
      text-align: center;
      font-size: 16px;
      color: #ccc;
      margin-bottom: 30px;
      .msg-item {
        padding: 0 10px;
      }
    }
  }

  .form-box {
    padding: 10px 0;
    padding-bottom: 50px;
    .form-head {
      padding: 5px 0;
      padding-left: 10px;
      font-size: 30px;
      color: #000;
      border-left: 2px solid $theme-color;
      margin-bottom: 30px;
    }
  }
  .btn-box {
    margin-top: 40px;
    padding-left: 50px;
    .btn {
      width: 90px;
      height: 36px;
      border-radius: 10px;
      border: none;
      font-size: 16px;
      color: #fff;
      margin-right: 24px;
      &:hover {
        opacity: 0.75;
      }
    }
    .confirm-btn {
      background-color: $theme-color;
    }
    .cancel-btn {
      background-color: #ccc;
    }
  }
  .seachBtn {
    margin-left: 106px;
  }
  .elCheckbox {
    display: block;
    margin-left: 0;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
  }
  .seachUl {
    width: 300px;
    .seachRadio {
      line-height: 35px;
      margin-left: 0;
      display: block;
    }
  }
  // .searchDiv {
  //     overflow: hidden;
  //     padding-bottom: 20px;
  // }
  .sy {
    overflow-y: scroll;
    height: 300px;
  }
  .noData {
    text-align: center;
    color: #666;
  }
  .elTag {
    margin-right: 10px;
  }
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader /deep/ .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.selct {
  position: relative;
  .selectinput {
    width: 285px;
    /deep/ .selctop {
      opacity: 0;
      position: absolute;
      left: 0;
      width: 285px;
    }
  }
}
</style>
