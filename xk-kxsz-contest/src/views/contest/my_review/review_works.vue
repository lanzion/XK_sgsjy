<template>
  <div class="review_works bgw">
    <div class="review_works_title">
      <h4 class="list-head">{{title}}</h4>
      <ul class="list_conent">
        <li>{{currentPhaseName}}统计:</li>
        <li>0~59: {{sectional.A||0}}人</li>
        <li>60~69: {{sectional.B||0}}人</li>
        <li>70~79: {{sectional.C||0}}人</li>
        <li>80~89: {{sectional.D||0}}人</li>
        <li>90~100: {{sectional.E||0}}人</li>
      </ul>
    </div>
    <div class="works-list">
      <v-list :listData="listData" :items.sync="worksItems" class>
        <template slot-scope="props">
          <div class="list-item-img__box img-box">
            <div
              class="bg-img__wrap"
              :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"
            ></div>
            <span class="praise-num">赞 {{props.item.praiseNum || 0}}</span>
          </div>
          <h6 class="list-item-title clearfix">
            <span class="fl works-name ellipsis">{{props.item.worksName}}</span>
            <span class="fr user-name ellipsis">{{props.item.userName}}</span>
          </h6>
          <h6 class="list-item-title clearfix" v-for="(phitem,index) in PhaseList" :key="index" v-if="props.item.scoreMap[phitem.id]">{{phitem.name}}: {{props.item.scoreMap[phitem.id]}}分</h6>
        </template>
      </v-list>
    </div>
    <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
  </div>
</template>

<script>
import list from "@/components/common/list/list.vue";
import pagination from "@/components/common/pagination.vue";
import {
  requestExpertAuditedWorks,
  requestExpertPendingWorks,
  aftermyreviewformyreviewsectionalstatistics
} from "@/service/works.js";
import {requestPhaseList} from "@/service/manage.js";
export default {
  name: "review_works",
  components: {
    "v-list": list,
    "v-pagination": pagination
  },
  data() {
    return {
      sectional:'',
      listData: {
        col: 4,
        pathUrl: "",
        paramsArr: [
          { name: "id", val: "route", key: "id" }, // val为route 时，从路由获取参数，要传key（获取路由参数的字段）
          { name: "worksId", val: "worksId" },
          { name: "reviewId", val: "id" }
        ]
      },
      worksItems: [],
      pageParam: {
        totalNum: 0,
        pageSize: 16,
        pageNum: 1
      },
      title: "",
      PhaseList:[],
      currentPhase:'',
      currentPhaseName:''
    };
  },
  created() {
    this.getPhaseList()
    this.judgeRoute();
    
  },
  mounted() {
    this.getWorksList();
  },
  watch: {
    "$route.path": {
      handler: function() {
        this.judgeRoute();
        this.getWorksList();
      },
      deep: true
    }
  },
  methods: {
    // 判断路由
    judgeRoute() {
      if (this.$route.path.includes("pending")) {
        this.title = "待我评审";
        this.listData.pathUrl = "/contest/review/pending/detail/review";
      } else {
        this.title = "经我评审";
        this.listData.pathUrl = "/contest/review/audited/detail/review";
      }
    },
    getsectionalstatistics(id) {
      let handle = aftermyreviewformyreviewsectionalstatistics;
      const params = {
        matchId: this.$route.query.id,
        phaseId: id
      };
      handle(params).then(res => {
        if (res.data.code === 200) {
          const _data = res.data.appendInfo.result || {};
          _data.forEach(v => {
            if(v.phaseId==id){
              this.sectional = v.numList
            }
          });
          // this.sectional = _data[_data.length-1].numList
        } else {
          this.worksItems = [];
          this.$message({
            message: res.data.msg
          });
        }
      });
    },
    
    changePage(val) {
      this.$set(this.pageParam, "pageNum", val);
      this.getWorksList();
    },
    getPhaseList(){
      requestPhaseList({ matchId: this.$route.query.id }).then(res=>{
        if (res.data.code === 200) {
          this.PhaseList = res.data.appendInfo.list;
          this.PhaseList.forEach(v => {
            if(v.isOpen==1){
              this.currentPhase = v.id;
              this.currentPhaseName = v.name
            }
          });
          if(this.currentPhase) this.getsectionalstatistics(this.currentPhase);
          else{
            this.getsectionalstatistics(this.PhaseList[this.PhaseList.length-1].id);
            this.currentPhaseName = this.PhaseList[this.PhaseList.length-1].name
          } 
        }
      })
    },
    getWorksList() {
      let handle;
      let status;
      if (this.$route.path.includes("pending")) {
        handle = requestExpertPendingWorks;
        status = 2;
      } else {
        handle = requestExpertAuditedWorks;
        status = 1;
      }
      const params = {
        matchId: this.$route.query.id,
        status: status,
        phaseId: ""
      };
      handle(params, this.pageParam).then(res => {
        if (res.data.code === 200) {
          const _data = res.data.entity || {};
          this.worksItems = _data.resultData || [];
          console.log(this.worksItems)
          this.$set(this.pageParam, "totalNum", _data.totalNum || 0);
        } else {
          this.worksItems = [];
          this.$message({
            message: res.data.msg
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.review_works {
}
</style>

<style lang="scss" scoped>
@import "~@/assets/css/scss/item_list.scss";
@import "~@/assets/css/scss/works_list.scss";
.review_works {
  padding-bottom: 100px;
  .list-head {
    font-size: 16px;
    padding: 15px 15px 10px;
  }
  .works-list {
    padding: 0px 15px 15px;
  }
  .list-item__box {
    .list-item-img__box {
      img {
        height: 185px;
      }
    }
  }
}
.review_works_title {
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  .list-head {
    float: left;
  }
  .list_conent {
    float: left;
    margin-left: 50px;
    overflow: hidden;
    li {
      font-size: 16px;
      padding: 15px 15px 10px;
      float: left;
    }
  }
}
.list-item-list {
  height: 28px;
  line-height: 28px;
}
</style>