<template>
  <div class="admin_infoPublish backend-content__middle">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <!-- 资讯标题 -->
      <el-row>
        <el-form-item label="资讯标题" prop="title">
          <el-col :span="8">
            <el-input placeholder="请输入资讯标题" v-model="form.title" :maxlength="50"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 资讯封面 -->
      <el-row>
        <el-form-item label="资讯封面" prop="pic">
          <el-col :span="14">
            <div id="v_picker">+</div>
            <!-- <el-upload class="cover-uploader" :show-file-list="false" action :before-upload="UploadCover" style="display: inline-block;">
                            <img v-if="form.pic&&form.pic!=''" :src="getFileUrl(form.pic)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
            </el-upload> -->
          </el-col>
          <div
            class="tips"
            style="color:#8391a5;"
          >仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
        </el-form-item>
      </el-row>
      <!-- 资讯分类 -->
      <el-row>
        <el-form-item label="资讯分类" prop="noticeTypeId">
          <el-col :span="8">
            <el-select v-model="form.noticeTypeId" placeholder="请选择分类" style="width:100%;">
              <el-option
                v-for="item in noticeType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="资讯内容" prop="content">
          <el-col :span="20">
            <div id="editor-trigger" style="height: 200px"></div>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 附件 -->
      <el-row>
        <el-form-item label="附件">
          <el-col :span="14">
            <!-- <el-upload
              class="upload-demo"
              action
              :file-list="fileList"
              :on-remove="handleRemove"
              :before-upload="UploadFile"
            >
              <span class="upload-btn">
                <i class="icon-btn-add-circle"></i> 点击上传
              </span>
              <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{ standardFileSize }}M以内</span>
            </el-upload> -->
            <v-up-files
              :auto="false"
              :selectedList="portalNoticeDetailResources"
              :listLength="form.portalNoticeDetailResources.length"
              :ifStatus="ifStatus"
              @fileSuccess="fileSuccess"
              :defaultList='portalNoticeDetailResources'
            ></v-up-files>
            <div class="fileTips">
              <p>注：名称长度在30字以内， 单个文件大小不超过500M，一次性可上传多个文件</p>
            </div>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 按钮部分 -->
      <el-form-item>
        <button
          class="bs-search-button i-form-button"
          @click="onSubmit('form')"
          type="button"
        >{{ form.id?'保存':'发布'}}</button>
        <button
          class="bs-search-button i-form-button is-plain"
          @click="$router.go(-1)"
          type="button"
        >取消</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editor } from "@/mixin/wangEditor.js";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import { mapState, mapMutations, mapActions } from "Vuex";
