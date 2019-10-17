<template>
  <div class="information-wrapper">
    <div class="options-and-search clearfix">
      <!--<span class="total">共计<em class="blue">{{pageParam.totalNum}}</em>个资讯</span>-->
      <v-tab v-bind="{count, tabs: [], 'is_search': true, btns: btn, total: pageParam.totalNum}"
             @searchVal="setKeyWords">
      </v-tab>
    </div>
    <div class="list-wrapper">
      <ul>
        <li v-for="(item, index) in lists" class="information-item table-layout">
          <figure class="pic table-cell pr">
            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }" @click="toDetail(item)"></div>
            <!-- <img :src="getFileUrl(item.cover) || listDefault" alt="" width="190" height="190" @click="toDetail(item)" /> -->
            <figcaption v-if="item.auditStatus === '2'" class="status fail pa">
              <span class="txt-status pa">不通过</span>
            </figcaption>
          </figure>
          <div class="information-item__main table-cell">
            <h3 class="name ellipsis" @click="toDetail(item)">{{item.title}}</h3>
            <p class="desc">{{item.content | handleDescription}}</p>
            <p class="other-info">
              <span class="info-item">浏览：{{item.browseNum || 0}}</span>
              <span class="info-item">发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
            </p>
            <!--<button @click="showRecordDialog(item.id)" class="btn-verify-record pa">审核记录</button>-->
          </div>
          <operate @on-delete="deleteItem(item.id)" @on-edit="editItem(item.id)" @on-submit="submit(item.id)"
                   :icon-group="[ 'delete']" label="资讯"></operate>
        </li>
        <li v-if="lists.length === 0" class="no-data">暂无数据</li>
      </ul>
      <pagination :param="pageParam" :change-page="requestList"></pagination>
      <verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'infoId'}"/>
    </div>
  </div>
</template>

<script>
  import { loginInfo, userIdentity } from '@/js/getUserInfo.js'
  import { requestBackendInfoList, deleteInfo } from '@/service/information.js'
  import pagination from 'components/common/pagination.vue'
  import nav from 'components/common/classificationList/classification/tabs.vue'
  import operate from 'components/common/operate.vue'
  import verifyRecordDialog from 'components/my/verify_record_dialog.vue'

  export default {
    name: 'adminInfoList', // 空间后台-资讯

    data () {
      return {
        api: '/maker/course/audit/selectList',

        btn: [{name: '发布资讯', url: '/admin/info/release'}],

        count: {
          num: 0,
          name: '资讯'
        },

        curRecordId: '',

        dialog: {isVisible: false},

        lists: [], // 列表

        pageParam: { // 分页数据
          pageSize: 5,
          pageNum: 1,
          totalNum: 0
        },

        selected: { // 接口所需数据
          title: '',
        },

        infoDetailPath: {
          investor: '/investor/infoDetail',
          investOrg: '/investOrg/infoDetail',
          enterprise: '/enterprise/infoDetail',
          mult: '/multSpace/infoDetail'
        }
      }
    },

    created () {
      this.requestList()
    },

    components: {
      pagination,
      'v-tab': nav,
      operate,
      verifyRecordDialog,
    },

    filters: {
      handleDescription (txt = '', len = 80, rep = '...') {
        const reg = new RegExp(`(.{${len}}).+`)
        return txt === null
          ? '暂无描述内容'
          : txt.replace(/<[^>]+>|\n|\s/gi, '').replace(reg, `$1${rep}`)
      }
    },

    methods: {
      toDetail(item) {
        this.$router.push({ path: this.infoDetailPath[userIdentity], query: { id: loginInfo.userInfo.space.orgId, infoId: item.id } })
      },

      async requestList () {
        const loginInfo = this.$ls.get('loginInfo')
        const orgId = loginInfo && loginInfo.userInfo.baseId || ''
        const res = await requestBackendInfoList({
          orgId,
          ...this.pageParam,
          ...this.selected,
        })

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.lists = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      deleteItem (id) {
        const errMsg = '删除资讯失败，请重试'

        deleteInfo({id}).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '成功删除资讯',
              type: 'success',
              duration: 1500,
            })

            this.requestList()
            return
          }

          this.$message.error(res.data.msg || errMsg)
        }).catch(() => {
          this.$message.error(errMsg)
        })
      },

      editItem (id) {
        this.$router.push({path: '/admin/info/release', query: {id}})
      },

      generateIconGroup (status) {
        const edit = status === '-1' || status === '2' ? 'edit' : ''
        const submit = edit && 'submit' || ''
        const del = edit ? 'delete' : ''
        return [edit, submit, del]
      },

      // 显示审核记录弹窗
      showRecordDialog (id) {
        this.curRecordId = id
        this.dialog.isVisible = true
      },

      // 提交审核
      submit (id) {
        const errMsg = '提交审核失败，请重试'

        /*submititem({id}).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message({
              message: '成功提交审核',
              type: 'success',
              duration: 1500
            })
            this.requestList()
            return
          }

          this.$message.error(res.data.msg || errMsg)
        }).catch(() => {
          this.$message.error(errMsg)
        })*/
      },

      setKeyWords (str) {
        this.selected.title = str
        this.requestList()
      },
    },
  }

</script>

<style lang="scss" scoped>
  .options-and-search {
    // border-bottom: 1px solid #c9c9c9;
    .total {
      line-height: 34px;
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .list-wrapper {
    padding: 0px 15px 15px;
  }

  .information-wrapper .information-item {
    position: relative;
    box-sizing: border-box;
    height: 238px;
    border-bottom: 1px dashed #c9c9c9;
    .pic {
      width: 190px;
      height: 190px;
      cursor: pointer;
      .bg-img__wrap {
        width: inherit;
        height: inherit;
      }
      .status {
        top: -7%;
        left: -21%;
        transform: rotate(-45deg);
        border: 40px solid transparent;
        border-bottom-color: #46c475;
        &.fail {
          border-bottom-color: #ff4848;
        }
      }
      .txt-status {
        top: 20px;
        left: -40px;
        width: 80px;
        text-align: center;
        color: #fff;
      }
    }
    .information-item__main {
      padding-left: 20px;
      padding-right: 100px;
    }
    .name {
      font-size: 22px;
      cursor: pointer;
      &:hover {
        color: #d00;
      }
    }
    .desc {
      width: 500px;
      line-height: 1.3;
      margin: 20px 0 40px;
      font-size: 14px;
      word-wrap: break-word;
    }
    .other-info {
      font-size: 0;
      span {
        font-size: 14px;
        color: #999;
        padding: 0 16px;
        border-right: 1px solid #c9c9c9;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
</style>
