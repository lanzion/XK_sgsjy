  <template>
    <el-dialog class="inviteMembers" title="邀请成员" :visible.sync="visible.show" @close="close">
        <!-- <header class="header">
            邀请成员
        </header> -->
        <section class="box clearfix">
            <div class="fl box-l">
                <el-row>
                    <el-col :span="4" style="height:32px;line-height:32px;" align="middle">接收人:</el-col>
                    <el-col :span="18"><el-input v-model="selector" placeholder="请输入内容" :readonly="true"></el-input></el-col>
                </el-row>
                <el-row style="margin-top:25px;">
                    <el-col :span="4" style="height:32px;line-height:32px;" align="middle">内&nbsp;&nbsp;&nbsp;容:</el-col>
                    <el-col :span="18"><el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="content" resize="none"></el-input></el-col>
                </el-row>
            </div>
            <div class="fr box-r">
                <el-row>
                    <el-col :span="24" style="height: 36px; line-height: 36px; margin-bottom: 1px;"><el-input placeholder="输入关键字搜索" v-on:keyup.enter.native="searchPerson" icon="search" :on-icon-click="searchPerson" v-model="filterText"></el-input></el-col>
                </el-row>
                <el-tabs type="border-card" @tab-click="listenCurTab">
                    <el-tab-pane label="本校学生">
                        <el-row>
                            <el-col :span="24">
                                <el-tree :data="studentData" show-checkbox node-key="id" :props="defaultProps" style="height:172px;overflow-y:auto;border: none;" :filter-node-method="filterNode1" ref="tree1" @check-change="selectData('student')"></el-tree>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="本校教师" v-if="model == 'courseId'">
                        <el-row>
                            <el-col :span="24">
                                <el-tree :data="teacherData" show-checkbox node-key="id" :props="defaultProps" style="height:172px;overflow-y:auto;border: none;" :filter-node-method="filterNode2" ref="tree2" @check-change="selectData('teacher')"></el-tree>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="我的好友">
                        <el-row>
                            <el-col :span="24">
                                <el-tree :data="friendsData" show-checkbox node-key="id" :props="defaultProps" style="height:172px;overflow-y:auto;border: none;" :filter-node-method="filterNode3" ref="tree3" @check-change="selectData('friends')"></el-tree>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click="visible.show = false">取消</a>
            <a class="reply_btn reply_btn1" @click="send">确定</a>
        </div>
    </el-dialog>
</template>