import { fileUpload } from "Asset/js/common-config.js";
import upFiles from "@/components/common/upFiles";
import {
  addInfo,
  requestInfoDetail,
  modifyInfo
} from "@/service/admin_space.js";
// import dataTranslation from 'Asset/js/dataTranslation.js'
const fileUploadAddress = location.protocol + '//' + location.host
import "Asset/js/initWebUpload.js"
export default {
  name: "addInfo",
  mixins: [uploadFileSize, editor ],
  components:{
      "v-up-files": upFiles,
  },
  data() {
    return {
      fileUpload: fileUpload,
      noticeType: [],
      form: {
        title: "",
        pic: null,
        noticeTypeId: null,
        content: "",
        portalNoticeDetailResources: []
      },
      rules: {
        title: [
          { required: true, message: "请输入资讯标题", trigger: "change" }
        ],
        pic: [{ message: "请选择资讯封面", trigger: "change" }],
        noticeTypeId: [
          { required: true, message: "请选择资讯分类", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入内容" }
          // { max: 1000, message: '不超过1000字符' }
        ]
      },
      img: "",
      ifStatus: false,
      portalNoticeDetailResources:[],
    };
  },
  computed: {
    fileList: function() {
      let _list = [];
      let fileList = this.form.portalNoticeDetailResources || [];
      fileList.forEach(x => {
        _list.push({
          name: x.resourceName,
          url: this.getFileUrl(x.resourceId, { filetype: "file" }),
          status: "finished"
        });
      });
      return _list;
    }
  },
  mounted() {
    this.initEditor();
    let self = this;
    this.editor.onchange = function() {
      self.form.content = this.$txt.html();
    };
    this.getDictComb("noticeType").then(res => {
      this.noticeType = res.dicList;
    });
    let _id = this.$route.query.id;
    if (_id != undefined) {
      this.$set(this.$data.form, "id", _id);
      this.getInfoDetail();
    }
    var uploader = WebUploader.create({
      // swf文件路径
      swf: "../static/js/Uploader.swf",
      // 文件接收服务端。
      server: fileUploadAddress + "/file/authnw/fileUpload",
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: "#v_picker",
      // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
      resize: false,
      //是否开启自动上传
      auto: true
    });
    uploader.on("beforeFileQueued", function(file) {
      console.log("文件加入队前", file);
    });
    uploader.on("uploadError", function(file, res) {
      self.$message({ message: res.data.msg });
    });
    uploader.on("uploadSuccess", function(file, res) {
      console.log("文件上传成功", file, res);
      if (res.status.value === 200) {
        self.form.pic = res.data.resourceId;
        $("#v_picker").css({
          "background-color": "none",
          "background-image": "url(" + res.data.storeFilePath + ")"
        });
        $("#v_picker .webuploader-pick").html("");
      }
    });
    $("#v_picker div").css({
      width: "100%",
      height: "100%"
    });
    $("#v_picker .webuploader-pick").css({
      width: "100%",
      height: "100%",
      "font-size": "40px",
      "text-align": "center",
      "line-height": "100px",
      color: "#999"
    });
    $("#v_picker input").css({ display: "none" });
    setTimeout(function() {
      $("#v_picker input").css({ display: "none" });
    }, 100);
  },
  methods: {
    ...mapActions({
      getDictComb: "dictionaryCommon/getDictComb"
    }),
    handleRemove(file, fileList) {
      let _list = [];
      fileList.forEach(x => {
        _list.push({
          resourceName: x.name,
          resourceId: x.url
        });
      });
      this.form.portalNoticeDetailResources = _list;
    },
    fileSuccess(data) {
      this.form.portalNoticeDetailResources = data.map(x=>{
          let item = {
              resourceName: x.name,
              resourceId: x.resourceId,
            };
            return item;
      })
      this.ifStatus = false;
    },
    UploadCover(file, fileList) {
      const fileSize = file.size,
        fileName = file.name,
        expandName = fileName.substr(fileName.lastIndexOf(".") + 1),
        _this = this;
      if (
        /(jpe?g|gif|png|bmp)$/i.test(expandName) &&
        fileSize < _this.imgStandardFileSize * 1024 * 1024
      ) {
        uploader.off("uploadSuccess").on("uploadSuccess", function(file, res) {
          if (res.code === 200) {
            _this.form.pic = res.appendInfo.resourceId;
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
        _this.form.pic = null;
        uploader.cancelFile(file);
      }
    },
    UploadFile(file, fileList) {
      const fileSize = file.size,
        _this = this;
      if (fileSize < _this.standardFileSize * 1024 * 1024) {
        uploader.off("uploadSuccess").on("uploadSuccess", function(file, res) {
          if (res.code === 200) {
            _this.form.portalNoticeDetailResources.push({
              resourceName: file.name,
              resourceId: res.appendInfo.resourceId
            });
          }
        });
        uploader.off("uploadError").on("uploadError", function(file, reason) {
          _this.$message({ message: reason.msg });
        });
      } else {
        _this.form.portalNoticeDetailResources.splice(
          _this.form.portalNoticeDetailResources.length,
          1
        );
        _this.$message({ message: `文件大小不超过${_this.standardFileSize}M` });
        uploader.cancelFile(file);
      }
    },
    // 获取资讯详情
    getInfoDetail() {
      requestInfoDetail({ id: this.form.id }).then(response => {
        if (response.data.code == 200) {
          let _data = response.data.entity || {};
          let _portalNoticeDetailResource = [];
          _data.portalNoticeDetailResource.forEach(x => {
            _portalNoticeDetailResource.push({
              resourceName: x.resourceName,
              resourceId: x.resourceId
            });
          });
          let _form = {
            id: _data.id,
            title: _data.title,
            noticeTypeId: _data.noticeTypeId,
            pic: _data.pic,
            content: _data.content,
            portalNoticeDetailResources: _portalNoticeDetailResource
          };
          this.form = _form;
          this.editor.$txt.html(_data.content);
          this.ifStatus = true;
          this.portalNoticeDetailResources = _data.portalNoticeDetailResource.map(x => ({
              name: x.resourceName,
              urls: x.resourceId,
              resourceId: x.resourceId,
              businessId: x.businessId
            }));
          if(_data.pic){
            let url = fileUploadAddress+'/' +_data.pic
            $('#v_picker').css({
            'background-color':'none',
            "background-image":'url('+url+')'
          })
          $('#v_picker .webuploader-pick').html('')
          } 
        }
      });
    },
    // 获取select的options
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.id) {
            // 修改资讯
            modifyInfo(this.form).then(response => {
              if (response.data.code === 200) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success"
                });
                this.$router.push({ path: "/space/info" });
              } else {
                this.$message.error(response.data.msg);
              }
            });
          } else {
            // 添加资讯
            addInfo(this.form).then(response => {
              if (response.data.code === 200) {
                this.$message({
                  showClose: true,
                  message: "发布成功",
                  type: "success"
                });
                this.$router.push({ path: "/space/info" });
              } else {
                this.$message.error(response.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.admin_infoPublish {
  min-height: 820px;
}
</style>

<style lang='scss'>
.admin_infoPublish {
  /* 编辑器高度 */
  .wangEditor-container .wangEditor-txt {
    height: 200px !important;
  }
}
#v_picker {
  height: 100px;
  width: 100px;
  font-size: 40px;
  border: 1px dashed #92cdfa;
  background-color: #f5fafe;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  div:first-child {
    width: 100%;
    height: 100%;
  }
  /deep/ input {
    display: none !important;
  }
}
</style>