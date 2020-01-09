<template>
  <div class="backend-content__middle">
    <section class="option-box clearfix">
      <el-row>
        <el-col :span="1">奖项</el-col>
        <el-col :span="20">
          <span>一等奖 {{award1}} 人</span>
          <span>二等奖 {{award2}} 人</span>
          <span>三等奖 {{award3}} 人</span>
        </el-col>
      </el-row>
      <el-button class="fr" type="primary" @click="exportData">导出</el-button>
      <el-row style="width:90%">
        <el-col :span="1" style="padding-top:8px">区域</el-col>
        <el-col :span="20">
          <el-select
            v-model="regionid"
            placeholder="请选择"
            style="vertical-align: middle;margin-right:48px"
          >
            <el-option
              v-for="item in awardList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            ></el-option>
          </el-select>
          <span style="color:#666">区域奖项：</span>
          <span>一等奖 {{regAward.award1}} 人</span>
          <span>二等奖 {{regAward.award2}} 人</span>
          <span>三等奖 {{regAward.award3}} 人</span>
        </el-col>
      </el-row>
    </section>
    <el-table
      class="data-table back-stage-table"
      border
      :data="items"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="changeSelection"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="name" label="报名人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip>
        <template scope="scope">
          <span v-if="scope.row.sex==7">男</span>
          <span v-if="scope.row.sex==8">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="certiNum" label="身份证" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="subject" :label="labelName"></el-table-column>
      <!-- <el-table-column prop="region" label="所属区域"></el-table-column> -->
      <el-table-column prop="school" label="所属学校" show-overflow-tooltip></el-table-column>
      <el-table-column prop="accommodate" label="是否住宿">
        <template scope="scope">{{ifTxt[scope.row.accommodate]}}</template>
      </el-table-column>
      <el-table-column prop="meal" label="是否就餐">
        <template scope="scope">{{ifTxt[scope.row.meal]}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注信息" show-overflow-tooltip></el-table-column>
      <el-table-column prop="groupDisDetailName" label="组别" show-overflow-tooltip></el-table-column>
      <el-table-column prop="projectDisDetailName" label="报名项目" show-overflow-tooltip></el-table-column>
      <el-table-column prop="teamMembers" label="队员" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="teamMembers" label="适合学段" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.teamMembers | translate(applyScopeIdOptions, {key: 'id'})}}
                </template>
      </el-table-column>-->
      <el-table-column prop="createDate" label="报名时间">
        <template scope="scope">{{scope.row.createDate | dateFormat('yyyy.MM.dd HH:mm')}}</template>
      </el-table-column>
      <el-table-column prop="score" label="得分" show-overflow-tooltip></el-table-column>
      <el-table-column prop="award" label="奖项" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button @click="open(scope.row)" type="text" size="small" v-if="identity==6">编辑</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">详情</el-button>
          <el-button @click="doDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: open,
                        del: doDel,
                        detil:{ query: { id: 'id', trainId: 'trainId',actorType:'actorType' } }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
    </el-table>
    <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="120px">
          <el-input v-model="form.certiNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="120px">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="得分" label-width="120px">
          <el-input v-model="form.score" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖项" label-width="120px">
          <el-input v-model="form.award" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setPage } from "@/mixin/adminPagination.js";
