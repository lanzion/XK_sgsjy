<template>
    <div class="works">
        <!--<div class="sum fr">总计：<span class="red">21563</span></div>-->
        <div class="list-wrapper">
            <ul class="clearfix">
                <li v-for="(item, index) in visitors" :key="index" class="list-item fl">
                    <a @click="toPersonSpace(item.identity,item.orgId,item.userId)" :title="item.userName" style="display: block; overflow: hidden;" href="javascript:;">
                        <figure class="fl">
                            <img :src="getFileUrl(item.face) || faceDefault" class="avatar" alt="" width="72" height="72">
                        </figure>
                        <div class="content fl">
                            <h5 class="name ellipsis">{{item.userName || '无姓名'}}</h5>
                            <p class="date">{{item.createDate | dateFormat('M月dd日')}}</p>
                        </div>
                    </a>
                </li>
            </ul>
            <p v-if="!visitors.length" class="no-data">暂无数据</p>
            <pagination :param="pageParam" :change-page="changePage"></pagination>
        </div>
    </div>
</template>

<script>
    import { visitor } from '@/mixin/teacherAndStudent.js'
    import { joinSpace } from '@/mixin/joinSpace.js'
    import pagination from 'components/common/pagination.vue'

    export default {
        name: 'personVisitor', // 教师/学生空间-访客
        mixins: [visitor, joinSpace],
        data() {
            return {
                visitors: [], // 列表
                pageParam: { // 分页数据
                    pageSize: 25,
                    pageNum: 1,
                    totalNum: 0
                }
            }
        },
        components: {
            pagination
        },
        created() {
            this.requestVisitorList({ userId: this.$route.query.uid }, this.pageParam)
        },
        methods: {
            // 进入个人空间
            toPersonSpace(identity, orgId, uid) {
                let routePath
                let query
                switch (identity) {
                    case '0':
                        routePath = 'student'
                        query = { id: orgId, uid: uid }
                        break
                    case '1':
                        routePath = 'teacher'
                        query = { id: orgId, uid: uid }
                        break
                    case '2':
                        routePath = 'investor'
                        query = { id: orgId }
                        break
                    case '3':
                        routePath = 'investOrg'
                        query = { id: orgId }
                        break
                    case '4':
                        routePath = 'enterprise'
                        query = { id: orgId }
                        break
                    case '11':
                        routePath = 'multSpace'
                        query = { id: orgId }
                        break
                }
                // this.$router.push({ path: routePath, query: query })
                if (this.$ls.get('loginUId') && this.$ls.get('loginUId') === uid) {
                    this.redirect(this.pages.my)
                } else {
                    this.redirect(this.pages.detail[routePath], { query: query })
                }
            },
            changePage(val) {
                this.pageParam.pageNum = val
            }
        },
        watch: {
            pageParam: {
                handler(val) {
                    this.requestVisitorList({ userId: this.$route.query.uid }, val)
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
  .sum {
    margin-top: -40px;
    font-size: 14px;
    .red {
      color: #d00;
    }
  }

  .list-wrapper .list-item {
    margin: 14px 21px 14px 0;
    .avatar {
      display: block;
      border-radius: 50%;
    }
    .content {
      width: 72px;
      overflow: hidden;
      padding: 10px 0 14px 6px;
    }
    .name {
      line-height: 1.2;
      font-size: 16px;
    }
    .date {
      margin-top: 10px;
      font-size: 14px;
    }
  }
</style>

