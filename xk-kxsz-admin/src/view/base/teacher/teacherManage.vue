<template>
  <div class="backend-content__middle">
    <section class="option-box clearfix">
      <el-input
        class="fl bs-search-input"
        v-model="search.name"
        @keyup.native.enter="changePage(1)"
        placeholder="请输入教师姓名"
      ></el-input>
      <button
        type="button"
        class="fl bs-search-button i-form-button is-plain"
        @click="changePage(1)"
      >搜索</button>
      <button
        class="bs-screening-button bs-handle-button"
        :class="{'isDropdowm': screeningDropdown }"
        @click="screeningDropdown=!screeningDropdown"
      ></button>
      <div class="import_file">
        <div id="u_picker">导入</div>
        <!-- <a href="../../../../static/template/教师模板.xlsx" class="dowtemp" download="教师模板">下载模板</a> -->
        <a href="javascript:;" class="dowtemp" @click="download">下载模板</a>
      </div>
      <div v-show="screeningDropdown" class="bs-screening_wrap">
        <el-form :inline="true" :model="search" class="bs-screening_box">
          <el-form-item label="区域" v-if="identity != 'school'">
            <v-region-select
              @region="changeRegion"
              ref="region"
              :rangeItems="rangeItems"
              :isAdmin="true"
              :clearable="true"
              clearable
            ></v-region-select>
          </el-form-item>
          <el-form-item label="学校" v-if="identity != 'school'">
            <el-select v-model="search.schoolId" placeholder="请选择学校" filterable clearable>
              <el-option
                v-for="item in schoolOptions"
                :key="item.id"
                :label="item.schoolName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="search.lockStatus" placeholder="请选择状态" filterable clearable>
              <el-option
                v-for="item in lockStatusDL"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="search.auditStatus" placeholder="请选择审核状态" filterable clearable>
              <el-option
                v-for="item in auditStatusDL"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="bs-screening-btn">
          <button type="button" @click="changePage(1)">确定</button> |
          <button type="button" @click="resetSearchForm">取消</button>
        </div>
      </div>
    </section>
    <v-admin-operate
      :items="headBtnGroup"
      btnType="head"
      v-bind="{
            recommend: doRecommend,
            norecommend: cancelRecommend,
            lock: doLock,
            unlock: doLock,
            audit: popupAudit,
            del: delTeacher,
            pwd: popupPwd
        }"
    ></v-admin-operate>
    <!-- 教师列表 -->
    <el-table
      class="data-table back-stage-table"
      border
      :data="items"
      style="width: 100%"
      ref="multipleTable"
      v-loading="loading"
      @selection-change="changeSelection"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="account" label="账号" show-overflow-tooltip>
        <template scope="scope">
          <el-tag class="__color-success" v-if="Number(scope.row.recommend)">荐</el-tag>
          <span class="resource-name">
            <router-link
              tag="a"
              class="item-detail"
              :to="{ path:'/base/teacher/detail', query: {id: scope.row.id} }"
            >{{scope.row.account}}</router-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" show-overflow-tooltip>
        <template scope="scope">
          <!-- <el-tag class="__color-success" v-if="Number(scope.row.recommend)">荐</el-tag> -->
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="80" show-overflow-tooltip>
        <template scope="scope">{{scope.row.sex | translate(sexDL)}}</template>
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="140"></el-table-column>
      <el-table-column prop="teach" label="任教" show-overflow-tooltip>
        <template scope="scope">{{scope.row.teach | translate(technicalDL, {key: 'id'})}}</template>
      </el-table-column>
      <el-table-column prop="provinceName" label="所在区域" show-overflow-tooltip>
        <template
          scope="scope"
        >{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</template>
      </el-table-column>
      <el-table-column prop="schoolName" label="学校名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="lockStatus" label="状态" sortable width="90">
        <template scope="scope">
          <el-tag
            :class="['__color-'+lockStatusStyle[scope.row.lockStatus]]"
          >{{scope.row.lockStatus | translate(lockStatusDL)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" label="审核" sortable width="90">
        <template scope="scope">
          <el-tag
            :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]"
          >{{scope.row.auditStatus | translate(auditStatusDL)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
        <template scope="scope">
          <v-admin-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        edit: { query: { id: 'id'} },
                        recommend: { callback: doRecommend, isActive: isRecommend },
                        norecommend: { callback: cancelRecommend, isActive: isNoRecommend },
                        del: delTeacher,
                        unlock: { callback: doLock, isActive: isLocked },
                        lock: { callback: doLock, isActive: isUnLocked },
                        audit: { callback: popupAudit, isActive: isAudited },
                        pwd: popupPwd
                    }"
          ></v-admin-operate>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    <el-dialog class="dialog-audit" :visible.sync="auditVisible" size="tiny" title="教师审核">
      <div class="radio-box">
        <span class="radio-label">审核结果：</span>
        <el-radio class="radio" v-model="auditResult" label="1">通过</el-radio>
        <el-radio class="radio" v-model="auditResult" label="2">不通过</el-radio>
      </div>
      <section class="bs-d-btn-group">
        <button class="bs-search-button i-form-button" type="button" @click="doAudit">确定</button>
        <button class="bs-search-button i-form-button is-plain" @click="auditVisible = false">取消</button>
      </section>
    </el-dialog>
    <el-dialog class="dialog-audit" :visible.sync="pwdVisible" size="tiny" title="修改密码">
      <v-reset-pwd ref="resetPwd" :close="closeResetPwdDialog" @submit="doResetPwd"></v-reset-pwd>
    </el-dialog>
    <el-dialog title="错误信息提示" :visible.sync="dialogTableVisible">
      <el-table :data="errorInfo">
        <el-table-column property="name" label="姓名" width="100"></el-table-column>
        <el-table-column property="sex" label="性别" width="80"></el-table-column>
        <el-table-column property="certiNum" label="身份证号" width="200"></el-table-column>
        <el-table-column property="info" label="错误信息" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "Vuex";
import pagination from "@/components/common/admin_pagination.vue";
import reset_pwd from "@/components/base/reset_pwd.vue";
import { subPermission } from "@/mixin/getAdminMenu.js";
import { userLock } from "@/mixin/lockUser.js";
import { setPage } from "@/mixin/adminPagination.js";
import { recommend } from "@/mixin/recommend.js";
import {
  doRecommend,
  requestSchoolList,
  cancelRecommend
} from "@/service/common.js";
import {
  requestBaseTeacher,
  delTeacherByIds,
  userBatchAudit,
  resetPwd,
  uploadStaffExcel,
} from "@/service/admin_base.js";
import dataTranslation from "Asset/js/dataTranslation.js";
import adminOperate from "@/components/common/operate.vue";
import region from "@/components/common/select/region_select.vue"; // 省市区下拉
const fileUploadAddress = location.protocol + "//" + location.host;
export default {
  name: "teacherManage",
  mixins: [subPermission, recommend, userLock, setPage],
  components: {
    "v-admin-operate": adminOperate,
    "v-pagination": pagination,
    "v-region-select": region,
    "v-reset-pwd": reset_pwd
  },
  data() {
    return {
        // downloadUrl:require('@/assets/template/教师模板.xlsx'),
      lockStatusStyle: {
        "0": "success",
        "1": "fail"
      },
      auditStatusStyle: {
        "-1": "pending",
        "0": "submit",
        "1": "success",
        "2": "fail",
        "3": "auditing"
      },
      // 高级筛选开关
      screeningDropdown: false,
      // 学校数据
      schoolOptions: [],
      search: {
        name: "",
        schoolId: "",
        lockStatus: "",
        auditStatus: ""
      },
      _search: {},
      region: {},
      items: [],
      checkedItems: [], // 选中项
      curItem: null, //当前对象
      auditResult: "", //审核结果
      auditVisible: false, //审核弹窗是否可见
      isBatch: false, //判断是否是批量审核
      identity: "",
      pwdVisible: false,
      rangeItems: "-1", //区域范围
      dialogTableVisible:false,
      errorInfo:[],
      loading:false
    };
  },
  computed: {
    ...mapState("dictionaryCommon", {
      technicalDL(state) {
        let dicList =
          (state["technicalClassificationDicList"] || {}).dicList || [];
        return dicList;
      },
      sexDL(state) {
        let dicList = (state["sexDicList"] || {}).dicList || [];
        return dicList;
      },
      lockStatusDL(state) {
        let dicList = (state["lockStatusDicList"] || {}).dicList || [];
        return dicList;
      },
      auditStatusDL(state) {
        let dicList = (state["auditStatusDicList"] || {}).dicList || [];
        return dicList;
      }
    }),
    params: function() {
      return Object.assign({}, this.search, this.region, this.pageParam);
    }
  },
  created() {
    this.getDictComb("technicalClassification");
    this.identity = this.$ls.get("userIdentity");
    if (this.identity === "education") {
      let edu = this.$ls.get("baseInfo").baseInfo;
      this.rangeItems = edu.id;
    }
  },
  mounted() {
    let self = this;
    this._search = Object.assign({}, this.search);
    this.getData();
    var uploader = WebUploader.create({
      // swf文件路径
      swf: "../static/js/Uploader.swf",
      // 文件接收服务端。
      server: fileUploadAddress + "/file/authnw/fileUpload",
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: "#u_picker",
      // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
      resize: false,
      //是否开启自动上传
      auto: true
    });
    uploader.on("beforeFileQueued", function(file) {
      console.log("文件加入队前", file);
      self.loading = true;
    });
    uploader.on("uploadError", function(file, res) {
      self.$message({ message: res.data.msg });
    });
    uploader.on("uploadSuccess", function(file, res) {
      console.log("文件上传成功", file, res);
      if (res.status.value === 200) {
        // self.form.pic = res.data.resourceId;
        uploadStaffExcel({ fileId: res.data.resourceId }).then(upRes => {
          if (upRes.data.code==200){
                    self.$message({message: '导入成功',type: 'success'})
                    self.getData();
                }else {
                    // self.$message({message: '导入失败',type: 'error'})
                    if(upRes.data.appendInfo){
                      self.errorInfo = upRes.data.appendInfo.info;
                      self.dialogTableVisible = true;
                    }else if(upRes.data.msg) {
                      self.$message({message: upRes.data.msg,type: 'error'})
                    }else self.$message({message: '导入失败',type: 'error'})
                    
                }
          self.loading = false;      
        });
      }
    });
    $("#u_picker div").css({
      width: "100%",
      height: "100%"
    });
    $("#u_picker .webuploader-pick").css({
      width: "100%",
      height: "100%",
      "font-size": "14px",
      "text-align": "center",
      "line-height": "30px",
      color: "#fff"
    });
    $("#u_picker input").css({ display: "none" });
    setTimeout(function() {
      $("#u_picker input").css({ display: "none" });
    }, 100);
  },
  methods: {
      download(){
          // window.open('./static/template/教师模板.xlsx')
        // window.location.href = './static/template/教师模板.xlsx'
        const link = document.createElement("a");
            link.style.display = "none";
            link.href = "./static/template/teacher.xlsx";
            link.setAttribute("download", "教师模板");
            document.body.appendChild(link);
            link.click();
      },
    ...mapActions({
      getDictComb: "dictionaryCommon/getDictComb"
    }),
    resetSearchForm() {
      if (this.identity != "school") {
        this.$refs.region.checkedItems = [];
      }
      this.search = Object.assign({}, this._search, { name: this.search.name });
      this.screeningDropdown = false;
    },
    /*
     * 获取教师列表
     */
    getData() {
      requestBaseTeacher(this.params).then(response => {
        if (response.data.code == 200) {
          let _data = response.data.entity;
          this.items = _data.resultData || [];
          this.$set(this.pageParam, "totalNum", _data.totalNum);
        } else {
          this.showMessage("error", response.data.msg);
        }
      });
    },
    /*
     * 推荐
     * { "relationIds": ["教师ID"] , "recommendType": 2 }
     */
    doRecommend({ data: item } = { data }) {
      let params = { relationIds: [], recommendType: 2 },
        flag = false;
      item = JSON.stringify(item) === "{}" ? this.checkedItems : [item];
      if (item.length) {
        for (let i = 0; i < item.length; i++) {
          if (!this.isRecommend(item[i]) && !this.isLocked(item[i])) {
            flag = true;
            break;
          }
        }
        if (flag) {
          this.$message({ message: "只能推荐审核通过,未锁定和未推荐的教师" });
        } else {
          this.recommendOperate(item, params, 2);
        }
      } else {
        this.$message({ message: "请选择要推荐的教师" });
      }
    },
    //取消推荐
    cancelRecommend({ data: item } = { data }) {
      let params = { relationIds: [] },
        flag = false;
      item = JSON.stringify(item) === "{}" ? this.checkedItems : [item];
      if (item.length) {
        for (let i = 0; i < item.length; i++) {
          if (!this.isNoRecommend(item[i])) {
            flag = true;
            break;
          }
        }
        if (flag) {
          this.$message({ message: "您选择的教师中包含了未推荐的教师" });
        } else {
          this.recommendOperate(item, params, 2, true);
        }
      } else {
        this.$message({ message: "请选择要取消推荐的教师" });
      }
    },
    // 判断是否可推荐
    isRecommend(item) {
      return (
        Number(item.auditStatus) == 1 &&
        Number(item.lockStatus) == 0 &&
        Number(item.recommend) == 0
      );
    },
    //判断是否可取消推荐
    isNoRecommend(item) {
      return Number(item.recommend) == 1;
    },
    // 判断是否已审核
    isAudited(item) {
      return Number(item.auditStatus) == 0;
    },
    // 地区改变
    changeRegion(items) {
      let _region = {};
      let [_province, _city, _area] = items;
      _region.provinceId = _province;
      _region.cityId = _city;
      _region.areaId = _area;
      this.$set(this.$data, "region", _region);
      this.search.schoolId = "";
      this.getSchoolData();
    },
    // 请求学校列表数据
    getSchoolData() {
      requestSchoolList(this.region).then(response => {
        if (response.data.code == 200) {
          this.schoolOptions = response.data.appendInfo.comboxList;
        }
      });
    },
    // 改变分页
    changePage(val) {
      this.setPageNum(val);
      this.getData();
    },
    changeSize(val) {
      this.setPageSize(val);
      this.getData();
    },
    // 改变选中项
    changeSelection(checked) {
      this.checkedItems = checked;
    },
    /*
     * 删除教师
     * id: 教师id
     */
    delTeacher({ data: item } = { data }) {
      let params = [];
      item = JSON.stringify(item) === "{}" ? this.checkedItems : [item];
      if (item.length) {
        this.$confirm("确定要删除该教师吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "__custom-msg-box"
        })
          .then(() => {
            item.forEach(x => {
              params.push({ id: x.id });
            });
            delTeacherByIds(params).then(res => {
              if (res.data.code === 200) {
                this.$message({ message: "删除成功", type: "success" });
                this.getData();
              } else {
                this.$message.error({ message: res.data.msg });
              }
              this.$refs.multipleTable.clearSelection();
            });
          })
          .catch(() => {});
      } else {
        this.$message({ message: "请选择要删除的教师" });
      }
    },
    // 启用/停用
    doLock({ data: item, model } = { data, model }) {
      item = JSON.stringify(item) === "{}" ? this.checkedItems : [item];
      this.lockOperate({
        item: item,
        model: model,
        identity: "教师"
      });
    },
    /*
     * 教师审核
     * id: ''
     * auditStatus: 审核状态
     */
    doAudit() {
      if (this.auditResult != "") {
        let items = this.checkedItems.length
            ? this.checkedItems
            : [this.curItem],
          auditStatus = Number(this.auditResult),
          params = [];
        items.forEach(x => {
          params.push({ id: x.id, auditStatus: auditStatus });
        });
        userBatchAudit(params).then(res => {
          if (res.data.code === 200) {
            this.showMessage("success", "审核成功");
            items.forEach(x => {
              x.auditStatus = auditStatus;
              if (auditStatus == 1) {
                x.lockStatus = 0;
              }
            });
          } else {
            this.showMessage("error", res.data.msg);
          }
          this.auditVisible = false;
          this.auditResult = "";
          this.$refs.multipleTable.clearSelection();
        });
      } else {
        this.showMessage("warning", "请选择审核结果");
      }
    },
    popupAudit({ data = {}, index } = { data, index }) {
      if (JSON.stringify(data) === "{}") {
        if (this.checkedItems.length > 0) {
          this.auditVisible = true;
        } else {
          this.showMessage("info", "请选择要审核的教师");
        }
      } else {
        this.auditVisible = true;
        this.curItem = data;
      }
    },
    /*
     * 修改密码
     * idList: []   // 账号数组
     * newPwd: ''   // 新密码
     */
    doResetPwd(form) {
      let items = this.checkedItems.length ? this.checkedItems : [this.curItem];
      let params = {
        idList: [],
        newPwd: form.newPwd
      };
      items.forEach(x => {
        params.idList.push(x.account);
      });
      resetPwd(params).then(response => {
        if (response.data.code == 200) {
          this.showMessage("success", "修改成功");
          this.checkedItems = [];
        } else {
          this.showMessage("error", response.data.msg);
        }
      });
      this.$refs.resetPwd.resetForm();
      this.closeResetPwdDialog();
    },
    popupPwd({ data = {}, index } = { data, index }) {
      if (JSON.stringify(data) === "{}") {
        if (this.checkedItems.length > 0) {
          this.pwdVisible = true;
        } else {
          this.showMessage("info", "请勾选要修改密码的教师");
        }
      } else {
        this.pwdVisible = true;
        this.curItem = data;
      }
    },
    closeResetPwdDialog() {
      this.pwdVisible = false;
      this.$refs.resetPwd.resetForm();
    }
  }
};
</script>

<style lang="scss">
.dialog-audit {
  .el-dialog {
    min-width: 470px;
  }
  .radio-box {
    margin: 40px 0;
    text-align: center;
  }
}
.import_file {
  float: right;
  margin-right: 20px;
  .dowtemp {
    width: 60px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    color: #2797ed;
    border: 1px solid #2797ed;
    display: inline-block;
  }
}
</style>
<style lang="scss" scoped>
#u_picker {
  background: #3083eb;
  display: inline-block;
  width: 68px;
  margin-right: 5px;
//   position: relative;
//   overflow: hidden;
    position: relative;
}
</style>
