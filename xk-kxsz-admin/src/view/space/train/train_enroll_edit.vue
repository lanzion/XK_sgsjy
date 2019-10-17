<template>
  <div class="train_enroll_edit backend-content__middle">
    <el-form :model="form" label-width="100px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="姓名：">
            <el-col :span="24">
              <el-input v-model="form.name" placeholder="暂无姓名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="名别：">
            <el-col :span="24">
              <el-radio v-model="form.sex" label="8">男</el-radio>
              <el-radio v-model="form.sex" label="7">女</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-col :span="24">
              <el-input v-model="form.certiNum" placeholder="暂无身份信息"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="subjectLabel.title">
            <el-col :span="24">
              <el-input v-model="form.subject" :placeholder="subjectLabel.txt"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-col :span="24">
              <el-input v-model="form.phone" placeholder="暂无联系电话"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="所属区域：">
            <el-col :span="24">
              <v-region-select @region="changeRegion" ref="region" :defaultItems="defaultRegion"></v-region-select>
            </el-col>
          </el-form-item>
          <el-form-item label="所属学校：">
            <el-col :span="24">
              <!-- <el-input v-model="form.school" placeholder="暂无学校信息"></el-input> -->
              <region-school-select
                @checkedItem="changeSchool"
                :checkedItem="form.schoolId"
                :defaultList="schoolList"
                ref="studentRegion"
              ></region-school-select>
            </el-col>
          </el-form-item>
          <el-form-item label="报名项目：">
            <el-col :span="24">
              <el-select v-model="form.projectDisDetailId" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in projectList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="作品得分：">
            <el-col :span="24">
              <el-input v-model="form.score" placeholder="暂无作品得分"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="作品奖项：">
            <el-col :span="24">
              <el-input v-model="form.award" placeholder="暂无作品奖项"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="图片：">
            <div class="demo-fit">
              <div class="block" style="width:300px">
                <img :src="form.image" alt style="width:100%" />
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="队员：" v-if="form.actorWay==2">
        <el-col :span="18">
          <div class="team">
            <div class="team_list" v-for="item in form.listMembers" :key="item.id">
              <div class="team_list_left">{{item.userInfo}}</div>
              <!-- <div class="team_list_right">{{item}}</div> -->
            </div>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="参与组别：">
        <el-col :span="10">
          <el-radio-group v-model="form.groupDisDetailId">
            <el-radio :label="i.id" v-for="(i, k) in zbList" :key="k">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="是否住宿：">
        <el-col :span="10">
          <el-radio v-model="form.accommodate" :label="1">是</el-radio>
          <el-radio v-model="form.accommodate" :label="0">否</el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="是否就餐：">
        <el-col :span="10">
          <el-radio v-model="form.meal" :label="1">是</el-radio>
          <el-radio v-model="form.meal" :label="0">否</el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="备注信息：">
        <el-col :span="18">
          <el-input v-model="form.remark" type="textarea" placeholder="暂无备注信息"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="培训资料：">
        <div v-if="form.attachmentList">
          <el-col :span="18" v-for="(file,index) in form.attachmentList" :key="index">
            <a
              :href="downloadUrl(file.resourceId, file.name)"
              :download="downloadName(file.name)"
              :title="file.name"
            >
              {{file.name}}
              <span class="down">下载</span>
            </a>
          </el-col>
        </div>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button class="btn cancel-btn back" type="button" @click.prevent="goBack">返回</el-button>
      <el-button class="btn save-btn" type="button" @click.prevent="onSubmit" v-if="editflag">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  selectBySignId,
  trainDetail,
  selectTrainProjectList,
  modify
} from "@/service/admin_space.js";
import { requestDictComb, requestSchoolList } from "@/service/common.js";
import region from "@/components/common/select/region_select.vue"; // 省市区下拉
import regionSchool from "@/components/common/select/region-school_select.vue";
export default {
  name: "viewEnrollEdit",
  components: {
    "v-region-select": region,
    "region-school-select": regionSchool
  },
  data() {
    return {
      schoolList: [
        {
          id: "",
          name: ""
        }
      ],
      form: {
        name: ""
      },
      defaultRegion: [],
      subjectLabel: {
        title: "指导教师：",
        txt: "未填写指导教师"
      },
      projectList: [],
      zbList: [],
      editflag: false
    };
  },
  methods: {
    isPoneAvailable(str) {
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    downloadName(name) {
      return this.form.school + "_" + this.form.name + "_" + name;
    },
    //   提交
    onSubmit() {
      if (!this.form.name) return this.$message.error("请填写姓名");
      if (!this.form.certiNum) return this.$message.error("请填写身份证");
      if (!this.form.projectDisDetailId)
        return this.$message.error("请选择报名项目");
      if (!this.isPoneAvailable(this.form.phone)) return this.$message.error("请填写正确手机号码");
      modify(this.form).then(res => {
        let data = res.data;
        if (data.code == 200 || data.code == 202) {
          this.$message({ message: "修改成功", type: "success" });
        } else {
          this.$message({ message: data.msg, type: "warning" });
        }
      });
    },
    changeSchool: function(item) {
      this.$set(this.form, "schoolId", item.id);
      this.$set(this.form, "school", item.schoolName);
    },
    // 返回
    goBack() {
      let id = this.$route.query.trainId;
      let actorType = this.$route.query.actorType;
      this.$router.push({
        path: "/space/train/viewEnroll",
        query: {
          id: id,
          actorType: actorType
        }
      });
    },
    // 获取详情
    getDates() {
      let trainId = this.$route.query.trainId;
      let id = this.$route.query.id;
      if (trainId) {
        sessionStorage.setItem('viewEnrollId',trainId)
        // 1.学生,2.教师
        if (this.$route.query.actorType == "2") {
          this.subjectLabel.title = "任教学科：";
          this.subjectLabel.txt = "未填写任教学科";
        }
        trainDetail({ id: trainId }).then(res => {
          if (res.data.code === 200) {
            let detail = res.data.entity;
            selectTrainProjectList({
              studySectionId: detail.studySectionId
            }).then(item => {
              if (item.data.code === 200) {
                this.projectList = item.data.entity.trainSubjectList;
              }
            });
          }
        });
        selectBySignId({
          // trainId: trainId,
          id: id
        }).then(res => {
          let data = res.data;
          if (data.code == 200) {
            const _detail = res.data.entity;
            if (_detail) {
              this.form = _detail;
              this.selectdList = _detail.listMembers.map(i => ({
                name: i.userInfo,
                id: i.userId,
                status: false,
                certiNum: ""
              }));
              this.defaultRegion = [
                this.form.provinceId,
                this.form.cityId,
                this.form.areaId
              ];

              if (this.$route.query.type) this.editflag = true;
            }
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
    },
    // 地区改变
    changeRegion(items) {
      let [_province, _city, _area] = items;
      this.form.provinceId = _province;
      this.form.cityId = _city;
      this.form.areaId = _area;
      if (this.form.areaId) {
        requestSchoolList({
          provinceId: this.form.provinceId,
          cityId: this.form.cityId,
          areaId: this.form.areaId
        }).then(res => {
          let datas = res.data;
          if (datas.code == 200) {
            this.schoolList = datas.appendInfo.comboxList;
          }
        });
      }
    }
  },
  created() {
    this.dictComb();
    this.getDates();
  }
};
</script>

<style lang="scss" scoped>
.train_enroll_edit {
  /deep/ .el-form-item {
    /deep/ .el-form-item__content {
      text-align: left;
    }
  }
  .team {
    max-height: 160px;
    overflow-y: scroll;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    padding: 16px;
    .team_list {
      display: inline-block;
      width: 48%;
      .team_list_left {
        display: inline-block;
        width: 80px;
      }
      .team_list_right {
        display: inline-block;
        width: 65%;
      }
    }
  }
  .btn-box {
    padding-bottom: 30px;
    padding-top: 30px;
    text-align: center;
    /deep/ button {
      background: #23b8ff;
      color: #fff;
      width: 120px;
      height: 46px;
      border-radius: 10px;
      margin-left: 20px;
    }
    .back {
      background: none;
      color: #23b8ff;
      border: 1px solid #23b8ff;
    }
  }
  .down {
    width: 40px;
    height: 24px;
    font-size: 12px;
    background-color: #e4eefe;
    border-radius: 4px;
    border: solid 1px #23b8ff;
    margin-left: 20px;
    color: #23b8ff;
    display: inline-block;
    text-align: center;
    line-height: 24px;
  }
}
</style>>