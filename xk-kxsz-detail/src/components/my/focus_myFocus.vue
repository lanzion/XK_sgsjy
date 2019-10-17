<template>
    <section id="myAdminFocus">
        <!-- 头部功能 -->
        <header class="title clearfix">
            <div class="title_l fl">
                <!-- 全选 -->
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkbox"></el-checkbox>
                <!-- 批量设置分组 -->
                <button type="button" class="btn" @click="setClassify()">批量设置分组</button>
                <!-- 批量取消关注 -->
                <button type="button" class="btn" @click="friendDel()">批量取消关注</button>
            </div>
            <!-- 选择分组 -->
            <div class="title_r fr">
                <el-select v-model="classify.value" placeholder="请选择分组" class="fl">
                    <el-option :label="'全部'" :value="''"></el-option>
                    <el-option v-for="item in classify.options" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
                </el-select>
                <button type="button" class="func_l_btn" @click="classifyPopup = true">添加分类</button>
            </div>
            <!-- 管理分组弹窗 -->
            <el-dialog title="管理分类" :visible.sync="classifyPopup" size="tiny" class="classify" :before-close="clearModifyIndex">
                <v-groupManage :classify="classify" :groupType="groupType" @getClassifyData="getClassifyData" ref='groupManage'></v-groupManage>
            </el-dialog>
        </header>
        <!-- 列表 -->
        <el-checkbox-group v-model="checkedList" size="large" @change="handlecheckedListChange">
            <ul class="focus_ul" v-if="listDate.length">
                <li v-for="(item, index) in listDate" :key="index" class="focus_li clearfix">
                    <span class="focus_li_box"><el-checkbox :label="item"></el-checkbox></span>
                    <img :src="getFileUrl(item.face) || faceDefault" class="member-item-head circle"/>
                    <div class="focus_li_content">
                        <div>
                            <router-link :to="dynamicPath(item)">
                                <span class="name"> {{item.userName}} </span>
                            </router-link>
                            <span style="color: #c9c9c9;"> {{item.identity | professional}} </span>
                        </div>
                        <div>
                            <span> {{item.schoolName}} </span>
                        </div>
                        <div>
                            <span> 分组: {{ item.groupName ? item.groupName : '全部' }} </span>
                        </div>
                        <div class="follow_mes">
                            关注: {{item.mefollowCount}} &nbsp;&nbsp;|&nbsp;&nbsp; 粉丝: {{item.followMeCount}}
                        </div>
                    </div>
                    <div class="btn_group fr">
                        <button type="button" class="btn" @click="setClassify(item)">设置分组</button>
                        <button @click="showPrivateLetterDialog(item.userId)" type="button" class="btn">发私信</button>
                        <button type="button" class="btn" @click="friendDel(item)">取消关注</button>
                    </div>
                </li>
            </ul>
            <div class="empty-block" v-else>暂无我关注的</div>
        </el-checkbox-group>
        <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
        <el-dialog title="设置分组" :visible.sync="setClassifyPopup" size="tiny" class="setClassify" :lock-scroll="true">
            <div class="setClassify_name">
                人员：
                <el-input v-model="setClassifyString" placeholder="请输入内容" style="width:80%;"></el-input>
            </div>
            <div class="setClassify_group">
                分组：
                <el-select v-model="setClassifyId" placeholder="请选择分组" style="width:80%;margin-top:20px;">
                    <el-option v-for="item in classify.options" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="button_group">
                <button type="button" class="btn1" @click="setClassify">取消</button>
                <button type="button" class="btn2" @click="saveClassify">保存</button>
            </div>
        </el-dialog>
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog" />
    </section>
</template>

