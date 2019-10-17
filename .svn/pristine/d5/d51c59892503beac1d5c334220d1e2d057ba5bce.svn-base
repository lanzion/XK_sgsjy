/* eslint-disable no-implied-eval */
/* eslint-disable eqeqeq */
/* eslint-disable space-before-blocks */
<template>
  <section class="myPlay_upload bgc_w">
    <h3 class="title">上传作品</h3>
    <!-- <el-form ref="form" :model="form" label-width="120px" class="form" :rules="rule"> -->
    <el-form ref="form" :model="form" :rules="rule" label-width="120px" class="form">
      <el-form-item label="参赛项目" prop="projectId">
        <el-radio-group v-model="form.projectId">
          <el-radio :label="i.id" v-for="(i, k) in projectIdOptions" :key="k">{{ i.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="参赛形式" prop="actorWay">
        <el-radio-group v-model="form.actorWay">
          <el-radio :label="i.val" v-for="(i, k) in actorWayOptions" :key="k">{{ i.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="参赛组别" prop="groupDisDetailId">
        <el-radio-group v-model="form.groupDisDetailId">
          <el-radio :label="i.id" v-for="(i, k) in zbList" :key="k">{{ i.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="参赛学科" prop="subjectDisDetailId">
        <el-radio-group v-model="form.subjectDisDetailId">
          <el-radio :label="i.id" v-for="(i, k) in subjectList" :key="k">{{ i.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="作品名称" prop="name">
        <el-col :span="8">
          <el-input v-model="form.name"></el-input>
        </el-col>
        <el-col :span="4">
          <button type="button" class="btn_selectWork" @click="addResourcePopop = true;">选择</button>
        </el-col>
      </el-form-item>

      <el-form-item label="作品图片" prop="worksList">
        <el-row>
          <el-checkbox-group v-model="form.worksList" v-show="false"></el-checkbox-group>
          <el-upload
            action="http://192.168.2.44/file/auth/fileUpload"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="UploadCover"
            :on-remove="handleRemove"
            :on-error="doTips"
            :file-list="form.worksList"
            accept=".jpg, .jpeg, .png, .gif"
            ref="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-row>
        <el-row style="color:#999;font-size: 12px;line-height: 2;">
          最多五张，仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M。
          <br />建议上传的图片像素为 960 x 428
        </el-row>
      </el-form-item>
      <!-- <el-form-item label="作品图片" prop="worksList">
                <el-checkbox-group v-model="form.worksList" v-show="false"></el-checkbox-group>
                <v-webuploader :auto="true" :duplicate="true" :selectedList="form.worksList" @uploadSuccess="uploadSuccess" @removeFile="removeFile"></v-webuploader>
                <el-row style="color:#999;font-size: 12px;line-height: 2;">
                    最多五张，仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M。
                    <br />建议上传的图片像素为 960 x 428
                </el-row>
      </el-form-item>-->

      <!--
            <el-form-item label="附件998">
                <div>
                    <iframe src="http://localhost:9998/#/" id='iframeImg' scrolling="no" frameborder="0" ></iframe>
                    <el-row style="color:#999;font-size: 12px;line-height: 2;">
                        最多五张，仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M。
                        <br />建议上传的图片像素为 960 x 428
                    </el-row>
                </div>
      </el-form-item>-->

      <el-form-item label="作品介绍" prop="description">
        <el-col :span="22">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.description"
            resize="none"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in form.fieldList"
        :label="item.name"
        :key="item.id"
        required
      >
        <el-col :span="8">
          <el-input :rows="5" :placeholder="item.description" v-model="item.content"></el-input>
        </el-col>
        <p class="field-tips fl" v-if="item.ifTips">{{item.description}}</p>
      </el-form-item>
      <el-form-item label="指导老师" v-if="isStudent">
        <el-row>
          <el-col :span="6">
            <el-input v-model="searchteacher" placeholder="请输入指导老师姓名"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button class="group_button sure ml15" @click="getPersonList('teacher')">查找</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-tag
              :key="index"
              v-for="(tag, index) in form.checkedTeacherList"
              :closable="true"
              :close-transition="false"
              @close="delTag('Teacher', index)"
              class="tag"
            >{{tag.name}}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <transition-group
              class="item-list clearfix"
              v-if="teacherList.length"
              name="item-item"
              tag="ul"
              mode="out-in"
            >
              <li class="item-item" v-for="(i, k) in teacherList" :key="k">
                <section class="item-item-detail">
                  <img class="item-img fl" :src="getFileUrl(i.face) || faceDefault" />
                  <div class="item-msg">
                    <p class="name">{{ i.name }}</p>
                  </div>
                  <template>
                    <i class="item-item-handle i-success-bg"></i>
                    <i class="item-item-handle icon-btn-follow2" @click="add('Teacher', i)"></i>
                  </template>
                </section>
              </li>
            </transition-group>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="参赛成员" prop="checkedStudentList" v-if="form.actorWay === '2'">
        <el-row>
          <el-col :span="6">
            <el-input v-model="searchstudent" placeholder="请输入参赛成员姓名"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button
              class="group_button sure ml15"
              @click="getPersonList($ls.get('userIdentity'), true)"
            >查找</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-checkbox-group v-model="form.checkedStudentList" v-show="false"></el-checkbox-group>
            <el-tag
              :key="index"
              v-for="(tag, index) in form.checkedStudentList"
              :closable="true"
              :close-transition="false"
              @close="delTag('Student', index)"
              class="tag"
            >{{tag.name}}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <transition-group
              class="item-list clearfix"
              v-if="studentList.length"
              name="item-item"
              tag="ul"
              mode="out-in"
            >
              <li class="item-item" v-for="(i, k) in studentList" :key="k">
                <section class="item-item-detail">
                  <img class="item-img fl" :src="getFileUrl(i.face) || faceDefault" />
                  <div class="item-msg">
                    <p class="name">{{ i.name }}</p>
                  </div>
                  <template>
                    <i class="item-item-handle i-success-bg"></i>
                    <i class="item-item-handle icon-btn-follow2" @click="add('Student', i)"></i>
                  </template>
                </section>
              </li>
            </transition-group>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- <div @click="sendMessage">sendMessage</div>
             <el-form-item label="附件8089">
                <div>
                    <iframe src="http://localhost:9999/#/" id='iframe'  ref="iframes" :style="{height:(iframeHeight+'px')}" frameborder="0" ></iframe>
                    <iframe src="http://192.168.2.79:8089/file/" id='iframe' ref="iframes" :style="{height:(iframeHeight+'px')}" frameborder="0" @load="test"></iframe>
                    <div class="fileTips">
                        <p>注：名称长度在30字以内， 单个文件大小不超过2g，一次性最多可上传5个文件</p>
                        <div class="types">
                            <p class="fl">文件类型：</p>
                            <p class="fl typeList">doc、docx、ppt、pptx、xls、xlsx、vsd、pot、pps、rtf、wps、et、dps、pdf、txt、epub、mp4、png、jpeg、jpg、gif、exe、avi、rar</p>
                        </div>
                    </div>
                </div>
      </el-form-item>-->
      <el-form-item label="附件" prop="attachmentList">
        <v-up-files
          :auto="false"
          :selectedList="attachmentList"
          :listLength="attachmentList.length"
          :ifStatus="ifStatus"
          @fileSuccess="fileSuccess"
        ></v-up-files>
        <div class="fileTips">
          <p>注：名称长度在50字以内， 单个文件大小不超过800M，多个文件请压缩上传</p>
          <div class="types">
            <p class="fl">文件类型：</p>
            <p
              class="fl typeList"
            >doc、docx、ppt、pptx、xls、xlsx、vsd、pot、pps、rtf、wps、et、dps、pdf、txt、epub、mp4、png、jpeg、jpg、gif、exe、avi、rar、zip</p>
          </div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="图片附件33333">
                <v-testUp></v-testUp>
                <el-button @click="upload">simple点我上传</el-button>
                 <v-simpleUpload
                    ref="uploader"
                    url="http://192.168.2.79:8089/file/authnw/fileUpload"></v-simpleUpload>
      </el-form-item>-->
      <!-- <el-form-item label="同步到个人空间">
                <el-switch v-model="form.isSync" on-color="#2797ed" off-color="#e4e8f1" on-value="1" off-value="0" on-text="是" off-text="否"></el-switch>
      </el-form-item>-->
      <!-- <button type="button" class="group_big_button sure" @click="submitUpload">提交文件</button> -->

      <el-form-item class="pt20">
        <button type="button" class="group_big_button sure" @click="submit">提交</button>
        <button
          type="button"
          class="group_big_button cancel ml15"
          @click="$router.push({ path: 'myWorks', query: $route.query })"
        >取消</button>
      </el-form-item>
    </el-form>
    <!-- 添加作品 -->
    <el-dialog title="添加作品" :visible.sync="addResourcePopop" size="tiny" class="addWorkPopup">
      <div class="func">
        <el-input
          placeholder="搜索"
          icon="search"
          v-model="searchWork"
          @click="getWorksList"
          @keyup.native.enter="getWorksList"
        ></el-input>
      </div>
      <div class="box">
        <el-radio-group
          v-model="selectedWork"
          class="popupList"
          style="width: 100%;"
          @change="saveSelectedWork"
        >
          <el-radio v-for="(i, k) in worksList" :label="i" :key="k">{{i.workName}}</el-radio>
        </el-radio-group>
        <div
          class="load-more"
          v-if="worksPage.totalNum > worksList.length"
          @click="worksPage.pageNum++; getWorksList()"
        >加载更多</div>
      </div>
    </el-dialog>

    <!-- <el-dialog title="添加附件" :visible.sync="iframeShow" size="tiny" style='overflow:auto' class="addWorkPopup">

    </el-dialog>-->
  </section>
</template>

<script>
import webuploader from "@/components/common/up";
import upFiles from "@/components/common/upFiles";
import testUp from "@/components/common/testUp";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import {
  requestWorksList,
  requestMatchActor,
  requestTeacherList,
  requestStudentList,
  requestMatchWorksAdd
} from "@/service/matchEntrance.js";
import { requestMatchProject } from "@/service/contest_detail.js";
import { requestDictComb } from "@/service/common";
import { checkFile, wordUpload } from "@/service/upload";
import Bus from "@/assets/js/bus";
import baseUrl from "Asset/js/common-config.js";
import { uploadByPieces } from "Asset/js/utils";
// const imgUrl = require('Asset/img/common/del.png')

export default {
  created() {
    // 挂载全局方法
    window.abc = this.abc;
  },
  mixins: [uploadFileSize],
  data() {
    const validateCheckedStudentList = (rule, value, callback) => {
      if (this.form.checkedStudentList.length === 0) {
        callback("请选择参赛成员");
      } else {
        callback();
      }
    };
    const validateField = (rule, value, callback) => {
      const completeItems = value.filter(x => x.content);
      if (value.length === completeItems.length) {
        callback();
      } else {
        callback(new Error("请按要求填写完整信息"));
      }
    };
    return {
      // checkImg: require('Asset/img/common/check.png'),
      checkImg: require("../../../assets/img/common/check.png"),
      iframeHeight: 100,
      arrFileList: [],
      arrList: [],
      // 登录账号是否是学生
      isStudent: this.$ls.get("userIdentity") === "student",
      queryId: this.$route.query.id,
      addResourcePopop: false,
      form: {
        matchId: this.$route.query.id,
        projectId: "",
        actorWay: "",
        name: "",
        description: "",
        worksList: [],
        checkedTeacherList: [],
        checkedStudentList: [],
        fieldList: [],
        attachmentList: [],
        groupDisDetailId: "",
        subjectDisDetailId: ""
        // isSync: '0'
      },
      // 报名者报名的参赛形式
      enrollActorWay: [],
      // 参赛项目
      projectIdOptions: [],
      // 参赛形式
      actorWayOptions: [{ name: "个人", val: "1" }, { name: "团体", val: "2" }],
      rule: {
        // projectId: {
        //   required: true,
        //   message: "请选择参赛项目",
        //   trigger: "change"
        // },
        // actorWay: {
        //   required: true,
        //   message: "请选择参赛形式",
        //   trigger: "change"
        // },
        // groupDisDetailId: {
        //   required: true,
        //   message: "请选择组别",
        //   trigger: "change"
        // },
        // subjectDisDetailId: {
        //   required: true,
        //   message: "请选择学科",
        //   trigger: "change"
        // },
        // name: {
        //   required: true,
        //   message: "请选择作品",
        //   trigger: "change"
        // },
        worksList: {
          required: true,
          message: "请选择上传作品图片",
          trigger: "change",
          type: "array"
        },
        attachmentList: {
          required: true,
          message: "请选择上传附件",
          trigger: "change",
          type: "array"
        },
        // description: [
        //   {
        //     required: true,
        //     message: "请输入作品介绍",
        //     trigger: "change"
        //   },
        //   {
        //     max: 2000,
        //     message: "长度在 2000 个字符以内",
        //     trigger: "change"
        //   }
        // ],
        // checkedStudentList: {
        //   required: true,
        //   validator: validateCheckedStudentList,
        //   trigger: "change"
        // }
      },
      // 作品列表
      worksList: [],
      // 作品列表请求page
      worksPage: {
        pageNum: 1,
        totalNum: 1,
        pageSize: 10
      },
      // 搜索作品名称
      searchWork: "",
      // 添加指导老师
      searchteacher: "", // 搜索
      teacherList: [], // 搜索结果
      // 添加参赛成员
      searchstudent: "", // 搜索
      studentList: [], // 搜索结果
      // 附件
      attachmentList: [],
      selectedWork: {},
      iframeShow: false,
      dupli: false,
      ifStatus: false,
      zbList: [],
      subjectList: []
    };
  },
  components: {
    "v-webuploader": webuploader,
    "v-up-files": upFiles,
    "v-testUp": testUp
  },

  mounted() {
    const that = this;

    // this.getProject()
    this.getWorksList();
    this.dictComb();
    // 参赛项目数据
    requestMatchProject({ id: this.$route.query.id }).then(res => {
      if (res.data.code === 200) {
        this.projectIdOptions = res.data.entity;
      }
    });

    window.addEventListener("message", function(res) {
      if (res.data.response) {
        if (res.data.response.status) {
          if (
            res.data.response.status.value === 200 ||
            res.data.response.status.value === 100
          ) {
            const da = res.data;
            const va = {
              resourceId:
                da.response.data.group + "/" + da.response.data.remoteFileName,
              name: da.file.name,
              size: da.file.size,
              documentId: ""
            };
            // 附件
            const attachmentList = that.attachmentList;
            attachmentList.push(va);
            that.attachmentList = attachmentList;
          }
        } else if (res.data.response.code) {
          if (
            res.data.response.code === 200 ||
            res.data.response.code === 100
          ) {
            const da = res.data;
            const va = {
              resourceId:
                da.response.appendInfo.followServer +
                "/" +
                da.response.appendInfo.resourceId,
              name: da.file.name,
              size: da.file.size,
              documentId: ""
            };
            // 附件
            const attachmentList = that.attachmentList;
            attachmentList.push(va);
            that.attachmentList = attachmentList;
          }
        }
      }
    });
    //  todo iframe 高度

    // setInterval(function () {
    //     const c = document.getElementById('iframe')
    //     const bHeight = c.contentWindow.document.body.scrollHeight
    //     const dHeight = c.contentWindow.document.documentElement.scrollHeight
    //     const height = Math.max(bHeight, dHeight)
    //     that.iframeHeight = height
    // }, 200)
  },
  computed: {},
  watch: {
    "form.worksList": {
      handler: function(val) {
        const DOMs = this.$refs.upload.$children;
        if (val.length >= 5) {
          DOMs[DOMs.length - 1].$el.style.display = "none";
        } else {
          DOMs[DOMs.length - 1].$el.style.display = "";
        }
      },
      deep: true
    },
    "form.projectId": {
      handler: function(val) {
        // requestContestItemDetail({ id: val }).then((res) => {
        //     console.log(res)
        // })
        const curItem = this.projectIdOptions.filter(x => x.id === val)[0];
        this.form.fieldList = curItem.fieldList.map(x => {
          const item = {};
          item.id = x.fieldId;
          item.name = x.name;
          item.description = x.description;
          item.content = "";
          item.ifTips = false;
          return item;
        });
      }
    },
    attachmentList: {
      handler: function(val) {
        // console.log('20202022020', val)
        // requestContestItemDetail({ id: val }).then((res) => {
        //     console.log(res)
        // })
        // const curItem = this.projectIdOptions.filter(
        //     x => x.id === val
        // )[0]
        // this.form.fieldList = curItem.fieldList.map((x) => {
        //     const item = {}
        //     item.id = x.fieldId
        //     item.name = x.name
        //     item.description = x.description
        //     item.content = ''
        //     item.ifTips = false
        //     return item
        // })
      }
    }
  },
  methods: {
    dictComb() {
      requestDictComb({
        groupCode: "zb"
      }).then(res => {
        if (res.data.code === 200) {
          this.zbList = res.data.entity.dicList;
        }
      });
      requestDictComb({
        groupCode: "subjects"
      }).then(res => {
        if (res.data.code === 200) {
          this.subjectList = res.data.entity.dicList;
        }
      });
    },
    test() {
      this.iframeShow = true;
    },
    abc(data) {
      console.log("data", data);
    },
    setHeight(height) {
      this.iframeHeight = height;
    },
    // 选择已有作品
    saveSelectedWork(item) {
      this.selectedWork = item;
      this.form.name = item.workName;
      this.addResourcePopop = false;
      // 作品图片
      this.form.worksList = item.workPicResource.map(x => ({
        name: x.fileName,
        url: "http://192.168.2.83:8888/" + x.resourceId,
        resourceId: x.resourceId,
        size: 0,
        uid: x.id
        // urls: response.appendInfo.followServer + '/' + response.appendInfo.resourceId
      }));
      this.attachmentList = item.workVidoResource.map(x => ({
        name: x.name,
        urls: "http://192.168.2.83:8888/" + x.resourceId,
        resourceId: x.resourceId,
        // size: 0,
        workeId: x.workeId
      }));
      this.ifStatus = true;
      this.form.description = item.introduction;
      // this.attachmentList = item.workVidoResource
    },
    submit() {
      const flag = true;
      const _fieldList = this.form.fieldList;
      // for (let i = 0; i < _fieldList.length; i++) {
      //     if (!_fieldList[i].content.length) {
      //         flag = false
      //         this.form.fieldList[i].ifTips = true
      //     }
      // }

      this.$refs.form.validate(valid => {
        console.log("valid", valid);
        if (valid && flag) {
          this.form.fieldList = this.form.fieldList.map(x => ({
            fieldId: x.id,
            name: x.name,
            description: x.description,
            content: x.content
          }));
          const param = Object.assign({}, this.form);
          param.checkedStudentList = param.checkedStudentList.map(i => ({
            userId: i.id,
            relationType: "2"
          }));
          param.checkedTeacherList = param.checkedTeacherList.map(i => ({
            userId: i.id,
            relationType: "1"
          }));
          param.guideTeacherList = [
            ...param.checkedStudentList,
            ...param.checkedTeacherList
          ];
          param.worksList = param.worksList.map(i => ({
            name: i.name,
            resourceId: i.resourceId
          }));
          param.attachmentList = this.attachmentList.map(i => ({
            name: i.name,
            resourceId: i.resourceId,
            urls: i.urls,
            uid: i.uid,
            size: i.size
          }));
          // param.attachmentList = this.attachmentList
          // for (const i of this.form.worksList) {
          //     if (i.status !== 'success') {
          //         console.log('i.status', i.status)
          //         this.$message({
          //             message: '请等待作品图片上传完毕'
          //         })
          //         return false
          //     }
          // }
          delete param.checkedStudentList;
          delete param.checkedTeacherList;
          requestMatchWorksAdd(param).then(res => {
            if (res.data.code === 200) {
              this.$router.push({
                path: "myWorks",
                query: Object.assign(this.$route.query)
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message({
                message: res.data.msg
              });
            }
          });
        } else {
          this.$message({
            type: "info",
            message: "请按要求填写完整信息"
          });
          return false;
        }
      });
    },
    // 添加指导老师、参赛成员
    add(model, item) {
      if (!this.form[`checked${model}List`].some(i => i.id === item.userId)) {
        this.form[`checked${model}List`].push({
          id: item.userId,
          name: item.name
        });
      } else {
        const str = model === "Teacher" ? "已添加此指导老师" : "已添加此成员";
        this.$message({ message: str });
      }
    },

    // 获取已有作品列表
    getWorksList() {
      requestWorksList(
        { auditStatusTeaOrStu: 1, workName: this.searchWork },
        this.worksPage
      ).then(res => {
        if (res.data.code === 200) {
          this.worksList.push(...res.data.entity.resultData);
          this.$set(this.worksPage, "totalNum", res.data.entity.totalNum);
        }
      });
    },
    // 参赛项目数据
    getProject() {
      requestMatchActor({ matchId: this.queryId }).then(res => {
        if (res.data.code === 200) {
          const _data = res.data.entity;
          this.projectIdOptions = _data.projectList;
          this.enrollActorWay = _data.actorWay.split(",");
        }
      });
    },
    // 移除黑名单
    delTag(model, index) {
      this.form[`checked${model}List`].splice(index, 1);
    },
    // 请求指导老师、图队成员数据
    getPersonList(module, isMember = false) {
      const name = isMember
        ? this.searchstudent
        : this.$data[`search${module}`];
      if (name) {
        const request =
          module === "teacher" ? requestTeacherList : requestStudentList;
        request({ auditStatus: 1, name: name }).then(res => {
          if (res.data.code === 200) {
            this.$data[`${isMember ? "student" : module}List`] =
              res.data.entity.resultData;
          }
        });
      }
    },
    // 上传作品图片
    UploadCover(file, fileList) {
      const that = this;
      const fileSize = file.size;
      const fileName = file.name;
      const expandName = fileName.split(".").pop();
      const _this = this;
      if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
        this.$message({
          message: "请上传支持格式的图片"
        });
      } else if (fileSize >= this.imgStandardFileSize * 1024 * 1024) {
        this.$message({
          message: `文件大小不超过${this.imgStandardFileSize}M`
        });
        return false;
      }
      uploadByPieces({
        files: [file],
        pieceSize: 5,
        progress: num => {
          console.log("progress-", num);
        },
        success: data => {
          file.resourceId = data.resourceId;
          file.imgUrl = data.url;
          this.form.worksList = fileList;
          console.log(this.form.worksList);
        },
        error: () => {
          console.log("error-");
        }
      });
    },
    handleRemove(file, fileList) {
      this.form.worksList = fileList;
    },
    // changeCover(file, arrFileList) {
    //     this.form.worksList = arrFileList
    // },
    // 上传附件
    uploadSectionFile(param) {
      const file = param.file;
      const fileSize = file.size;
      this.$refs.upload.submit();
      if (fileSize >= this.standardFileSize * 1024 * 1024) {
        this.$message({
          message: `文件大小不超过${this.standardFileSize}M`
        });
        return false;
      }
    },
    // 附件改变
    changeFiles(file, fileList) {
      this.attachmentList = fileList;
      // this.computeMD5s(file)
    },
    doTips(err, file) {
      let message = "请求失败，请稍后再试";
      if (!err === "http") {
        message = err.error;
      }
      this.$message({
        message,
        type: "error"
      });
    },
    uploadSuccess(data) {
      if (data) {
        this.form.worksList = data;
      }
    },
    fileSuccess(data) {
      this.attachmentList = data;
      this.ifStatus = false;
      this.form.attachmentList = data;
    },
    sendMessage() {
      const iframeWin = this.$refs.iframes.contentWindow;
      iframeWin.postMessage(
        {
          cmd: "getFormJson",
          params: {}
        },
        "*"
      );
    }
  }
};
</script>

<style lang='scss'>
.addWorkPopup {
  .el-dialog {
    width: 500px;
  }
}
.myPlay_upload {
  .el-upload--picture-card {
    background-color: #f5fafe;
    border-color: #92cdfa;
  }
}
#iframeImg {
  width: 100%;
}
#iframe {
  width: 100%;
  min-height: 300px;
}
// .mask{background: rgba(0,0,0,0.5);position: fixed;width: 100%;height: 100vh;z-index: 1;top: 0;left: 0}
</style>

<style lang='scss' scoped>
@import "~@/assets/css/scss/vars.scss";

.el-dialog__body {
  height: 500px;
}
.field-tips {
  color: #ff4949;
  margin-left: 10px;
  font-size: 12px;
}

.myPlay_upload {
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
    text-indent: 15px;
  }
  .form {
    padding: 20px;
    .btn_selectWork {
      margin-left: 15px;
      width: 64px;
      height: 32px;
      color: $theme-color;
      border-color: $theme-color;
    }
    .tag {
      margin: 0 5px;
    }
    .upload-btn {
      width: 96px;
      height: 38px;
      line-height: 38px;
      border: 1px solid #ccc;
      padding: 8px;
      margin-right: 15px;
      i {
        font-size: 14px;
        color: $theme-color;
      }
    }
  }
  .addWorkPopup {
    .el-dialog {
      width: 500px;
      .el-radio {
        display: block;
        margin: 3px 0;
      }
    }
    .func {
      padding: 12px;
      background-color: #f6f6f6;
      border: 1px solid #c9c9c9;
    }
    .box {
      height: 320px;
      overflow-y: auto;
      border: 1px solid #c9c9c9;
      border-top: none;
      padding: 20px;
    }
  }
  $item-margin: 10px;
  $item-content-padding: 7px;
  .item-list {
    margin-left: -$item-margin;
    margin-top: 20px;
    .item-item {
      float: left;
      width: 25%;
      padding: 0 0 $item-margin $item-margin;
      box-sizing: border-box;
      transition: opacity 0.8s, transform 0.8s;
      cursor: pointer;

      .item-item-detail {
        position: relative;
      }

      .item-img {
        width: 93px;
        height: 93px;
        cursor: pointer;
        border-radius: 5px;
      }
      .item-msg {
        margin-left: 55%;
        .name {
          margin-top: 12px;
          font-size: 14px;
          font-weight: 400;
          color: #3e3e3e;
        }
        .identity {
          color: #999;
        }
      }

      $triangle-height: 30px;
      $triangle-width: 40px;
      .item-item-handle {
        position: absolute;
        top: 0;
        right: 50%;
        color: #fff;
        line-height: $triangle-width / 2;
      }

      .i-success-bg {
        width: 0;
        height: 0;
        border-top: 30px solid #13ce66;
        border-left: $triangle-height solid transparent;
      }
    }
  }
}

.fileTips {
  line-height: 25px;
  .types {
    overflow: hidden;
    .typeList {
      width: 85%;
    }
  }
}

.arrFileList {
  overflow: hidden;
  line-height: 25px;
  padding-bottom: 10px;
  .arrFileName {
    font-size: 18px;
    float: left;
    width: 320px;
  }
  .checkImg {
    width: 25px;
    float: left;
    height: 25px;
    .imgType {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

