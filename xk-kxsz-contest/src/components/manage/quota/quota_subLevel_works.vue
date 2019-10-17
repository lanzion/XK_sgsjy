<template>
  <div class="compete_record">
    <div class="table-box">
      <el-table
        v-if="isBatch"
        class="data-table back-stage-table"
        :data="batchMqaid"
        style="width: 100%"
      >
        <el-table-column v-for="column in columns" :label="column.name" :key="column.id">
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model.number="scope.row[column.id]"
              :min="0"
              style="width: 100px"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-else
        class="data-table back-stage-table"
        border
        :data="list.filter((x, i) => (i >= page.pageSize * (page.pageNum - 1) && i < page.pageSize * page.pageNum))"
        style="width: 100%"
      >
        <el-table-column prop="orgName" label="区域/学校" show-overflow-tooltip></el-table-column>
        <el-table-column v-for="column in columns" :label="column.name" :key="column.id">
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model.number="scope.row.mqaid[column.id]"
              :min="0"
              style="width: 100px"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix">
      <el-pagination
        v-if="!isBatch && !datas.length"
        class="fl"
        small
        layout="prev, pager, next"
        :page-size="page.pageSize"
        :current-page.sync="page.pageNum"
        :total="page.total"
      ></el-pagination>
      <section class="bs-d-btn-group fr">
        <button type="button" class="bs-search-button i-form-button" @click="onSubmit">确定</button>
        <button type="button" class="bs-search-button i-form-button is-plain" @click="close">取消</button>
      </section>
    </div>
  </div>
</template>

<script>
import {
  requestQuotaSettingList,
  saveQuotaList,
  saveBatchQuotaList
} from "@/service/manage.js";

export default {
  data() {
    return {
      items: [],
      columns: [],
      list: [],
      batchMqaid: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      addFlag: true
    };
  },
  mounted() {
    this.columns = this.project;
  },
  methods: {
    getData() {
      requestQuotaSettingList({ matchId: this.$route.query.id }).then(res => {
        if (res.data.code === 200) {
          const _data = res.data.appendInfo || {};
          this.columns = _data.projectInfo || [];
          this.items = _data.orgList || [];
          this.$set(this.page, "total", _data.orgList.length);
        }
      });
    },
    onSubmit() {
      const handler = this.isBatch ? saveBatchQuotaList : saveQuotaList;
      const params = { matchId: this.$route.query.id };
      if (this.isBatch) {
        params.mqaid = Object.entries(this.batchMqaid[0]).map(x => {
          return {
            projectId: x[0],
            quotaNum: x[1]
          };
        });
      } else {
        params.mqad = this.list
          .filter(x => Object.keys(x.mqaid).length)
          .map(x => {
            return {
              orgId: x.orgId,
              mqaid: Object.entries(x.mqaid)
                .filter(entries => !isNaN(entries[1]))
                .map(entries => ({
                  projectId: entries[0],
                  quotaNum: entries[1]
                }))
            };
          });
      }
      if (this.addFlag) {
        this.addFlag = false;
        handler(params).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.callback();
          } else {
            this.$message.error({ message: res.data.msg });
          }
          this.close();
          this.addFlag = true;
        });
      }
    }
  },
  props: {
    datas: {
      type: Array,
      default() {
        return [];
      }
    },
    project: {
      type: Array,
      default() {
        return [];
      }
    },
    isBatch: {
      type: Boolean,
      default() {
        return false;
      }
    },
    close: Function,
    callback: Function
  },
  watch: {
    items: {
      handler: function(val) {
        if (val.filter(x => x).length) {
          const items = JSON.parse(JSON.stringify(val));
          this.list = items.map(x => {
            const _mqaid = {};
            x.mqaid.forEach(y => {
              _mqaid[y.projectId] = y.quotaNum;
            });
            x.mqaid = _mqaid;
            return x;
          });
        }
      },
      deep: true
    },
    isBatch: {
      handler: function(val) {
        if (!val) {
          if (this.datas.length) {
            this.items = this.datas;
          } else {
            this.getData();
          }
        }
      },
      deep: true
    },
    datas: {
      handler: function(val) {
        if (val && val.length) {
          this.items = this.datas;
        } else if (!this.isBatch) {
          this.getData();
        }
      },
      deep: true,
      immediate: true
    },
    columns: {
      handler: function(val) {
        if (val) {
          const _batchMqaid = {};
          for (let i = 0; i < val.length; i++) {
            _batchMqaid[val[i].id] = null;
          }
          this.$set(this.batchMqaid, 0, _batchMqaid);
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  max-height: 450px;
  margin-bottom: 15px;
}
</style>