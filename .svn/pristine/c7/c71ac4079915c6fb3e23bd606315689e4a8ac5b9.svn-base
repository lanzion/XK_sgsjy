<template>
    <div class="unchecked_member">
        <ul class="list-box" v-if="memberList.length > 0">
              <li class="member-list clearfix" v-for="item in memberList">
                  <div class="fl check-box">
                      <el-checkbox></el-checkbox>
                  </div>
                  <div class="avatar-box fl">
                      <a @click="toPersonDetail(item, 'applyId')">
                          <img :src="getFileUrl(item.headImageUrl) || faceDefault" height="72" width="73">
                      </a>
                  </div>
                  <div class="msg-box fl">
                      <p>
                          <a @click="toPersonDetail(item, 'applyId')" class="name">{{item.applyName}}</a>
                          <span class="school" v-if="item.schoolName">（{{item.schoolName}}）</span>
                      </p>
                      <p>{{item.applyContent}}</p>
                      <p class=""><span class="time">{{item.applyDate | dateFormat('yyyy-MM-dd')}}</span></p>
                  </div>
                  <div class="option-box fr">
                      <span @click="audit(item,2)">不通过</span>
                      <span @click="audit(item,1)">通过</span>
                  </div>
              </li>
          </ul>
          <div class="empty-block" v-else>暂无成员申请</div>
          <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </div>
</template>

<script type="text/javascript">
    import { requestPendingMember, auditMember } from '@/service/activity.js'
    import pagination from 'Common/pagination.vue'

    export default {
        name: 'unchecked_member',
        components: {
            'v-pagination': pagination
        },
        data() {
            return {
                param: {
                    totalNum: 0,
                    pageSize: 10,
                    pageNum: 1
                },
                pageParam: {
                    pageSize: 20,
                    pageNum: 1
                },
                memberList: [],
            }
        },
        created() {
            this.getPendingMembers()
        },
        methods: {
            changePage(val) {
                this.pageParam.pageNum = val
                this.getPendingMembers()
            },
            /*
            *获取待审成员列表
            *activityId: 活动Id
            */
            getPendingMembers() {
                const params = {
                    activityId: this.$route.query.id,
                    auditStatus: 0
                }
                requestPendingMember(params, this.pageParam).then((res) => {
                    this.param.totalNum = res.data.entity.totalNum
                    this.memberList = res.data.entity.resultData
                })
            },
            /*
            *成员审核
            *id:审核记录id
            *auditStatus:审核状态
            *auditOpinion:审核意见
            *applyId:申请人id
            *activityId:活动Id
            */
            audit(param, status) {
                let opinion
                if (status === 1) {
                    opinion = '审核通过'
                } else {
                    opinion = '审核不通过'
                }
                auditMember({
                    id: param.id,
                    auditStatus: status,
                    auditOpinion: opinion,
                    applyId: param.applyId,
                    activityId: this.$route.query.id
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '审核成功')
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                    this.getPendingMembers()
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    *{
        box-sizing: border-box;
    }
    .unchecked_member{
        padding: 0 20px;
    }
    .list-box{
        width: 100%;
        margin-bottom:50px;
    }
    // 待审成员列表
    .member-list{
        padding: 13px 0;
        border-bottom: 1px dashed #c9c9c9;
        .check-box{
            width: 40px;
            height: 73px;
            line-height: 73px;
        }
        .avatar-box{
            img{
                border-radius: 1000px;
            }
        }
        .msg-box{
            width: 570px;
            margin-left: 18px;
            p{
                font-size: 14px;
                margin-bottom: 10px;
            }
            .shcool,.time{
                color: #999;
            }
            .time{
                font-size: 12px;
            }
            .name{
                font-size: 16px;
                &:hover{
                    color: $theme_color;
                }
            }
        }
        .option-box{
            height: 73px;
            line-height: 73px;
            font-size: 14px;
            span{
                margin-left: 15px;
                cursor: pointer;
                font-size: 14px;
                color: $theme_color;
                padding: 3px 6px;
                border: 1px solid $theme_color;
                border-radius: 5px;
                &:hover {
                    background-color: $theme_color;
                    color: #fff;
                }
            }
        }
    }
</style>