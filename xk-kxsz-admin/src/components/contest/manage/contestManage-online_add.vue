<template>
  <div class="submit-form backend-content__middle">
    <el-form ref="form" :model="form" label-width="140px" :rules="rules">
      <!-- 竞赛主题 -->
      <el-row>
        <el-form-item label="竞赛主题" prop="title">
          <el-col :span="8">
            <el-input v-model="form.title" placeholder="请输入竞赛主题" :disabled="isReadOnly"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 竞赛项目 -->
      <!-- <el-row>
                <el-form-item label="竞赛项目" prop="projectRelationList">
                    <el-col :span="8">
                        <el-checkbox-group v-model="form.projectRelationList">
                            <el-checkbox v-for="item in projectRelationList" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                        <router-link class="resource-name" v-if="!projectRelationList.length" :to="{ path: `/contest-${$route.params.type}/event/add` }"><i class="icon-btn-add"></i>去添加</router-link>
                    </el-col>
                </el-form-item>
      </el-row>-->
      <el-row>
        <el-form-item label="项目类别" prop="projectRelationList">
          <el-col :span="14">
            <el-radio
              v-model="TypeListMapValue"
              v-for="(item,index) in reqTypeListMap"
              :label="item"
              :key="index"
              :disabled="isReadOnly"
            >{{item}}</el-radio>
          </el-col>
          <el-col :span="14" v-if="TypeListMapValue">
            <el-checkbox-group v-model="form.projectRelationList">
              <el-checkbox
                v-for="item in projectRelationList"
                :label="item.id"
                :key="item.id"
                :disabled="isReadOnly"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <router-link
              class="resource-name"
              v-if="!projectRelationList.length"
              :to="{ path: `/contest-${$route.params.type}/event/add` }"
            >
              <i class="icon-btn-add"></i>去添加
            </router-link>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 参赛人群 -->
      <el-row>
        <el-form-item label="参赛人群" prop="actorType">
          <el-col :span="8">
            <el-radio-group v-model="form.actorType">
              <el-radio
                v-for="item in actorTypeDL"
                :label="item.id"
                :key="item.id"
                :disabled="isReadOnly"
              >{{item.name}}</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="16">
            <p class="hint">
              <i class="table-cell icon-form-tip"></i>
              <span class="table-cell">参赛人群是学生时，学生可以报名参赛；参赛人群是教师时，教师可以报名参赛</span>
            </p>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 竞赛分组 -->
      <el-row v-if="form.actorType==1">
        <el-form-item label="竞赛分组" prop="actorGroup">
          <el-col :span="8">
            <el-checkbox-group v-model="form.actorGroup">
              <el-checkbox
                v-for="item in actorGroupDL"
                :label="item.id"
                :key="item.id"
                :disabled="isReadOnly"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="16">
            <p class="hint">
              <i class="table-cell icon-form-tip"></i>
              <span class="table-cell">只有参赛人群为学生时，才分组；参赛人群为教师时不分组；若选择分组，则只有这个分组的学生才能报名比赛</span>
            </p>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 参赛形式 -->
      <el-row>
        <el-form-item label="参赛形式" prop="actorWay">
          <el-col :span="8">
            <el-checkbox-group v-model="form.actorWay">
              <el-checkbox
                v-for="item in actorWayDL"
                :label="item.id"
                :key="item.id"
                :disabled="isReadOnly"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 竞赛封面 -->
      <el-row>
        <el-form-item label="竞赛封面" prop="cover">
          <el-col :span="14">
            <div id="v_picker">+</div>
            <!-- <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCover" :disabled="isReadOnly">
                            <img v-if="form.cover&&form.cover!=''" :src="getFileUrl(form.cover)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
            </el-upload> -->
            <!-- <v-up-image
                :imageFlag='true'
              :auto="true"
              :selectedList="attachmentList1"
              :listLength="attachmentList1.length"
              @fileSuccess="fileSuccess1"
            ></v-up-image> -->
          </el-col>
          <div class="tips" style="color:#8391a5;left:220px">
            仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M。
            <br />建议上传的图片像素为 1200 x 300
          </div>
        </el-form-item>
      </el-row>
      <!-- 竞赛时间 -->
      <el-row>
        <el-form-item label="竞赛时间" prop="matchDate">
          <el-col :span="8">
            <el-date-picker
              v-model="form.matchDate"
              type="daterange"
              placeholder="请选择竞赛时间范围"
              :picker-options="matchDateOptions"
              :disabled="isReadOnly"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 报名时间 -->
      <el-row>
        <el-form-item label="上传时间" prop="enrollDate">
          <el-col :span="8">
            <el-date-picker
              v-model="form.enrollDate"
              type="daterange"
              placeholder="请选择报名时间范围"
              :picker-options="enrollDateOptions"
              :disabled="isReadOnly"
            ></el-date-picker>
          </el-col>
          <el-col :span="16">
            <p class="hint">
              <i class="table-cell icon-form-tip"></i>
              <span class="table-cell">报名成功即可上传作品，当到达截止时间后，不能再上传作品</span>
            </p>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 作品上传截止时间 -->
      <el-row>
        <el-form-item label="作品上传截止时间" prop="worksEndDate">
          <el-col :span="8">
            <el-date-picker
              v-model="form.worksEndDate"
              type="date"
              placeholder="请选择作品上传截止时间范围"
              :picker-options="worksEndDateOptions"
              :disabled="isReadOnly"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 单人参赛作品限额 -->
      <el-row>
        <el-form-item label="单人参赛作品限额" prop="singleMaxNum">
          <el-col :span="8">
            <el-input-number v-model="form.singleMaxNum" :min="0" :disabled="isReadOnly"></el-input-number>
          </el-col>
          <el-col :span="16">
            <p class="hint">
              <i class="table-cell icon-form-tip"></i>
              <span class="table-cell">一个报名人的参赛作品数限制。超出限额，则不能上传作品，0为不限制</span>
            </p>
          </el-col>
        </el-form-item>
        <el-form-item label prop="isWorksAudit">
          <el-col :span="8">
            <el-switch
              v-model="form.isWorksAudit"
              on-text
              off-text
              :on-value="1"
              :off-value="0"
              :disabled="isReadOnly"
            ></el-switch>是否作品审核
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 竞赛级别 -->
      <el-row>
        <el-form-item label="竞赛级别" prop="matchGrade">
          <el-col :span="8">
            <el-select v-model="form.matchGrade" placeholder="请选择主管部门" :disabled="true">
              <el-option
                v-for="item in matchGradeDL"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 竞赛评比 -->
      <el-row>
        <el-form-item label="竞赛评比" prop="phaseList">
          <el-col :span="8">
            <el-row class="phase-title">
              <el-col :span="8">评比阶段</el-col>
              <el-col :span="16">评比时间</el-col>
            </el-row>
            <template v-if="isReadOnly">
              <el-row
                :gutter="10"
                class="phase-list"
                v-for="(phase, index) in form.phaseList"
                :key="index"
              >
                <el-col :span="8">
                  <span class="phase-list-title">{{phaseList[index].name}}</span>
                </el-col>
                <el-col :span="16">
                  <el-date-picker
                    v-model="form.phaseList[index]"
                    type="daterange"
                    :picker-options="phaseDateOptions"
                    :disabled="isReadOnly"
                  ></el-date-picker>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <el-row
                :gutter="10"
                class="phase-list"
                v-for="(phase, index) in phaseList.slice(0, phaseList.findIndex(x=>x.code==identityCode)+1)"
                :key="index"
              >
                <el-col :span="8">
                  <span class="phase-list-title">{{phase.name}}</span>
                </el-col>
                <el-col :span="16">
                  <el-date-picker
                    v-model="form.phaseList[index]"
                    type="daterange"
                    :placeholder="`请选择${phase.name}时间范围`"
                    :picker-options="phaseDateOptions"
                  ></el-date-picker>
                </el-col>
              </el-row>
            </template>
          </el-col>
          <el-col :span="16">
            <p class="hint">
              <i class="table-cell icon-form-tip"></i>
              <span class="table-cell">各级评比时间不重叠，且不能超出活动期限。下级评比结束后，上级评比才能开始。如：校级评比结束后，区县级评比才能开始。</span>
            </p>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 竞赛详情 -->
      <el-row>
        <el-form-item label="竞赛详情" prop="details">
          <el-col :span="15">
            <div id="editor-trigger" style="height: 200px"></div>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 附件 -->
      <el-row>
        <el-form-item label="附件">
          <el-col :span="14">
            <!-- <ul v-if="isReadOnly" class="el-upload-list el-upload-list--text">
                            <li class="el-upload-list__item" v-for="(file, index) in form.attachmentList" :key="index">
                                <a class="el-upload-list__item-name" :href="downloadUrl(file.resourceId, file.name)" :download="file.name">
                                    <i class="el-icon-document"></i>{{file.name}}
                                </a>
                            </li>
                        </ul>
                        <el-upload v-else class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                            <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                            <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{ standardFileSize }}M以内，文件名不超过30字</span>
            </el-upload>-->
            <v-up-files
              :auto="false"
              :selectedList="attachmentList"
              :listLength="attachmentList.length"
              :ifStatus="ifStatus"
              @fileSuccess="fileSuccess"
              :defaultList='defaultList'
            ></v-up-files>
            <div class="fileTips">
              <p>注：名称长度在30字以内， 单个文件大小不超过500M，一次性可上传多个文件</p>
            </div>
          </el-col>
        </el-form-item>
      </el-row>
      <el-form-item v-if="isReadOnly">
        <button class="bs-form-button i-form-button" type="button" @click="$router.go(-1)">返回</button>
      </el-form-item>
      <el-form-item v-else>
        <button class="bs-form-button i-form-button" type="button" @click="onSubmit('form')">保存</button>
        <button
          class="bs-form-button i-form-button is-plain"
          type="button"
          @click="$router.go(-1)"
        >取消</button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import { loginInfo } from "Asset/js/getUserInfo.js";