<script>
import { requestBaseStudent } from '@/service/admin_base.js'
import { requestFriendsList,requestTeacherList } from '@/service/privateLetter.js'
import { admininviteMembersSend } from '@/service/project.js'
import { baseInfo } from '@/js/getUserInfo.js'
// import { friendList } from '@/service/my.js'
export default {
  name: 'inviteMembers', // 邀请成员
  props: ['visible', 'model'],
  data() {
        return {
            search: {
                schoolId: null,
                name: '',
                lockStatus: 0,
                auditStatus: 1
            },
            selector: '',
            content: '',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            selected: [],
            text: '',
            title: '',
            studentData: [],
            teacherData: [],
            friendsData: [],
            selector1: [],
            selected1: [],
            selector2: [],
            selected2: [],
            selector3: [],
            selected3: [],
            filterText: '',
            userId: ''
        }
    },
    methods: {
        // 切换本校学生,我的好友
        listenCurTab(tab, event){
            this.cur_tab = parseInt(tab.index)
            // switch(this.cur_tab){
            //     case 0 :
            //         this.$refs.tree1.filter(this.filterText);
            //         break;
            //     case 1 :
            //         this.$refs.tree3.filter(this.filterText);
            //         break;
            // }
        },
        // getStudentList() {
        //     const identity = this.$ls.get('userIdentity')
        //     const param = {
        //         userId: this.$ls.get('loginUId'),
        //         friendGroup: '',
        //         userName: ''
        //     }
        //     friendList({userId: this.userId,name:''}, {pageNum: 1, pageSize: 9999}).then(res => {
        //         if(res.data.code === 200){
        //             this.friendsData = res.data.entity.resultData
        //         }
        //     })
        //     this.search.schoolId = this.$ls.get('baseInfo')[identity].schoolId
        //     requestBaseStudent(Object.assign({}, this.search, {pageNum: 1, pageSize: 9999})).then(res => {
        //         this.studentData = res.data.entity.resultData
        //     })
        // },
        getStudentList(params) {
            requestBaseStudent(params).then(res => {
                if(res.data.code === 200){
                    this.studentData = res.data.entity.resultData
                    let len = this.studentData.length
                    for (let i = 0; i < len; i++) {
                        if(this.studentData[i].userId === this.userId){
                            this.studentData.splice(i,1)
                            return
                        }
                    }
                }
            })
        },
        getTeacherList(params) {
            requestTeacherList(params).then((res) => {
                if(res.data.code === 200){
                    this.teacherData = res.data.entity.resultData
                    let len = this.teacherData.length
                    for (let i = 0; i < len; i++) {
                        if(this.teacherData[i].userId === this.userId){
                            this.teacherData.splice(i,1)
                            return
                        }
                    }
                }
            })
        },
        getFriendsList(params) {
            requestFriendsList(params).then(res => {
                if(res.data.code === 200){
                    const datas = res.data.entity.resultData
                    if (this.model === 'projectId' || this.model === 'activityId') {
                        this.friendsData = datas.filter(x => x.identity == '0')
                    } else {
                        this.friendsData = datas
                    }
                }
            })
        },
        searchPerson() {
            if (this.filterText === '') {
                this.searchByName(this.search.schoolId)
            } else {
                this.searchByName()
            }
        },
        searchByName(schoolId = '') {
            if (this.model == 'courseId') {
                switch (this.cur_tab) {
                    case 0 :
                        this.getStudentList(Object.assign({}, { lockStatus: 0, auditStatus: 1, schoolId: schoolId, name: this.filterText }))
                        break
                    case 1 :
                        this.getTeacherList(Object.assign({}, { lockStatus: 0, auditStatus: 1, schoolId: schoolId, name: this.filterText }))
                        break
                    case 2 :
                        this.getFriendsList(Object.assign({ pageNum: 1, pageSize: 9999 }, { userId: this.userId, userName: this.filterText }))
                        break
                }
            } else {
                switch (this.cur_tab) {
                    case 0 :
                        this.getStudentList(Object.assign({}, { lockStatus: 0, auditStatus: 1, schoolId: schoolId, name: this.filterText }))
                        break
                    case 1 :
                        this.getFriendsList(Object.assign({ pageNum: 1, pageSize: 9999 }, { userId: this.userId, userName: this.filterText }))
                        break
                    default :
                        break
                }
            }
        },
        filterNode1(value, data) {
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        filterNode2(value, data) {
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        filterNode3(value, data) {
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        selectData(type){
            switch (type) {
                case 'student':
                    this.selector1 = []
                    this.selected1 = []
                    let data1 = this.$refs.tree1.getCheckedNodes(true)
                    for(let i = 0; i < data1.length;i++) {
                        this.selector1.push(data1[i].name)
                        this.selected1.push(data1[i].userId)
                    }
                    break
                case 'teacher':
                    this.selector2 = []
                    this.selected2 = []
                    let data2 = this.$refs.tree2.getCheckedNodes(true)
                    for(let i = 0; i < data2.length;i++) {
                        this.selector2.push(data2[i].name)
                        this.selected2.push(data2[i].userId)
                    }
                    break
                case 'friends':
                    this.selector3 = []
                    this.selected3 = []
                    let data3 = this.$refs.tree3.getCheckedNodes(true)
                    for(let i = 0; i < data3.length; i++) {
                        this.selector3.push(data3[i].name)
                        this.selected3.push(data3[i].userId)
                    }
                    break
            }
            this.selector = this.selector1.concat(this.selector2, this.selector3)
            this.selected = this.selected1.concat(this.selected2, this.selected3)
            this.selectTxt = this.selector.join('、')
        },
        send (){
            if(localStorage.getItem('loginInfo')){
                let userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id;
                let loc = location.href.substr(0, location.href.indexOf('#') + 1)
                let messageType
                if(this.model == 'projectId') {
                    messageType = 2
                    this.text = this.content + `<a style="color:#00a0e9;" href='${loc}/education/${this.$route.path.split('/')[2]}/detail?id=${this.$route.query.id}'>${loc}/education/${this.$route.path.split('/')[2]}/detail?id=${this.$route.query.id}</a>`
                    // this.text = this.content + `<a style="color:#00a0e9;" href='\/#\/education\/${this.$route.path.split('/')[2]}\/detail?id=${this.$route.query.id}'>${loc}education\/${this.$route.path.split('/')[2]}\/detail?id=${this.$route.query.id}</a>`
                }else if(this.model == 'activityId') {
                    messageType = 3
                    this.text = this.content + `<a style="color:#00a0e9;" href='${loc}/space/${this.$route.path.split('/')[2]}/details/?id=${this.$route.query.id}'>${loc}/space/${this.$route.path.split('/')[2]}/details/?id=${this.$route.query.id}</a>`
                    // this.text = this.content + `<a style="color:#00a0e9;" href='\/#\/space\/${this.$route.path.split('/')[2]}\/details\/?id=${this.$route.query.id}'>${loc}education\/${this.$route.path.split('/')[2]}\/detail?$id=${this.$route.query.id}</a>`
                }else if(this.model == 'courseId') {
                    messageType = 5
                    this.text = this.content + `<a style="color:#00a0e9;" href='${loc}/education/${this.$route.path.split('/')[2]}/detail?id=${this.$route.query.id}'>${loc}education/${this.$route.path.split('/')[2]}/detail?id=${this.$route.query.id}</a>`
                    // this.text = this.content + `<a style="color:#00a0e9;" href='\/#\/education\/${this.$route.path.split('/')[2]}\/detail?id=${this.$route.query.id}'>${loc}education\/${this.$route.path.split('/')[2]}\/detail?id=${this.$route.query.id}</a>`
                }
                admininviteMembersSend({
                    busId: this.$route.query.id,
                    sendId: userId,
                    content: this.text,
                    receiveIds: this.selected,
                    messageType: messageType
                }).then(res => {
                    if(res.data.code === 200){
                        this.showMessage('success','已发送邀请')
                        this.visible.show = false
                        this.content = ''
                        this.selector = ''
                        this.selected = []
                        this.close()
                    }else{
                        this.showMessage('warning',res.data.msg)
                    }
                })
            }else{
                this.showMessage('warning','请登录后再操作')
            }
        },
        close() {
            if (this.model === 'courseId') {
                this.$refs.tree1.setCheckedKeys([])
                this.$refs.tree2.setCheckedKeys([])
                this.$refs.tree3.setCheckedKeys([])
            } else {
                this.$refs.tree1.setCheckedKeys([])
                this.$refs.tree3.setCheckedKeys([])
            }
        }
    },
    watch:{
        // filterText(val) {
        //     switch(this.cur_tab){
        //         case 0 :
        //             this.$refs.tree1.filter(val);
        //             break;
        //         case 1 :
        //             this.$refs.tree3.filter(val);
        //             break;
        //     }
        // },
        visible: {
            handler: function (val, oldVal) {
                if (val.show) {
                    // this.getStudentList();
                    this.getStudentList(Object.assign({}, this.search))
                    this.getTeacherList(Object.assign({}, this.search))
                    this.getFriendsList(Object.assign({ pageNum: 1, pageSize: 9999 }, { userId: this.userId, userName: '' }))
                }
            },
            deep:true
        }
    },
    created() {
        if (baseInfo) {
            let key = localStorage.getItem('userIdentity')
            this.search.schoolId = baseInfo[key].schoolId
            this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
        }
    }
}
</script>
<style lang='scss'>
@import '~@/asset/scss/vars.scss';
.inviteMembers {
    .el-dialog {
        min-width: 850px;
    }
    .el-dialog__body {
        padding: 0;
    }
    .box {
        .el-icon-search {
            width: 50px;
            &:before {
                color: #666666;
            }
        }
        .el-textarea__inner {
            border-radius: 0;
        }
    }
    .el-input__inner{
        height: 36px;
    }
    .el-tabs--border-card{
        box-shadow: none;
        border-top: none;
    }
    .el-tabs__item{
        height: 32px;
        line-height: 32px;
    }
    .el-tabs__item.is-active{
        color: $default-color;
    }
    .el-tabs--border-card > .el-tabs__header{
        background-color: #f6f6f6;
    }
    .el-tree{
        border:none;
    }
    .el-tabs--border-card > .el-tabs__content{
        padding: 0px;
    }
}
</style>
<style lang='scss' scoped>
@import './../../asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .buttonGroup {
            .reply_btn1 {
                border: 1px solid $color-value;
                background-color: $color-value;
                &:hover {
                    background-color: $hover-color;
                }
            }
            .reply_btn2 {
                border: 1px solid $color-value;
                color: $color-value;
                &:hover {
                    color: #fff;
                }
            }
        }
    }
}
.inviteMembers {
    padding: 0;
    .header {
        height: 54px;
        line-height: 54px;
        text-indent: 1em;
        border-bottom: 1px solid #D7D7D7;
        font-size: 16px;
    }
    .box {
        padding: 40px 30px;
        .box-l, .box-r {
            width: 50%;
        }
        .box-r {
            .title {
                padding: 0px 5px;
                height: 25px;
                line-height: 25px;
                font-size: 14px;
            }
        }
    }
    .buttonGroup {
        height: 30px;
        text-align: right;
        padding: 0 30px 30px;
        .reply_btn {
            display: inline-block;
            width: 62px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            box-sizing: border-box;
        }
        .reply_btn1 {
            color: #fff;
        }
        .reply_btn2 {
            margin-top: 2px;
            margin-right: 10px;
        }
    }
}
</style>