import pagination from "@/components/common/admin_pagination.vue";
import {
  requestTrainEnrollList,
  deleteByTrainSignIds,
  modify,
  selectDescByArea,
  selectTrainSignUpExport,
  selectBySignId
} from "@/service/admin_space.js";
import adminOperate from "@/components/common/operate.vue";
import { requestLimitRegion } from "@/service/common.js";
import filterDate from '@/filter/filters/dateFormat.js'
import dataTranslation from 'Asset/js/dataTranslation.js'
import { subPermission } from '@/mixin/getAdminMenu.js'
export default {
  name: "trainEnroll",
  mixins: [subPermission,setPage],
  components: {
    "v-pagination": pagination,
    "v-admin-operate": adminOperate
  },
  data() {
    return {
      screeningDropdown: false,
      labelName: "",
      propData: "",
      items: [],
      checkedItems: [], // 选中项
      provinceList: [],
      ifTxt: {
        0: "否",
        1: "是"
      },
      pageParam: {
        pageSize: 100
      },
      dialogVisible: false,
      form: {},
      awardList: [],
      award1: 0,
      award2: 0,
      award3: 0,
      regionid: "",
      regAward: {},
      identity:'',
      selectByTrainId:'',
      selectAreaIdFlag:false,
    };
  },
  created() {
    if(this.$route.query.id) sessionStorage.setItem('viewEnrollId',this.$route.query.id);
    if(this.$route.query.actorType) sessionStorage.setItem('actorType',this.$route.query.actorType);
    this.getData();
    this.getProvinceList();
    this.getDescByArea();
    this.identity = this.$ls.get('loginInfo').userInfo.identity;
  },
  watch: {
    regionid(n, o) {
      if(this.selectAreaIdFlag){
        this.selectByTrainId = n;
        this.getData();
      }
      this.awardList.forEach(v => {
        if (v.areaId == n) {
          this.regAward = v;
        }
      });
      this.selectAreaIdFlag = true;
    }
  },
  methods: {
    /*
     * 获取资讯列表
     */
    getData() {
      const _this = this;
      console.log("9090---", this.$route.query);
      requestTrainEnrollList(
        { trainId: this.$route.query.id,areaId:this.selectByTrainId },
        this.pageParam
      ).then(response => {
        if (response.data.code === 200) {
          const _data = response.data.entity || {};
          this.items = _data.resultData || [];
          this.items.forEach(v => {
            v['actorType'] = this.$route.query.actorType;
          });
          for (let i = 0; i < _data.resultData.length; i++) {
            if (this.$route.query.actorType === "2") {
              console.log("1111");
              _this.labelName = "任教学科";
            } else {
              console.log("222");
              _this.labelName = "指导教师";
            }
          }
          this.$set(this.pageParam, "totalNum", response.data.entity.totalNum);
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

    /*
     * 删除资讯
     * [{id: "资讯ID"}]
     */
    doDel(item /*{ data: item } = { data }*/) {
      let data = item.data;
      const params = [];
      // item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
      if (data.id /*item.length*/) {
        this.$confirm("此操作将删除该培训，是否继续？", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "__custom-msg-box"
        })
          .then(() => {
            // item.forEach((x) => {
            //     params.push({ id: x.id })
            // })
            deleteByTrainSignIds([{ id: data.id }]).then(response => {
              if (response.data.code === 200) {
                this.$message({ message: "删除成功", type: "success" });
                this.getData();
              } else {
                this.$message.error(response.data.msg);
              }
            });
          })
          .catch(() => {});
      } else {
        this.$message({ message: "请选择要删除的培训" });
      }
    },
    // 改变选中项
    changeSelection(checked) {
      this.checkedItems = checked;
    },
    // 重置搜索表单
    resetSearchForm() {
      this.$refs.region.checkedItems = [];
      this.search = Object.assign({}, this._search, {
        name: this.search.theme
      });
      this.screeningDropdown = false;
    },
    filterProvince(pid, cid, aid, index) {
      let region = "";
      this.provinceList.forEach(v => {
        if (pid == v.code) {
          region += v.name;
          if (v["subset"]) {
            v.subset.forEach(v => {
              if (cid == v.code) {
                region += "/" + v.name;
                if (v["subset"]) {
                  v.subset.forEach(v => {
                    if (aid == v.code) {
                      region += "/" + v.name;
                      this.items[index].region = region;
                      return region;
                    }
                  });
                } else {
                  requestLimitRegion({ pcode: v.code }).then(res => {
                    let proList = res.data.appendInfo.list;
                    proList.forEach(v => {
                      if (aid == v.code) {
                        region += "/" + v.name;
                        this.items[index].region = region;
                        return region;
                      }
                    });
                  });
                }
              }
            });
          } else {
            requestLimitRegion({ pcode: v.code }).then(res => {
              let proList = res.data.appendInfo.list;
              proList.forEach(v => {
                if (cid == v.code) {
                  region += "/" + v.name;
                  if (v["subset"]) {
                    v.subset.forEach(v => {
                      if (aid == v.code) {
                        region += "/" + v.name;
                        this.items[index].region = region;
                        return region;
                      }
                    });
                  } else {
                    requestLimitRegion({ pcode: v.code }).then(res => {
                      let proList = res.data.appendInfo.list;
                      proList.forEach(v => {
                        if (aid == v.code) {
                          region += "/" + v.name;
                          this.items[index].region = region;
                          return region;
                        }
                      });
                    });
                  }
                }
              });
            });
          }
        }
      });
    },
    getProvinceList() {
      requestLimitRegion({ pcode: "-1" }).then(res => {
        this.provinceList = res.data.appendInfo.list;
      });
    },
    // 详情
    edit(data) {
      let item = data.data;
      this.$router.push({
        path: "/space/train/viewEnroll/viewEnrollEdit",
        query: {
          trainId: this.$route.query.id,
          applyId: item.applyId,
          actorType: this.$route.query.actorType
        }
      });
    },
    open(data) {
      let item = data.data;
      this.$router.push({
        path:'/space/train/viewEnroll/viewEnrollEdit',
        query:{
          id:item.id,
          trainId:item.trainId,
          actorType:item.actorType,
          type:1
        }
      })
      // selectBySignId({id:item.id}).then(res=>{
      //   let data = res.data;
      //   if(data.code==200){
      //     this.form = data.entity;
      //     this.dialogVisible = true;
      //   }else{
      //     this.$message.error(data.msg);
      //   }
      // })
      
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    editData() {
      this.form.score = Number(this.form.score);
      // this.form.applyId = this.$ls.get('loginInfo').userInfo.id
      modify(this.form).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({ message: "修改成功", type: "success" });
          this.getData();
        } else {
          this.$message({ message: data.msg, type: "warning" });
           this.getData();
        }
        this.dialogVisible = false;
      });
    },
    // 导出
    exportData() {
      this._getBookExport();
     
    },
    // 查询获奖名单
    getDescByArea() {
      let trainId = this.$route.query.id;
      selectDescByArea({ trainId: trainId }).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.awardList = data.entity.resultData;
          this.regionid = this.awardList[0].areaId;
          // this.regAward = this.awardList[0];
          this.awardList.forEach(v => {
            this.award1 += Number(v.award1);
            this.award2 += Number(v.award2);
            this.award3 += Number(v.award3);
          });
        }
      });
    },
    _getBookExport() {
       let trainId = this.$route.query.id;
       requestTrainEnrollList({trainId: trainId},{pageNum:1,pageSize:9999}).then(res=>{
         let items = res.data.entity.resultData;
         items.forEach((v,i) => {
           v['index'] = i+1;
           v['region'] = v.provinceName + '/'+v.cityName+'/'+v.areaName
         });
         this.export2Excel(items);
       })
      // selectTrainSignUpExport({}, { trainId: trainId }).then(res => {
      //   let data = res.data;  
      //    this.export2Excel();
      // });
    },
    export2Excel(items) {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel");
        const tHeader = [
          "序号",
          "报名人",
          "性别",
          "身份证",
          "联系电话",
          this.labelName,
          "区域",
          "所属学校",
          "是否住宿",
          "是否就餐",
          "备注信息",
          "组别",
          "报名项目",
          "队员",
          "报名时间",
          "得分",
          "奖项",
        ];
        const filterVal = [
          "index",
          "name",
          "sex",
          "certiNum",
          "phone",
          "subject",
          "region",
          "school",
          "accommodate",
          "meal",
          "remark",
          "groupDisDetailName",
          "projectDisDetailName",
          "teamMembers",
          "createDate",
          "score",
          "award",
        ];
        let list = [];
        items.map(v=>{
          v.sex = v.sex==7?'男':'女';
          v.accommodate = v.accommodate==1?'是':'否';
          v.meal = v.meal==1?'是':'否';
          v.createDate = filterDate(v.createDate,'yyyy.MM.dd HH:mm');
          list.push(v)
        });
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "报名数据");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>
<style lang="scss" scoped>
.option-box {
  font-size: 16px;
  color: #333;
  span {
    margin-right: 10px;
  }
  .el-row {
    padding-bottom: 10px;
    font-size: 14px;
    color: #666;
    span {
      color: #333;
    }
  }
}
.tongji {
  height: 42px;
  border: 1px solid #e8e8e8;
}
.tongji_box {
  padding: 10px;
}
</style>