import { editor } from "@/mixin/wangEditor.js";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import { mapState, mapMutations, mapActions } from "Vuex";
import {
  addContest,
  requestContestDetail,
  modifyContest,
  requestContestItem
} from "@/service/admin_contest.js";
import { selectMatchType } from "@/service/admin_contest-offline.js";
// import region from '@/components/common/select/region_select.vue'
import axios from "axios";
import upFiles from "@/components/common/upFiles";
// import upImage from "@/components/common/upImage";
const fileUploadAddress = location.protocol + '//' + location.host
export default {
  name: "contestManageAdd", // 机构线上多级竞赛
  mixins: [uploadFileSize, editor],
  components: {
    "v-up-files": upFiles,
    // "v-up-image": upImage,
  },
  data() {
    var validateMatchDate = (rule, value, callback) => {
      value = value.filter(x => x);
      if (!value.length) {
        callback(new Error(`请选择竞赛时间范围`));
      } else if (value[0] < Date.now() - 8.64e7) {
        callback(new Error(`竞赛开始不能早于当前时间`));
      } else {
        if (this.form.enrollDate.length) {
          this.$refs.form.validateField("enrollDate");
        }
        if (this.form.worksEndDate !== "") {
          this.$refs.form.validateField("worksEndDate");
        }
        callback();
      }
    };
    var validateEnrollDate = (rule, value, callback) => {
      value = value.filter(x => x);
      let matchEndDate = this.params.matchEndDate;
      if (!value.length) {
        callback(new Error(`请选择报名时间范围`));
      } else if (value[1] > matchEndDate) {
        callback(new Error(`报名截止时间不能晚于竞赛结束时间`));
      } else {
        if (this.form.worksEndDate !== "") {
          this.$refs.form.validateField("worksEndDate");
        }
        callback();
      }
    };
    var validateWorksEndDate = (rule, value, callback) => {
      let enrollEndDate = this.params.enrollEndDate;
      let matchEndDate = this.params.matchEndDate;
      if (value === "") {
        callback(new Error(`请选择作品上传截止时间`));
      } else if (value < enrollEndDate && value > matchEndDate) {
        callback(
          new Error(
            `作品上传截止时间不能早于报名截止时间且不能晚于竞赛结束时间`
          )
        );
      } else if (value <= enrollEndDate) {
        callback(new Error(`作品上传截止时间不能早于报名截止时间`));
      } else if (value > matchEndDate) {
        callback(new Error(`作品上传截止时间不能晚于竞赛结束时间`));
      } else {
        callback();
      }
    };
    var validatePhaseList = (rule, value, callback) => {
      let worksEndDate = this.form.worksEndDate;
      let flag =
        worksEndDate !== "" && value[0] ? value[0][0] > worksEndDate : true;
      if (flag) {
        for (let i = 1; i < value.length; i++) {
          if (!flag) break;
          if (value[i] && value[i][0] <= value[i - 1][1]) {
            flag = false;
          }
        }
        if (flag) {
          callback();
        } else {
          callback(new Error(`上级评比时间不能早于下级评比时间`));
        }
      } else {
        callback(new Error(`评比时间不能早于作品上传截止时间`));
      }
    };
    return {
      identityCode: this.$ls.get("loginInfo").userInfo.identity,
      checkedProjectRelationList: [], // 已选竞赛项目
      reqProjectRelationList: [], // 请求竞赛项目
      reqTypeListMap: [], //竞赛项目
      reqTypeListMapObj: {}, //竞赛项目
      projectRelationList: [],
      TypeListMapValue: "",
      matchDateOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      phaseList: [
        { code: "9", name: "校级评比" },
        { code: "7", name: "区县评比" },
        { code: "6", name: "市级评比" },
        { code: "10", name: "省级评比" }
      ],
      // 表单数据
      form: {
        title: "", // 竞赛主题
        projectRelationList: [],
        actorType: "", // 参赛人群
        actorGroup: [], // 竞赛分组
        actorWay: [], // 参赛形式
        cover: null, // 竞赛封面
        matchDate: [], // 竞赛时间
        enrollDate: [], // 报名时间
        worksEndDate: "", // 作品上传截止时间
        singleMaxNum: 0, // 单人参赛作品限额
        isWorksAudit: 1, // 是否作品审核
        matchGrade: 6 || "5", // 竞赛级别(同身份identity)
        details: "", // 竞赛详情
        phaseList: [], // 竞赛评比
        attachmentList: [] // 附件列表
      },
      myReg: false,
      isReadOnly: false,
      // 表单校验提示
      rules: {
        title: [
          { required: true, message: "请输入竞赛主题", trigger: "change" },
          { max: 50, message: "请输入50字以内的竞赛主题", trigger: "change" }
        ],
        projectRelationList: [
          {
            required: true,
            type: "array",
            message: "请选择竞赛项目",
            trigger: "change"
          }
        ],
        actorType: [
          { required: true, message: "请选择参赛人群", trigger: "change" }
        ],
        actorGroup: [
          {
            required: true,
            type: "array",
            message: "请选择竞赛分组",
            trigger: "blur"
          }
        ],
        actorWay: [
          {
            required: true,
            type: "array",
            message: "请选择参赛形式",
            trigger: "blur"
          }
        ],
        cover: [
          { required: true, message: "请上传竞赛封面", trigger: "change" }
        ],
        matchDate: [
          {
            required: true,
            type: "array",
            message: "请选择竞赛时间范围",
            trigger: "change"
          },
          { validator: validateMatchDate, required: true, trigger: "change" }
        ],
        enrollDate: [
          {
            required: true,
            type: "array",
            message: "请选择报名时间范围",
            trigger: "change"
          },
          { validator: validateEnrollDate, required: true, trigger: "change" }
        ],
        worksEndDate: [
          {
            required: true,
            type: "date",
            message: "请选择作品上传截止时间",
            trigger: "change"
          },
          { validator: validateWorksEndDate, required: true, trigger: "change" }
        ],
        singleMaxNum: [
          {
            required: true,
            type: "number",
            message: "请输入单人参赛作品限额",
            trigger: "change"
          }
        ],
        matchGrade: [
          { required: true, message: "请选择竞赛级别", trigger: "change" }
        ],
        phaseList: [
          {
            type: "array",
            required: true,
            message: "请至少选择所有阶段评比时间",
            trigger: "blur"
          },
          { validator: validatePhaseList, trigger: "blur" }
        ],
        details: [
          { required: true, message: "请输入竞赛详情", trigger: "blur" }
        ]
      },
      attachmentList: [],
      attachmentList1: [],
      defaultList:[],
      ifStatus: false,
    };
  },
  methods: {
    fileSuccess(data) {
      this.attachmentList = data;
      this.ifStatus = false;
    },
    fileSuccess1(data) {
      this.attachmentList1 = data;
      this.form.cover = data[data.length-1].resourceId;
    },
    ...mapActions({
      getDictComb: "dictionaryCommon/getDictComb"
    }),
    UploadCover(file, fileList) {
      const fileSize = file.size,
        fileName = file.name,
        expandName = fileName.substr(fileName.lastIndexOf(".") + 1),
        _this = this;
      if (
        /(jpe?g|gif|png|bmp)$/i.test(expandName) &&
        fileSize < this.imgStandardFileSize * 1024 * 1024
      ) {
        uploader.off("uploadSuccess").on("uploadSuccess", function(file, res) {
          if (res.code === 200) {
            _this.form.cover = res.appendInfo.resourceId;
          }
        });
        uploader.off("uploadError").on("uploadError", function(file, reason) {
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
        _this.form.cover = null;
        uploader.cancelFile(file);
      }
    },

    UploadFile(file, fileList) {
      const fileSize = file.size,
        _this = this;
      if (this.checkIsHasSpecialStr(file.name)) {
        _this.$message({
          message: `文件名不能超过30字，不包含特殊符号`
        });
        _this.form.attachmentList.splice(_this.form.attachmentList.length, 1);
        uploader.cancelFile(file);
      } else {
        if (fileSize < _this.standardFileSize * 1024 * 1024) {
          uploader
            .off("uploadSuccess")
            .on("uploadSuccess", function(file, res) {
              if (res.code === 200) {
                _this.form.attachmentList.push({
                  name: file.name,
                  type: 1,
                  size: fileSize,
                  resourceId: res.appendInfo.resourceId,
                  documentId: res.appendInfo.resourceId
                });
              }
            });
          uploader.off("uploadError").on("uploadError", function(file, reason) {
            _this.$message({ message: reason.msg });
          });
        } else {
          _this.$message({
            message: `文件大小不超过${_this.standardFileSize}M`
          });
          _this.form.attachmentList.splice(_this.form.attachmentList.length, 1);
          uploader.cancelFile(file);
        }
      }
    },

    checkIsHasSpecialStr(name) {
      const ext = name.substring(0, name.lastIndexOf("."));
      // const myReg = /[~!@#$%^&*()/\|,.<>?"'();:+=\[\]{}]/;
      const myRegExp = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].,<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]"
      );
      if (myRegExp.test(ext) || ext.indexOf(" ") !== -1 || ext.length > 30) {
        this.myReg = true;
      } else {
        this.myReg = false;
      }
      return this.myReg;
      // return false
    },

    handleRemove(file, fileList) {
      let _list = [];
      fileList.forEach(x => {
        _list.push({
          name: x.name,
          type: 1,
          resourceId: x.url
        });
      });
      this.form.attachmentList = _list;
    },
    //获取赛事详情
    getDetail() {
      requestContestDetail({ id: this.form.id }).then(res => {
        if (res.data.code === 200) {
          let datas = res.data.entity,
            _form = {};
          // datas.projectRelationList = [{
          //     projectId:'55ce0ceeb23a420db5872f888bf51d7d',
          //     projectName:'绘画'
          // }]
          if (this.isReadOnly) {
            this.$set(
              this.$data,
              "checkedProjectRelationList",
              datas.projectRelationList.map(x => {
                x.id = x.projectId;
                x.name = x.projectName;
                return x;
              })
            );
          }
          _form.id = datas.id;
          _form.title = datas.title || "";
          _form.projectRelationList =
            datas.projectRelationList.map(x => {
              return x.projectId;
            }) || [];
          _form.actorType = datas.actorType || "";
          _form.actorGroup = datas.actorGroup.split(",") || [];
          _form.actorWay = datas.actorWay.split(",") || [];
          _form.cover = datas.cover || "";
          _form.matchDate = [datas.matchStartDate, datas.matchEndDate];
          _form.enrollDate = [datas.enrollStartDate, datas.enrollEndDate];
          _form.worksEndDate = new Date(datas.worksEndDate) || "";
          _form.singleMaxNum = datas.singleMaxNum || "";
          _form.isWorksAudit = datas.isWorksAudit || "0";
          _form.matchGrade = datas.matchGrade || "";
          _form.details = datas.details || "";
          _form.phaseList = [];
          this.phaseList.forEach(x => {
            let item = datas.phaseList.find(y => y.identity == x.code);
            item && _form.phaseList.push([item.startDate, item.endDate]);
          });
          // 附件
          _form.attachmentList = datas.attachmentList.map(x => {
            let item = {
              name: x.name,
              type: x.type,
              size: x.size,
              resourceId: x.resourceId,
              documentId: x.documentId
            };
            return item;
          });
          this.attachmentList = datas.attachmentList.map(x => ({
              name: x.name,
              urls: x.resourceId,
              resourceId: x.resourceId,
              businessId: x.businessId
            }));
          this.ifStatus = true;
          if(_form.cover){
            let url = fileUploadAddress + _form.cover
            $('#v_picker').css({
            'background-color':'none',
            "background-image":'url('+url+')'
          })
          $('#v_picker .webuploader-pick').html('')
          }  
          this.editor.$txt.html(datas.details);
          this.$set(this.$data, "form", _form);
          this.getSelectMatchType(
            datas.projectMatchName,
            _form.projectRelationList
          );
        }
      });
    },
    // 获取竞赛项目列表
    getItemsData() {
      requestContestItem().then(response => {
        if (response.data.code == 200) {
          let _data = response.data.entity.resultData || [];
          this.reqProjectRelationList = _data;
        }
      });
    },
    // 提交表单
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let flag = this.$route.query.id ? true : false,
            handle = flag ? modifyContest : addContest,
            handleText = flag ? "修改" : "添加";
          handle(this.params).then(response => {
            if (response.data.code == 200) {
              this.$router.go(-1);
              this.$message({
                message: `${handleText}成功`,
                type: "success"
              });
            } else {
              this.$message.error(response.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getSelectMatchType(projectMatchName, list) {
      selectMatchType({}).then(response => {
        if (response.data.code == 200) {
          let _data = response.data.entity.typeListMap || {};
          for (const key in _data) {
            this.reqTypeListMap.push(key);
          }
          this.reqTypeListMapObj = _data;
          if (this.$route.query.id) {
            this.TypeListMapValue = projectMatchName;
            // this.TypeListMapValue = '其他类别';
          }
        }
      });
    },
    setNavDefault(){
      console.log(123)
    }
  },
  created() {
    if (loginInfo.userInfo.identity) {
      if (loginInfo.userInfo.identity.indexOf("_") > 0)
        this.form.matchGrade = loginInfo.userInfo.identity.split("_")[0];
      else this.form.matchGrade = loginInfo.userInfo.identity;
    }
    if (this.$ls.get("loginInfo").userInfo.identity) {
      if (this.$ls.get("loginInfo").userInfo.identity.indexOf("_") > 0)
        this.identityCode = this.$ls
          .get("loginInfo")
          .userInfo.identity.split("_")[0];
      else this.identityCode = this.$ls.get("loginInfo").userInfo.identity;
    }
    if (this.$route.path.includes("detail")) {
      this.isReadOnly = true;
      this.rules = {};
    }
    this.getItemsData();

    let _id = this.$route.query.id;
    if (_id != undefined) {
      this.$set(this.form, "id", _id);
      this.getDetail();
    } else this.getSelectMatchType();
    
  },
  mounted() {
    this.initEditor();
    let self = this;
    this.editor.onchange = function() {
      self.form.details = this.$txt.html();
    };
    if (this.isReadOnly) {
      this.editor.disable();
    };
    var uploader = WebUploader.create({
        // swf文件路径
        swf:'../static/js/Uploader.swf',
        // 文件接收服务端。
        server: fileUploadAddress + '/file/authnw/fileUpload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#v_picker',
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        //是否开启自动上传
        auto:true
    });
    uploader.on( 'beforeFileQueued', function( file) {
      console.log('文件加入队前',file)
    });
    uploader.on( 'uploadError', function( file,res) {
       self.$message({ message: res.data.msg });
    });
    uploader.on( 'uploadSuccess', function( file,res ) {
      console.log('文件上传成功',file,res)
      if (res.status.value === 200) {
          self.form.cover = res.data.resourceId;
          $('#v_picker').css({
            'background-color':'none',
            "background-image":'url('+res.data.storeFilePath+')'
          })
          $('#v_picker .webuploader-pick').html('')
      }
    });
    $('#v_picker div').css({
      'width': '100%',
      'height':'100%',
      })
    $('#v_picker .webuploader-pick').css({
      'width': '100%',
      'height':'100%',
      'font-size':'40px',
      'text-align': 'center',
      'line-height': '100px',
      'color': '#999',
      })
    $('#v_picker input').css({display: 'none'});
    setTimeout(function(){
      $('#v_picker input').css({display: 'none'})  
    },100)  
  },
  computed: {
    ...mapState("dictionaryCommon", {
      actorGroupDL(state) {
        let dicList = (state["periodKeyDicList"] || {}).dicList || [];
        return dicList;
      },
      actorWayDL(state) {
        let dicList = (state["actorWayDicList"] || {}).dicList || [];
        return dicList;
      },
      actorTypeDL(state) {
        let dicList = (state["actorTypeDicList"] || {}).dicList || [];
        return dicList;
      },
      matchGradeDL(state) {
        let dicList = (state["matchGradeDicList"] || {}).dicList || [];
        return dicList;
      }
    }),
    // projectRelationList: function() {
    //     let arr = [...this.checkedProjectRelationList, ...this.reqProjectRelationList],
    //         hash = {}
    //     arr = arr.reduce(function(item, next) {
    //         hash[next.id] ? '' : hash[next.id] = true && item.push(next)
    //         return item
    //     }, [])
    //     return arr
    // },
    enrollDateOptions: function() {
      let matchEndDate = this.form.matchDate[1];
      return {
        disabledDate(time) {
          let range = time.getTime() < Date.now() - 8.64e7;
          if (matchEndDate) {
            range =
              time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() > matchEndDate;
          }
          return range;
        }
      };
    },
    worksEndDateOptions: function() {
      let matchEndDate = this.form.matchDate[1];
      let enrollEndDate = this.form.enrollDate[1];
      return {
        disabledDate(time) {
          let range = time.getTime() < Date.now() - 8.64e7;
          if (enrollEndDate && matchEndDate) {
            range =
              time.getTime() <= enrollEndDate || time.getTime() > matchEndDate;
          } else if (matchEndDate) {
            range =
              time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() > matchEndDate;
          } else if (enrollEndDate) {
            range = time.getTime() <= enrollEndDate;
          }
          return range;
        }
      };
    },
    phaseDateOptions: function() {
      let limitStartDate =
        this.form.worksEndDate ||
        this.form.enrollDate[1] ||
        this.form.matchDate[0] ||
        Date.now() - 8.64e7;
      let limitEndDate = this.form.matchDate[1];
      return {
        disabledDate(time) {
          let range = time.getTime() < Date.now() - 8.64e7;
          if (limitEndDate) {
            range =
              time.getTime() <= limitStartDate || time.getTime() > limitEndDate;
          } else {
            range = time.getTime() <= limitStartDate;
          }
          return range;
        }
      };
    },
    params: function() {
      let _params = Object.assign({}, this.form);
      _params.actorGroup = _params.actorGroup.join(",");
      _params.actorWay = _params.actorWay.join(",");
      _params.matchStartDate = _params.matchDate[0];
      _params.matchEndDate = _params.matchDate[1];
      _params.enrollStartDate = _params.enrollDate[0];
      _params.enrollEndDate = _params.enrollDate[1];
      _params.projectRelationList = _params.projectRelationList.length
        ? _params.projectRelationList.map(x => {
            return { projectId: x };
          })
        : [];
      _params.phaseList = _params.phaseList.length
        ? _params.phaseList
            .filter(x => x)
            .map((x, i) => {
              return {
                startDate: x[0],
                endDate: x[1],
                identity: this.phaseList[i].code,
                name: this.phaseList[i].name,
                sort: i
              };
            })
        : [];
       _params.attachmentList = this.attachmentList.map(i => ({
            name: i.name,
            resourceId: i.resourceId,
            urls: i.urls,
            uid: i.uid,
            size: i.size
          })); 
      delete _params.matchDate;
      delete _params.enrollDate;
      return _params;
    },
    fileList: function() {
      let _list = [];
      let fileList = this.form.attachmentList || [];
      fileList.forEach(x => {
        _list.push({
          name: x.name,
          url: this.getFileUrl(x.resourceId, { filetype: "file" }),
          status: "finished"
        });
      });
      return _list;
    }
  },
  watch: {
    TypeListMapValue(n, o) {
      let list = this.reqTypeListMapObj[n];
      if (list) this.projectRelationList = list;
    },
    '$route': 'setNavDefault'
  }
};
</script>

<style lang='scss' scoped>
.hint {
  display: table;
  height: 36px;
  font-size: 12px;
  line-height: 1;
  color: #999;

  .icon-form-tip {
    padding-right: 4px;
    font-size: 14px;
    text-indent: 10px;
  }
}
.icon-btn-add {
  margin-right: 4px;
}
.el-upload-list {
  margin-top: -5px;
}
.phase-title {
  background-color: #dfdfdf;
  text-align: center;
}
.phase-list {
  margin: 10px 0;
  text-align: center;
  .phase-list-title {
    display: block;
    background-color: #eee;
  }
}
#v_picker{
  height: 100px;
  width: 100px;
  font-size: 40px;
  border: 1px dashed #92cdfa;
  background-color: #f5fafe;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  div:first-child{
    width: 100%;
    height: 100%;
    
  }
  /deep/ input{
    display: none !important;
  }
}
</style>
