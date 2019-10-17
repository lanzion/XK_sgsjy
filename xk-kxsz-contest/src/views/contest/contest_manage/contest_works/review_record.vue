<template>
  <div class="audit_record">
    <section
      class="select-box"
      v-bind:class="{ 'border-none': $route.path.includes('review/audited/detail/review') }"
    >
      <el-select v-model="search.phaseId" placeholder="请选择评比级别">
        <el-option
          clearable
          v-for="item in phaseList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </section>
    <div class v-if="recordDatas.length">
      <div v-for="(item, index) in recordDatas" :key="index">
        <section id="works_review" class v-if="item.userId==userId&&item.phaseStatus==2">
          <div class="audit_expert">评比级别：{{item.phaseName || '暂无'}}</div>
          <div class="audit_expert">评审专家：{{item.expertName || '暂无'}}</div>
          <el-table :data="indexList" border style="width: 100%">
            <el-table-column prop="name" label="评审要素" width="258"></el-table-column>
            <el-table-column prop="description" label="评审标准"></el-table-column>
            <el-table-column prop="value" label="分值"></el-table-column>
            <el-table-column prop="score" label="评分" width="258">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.score"
                  :min="1"
                  :max="scope.row.value"
                  size="small"
                />
              </template>
            </el-table-column>
          </el-table>
          <dl class="total-score clearfix">
            <dt class="total-tit fl">总分</dt>
            <dd class="total-num fr">
              <el-input-number v-model="score" :min="0" :max="100" disabled size="small" />
            </dd>
          </dl>
          <dl class="comment clearfix">
            <dt class="comment-tit fl">评语</dt>
            <dd class="comment-content fr">
              <el-input
                type="textarea"
                autosize
                :maxlength="500"
                placeholder="请输入评语"
                v-model="remark"
              ></el-input>
			        <button class="submit-btn btn" @click="reviewWorks(item.id)">提交</button>
            </dd>
          </dl>
          <!-- <div class="btn-box">
            <button class="submit-btn btn" @click="reviewWorks">提交</button>
            <button class="cancel-btn btn" @click="cancelOperate">取消</button>
          </div> -->
        </section>
        <section class="record_item" v-else>
          <div class="audit_expert">评比级别：{{item.phaseName || '暂无'}}</div>
          <div class="audit_expert">评审专家：{{item.expertName || '暂无'}}</div>
          <div class="table-box">
            <el-table :data="item.evaluationItemList" border style="width: 100%">
              <el-table-column prop="name" label="评审要素" width="258"></el-table-column>
              <el-table-column prop="description" label="评审标准" width="318"></el-table-column>
              <el-table-column prop="value" label="分值"></el-table-column>
              <el-table-column prop="score" label="评分"></el-table-column>
            </el-table>
            <dl class="total-score clearfix">
              <dt class="total-tit fl">总分</dt>
              <dd class="total-num fr">{{item.score || 0}}</dd>
            </dl>
            <dl class="comment clearfix">
              <dt class="comment-tit fl">评语</dt>
              <dd class="comment-content fr">
                <div class="remark">{{item.remark || '暂无评语'}}</div>
              </dd>
            </dl>
          </div>
        </section>
      </div>
    </div>
    <div class="empty-block" v-else>暂无数据</div>
    <div class="btn-box">
      <button class="back-btn" @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>

<script>
import {
  requestWorksReviewRecord,
  requestPhaseList
} from "@/service/manage.js";
import { batchUpdateWorks } from '@/service/works.js'
export default {
  name: "audit_record",
  data() {
    return {
      recordDatas: [], // 评审记录数据
      totalScore: 0,
      comment: "",
      search: {
        phaseId: ""
      },
      phaseList: [],
      // ifManage: false,
      indexList: [],
      userId: "",
      score: 0,
      remark: ""
    };
  },
  mounted() {
    // if (this.$route.path === '/contest/manage/works/reviewRecord') {
    //     this.ifManage = true
    //     this.getPhaseList()
    // }
    this.getPhaseList();
    this.getReviewRecord();
  },
  watch: {
    search: {
      handler: function() {
        this.getReviewRecord();
      },
      deep: true
    },
    indexList: {
      handler: function(val) {
		this.score = 0;
		console.log(val)
        for (let i = 0; i < val.length; i++) {
          this.score = this.score + val[i].score;
        }
      },
      deep: true
    }
  },
  methods: {
    // 获取阶段列表
    getPhaseList() {
      requestPhaseList({ matchId: this.$route.query.id }).then(res => {
        if (res.data.code === 200) {
          this.phaseList = res.data.appendInfo.list;
        }
      });
    },
    getReviewRecord() {
      const params = {
        matchId: this.$route.query.id,
        worksId: this.$route.query.worksId,
        phaseId: this.search.phaseId
      };
      requestWorksReviewRecord(params).then(res => {
        if (res.data.code === 200) {
          this.recordDatas = res.data.appendInfo.evaluationRecordsList;
          this.recordDatas.forEach(v => {
            if (v.userId == this.userId&&v.phaseStatus==2) {
              this.indexList = v.evaluationItemList;
              this.score = v.score;
              this.remark = v.remark;
            }
          });
        }
      });
    },
    doReview(id) {
      const params = {
        id: id,
        score: this.score,
        remark: this.remark,
        evaluationItemList: []
      };
      for (let i = 0; i < this.indexList.length; i++) {
        params.evaluationItemList.push({
          id: this.indexList[i].id,
          score: this.indexList[i].score
        });
      }
      // console.log(params);
        batchUpdateWorks(params).then(res => {
          if (res.data.code === 200) {
            this.showMessage("success", "修改成功");
          //   this.$router.push({
          //     path: "/contest/review/pending",
          //     query: { id: this.$route.query.id }
          //   });
          } else {
            this.showMessage("success", res.data.msg);
          }
        });
    },
    // 作品评审
    reviewWorks(id) {
      if (this.score === 0) {
        this.showMessage("info", "您好像还没评分哦");
      } else {
        this.doReview(id);
      }
    }
  },
  created() {
    if (this.$ls.get("loginInfo")) {
      this.userId = this.$ls.get("loginInfo").userInfo.id;
    }
  }
};
</script>

