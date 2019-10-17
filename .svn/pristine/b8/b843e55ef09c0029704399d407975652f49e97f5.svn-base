<template>
    <section id="my_letter" class="my-letter">
        <div class="del-batch" v-if="msgData.length > 0">
            <el-popover ref="popover" placement="top" width="140" v-model="visible">
                  <p>确定要删除这些私信吗？</p>
                  <div style="text-align: right; margin: 10px">
                    <button class="psn-cancel-btn" @click="visible = false">取消</button>
                    <button class="psn-confirm-btn" @click="delLetters">确定</button>
                  </div>
            </el-popover>
            <a href="javaScript:;" @click="beforeDelLetters">批量删除</a>
        </div>
        <el-table
            ref="multipleTable"
            :data="msgData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-if="msgData.length > 0">
            <el-table-column
              type="selection"
              width="32">
            </el-table-column>
            <el-table-column
                  label="">
                  <template slot-scope="scope">
                      <section class="contents-box clearfix">
                          <div class="avatar-box fl">
                              <img :src="getFileUrl(scope.row.sendFace) || faceDefault">
                              <span class="num" v-if="scope.row.noReadCount > 0">{{scope.row.noReadCount}}</span>
                          </div>
                          <div class="msg-box">
                              <p class="name">
                                  <router-link :to="{path:'/admin/privateLetter/letterDetail', query:{ sendId: scope.row.userId,name: scope.row.sendUserName }}">
                                      {{scope.row.sendUserName}}
                                  </router-link>
                              </p>
                              <p class="content">{{scope.row.content}}</p>
                              <p class="time">{{scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</p>
                          </div>
                      </section>
                  </template>
            </el-table-column>
            <el-table-column label="" width="60">
                <template slot-scope="scope">
                    <del-popover title="删除" class="delete" :delData="{ url:'maker/message/private/del', params:[{fromId:scope.row.userId,toId:userId}], name:'私信' }" v-on:callback="getLetterList"></del-popover>
                </template>
            </el-table-column>
        </el-table>
        <div v-else class="empty-block">暂无私信</div>
        <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </section>
</template>

<script>
    import delPopover from 'Common/del_popover.vue'
    import pagination from 'Common/pagination.vue'
    import { delMyletter } from '@/service/privateLetter.js'

    export default {
        name: 'my_letter',
        components: {
            'del-popover': delPopover,
            'v-pagination': pagination,
        },
        data() {
            return {
                dialogShow: {
                    show: false
                },
                visible: false,
                delIds: [],
                userId: ''
            }
        },
        props: {
            msgData: {
                type: Array,
                default() {
                    return []
                }
            },
            param: {
                type: Object,
                default() {
                    return {
                        totalNum: 0,
                        pageSize: 10,
                        pageNum: 1
                    }
                }
            },
            getLetterList: Function
        },
        mounted() {
            if (localStorage.getItem('loginInfo')) {
                this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
            }
        },
        methods: {
            changePage(val) {
                this.getLetterList(val)
            },
            handleSelectionChange(val) {
                this.delIds = []
                 for (const i in val) {
                     this.delIds.push({ fromId: val[i].userId, toId: this.userId })
                 }
            },
            /* 删除前的操作 */
            beforeDelLetters() {
                if (this.delIds.length > 0) {
                    this.visible = true
                } else {
                    this.showMessage('warning', '还未勾选要删除的私信哦')
                }
            },
            /* 批量删除 */
            delLetters() {
                delMyletter(this.delIds).then((res) => {
                    if (res.data.code === 200) {
                        this.visible = false
                        this.showMessage('success', '删除成功')
                        this.getLetterList()
                        this.delIds = []
                        this.$refs.multipleTable.clearSelection()
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                })
            },
            searchParam(val) {
                this.search = val
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    #my_letter{
        position: relative;
        padding: 10px 18px 0px;
        .del-batch{
            position: absolute;
            top: 23px;
            left: 70px;
            z-index: 999;
            font-size: 14px;
            a{
                display: inline-block;
                color: $theme_color;
            }
            &:hover{
                a{
                    color: $theme_color;
                }
            }
        }
        .publish-letter{
            border:none;
            font-size: 14px;
            color: #fff;
            background-color: $theme_color;
            padding:0px 15px;
            height: 34px;
            line-height: 34px;
            position: absolute;
            top: 0px;
            right: 0px;
        }
        .contents-box{
            padding: 15px 0;
            .avatar-box{
                margin-right: 10px;
                position: relative;
                height: 74px;
                .num{
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    border-radius: 50%;
                    background-color: $theme_color;
                    color: #fff;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    line-height: 20px;
                }
                img{
                    width: 74px;
                    height: 74px;
                    border-radius: 50%;
                }
            }
            .msg-box{
                .name{
                    font-size: 18px;
                    cursor: pointer;
                }
                .name:hover{
                    a{
                        color: #00a0e9;
                    }
                }
                .content{
                    font-size: 14px;
                }
                .time{
                    color: #999;
                }
            }
        }
    }
</style>

<style lang="scss">
    #my_letter{
        .el-table{
            border:none;
            td{
                border:none;
                border-bottom: 1px dashed #c9c9c9;
            }
            th{
                background-color: #fff;
            }
            th.is-leaf{
                border-bottom: 1px dashed #c9c9c9;
            }
            tr:hover{
                td{
                    background-color: #fff;
                }
            }
        }
        .tabs{
            position: relative;
        }
        .tabs-right{
            padding-right: 80px
        }
    }

    .el-table__body-wrapper{
        border-bottom: 1px solid #c9c9c9;
    }
    .del-batch{
        .el-popover{
            top: -100px;
            right: -57px;
            &:after{
                content: '';
                width:10px;
                height: 10px;
                position: absolute;
                bottom:-6px;
                left:70px;
                border:1px solid #d1dbe5;
                border-top: none;
                border-left: none;
                background-color: #fff;
                transform: rotate(45deg);
                -ms-transform: rotate(45deg);        /* IE 9 */
                -webkit-transform: rotate(45deg);    /* Safari and Chrome */
                -o-transform: rotate(45deg);        /* Opera */
                -moz-transform: rotate(45deg);        /* Firefox */
            }
        }
    }
</style>