<script>
import { focusList, addGroup, groupList, groupModify, setGroup, delFriend } from '@/service/my.js'
import pagination from 'Common/pagination.vue'
import del from 'Common/del_popover.vue'
import groupManage_dialog from 'components/my/groupManage_dialog.vue'
import sendPrivateLetter from '@/components/teacher/send_private_letter_dialog.vue'
import {privateLetter} from '@/mixin/teacherAndStudent.js'
  export default {
    data() {
        return {
            dialog: {isVisible: false},
            checkAll: true, // 是否选中全部
            checkedList: [], // 选中列表
            listDate: [],   // 列表数据
            isIndeterminate: true, // 实现全选状态
            pageParam: { // 分页
                pageSize: 10,
                pageNum: 1,
                totalNum: 1
            },
            //  分类列表/值
            classify: {
                options: [],
                value: ''
            },
            classifyPopup: false, // 分类弹框开关
            // 设置分组弹框
            setClassifyPopup: false,
            setClassifyString: '',
            setClassifyId: '',
            // 分组类别 ， 1:我关注的 2:关注我的 3:我的好友
            groupType: 1
        }
    },
    mixins: [privateLetter],
    methods: {
        // 关闭分组弹框清理
        clearModifyIndex() {
            this.classifyPopup = false
            if(this.classify.options[0].name == '' || this.classify.options[0].id == '' ) {
                this.classify.options.shift()
            }
            this.$refs.groupManage.modifyIndex = null
            this.$refs.groupManage.modifyName = null
            this.$refs.groupManage.ifAddStutas = false
        },
        // 取消关注
        friendDel(item) {
            let paramData = []
            if(item != undefined) {
                paramData.push({ id: item.id })
            }else {
                this.checkedList.forEach(i => paramData.push({id: i.id}))
            }
            if(paramData.length) {
                delFriend(paramData).then(res => {
                    if(res.data.code == 200) {
                        this.getFocusList()
                        this.$message({
                            message: '取消关注成功',
                            type: 'success'
                        })
                        this.checkedList.splice(0, this.checkedList.length)
                        this.checkAll = false
                    }
                })
            }else {
                this.$message({ message: '您未选中取消对象' })
            }
        },
        // 保存分组
        saveClassify () {
            let paramData = []
            this.checkedList.map(i => {
                paramData.push({id: i.id, followGroup: this.setClassifyId})
            })
            setGroup(paramData).then(res => {
                if(res.data.code) {
                    this.getFocusList()
                    this.$message({
                        message: '设置成功',
                        type: 'success'
                    })
                    this.setClassifyPopup = false
                    this.checkAll = false
                    this.checkedList.splice(0, this.checkedList.length)
                }
            })
        },
        // 设置分组
        setClassify (item) {
            if(this.checkedList.length != 0 || item) {
                this.setClassifyPopup = !this.setClassifyPopup
                if(this.setClassifyPopup){
                    if(item != undefined) {
                        this.checkedList.splice(0, this.checkedList.length, item)
                    }
                    let arrName = this.checkedList.map(i => i.userName)
                    this.setClassifyString = arrName.join(',')
                    arrName = null
                }else {
                    this.checkedList.splice(0, this.checkedList.length)
                    this.checkAll = false
                }
            } else {
                this.$message({ message: '您未选中分组对象' })
            }
        },
        // 选择全部
        handleCheckAllChange(event) {
            this.checkedList = event.target.checked ? [...this.listDate] : []
            this.isIndeterminate = false
        },
        // 单个选择
        handlecheckedListChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.listDate.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.listDate.length
        },
        // 请求列表数据
        getFocusList () {
            let param = {
                followUser: this.$ls.get('loginUId'),
                followGroup: this.classify.value,
                userName: this.search
            }
            focusList(param, this.pageParam).then(res => {
                if(res.data.entity){
                    this.listDate = res.data.entity.resultData
                    this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
                    this.$emit('totalNum', res.data.entity.totalNum)
                }
            })
        },
        // 分页改变
        changePage (val) {
            this.$set(this.pageParam,'pageNum', val)
            this.getFocusList()
        },
        // 分组管理
        // 分类管理 - 分类列表
        getClassifyData () {
            groupList({ userId: this.$ls.get('loginUId'), groupType: this.groupType }).then(res => {
                if(res.data.entity) {
                    this.classify.options = res.data.entity
                }
            })
        }

    },
    mounted() {
        this.getFocusList()
        this.getClassifyData()
    },
    props: {
        search: {
            type: String,
            default: ''
        }
    },
    computed: {
        params: function() {
            return Object.assign( {},
                {search: this.search},
                {type: this.classify.value}
            )
        }
    },
    watch: {
        'params': {
            handler: function (val, oldVal) {
                this.getFocusList()
            }
        }
    },
    components: {
        'v-pagination': pagination,
        'v-del': del,
        'v-groupManage': groupManage_dialog,
        sendPrivateLetter
    },
    filters: {
        professional (txt = '') {
            return txt == '0' ? '学生 | 兴趣' : '教师 | 任教'
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/myAdminFocus.scss';
#myAdminFocus{
    padding: 0px 15px 15px;
}
</style>

<style lang='scss'>
#myAdminFocus {
    .el-checkbox__input.is-indeterminate span.el-checkbox__inner {
        background-color: transparent;
        border-color: #c9c9c9;
    }
    .el-checkbox__input.is-checked span.el-checkbox__inner {
        border-color: #D00;
    }
    .el-checkbox__input.is-checked.is-indeterminate .el-checkbox__inner {
        border-color: #c9c9c9;
    }
    .el-checkbox__inner {
        width: 18px;
        height: 18px;
        &::after {
            left: 4px;
            height: 10px;
            width: 5px;
        }
    }
}
</style>