<style lang="scss">
.audit_record {
  .el-table {
    .cell {
      text-align: center;
    }
  }
}
#works_review {
  .el-input-number {
    display: block;
    width: 100%;
  }
  .el-table {
    .cell {
      text-align: center;
    }
  }
  .comment-content {
    .el-textarea__inner {
      min-height: 43px !important;
    }
    .el-textarea {
      vertical-align: middle;
	  width: 80%;
    }
	
  }
}
</style>

<style lang="scss" scoped>
@import "~@/assets/css/scss/vars.scss";
.audit_record {
  // padding-top: 10px;
  .select-box {
    padding: 5px 15px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
  }
  .border-none {
    border: none;
  }
  .audit_expert {
    font-size: 16px;
    padding-left: 15px;
    margin-bottom: 5px;
  }
  .table-box {
    padding: 15px;
  }
  .total-score {
    border: 1px solid #dfe6ec;
    border-top: none;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .total-tit {
      width: 749px;
      font-size: 16px;
      font-weight: 600;
      color: #000;
    }
    .total-num {
      box-sizing: border-box;
      width: 182px;
      height: 100%;
      line-height: 35px;
      padding: 5px 18px;
      border-left: 1px solid #dfe6ec;
    }
  }
  .comment {
    border: 1px solid #dfe6ec;
    border-top: none;
    // height: 64px;
    text-align: center;
    .comment-tit {
      line-height: 50px;
      box-sizing: border-box;
      width: 260px;
      height: 100%;
      font-size: 16px;
      font-weight: 600;
      color: #000;
    }
    .comment-content {
      width: 685px;
      height: 100%;
      min-height: 50px;
      box-sizing: border-box;
      padding: 10px 18px;
      line-height: 2em;
      word-wrap: break-word;
      border-left: 1px solid #dfe6ec;
    }
  }

  .btn-box {
    padding: 20px;
    .back-btn {
      border: 1px solid $theme-color;
      color: $theme-color;
      padding: 7px 15px;
      border-radius: 3px;
      &:hover {
        background-color: $theme-color;
        color: #fff;
      }
    }
  }
}
.record_item {
  margin-bottom: 20px;
}

#works_review {
  padding: 20px 15px;
  .total-score {
    border: 1px solid #dfe6ec;
    border-top: none;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .total-tit {
      width: 686px;
      font-size: 16px;
      font-weight: 600;
      color: #000;
    }
    .total-num {
      box-sizing: border-box;
      width: 259px;
      height: 100%;
      padding: 5px 18px;
      border-left: 1px solid #dfe6ec;
    }
  }
  .comment {
    border: 1px solid #dfe6ec;
    border-top: none;
    // height: 64px;
    text-align: center;
    .comment-tit {
      line-height: 50px;
      box-sizing: border-box;
      width: 260px;
      height: 100%;
      font-size: 16px;
      font-weight: 600;
      margin-top: 5px;
      color: #000;
    }
    .comment-content {
      width: 686px;
      height: 100%;
      box-sizing: border-box;
      padding: 10px 18px;
      border-left: 1px solid #dfe6ec;
	  .btn {
		border: none;
		box-sizing: border-box;
		width: 60px;
		height: 32px;
		line-height: 31px;
		font-size: 14px;
		vertical-align: middle;
		border-radius: 3px;
		background-color: $theme-color;
		color: #fff;
		margin-left: 10px;
		&:hover {
			opacity: 0.75;
		}
		}
    }
  }
  .btn-box {
    margin-top: 20px;
    .btn {
      border: none;
      box-sizing: border-box;
      width: 60px;
      height: 32px;
      line-height: 31px;
      font-size: 14px;
      vertical-align: middle;
      border-radius: 3px;
    }
    .submit-btn {
      background-color: $theme-color;
      color: #fff;
      margin-right: 10px;
      &:hover {
        opacity: 0.75;
      }
    }
    .cancel-btn {
      border: 1px solid $theme-color;
      color: $theme-color;
      &:hover {
        background-color: $theme-color;
        color: #fff;
      }
    }
  }
}
</style>