<template>
  <div class="demo">
    <div id="uploader2">
      <div class="queueList2">
        <div id="dndArea2" class="placeholders2">
          <div id="filePicker2">
            <div class="box"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebUploader from "webuploader";
import { checkFileNw } from "@/service/upload";
// import WebUploader from 'webuploader'
const imgUrl = require("Asset/img/common/del.png");

const fileUploadAddress = location.protocol + "//" + location.host;
// const fileUploadAddress = 'http://192.168.2.44'
// const fileUploadAddress = 'http://192.168.2.83:8089'
const chunkSize = 5 * 1024 * 1024;
export default {
  data() {
    return {
      // 上传地址
      uploadUrl: fileUploadAddress + "/file/authnw/fileUpload",
      $wrap: null,
      $queue: null,
      // 状态栏，包括进度和控制按钮
      $statusBar2: null,
      // 文件总体选择信息。
      $info2: null,
      // 上传按钮
      $upload: null,
      // 没选择文件之前的内容。
      $placeHolder: null,
      $progress: null,
      // 添加的文件数量
      fileCount: 0,
      // 添加的文件总大小
      fileSize: 0,
      // 优化retina, 在retina下这个值是2
      ratio: null,
      // 可能有pedding, ready, uploading, confirm, done.
      state: "pedding2",
      percentages: {},
      // 判断浏览器是否支持图片的base64
      // isSupportBase64: null,
      // 检测是否已经安装flash，检测flash的版本
      // flashVersion: null,
      // supportTransition: null,
      uploader: null,
      fileList: null,
      fileData: {
        refId: null,
        projectId: null
      },
      arrList: [],
      cerPercentage: 0,
      uploaderFlie: null,
      maxLength: 0,
      isEmpty: false,
      myReg: false
    };
  },
  mounted() {
    this.init();
    this.initWebUploader();
    this.fileData.refId = this.refId;
    this.fileData.projectId = this.projectId;
    this.clearFileList();
    this.getFileList();
  },
  props: {
    projectId: String,
    systemTime: Number,
    refId: String,
    listLength: {
      type: Number,
      default: 0
    },
    auto: {
      type: Boolean,
      default: false
    },
    duplicate: {
      type: Boolean,
      default: false
    },
    selectedList: Array,
    ifStatus: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    init() {
      this.$wrap = $("#uploader2");
      // 图片容器
      this.$queue = $('<ul class="filelists"></ul>').appendTo(
        this.$wrap.find(".queueList2")
      );
      // 状态栏，包括进度和控制按钮
      this.$statusBar2 = this.$wrap.find(".statusBar2");
      // 文件总体选择信息。
      this.$info2 = this.$statusBar2.find(".info2");
      // 上传按钮
      this.$upload = this.$wrap.find(".uploadBtns2");
      // 没选择文件之前的内容。
      this.$placeHolder = this.$wrap.find(".placeholders2");
      this.$progress = this.$statusBar2.find(".progress").hide();
      // 添加的文件数量
      this.fileCount = 0;
      // 添加的文件总大小
      this.fileSize = 0;
      // 优化retina, 在retina下这个值是2
      // this.ratio = window.devicePixelRatio || 1
      // 缩略图大小
      // this.thumbnailWidth = 110 * this.ratio
      // this.thumbnailHeight = 110 * this.ratio
      // 可能有pedding, ready, uploading, confirm, done.
      this.state = "pedding2";
      // 所有文件的进度信息，key为file id
      this.percentages = {};
    },
    // 初始化webuploader
    initWebUploader() {
      const that = this;
      // HOOK 这个必须要再uploader实例化前面
      WebUploader.Uploader.register(
        {
          "before-send-file2": "beforeSendFile2",
          "before-send2": "beforeSend2"
        },
        {
          beforeSendFile2: function(file) {
            // Deferred对象在钩子回掉函数中经常要用到，用来处理需要等待的异步操作。
            const task = new $.Deferred();
            const formData = that.uploaderFlie.options.formData;
            // 根据文件内容来查询MD5
            that.uploaderFlie
              .md5File(file, 0, 10 * 1024 * 1024)
              .then(function(val) {
                // 完成
                // eslint-disable-next-line radix
                file.md5 = val + parseInt(Math.random() * 1000000);
                // 模拟用户id
                // file.uid = new Date().getTime() + "_" + Math.random() * 100;
                file.uid = WebUploader.Base.guid();
                // formData.uid = file.uid
                formData.md5 = file.md5;
                formData.name = file.name;
                // 进行md5判断
                // $.post((fileUploadAddress + '/file/auth/checkFileMd5'), { uid: file.uid, md5: file.md5 },
                $.post(
                  fileUploadAddress + "/file/authnw/checkFileMd5",
                  { md5: file.md5, name: file.name },
                  function(data) {
                    const status = data.status.value;
                    task.resolve();
                    if (status === 101) {
                      // 文件不存在，那就正常流程
                    } else if (status === 100) {
                      // 忽略上传过程，直接标识上传成功；
                      that.uploaderFlie.skipFile(file);
                      file.pass = true;
                    } else if (status === 102) {
                      // 部分已经上传到服务器了，但是差几个模块。
                      file.missChunks = data.data;
                    } else if (status === 503) {
                      console.log("data00000", data);
                      that.myReg = true;
                    }
                  }
                );
              });
            return $.when(task);
          },
          beforeSend2: function(block) {
            const task = new $.Deferred();
            const file = block.file;
            const missChunks = file.missChunks; // 丢失分块
            const blockChunk = block.chunk; // 当前分块
            if (
              missChunks !== null &&
              missChunks !== undefined &&
              missChunks !== ""
            ) {
              let flag = true;
              for (let i = 0; i < missChunks.length; i++) {
                if (blockChunk === missChunks[i]) {
                  // console.log(file.name + ":" + blockChunk + ":还没上传，现在上传去吧。");
                  flag = false;
                  break;
                }
              }
              if (flag) {
                task.reject();
              } else {
                task.resolve();
              }
            } else {
              task.resolve();
            }
            return $.when(task);
          }
        }
      );

      // 实例化
      that.uploaderFlie = WebUploader.create({
        pick: {
          id: "#filePicker2",
          label: "+"
        },
        formData: {
          // uid: 0,
          md5: "",
          name: ""
          // chunkSize: chunkSize,
        },
        accept: {
          extensions:
            "doc,docx,ppt,pptx,xls,xlsx,vsd,pot,pps,rtf,wps,et,dps,pdf,txt,epub,mp4,png,jpeg,jpg,gif,exe,avi,rar,zip"
        },
        dnd: "#dndArea2",
        paste: "#uploader2",
        swf: "Static/js/Uploader.swf",
        chunked: true, // 是否要分片处理大文件上传
        // chunkSize: 512 * 1024,
        server: fileUploadAddress + "/file/authnw/fileUpload",
        chunkSize: chunkSize, // 字节 1M分块
        chunkRetry: 3,
        threads: 10000, // 允许同时最大上传进程数
        timeout: 0,
        // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
        disableGlobalDnd: true,
        fileNumLimit: 10,
        fileSizeLimit: 20 * 1024 * 1024 * 1024, // 20g
        fileSingleSizeLimit: 2 * 1024 * 1024 * 1024, // 2g
        auto: that.auto
        // duplicate: that.duplicate
      });

      // 拖拽时不接受 js, txt 文件。
      that.uploaderFlie.on("dndAccept", function(items) {
        let denied = false;
        const len = items.length;
        let i = 0;
        // 修改js类型
        const unAllowed = "text/plain;application/javascript ";
        for (; i < len; i++) {
          // 如果在列表里面
          // eslint-disable-next-line no-bitwise
          if (~unAllowed.indexOf(items[i].type)) {
            denied = true;
            break;
          }
        }
        return !denied;
      });

      // 文件发送前
      that.uploaderFlie.on("uploadBeforeSend2", function(file, data) {
        data.refId = that.refId;
        data.projectId = that.projectId;
      });

      // 进度条
      that.uploaderFlie.on("uploadProgress2", function(file, percentage) {
        this.cerPercentage = percentage * 1000;
        const $li = $("#" + file.id);
        const $percent = $li.find(".progress2 span");
        const curP = parseInt(percentage * 100, 10) + "%";
        const fill = $li.find("#fill2");
        // fill.text(curP).css('width', curP)
        if (curP === "100%") {
          fill.text("上传中...");
        } else if (curP > "3%") {
          fill.text(curP).css("width", curP);
          $("#" + file.id)
            .find(".loadTxt2")
            .addClass("txtHide");
        }
        // $percent.text('进度：' + curP)
        // $percent.css('width', percentage * 100 + '%')
        // that.percentages[file.id][1] = percentage
        that.updateTotalProgress();
      });
      // // 当文件被加入队列前
      // that.uploaderFlie.on('beforeFileQueued', (file) => {
      //     if (file.name === '0-0-@0^-登录.jpg') {
      //         console.log('加入队列前', file)
      //         $('#' + file.id).remove()
      //         return
      //     }
      // })

      // 当文件被加入队列以后触发
      that.uploaderFlie.on("fileQueued", file => {
        that.fileCount++;
        that.fileSize += file.size;

        if (that.fileCount === 1) {
          that.$placeHolder.addClass("element-invisible");
          that.$statusBar2.show();
        }
        that.addFile(file);
        that.setState("ready");
        that.updateTotalProgress();
      });

      that.uploaderFlie.onUploadBeforeSend = function(obj, data) {
        const file = obj.file;
        data.md5 = file.md5 || "";
        data.uid = file.uid;
      };

      // 上传返回结果
      that.uploaderFlie.on("uploadSuccess", function(file, response) {
        if (file.pass && !response) {
          const data = window.localStorage.getItem("mc_" + file.md5);
          if (!data) {
            $("#" + file.id)
              .find("p.state")
              .text("秒传失效,请重新上传");
            return;
          }
          // response = JSON.parse(data)
          window.localStorage.removeItem(file.md5);
        }
        if (response) {
          const status = response.status;
          const text = "";
          $("#" + file.id)
            .find("p.state")
            .text(text);
          if (status && (status.value === "200" || status.value === "100")) {
            // 整个上传成功
            const filePath = response.data.storeFilePath;
            const $wrapper2 = $("#" + file.id).find("#wrapper2");
            const $lii = $("#" + file.id).find(".lii");
            // $wrapper2.addClass('txtHide')
            $('<i class="el-icon-circle-check complete"></i>').appendTo($lii);
          }
          // else{
          //     // 单片上传成功或失败
          // }
        }
        const resdata = {
          // followServer: response.appendInfo.followServer,
          resourceId: response.data.resourceId,
          name: file.name,
          size: file.size,
          uid: file.uid,
          urls: response.data.storeFilePath
        };
        that.arrList.push(resdata);
        if (that.arrList.length === that.maxLength) {
          that.$emit("fileSuccess", that.arrList);
        }
        // window.parent.postMessage(resdata, '*')
      });

      // 当文件被移除队列后触发
      that.uploaderFlie.on("fileDequeued", file => {
        that.uploaderFlie.getFiles("inited");
        that.fileCount--;
        that.fileSize -= file.size;

        if (!that.fileCount) {
          that.setState("pedding2");
        }
        // if (that.fileCount < 5) {
        //     $('#dndArea2').removeClass('btnHide')
        // }

        that.removeFile(file);
        that.updateTotalProgress();
      });
      // 文件上传完成后触发
      that.uploaderFlie.on("uploadFinished", function(type) {
        that.setState("confirm");
      });
      // 文件开始上传时触发
      // that.uploaderFlie.on('startUpload', function (type) {
      //     that.setState('uploading')
      // })
      // // 文件暂停上传时触发
      // that.uploaderFlie.on('stopUpload', function (type) {
      //     that.setState('paused')
      // })
      // 文件上传出错后触发
      that.uploaderFlie.on("error", function(code) {
        console.log("出错啦出错啦！", code);
        let txt = "";
        let errMsg;
        if (that.myReg) {
          txt = "文件名只能包含中文字母数字下划线中划线,并且文件名不能超过50字";
        } else {
          txt = "文件已存在";
        }
        switch (code) {
          case "F_EXCEED_SIZE":
            errMsg = "文件大小超出范围";
            break;

          case "Q_EXCEED_NUM_LIMIT":
            errMsg = "文件数量超出范围";
            break;

          case "Q_TYPE_DENIED":
            errMsg = "请上传支持格式的附件";
            break;

          case "F_DUPLICATE":
            errMsg = txt;
            break;

          default:
            errMsg = "上传失败，请重试";
            break;
        }
        that.$message({
          message: errMsg,
          type: "error"
        });
      });

      // 手动上传
      // that.$upload.on('click', function () {
      //     if ($(that).hasClass('disabled')) {
      //         return false
      //     }
      //     if (that.state === 'ready') {
      //         that.uploaderFlie.upload()
      //     } else if (that.state === 'uploading') {
      //         that.uploaderFlie.stop()
      //     }
      //     // else if (that.state === 'paused') {
      //     //     that.uploader.upload()
      //     // }
      // })
      $(".fileBtn2").on("click", function(file) {
        console.log("开始上传", file);
        that.uploaderFlie.upload();
      });
      // that.$info2.on('click', '.retry', function () {
      //     that.uploaderFlie.retry()
      // })

      that.$info2.on("click", ".ignore", function() {
        // console.log('todo')
      });

      that.$upload.addClass("state-" + that.state);
      that.updateTotalProgress();
    },
    addFile(file) {
      const that = this;
      if (this.checkIsHasSpecialStr(file.name)) {
        const fList = this.uploaderFlie.getFiles();
        for (let i = 0; i < this.uploaderFlie.getFiles().length; i++) {
          if (file.name === this.uploaderFlie.getFiles()[i].name) {
            this.uploaderFlie.removeFile(file, true);
            // this.uploaderFlie.getFiles().splice(i, 1)
            this.$message({
              message:
                "文件名只能包含中文字母数字下划线中划线,并且文件名不能超过50字",
              type: "error"
            });
          }
        }
        return;
      }
      if (!this.maxLength) {
        this.maxLength = this.selectedList.length + 1;
      } else {
        this.maxLength = this.maxLength + 1;
      }
      const $li = $(
        // '<li id="' +
        //   file.id +
        //   '">' +
        //   '<div class="lii">' +
        //   '<p class="titles fl">' +
        //   file.name +
        //   "</p>" +
        //   '<p class="fl loadTxt">等待上传...</p>' +
        //   "</div>" +
        //   '<div id="wrapper2" class="txtHide"><div id="progressbar"><div id="fill"></div></div></div>' +
        //   "</li>"
      );

      // 删除按钮
      const $prgress = $li.find("p.progress span");
      const $wrap = $li.find("p.imgWrap");
      const $info2 = $('<p class="error"></p>');
      const showError = function(code) {
        let text = "";
        switch (code) {
          case "F_EXCEED_SIZE":
            text = "文件大小超出范围";
            break;
          case "F_DUPLICATE":
            text = "文件重复";
            break;
          // case 'interrupt':
          //     text = '上传暂停'
          //     break
          default:
            text = "上传失败，请重试";
            break;
        }
        $info2.text(text).appendTo($li);
      };

      // 文件不合格
      if (file.getStatus() === "invalid") {
        showError(file.statusText);
      } else {
        // @todo lazyload
        $wrap.text("预览中");
        that.uploaderFlie.makeThumb(file, function(error, src) {
          let img;
          if (error) {
            $wrap.text("不能预览");
            return;
          }
          // 判断浏览器是否支持图片的base64
          if (that.isSupportBase64) {
            img = $('<img src="' + src + '" class="imgType">');
            // $wrap.empty().append(img)
          } else {
            // 预览操作，根据实际情况
            $.ajax("../preview.action", {
              method: "POST",
              data: src,
              dataType: "json"
            }).done(function(response) {
              if (response.result) {
                img = $('<img src="' + response.result + '">');
                // $wrap.empty().append(img)
              } else {
                $wrap.text("预览出错");
              }
            });
          }
        });
        that.percentages[file.id] = [file.size, 0];
        file.rotation = 0;
      }

      // 文件状态变化
      file.on("statuschange", function(cur, prev) {
        if (prev === "progress") {
          // $prgress.hide().width(0)
        } else if (prev === "queued") {
          const $liis = $("#" + file.id).find(".loadTxt");
          $("#" + file.id)
            .find("#wrapper2")
            .removeClass("txtHide");
          $liis.removeClass("txtHide");
          $liis.text("文件正在上传中，请耐心等待...");
          $('<i class="el-icon-loading elIcon"></i>').appendTo($liis);
        }
        // 成功
        if (cur === "error" || cur === "invalid") {
          showError(file.statusText);
          // that.percentages[file.id][1] = 1
        } else if (cur === "interrupt") {
          showError("interrupt");
        } else if (cur === "queued") {
          // that.percentages[file.id][1] = 0
        } else if (cur === "progress") {
          // $info2.remove()
          // $('.loadTxt').addClass('txtHide')
          $prgress.css("display", "block");
        } else if (cur === "complete") {
          $(".loadTxt").addClass("txtHide");
        }
        // const $liis = $('#' + file.id).find('')
        $li.removeClass("state-" + prev).addClass("state-" + cur);
      });
      console.log(this.$queue)
      $li.appendTo(this.$queue);
    },
    removeFile(file) {
      const that = this;
      const $li = $("#" + file.id);
      delete this.percentages[file.id];
      this.arrList.splice($li.index(), 1);
      console.log("删除1", file);
      this.$emit("removeFile", this.arrList);
      this.updateTotalProgress();
      $li
        .off()
        .find(".file-panel2")
        .off()
        .end()
        .remove();
      if (file.source.id === undefined) {
        return;
      }
      // 删除远程文件
      // eslint-disable-next-line no-undef
      fileRemove(file.source.id).then(response => {
        if (response.data.success) {
          this.$message({
            message: "删除附件成功",
            type: "success"
          });
        } else {
          this.$message({
            message: response.data.msg,
            type: "error"
          });
        }
      });
    },
    updateTotalProgress() {
      const that = this;
      let loaded = 0;
      let total = 0;
      const spans = this.$progress.children();
      // let percent

      $.each(that.percentages, function(k, v) {
        total += v[0];
        loaded += v[0] * v[1];
      });
      const percent = total ? loaded / total : 0;
      spans.eq(0).text(Math.round(percent * 100) + "%");
      spans.eq(1).css("width", Math.round(percent * 100) + "%");
    },
    setState(val) {
      const that = this;
      let stats;

      if (val === that.state) {
        return;
      }
      that.$upload.removeClass("state-" + that.state);
      that.$upload.addClass("state-" + val);
      that.state = val;
      switch (that.state) {
        case "pedding2":
          that.$placeHolder.removeClass("element-invisible");
          that.$queue.show();
          that.$statusBar2.addClass("element-invisible");
          that.uploaderFlie.refresh();
          break;

        case "ready":
          that.$placeHolder.addClass("element-invisible");
          $("#filePicker20").removeClass("element-invisible");
          that.$queue.show();
          that.$statusBar2.removeClass("element-invisible");
          that.uploaderFlie.refresh();
          break;

        case "uploading":
          $("#filePicker20").addClass("element-invisible");
          that.$progress.show();
          // that.$upload.text('暂停上传')
          break;

        // case 'paused':
        //     that.$progress.show()
        //     that.$upload.text('继续上传')
        //     break

        case "confirm":
          that.$progress.hide();
          $("#filePicker20").removeClass("element-invisible");
          that.$upload.text("开始上传");

          stats = that.uploaderFlie.getStats();
          $(".loads").text("");
          console.log("stats.successNum----", stats);
          if (stats.successNum && !stats.uploadFailNum) {
            that.setState("finish");
            return;
          }
          break;
        case "finish":
          stats = that.uploaderFlie.getStats();
          if (stats.successNum) {
            console.log("上传成功finish");
          } else {
            // 没有成功的图片，重设
            that.state = "done";
            location.reload();
          }
          break;
      }
    },
    // 清空文件列表
    clearFileList() {
      this.$info2.empty();
      // this.$queue.empty()
      this.fileCount = 0;
      this.fileSize = 0;
    },
    // 获取已上传的文件列表
    getFileList() {
      this.fileList = [];
      if (
        this.fileData.projectId !== undefined &&
        this.fileData.refId !== undefined
      ) {
        // eslint-disable-next-line no-undef
        getFileList(this.fileData).then(response => {
          this.fileList = this.formatUrl(response.data);
        });
      }
    },
    // 将已上传的文件加载到组件列表中
    formatUrl(files) {
      // this.$emit('uploadSuccess', files)
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        files[i].url = process.env.BASE_API + files[i].url;
        const obj = {};
        obj.name = files[i].name;
        obj.size = files[i].size;
        obj.lastModifiedDate = item.createTime;
        obj.id = files[i].Id;
        obj.src = files[i].url;
        obj.ext = item.fileType.substr(1);

        const file = new WebUploader.File(obj);
        // 此处是关键，将文件状态改为'已上传完成'
        file.setStatus("confirm");
        this.addFile(file);
      }
      return files;
    },
    checkIsHasSpecialStr(name) {
      const ext = name.substring(0, name.lastIndexOf("."));
      // const myReg = /[~!@#$%^&*()/\|,.<>?"'();:+=\[\]{}]/;
      const myRegExp = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].,<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]"
      );
      if (myRegExp.test(ext) || ext.indexOf(" ") !== -1 || ext.length > 50) {
        this.myReg = true;
      } else {
        this.myReg = false;
      }
      return this.myReg;
      // return false
    }
  },
  watch: {
    // systemTime() {
    //     this.fileData.refId = this.refId
    //     this.fileData.projectId = this.projectId
    //     this.clearFileList()
    //     this.getFileList()
    // },
    ifStatus(data) {
      this.isEmpty = data;
    },

    selectedList(data) {
      const that = this;
      const stats = this.uploaderFlie.getStats();
      console.log(data)
      $('#filePicker2').css({'background-image':"url("+ data[data.length-1].urls +")"})
      if (data.length === this.maxLength || this.isEmpty) {
        this.$queue.empty();
        this.maxLength = 0;
        this.isEmpty = false;
        for (let i = 0; i < data.length; i++) {
          if (i < 11) {
            data[i].id = "WU_FILE_" + i;
            data[i].status = "complete";
            const $li = $(
              // '<li id="' +
              //   data[i].uid +
              //   '">' +
              //   '<div class="lii">' +
              //   '<p class="titles fl">' +
              //   data[i].name +
              //   "</p>" +
              //   '<i class="el-icon-circle-check complete"></i>' +
              //   "</div>" +
              //   "</li>"
            );
            $li.appendTo(this.$queue);
          }
        }
      }
      this.arrList = data;
      // this.addFile(e)
    }
  }
};
</script>
<style lang='scss'>
#uploader2 {
  .webuploader-pick {
    padding: 0 10px;
    width: 100%;
    height: 100%;
  }
  #filePicker2{
      width: 180px;
      height: 180px;
      color:#fff;
      position: relative;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      border: 1px dashed #999 ;
      /deep/ input{
          display: none;
      }
  }
  .filelists {
    // border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .lii {
    overflow: hidden;
    // line-height: 35px;
  }
  .progress,
  .fl {
    float: left;
  }

  .progress {
    width: 300px;
  }

  .elIcon {
    margin-left: 10px;
  }
  .file-panel2 {
    width: 20px;
    height: 20px;
    margin-top: 7px;
    .imgType {
      width: 100%;
      height: 100%;
    }
  }

  .txtHide {
    display: none;
  }

  .btnShow {
    display: block;
  }

  .triangle {
    width: 0;
    height: 0;
    border-top: 30px solid #13ce66;
    border-left: 30px solid transparent;
    position: absolute;
    top: 0;
    right: 0;
  }

  .complete {
    color: #13ce66;
    font-size: 20px;
    float: left;
    margin-top: 10px;
  }

  .imgType,
  .imgWrap {
    width: 100%;
    height: 100%;
  }

  .titles {
    float: left;
    width: 360px;
  }
  // .statusBar2 {
  //     position: absolute;
  //     left: 130px;
  //     top: 0;
  // }

  .fileBtn2 {
    width: 76px;
    height: 33px;
    background-color: #00b7ee;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid #00b7ee;
    margin-bottom: 15px;
  }

  #wrapper2 {
    position: relative;
    width: 400px;
    height: 20px;
    border: 1px solid darkgray;
  }
  #progressbar {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -10px;
    width: 400px;
    height: 20px;
    // border:1px solid darkgray;
  }
  #fill {
    animation: move 2s;
    text-align: center;
    background-color: #6caf00;
    line-height: 20px;
  }
  @keyframes move {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
}
.box{
  background: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
